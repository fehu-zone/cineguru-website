import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const targetUrl = process.argv[2] ?? "http://127.0.0.1:3111/tr";
const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);
const chromePath = chromeCandidates.find((candidate) => existsSync(candidate));

if (!chromePath) {
  throw new Error("Chrome veya Edge bulunamadı. CHROME_PATH ile tarayıcı yolunu belirtin.");
}

const debuggingPort = 9300 + Math.floor(Math.random() * 500);
const profileDirectory = await mkdtemp(join(tmpdir(), "cineguru-scroll-profile-"));
const chrome = spawn(chromePath, [
  "--headless=new",
  `--remote-debugging-port=${debuggingPort}`,
  `--user-data-dir=${profileDirectory}`,
  "--no-first-run",
  "--disable-background-networking",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-extensions",
  "--disable-sync",
  "--hide-scrollbars",
  "--mute-audio",
  "--window-size=1440,900",
], { stdio: "ignore" });

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

async function waitForChrome() {
  let lastError;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      return await fetchJson(`http://127.0.0.1:${debuggingPort}/json/version`);
    } catch (error) {
      lastError = error;
      await delay(100);
    }
  }
  throw lastError;
}

class DevToolsClient {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.waiters = new Map();

    socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }

      const waiters = this.waiters.get(message.method);
      if (!waiters?.length) return;
      this.waiters.delete(message.method);
      waiters.forEach((resolve) => resolve(message.params));
    });
  }

  command(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  event(method) {
    return new Promise((resolve) => {
      const waiters = this.waiters.get(method) ?? [];
      waiters.push(resolve);
      this.waiters.set(method, waiters);
    });
  }
}

function percentile(values, fraction) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))];
}

function summarizeFrames(gaps) {
  return {
    frames: gaps.length,
    medianMs: Number(percentile(gaps, 0.5).toFixed(1)),
    p95Ms: Number(percentile(gaps, 0.95).toFixed(1)),
    maxMs: Number(Math.max(0, ...gaps).toFixed(1)),
    over34ms: gaps.filter((gap) => gap > 34).length,
    over50ms: gaps.filter((gap) => gap > 50).length,
  };
}

let socket;
try {
  await waitForChrome();
  const page = await fetchJson(`http://127.0.0.1:${debuggingPort}/json/new?about:blank`, { method: "PUT" });
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  const client = new DevToolsClient(socket);
  await Promise.all([
    client.command("Page.enable"),
    client.command("Runtime.enable"),
    client.command("Performance.enable"),
    client.command("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false,
    }),
  ]);

  const loaded = client.event("Page.loadEventFired");
  await client.command("Page.navigate", { url: targetUrl });
  await loaded;
  await delay(1800);

  await client.command("Runtime.evaluate", {
    expression: `(() => {
      window.__scrollProfile = { longTasks: [] };
      if ("PerformanceObserver" in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__scrollProfile.longTasks.push({
              startTime: entry.startTime,
              duration: entry.duration,
            });
          }
        });
        try { observer.observe({ type: "longtask", buffered: true }); } catch {}
      }
    })()`,
  });

  async function measureDirection(targetExpression, duration = 3200) {
    const result = await client.command("Runtime.evaluate", {
      expression: `(async () => {
        const destination = ${targetExpression};
        const from = window.scrollY;
        const duration = ${duration};
        const gaps = [];
        let previous;
        const started = performance.now();

        await new Promise((resolve) => {
          const frame = (now) => {
            if (previous !== undefined) gaps.push(now - previous);
            previous = now;
            const progress = Math.min(1, (now - started) / duration);
            const eased = progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            window.scrollTo(0, from + (destination - from) * eased);
            if (progress < 1) requestAnimationFrame(frame);
            else resolve();
          };
          requestAnimationFrame(frame);
        });

        return gaps;
      })()`,
      awaitPromise: true,
      returnByValue: true,
    });
    return result.result.value;
  }

  const servicePosition = `document.getElementById("services").offsetTop
    + document.getElementById("services").offsetHeight * 0.58
    - innerHeight * 0.5`;
  const downToServices = await measureDirection(servicePosition);
  await delay(2200);
  const downToBottom = await measureDirection("document.documentElement.scrollHeight - innerHeight", 2200);
  await delay(800);
  const upToServices = await measureDirection(servicePosition, 2200);
  await delay(2200);
  const upToTop = await measureDirection("0");
  await delay(800);
  const downFrames = [...downToServices, ...downToBottom];
  const upFrames = [...upToServices, ...upToTop];

  const pageResult = await client.command("Runtime.evaluate", {
    expression: `(() => ({
      longTasks: window.__scrollProfile.longTasks,
      resources: performance.getEntriesByType("resource").map((entry) => ({
        name: entry.name,
        transferSize: entry.transferSize,
        duration: entry.duration,
      })),
      pageHeight: document.documentElement.scrollHeight,
    }))()`,
    returnByValue: true,
  });
  const pageMetrics = pageResult.result.value;
  const longTasks = pageMetrics.longTasks;
  const resourceBytes = pageMetrics.resources.reduce((total, resource) => total + resource.transferSize, 0);

  console.log(JSON.stringify({
    url: targetUrl,
    viewport: "1440x900@2x",
    pageHeight: pageMetrics.pageHeight,
    down: summarizeFrames(downFrames),
    up: summarizeFrames(upFrames),
    longTasks: {
      count: longTasks.length,
      totalMs: Number(longTasks.reduce((total, task) => total + task.duration, 0).toFixed(1)),
      maxMs: Number(Math.max(0, ...longTasks.map((task) => task.duration)).toFixed(1)),
    },
    transferredMB: Number((resourceBytes / 1024 / 1024).toFixed(2)),
  }, null, 2));
} finally {
  socket?.close();
  chrome.kill();
  await Promise.race([once(chrome, "exit"), delay(2000)]);
  await rm(profileDirectory, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 }).catch(() => {});
}
