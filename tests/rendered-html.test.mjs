import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

const port = 3137;
const server = spawn(
  process.execPath,
  ["node_modules/vinext/dist/cli.js", "start", "--hostname", "127.0.0.1", "--port", String(port)],
  { cwd: new URL("..", import.meta.url), stdio: "ignore" },
);

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/tr`);
      if (response.status < 500) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Vinext production server did not start");
}

async function renderPath(path) {
  return fetch(`http://127.0.0.1:${port}${path}`, {
    headers: { accept: "text/html" },
  });
}

await waitForServer();

test.after(() => {
  server.kill();
});

test("renders localized Turkish and English experiences", async () => {
  const trResponse = await renderPath("/tr");
  const enResponse = await renderPath("/en");

  assert.equal(trResponse.status, 200);
  assert.equal(enResponse.status, 200);
  assert.match(
    trResponse.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const trHtml = await trResponse.text();
  const enHtml = await enResponse.text();
  assert.match(trHtml, /<html[^>]+lang=["']tr["']/i);
  assert.match(enHtml, /<html[^>]+lang=["']en["']/i);
  assert.match(trHtml, /Fikri, iz bırakan filme dönüştürüyoruz\./);
  assert.match(enHtml, /We turn ideas into films that leave a mark\./);
  assert.match(enHtml, /\/en/);
  assert.match(trHtml, /Sıfır Atık Haftası/);
  assert.match(trHtml, /VEX Robotics Türkiye/);
  assert.match(trHtml, /Karmaşıklığı biz yönetiriz\./);
});

test("keeps real portfolio video identifiers in rendered output", async () => {
  const response = await renderPath("/tr");
  const html = await response.text();
  for (const id of ["qG5OExBLt8c", "aZrWhEaHDBg", "Mz5axZ1atJk", "DtZNVI2ON-U", "YNDz9ydGqPM", "bct_ERqomNI"]) {
    assert.match(html, new RegExp(id));
  }
  assert.doesNotMatch(html, /embed\/videoseries/);
  assert.match(html, /showreel-poster-1280\.avif/);
});

test("renders the two unique vertical Shorts in the current feed", async () => {
  const response = await renderPath("/tr");
  const html = await response.text();
  const channelSection = html.match(/<section class=["']channel-section["'][\s\S]*?<\/section>/i)?.[0] ?? "";

  assert.match(channelSection, /zgHJxbfs27o/);
  assert.match(channelSection, /t7DJjnegikA/);
  assert.match(channelSection, /alfemo-masko-1080\.avif/);
  assert.match(channelSection, /sifir-atik-festival-1080\.avif/);
  assert.doesNotMatch(channelSection, /qG5OExBLt8c|aZrWhEaHDBg/);
});
