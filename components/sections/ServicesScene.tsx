"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  Center,
  RoundedBox,
  Line,
  Html,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

/* ─── palette (brighter for visibility) ─── */
const ACCENT = "#ff3d00";
const BODY_DARK = "#2e2e32";
const BODY_MID = "#3e3e44";
const METAL_DARK = "#505058";
const METAL_MID = "#707078";
const METAL_LIGHT = "#9a9aa2";
const METAL_BRIGHT = "#b8b8c0";
const RUBBER = "#252528";
const PAPER_WHITE = "#e8e4df";
const PAPER_LINE = "#c0bab2";
const WOOD_DARK = "#3a2a1e";
const WOOD_MID = "#4d3828";

/* ═══════════════════════════════════════════════════════════
   Hotspot Data for each of the 4 Services
   ═══════════════════════════════════════════════════════════ */
type HotspotData = {
  position: [number, number, number];
  title: string;
  tag: string;
  desc: string;
};

const HOTSPOTS_PER_SERVICE: Record<number, HotspotData[]> = {
  0: [
    {
      position: [-1.45, 0.6, 0.2],
      title: "HEDEF & ANALİZ",
      tag: "01 · STRATEJİ",
      desc: "Markanın hedeflerine uygun mesaj omurgasını oluştururuz.",
    },
    {
      position: [1.45, 0.15, 0.3],
      title: "YARATICI KONSEPT",
      tag: "02 · ANLATI",
      desc: "İzleyicinin hafızasında yer edecek özgün ana fikir.",
    },
    {
      position: [-1.35, -0.65, 0.3],
      title: "KAMPANYA KURGUSU",
      tag: "03 · MİMARİ",
      desc: "Tüm dijital ve geleneksel kanallara uygun yayın kurgusu.",
    },
  ],
  1: [
    {
      position: [-1.45, 0.65, 0.3],
      title: "AI STORYBOARD",
      tag: "01 · ÇİZİM",
      desc: "Senaryoyu kare kare üretken yapay zekâ ile görselleştiririz.",
    },
    {
      position: [1.45, 0.15, 0.2],
      title: "CHARACTER LOCK",
      tag: "02 · TUTARLILIK",
      desc: "Karakterlerin yüz ve stil devamlılığını tüm sahnelerde koruruz.",
    },
    {
      position: [-1.35, -0.6, 0.4],
      title: "PRODÜKSİYON PLANI",
      tag: "03 · TEKNİK",
      desc: "Kamera açıları, çekim listesi ve ışık düzeni haritası.",
    },
  ],
  2: [
    {
      position: [-1.45, 0.65, 0.2],
      title: "CANLI ÇEKİM",
      tag: "01 · SET & YÖNETİM",
      desc: "Deneyimli yönetmen ve görüntü ekibiyle yüksek standartlı çekim.",
    },
    {
      position: [1.45, 0.2, 0.3],
      title: "AI VIDEO DÜNYASI",
      tag: "02 · YENİLİKÇİ",
      desc: "Fiziksel mekan sınırlarını aşan üretken video sentezi.",
    },
    {
      position: [-1.35, -0.65, 0.4],
      title: "OPTİK & MOVEMENT",
      tag: "03 · DİL",
      desc: "Sinematik kamera lensleri ve akıcı hareket stili.",
    },
  ],
  3: [
    {
      position: [-1.45, 0.65, 0.3],
      title: "DİNAMİK KURGU",
      tag: "01 · AKIŞ",
      desc: "Kurgu masasında hikayenin ritmini ve hissini işleriz.",
    },
    {
      position: [1.45, 0.15, 0.2],
      title: "VFX & COMPOSITING",
      tag: "02 · EFEKT",
      desc: "AI ve klasik VFX tekniklerini tek karede buluştururuz.",
    },
    {
      position: [-1.35, -0.6, 0.4],
      title: "RENK & SES TASARIMI",
      tag: "03 · FİNAL",
      desc: "Sinematik renk derecelendirmesi ve atmosferik ses dünyası.",
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   3D Hotspot Card Component with HTML Callout
   ═══════════════════════════════════════════════════════════ */
function HotspotCard({ data }: { data: HotspotData }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={data.position}>
      {/* Small 3D pulsing glowing pin */}
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      <mesh scale={hovered ? 1.5 : 1.1}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.25} />
      </mesh>

      {/* HTML overlay callout card — fixed size, no distanceFactor scaling */}
      <Html
        center
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "auto", userSelect: "none" }}
      >
        <div
          className={`services-hotspot-card ${hovered ? "is-hovered" : ""}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="hotspot-header">
            <span className="hotspot-badge">{data.tag}</span>
            <span className="hotspot-dot" />
          </div>
          <h4 className="hotspot-title">{data.title}</h4>
          <p className="hotspot-desc">{data.desc}</p>
        </div>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   Entrance animation wrapper
   ═══════════════════════════════════════════════════════════ */
function EntranceWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    progress.current = Math.min(1, progress.current + delta * 2.2);
    const t = 1 - Math.pow(1 - progress.current, 3);
    ref.current.scale.setScalar(t);
    ref.current.rotation.y = (1 - t) * 0.8;
  });

  return (
    <group ref={ref} scale={0}>
      {children}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   01 · STRATEJI — Creative Brief / Clipboard
   ═══════════════════════════════════════════════════════════ */
function CreativeBrief() {
  return (
    <EntranceWrap>
      <group rotation={[0.2, -0.25, 0.05]}>
        {/* Clipboard body (wood-like) */}
        <RoundedBox args={[1.5, 2.0, 0.08]} radius={0.03}>
          <meshStandardMaterial color={WOOD_MID} metalness={0.1} roughness={0.7} />
        </RoundedBox>

        {/* Metal clip at top */}
        <group position={[0, 1.0, 0.05]}>
          <RoundedBox args={[0.5, 0.14, 0.04]} radius={0.015}>
            <meshStandardMaterial color={METAL_BRIGHT} metalness={0.92} roughness={0.08} />
          </RoundedBox>
          <RoundedBox args={[0.4, 0.08, 0.025]} radius={0.008} position={[0, 0.06, 0.02]} rotation={[-0.2, 0, 0]}>
            <meshStandardMaterial color={METAL_LIGHT} metalness={0.9} roughness={0.1} />
          </RoundedBox>
          <mesh position={[0, 0.0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.52, 12]} />
            <meshStandardMaterial color={METAL_BRIGHT} metalness={0.95} roughness={0.05} />
          </mesh>
        </group>

        {/* Paper sheet */}
        <mesh position={[0, -0.05, 0.045]}>
          <planeGeometry args={[1.3, 1.7]} />
          <meshStandardMaterial color={PAPER_WHITE} metalness={0.0} roughness={0.95} side={THREE.DoubleSide} />
        </mesh>

        {/* Text lines on paper */}
        {[-0.45, -0.25, -0.05, 0.15, 0.35, 0.55].map((y, i) => (
          <mesh key={`line-${i}`} position={[i === 0 ? -0.15 : 0, -0.05 + y * 0.8, 0.048]}>
            <planeGeometry args={[i === 0 ? 0.6 : 1.0, 0.015]} />
            <meshBasicMaterial color={i === 0 ? BODY_DARK : PAPER_LINE} />
          </mesh>
        ))}

        {/* Title block */}
        <mesh position={[0, 0.52, 0.048]}>
          <planeGeometry args={[0.8, 0.04]} />
          <meshBasicMaterial color={BODY_DARK} />
        </mesh>

        {/* Accent checkmarks */}
        <mesh position={[-0.45, 0.18, 0.048]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.4} metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[-0.45, -0.02, 0.048]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.2} metalness={0.3} roughness={0.4} />
        </mesh>

        {/* Pencil */}
        <group position={[0.35, -0.3, 0.08]} rotation={[0, 0, 0.4]}>
          <mesh>
            <cylinderGeometry args={[0.022, 0.022, 0.9, 6]} />
            <meshStandardMaterial color="#c4a035" metalness={0.3} roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.48, 0]}>
            <coneGeometry args={[0.022, 0.08, 6]} />
            <meshStandardMaterial color={WOOD_DARK} metalness={0.05} roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.52, 0]}>
            <coneGeometry args={[0.008, 0.02, 6]} />
            <meshStandardMaterial color="#333" metalness={0.2} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.47, 0]}>
            <cylinderGeometry args={[0.023, 0.023, 0.05, 6]} />
            <meshStandardMaterial color="#d46070" metalness={0.05} roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.44, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.02, 12]} />
            <meshStandardMaterial color={METAL_BRIGHT} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>
    </EntranceWrap>
  );
}

function StrategyCore() {
  const nodes = [
    [-1.15, 0.65, 0.12],
    [1.15, 0.65, 0.12],
    [-1.15, -0.65, 0.12],
    [1.15, -0.65, 0.12],
  ] as const;

  return (
    <EntranceWrap>
      <group rotation={[0.12, -0.18, 0.04]}>
        <mesh position={[0, 0, 0.08]}>
          <icosahedronGeometry args={[0.48, 2]} />
          <meshStandardMaterial
            color="#33105f"
            emissive="#8b2cff"
            emissiveIntensity={0.65}
            metalness={0.7}
            roughness={0.22}
          />
        </mesh>

        <Html center position={[0, 0, 0.58]} distanceFactor={4}>
          <div style={{
            color: "#ffffff",
            fontFamily: "monospace",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textShadow: "0 0 12px #8b2cff",
            whiteSpace: "nowrap",
          }}>
            STRATEGY
          </div>
        </Html>

        {nodes.map((position, index) => (
          <group key={`strategy-node-${index}`} position={position}>
            <mesh>
              <sphereGeometry args={[0.13, 20, 20]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? "#ff3d00" : "#2e9bff"}
                emissive={index % 2 === 0 ? "#ff3d00" : "#2e9bff"}
                emissiveIntensity={0.45}
                metalness={0.35}
                roughness={0.28}
              />
            </mesh>
            <mesh position={[0, -0.27, 0]}>
              <boxGeometry args={[0.38, 0.22, 0.04]} />
              <meshStandardMaterial color="#222228" metalness={0.25} roughness={0.6} />
            </mesh>
          </group>
        ))}

        {nodes.map((position, index) => (
          <Line
            key={`strategy-line-${index}`}
            points={[[0, 0, 0.08], position]}
            color={index % 2 === 0 ? "#ff3d00" : "#2e9bff"}
            lineWidth={1.4}
            transparent
            opacity={0.72}
          />
        ))}

        <Line
          points={[nodes[0], nodes[1], nodes[3], nodes[2], nodes[0]]}
          color="#696070"
          lineWidth={0.8}
          transparent
          opacity={0.55}
        />
      </group>
    </EntranceWrap>
  );
}

function StrategyClipboard() {
  const { scene } = useGLTF("/assets/strategy-clipboard/clipboard_1k.glb");

  return (
    <EntranceWrap>
      <group position={[0, -0.05, 0]} rotation={[0.08, -0.28, 0.08]}>
        <primitive object={scene} scale={4.5} />
        <Html center position={[0, 0.78, 0.12]} distanceFactor={4}>
          <div style={{
            color: "#ff3d00",
            fontFamily: "monospace",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            whiteSpace: "nowrap",
          }}>
            CREATIVE DIRECTION
          </div>
        </Html>
      </group>
    </EntranceWrap>
  );
}

function StrategyChessSet() {
  const { scene } = useGLTF("/assets/strategy-chess-set/chess_set_1k.glb");

  return (
    <EntranceWrap>
      <group position={[0, -0.25, 0]} rotation={[0.08, -0.32, 0.06]}>
        <primitive object={scene} scale={4.1} />
        <Html center position={[0, 0.68, 0.15]} distanceFactor={4}>
          <div style={{
            color: "#ff3d00",
            fontFamily: "monospace",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            whiteSpace: "nowrap",
          }}>
            STRATEGY BOARD
          </div>
        </Html>
      </group>
    </EntranceWrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   02 · PRE PRODUCTION — Film Clapperboard / Slate
   ═══════════════════════════════════════════════════════════ */
function Clapperboard() {
  return (
    <EntranceWrap>
      <group rotation={[0.2, -0.2, 0.05]} position={[0, -0.1, 0]}>
        {/* Main board body */}
        <RoundedBox args={[1.7, 1.3, 0.06]} radius={0.015}>
          <meshStandardMaterial color={BODY_DARK} metalness={0.08} roughness={0.75} />
        </RoundedBox>

        {/* Slate writing area */}
        <mesh position={[0, -0.12, 0.032]}>
          <planeGeometry args={[1.5, 0.9]} />
          <meshStandardMaterial color="#2a3830" metalness={0.04} roughness={0.85} />
        </mesh>

        {/* Slate lines */}
        {[-0.2, 0, 0.2, -0.4].map((y, i) => (
          <mesh key={i} position={[0, -0.12 + y * 0.5, 0.034]}>
            <planeGeometry args={[1.4, 0.004]} />
            <meshBasicMaterial color="#4a5a48" />
          </mesh>
        ))}

        {/* Slate labels */}
        {[
          { x: -0.55, y: 0.15 },
          { x: -0.55, y: -0.05 },
          { x: 0.15, y: 0.15 },
          { x: 0.15, y: -0.05 },
        ].map((label, i) => (
          <mesh key={`l-${i}`} position={[label.x, label.y, 0.034]}>
            <planeGeometry args={[0.18, 0.028]} />
            <meshBasicMaterial color="#607060" />
          </mesh>
        ))}

        {/* Top clapper */}
        <group position={[0, 0.65, 0.02]} rotation={[-0.3, 0, 0]}>
          <RoundedBox args={[1.7, 0.22, 0.05]} radius={0.012} position={[0, 0.1, 0.01]}>
            <meshStandardMaterial color={BODY_MID} metalness={0.1} roughness={0.7} />
          </RoundedBox>
          {Array.from({ length: 7 }).map((_, i) => (
            <mesh key={`s-${i}`} position={[-0.7 + i * 0.24, 0.1, 0.04]} rotation={[0, 0, 0.5]}>
              <planeGeometry args={[0.065, 0.22]} />
              <meshBasicMaterial color={i % 2 === 0 ? "#f0f0f0" : BODY_DARK} />
            </mesh>
          ))}
        </group>

        {/* Bottom clapper bar */}
        <RoundedBox args={[1.7, 0.18, 0.04]} radius={0.01} position={[0, 0.56, 0.01]}>
          <meshStandardMaterial color={BODY_MID} metalness={0.1} roughness={0.7} />
        </RoundedBox>
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={`bs-${i}`} position={[-0.7 + i * 0.24, 0.56, 0.032]} rotation={[0, 0, 0.5]}>
            <planeGeometry args={[0.055, 0.18]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#f0f0f0" : BODY_DARK} />
          </mesh>
        ))}

        {/* Left Hinge Screw / Bracket */}
        <group position={[-0.78, 0.65, 0.02]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.08, 16]} />
            <meshStandardMaterial color={METAL_BRIGHT} metalness={0.92} roughness={0.08} />
          </mesh>
          <mesh position={[0, 0, 0.042]}>
            <circleGeometry args={[0.025, 12]} />
            <meshBasicMaterial color={BODY_DARK} />
          </mesh>
        </group>

        {/* Accent circle */}
        <mesh position={[0.6, 0.56, 0.035]}>
          <circleGeometry args={[0.045, 16]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.35} metalness={0.4} roughness={0.3} />
        </mesh>
      </group>
    </EntranceWrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   03 · PRODUCTION + AI VIDEO — Cinema Camera Lens
   ═══════════════════════════════════════════════════════════ */
function CameraLens() {
  return (
    <EntranceWrap>
      <group rotation={[0.3, -0.4, 0.1]}>
        <mesh>
          <cylinderGeometry args={[0.55, 0.52, 1.8, 64]} />
          <meshStandardMaterial color={BODY_MID} metalness={0.65} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.62, 0.58, 0.15, 64]} />
          <meshStandardMaterial color={METAL_DARK} metalness={0.82} roughness={0.15} />
        </mesh>
        <mesh position={[0, 1.03, 0]}>
          <circleGeometry args={[0.52, 48]} />
          <meshStandardMaterial color="#15152a" metalness={0.95} roughness={0.02} envMapIntensity={2.5} />
        </mesh>
        <mesh position={[0, 1.035, 0]}>
          <circleGeometry args={[0.48, 48]} />
          <meshStandardMaterial color="#1a1a35" metalness={1} roughness={0} transparent opacity={0.5} envMapIntensity={3} />
        </mesh>
        {[0.4, 0.32, 0.22].map((r, i) => (
          <mesh key={i} position={[0, 1.034, 0]}>
            <torusGeometry args={[r, 0.005, 8, 48]} />
            <meshStandardMaterial color={i === 1 ? "#2a1a40" : "#151525"} metalness={0.9} roughness={0.1} transparent opacity={0.5} />
          </mesh>
        ))}
        <mesh position={[0, 0.7, 0]}>
          <torusGeometry args={[0.565, 0.02, 12, 64]} />
          <meshStandardMaterial color={ACCENT} metalness={0.7} roughness={0.12} emissive={ACCENT} emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.58, 0.58, 0.45, 64]} />
          <meshStandardMaterial color={RUBBER} metalness={0.1} roughness={0.9} />
        </mesh>
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.586, 0.25, Math.sin(angle) * 0.586]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.009, 0.4, 0.016]} />
              <meshStandardMaterial color={BODY_DARK} metalness={0.18} roughness={0.82} />
            </mesh>
          );
        })}
        <mesh position={[0, -0.2, 0]}>
          <torusGeometry args={[0.545, 0.014, 12, 64]} />
          <meshStandardMaterial color={METAL_BRIGHT} metalness={0.92} roughness={0.06} />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.56, 0.56, 0.2, 64]} />
          <meshStandardMaterial color={METAL_DARK} metalness={0.72} roughness={0.22} />
        </mesh>
        <mesh position={[0, -0.92, 0]}>
          <cylinderGeometry args={[0.48, 0.53, 0.12, 64]} />
          <meshStandardMaterial color={METAL_MID} metalness={0.88} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.98, 0]}>
          <torusGeometry args={[0.47, 0.018, 12, 48]} />
          <meshStandardMaterial color={METAL_BRIGHT} metalness={0.92} roughness={0.06} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh key={`m-${i}`} position={[Math.cos(angle) * 0.56, -0.35, Math.sin(angle) * 0.56]}>
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshBasicMaterial color={i === 0 ? ACCENT : METAL_LIGHT} />
            </mesh>
          );
        })}
      </group>
    </EntranceWrap>
  );
}

function SteampunkCamera() {
  const { scene } = useGLTF("/assets/steampunk_camera.glb");

  return (
    <group position={[0, -0.25, 0]} rotation={[0.03, -0.12, 0]}>
      <primitive object={scene} scale={1.05} />
    </group>
  );
}

function PreProductionCamera() {
  const { scene } = useGLTF("/assets/preproduction-camera/Camera_01_1k.glb");

  return (
    <group position={[0, -0.2, 0]} rotation={[0.08, -0.4, 0.08]}>
      <primitive object={scene} scale={4.2} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
/* ═══════════════════════════════════════════════════════════
   04 · POST PRODUCTION — Studio Editing Suite & VFX Console
   ═══════════════════════════════════════════════════════════ */
function PostProductionStudio() {
  const timeRef = useRef(0);
  const playheadRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (playheadRef.current) {
      // Playhead moves smoothly across the timeline
      playheadRef.current.position.x = -0.6 + ((timeRef.current * 0.4) % 1.2);
    }
  });

  return (
    <EntranceWrap>
      <group rotation={[0.15, -0.25, 0.02]} position={[0, -0.05, 0]}>
        {/* Widescreen Monitor Chassis */}
        <RoundedBox args={[2.1, 1.25, 0.08]} radius={0.025}>
          <meshStandardMaterial color={BODY_DARK} metalness={0.7} roughness={0.25} />
        </RoundedBox>

        {/* Display Glass Screen */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[1.98, 1.15]} />
          <meshStandardMaterial color="#0c0d12" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* --- TIMELINE SUITE UI ON SCREEN --- */}
        {/* Main Video Viewport Window (Top Left) */}
        <mesh position={[-0.45, 0.22, 0.044]}>
          <planeGeometry args={[0.95, 0.58]} />
          <meshStandardMaterial color="#141620" emissive="#181a28" emissiveIntensity={0.3} roughness={0.8} />
        </mesh>

        {/* Video Viewport Frame Border */}
        <lineSegments position={[-0.45, 0.22, 0.045]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(0.95, 0.58)]} />
          <lineBasicMaterial color={METAL_DARK} />
        </lineSegments>

        {/* Color Grading Wheel Panel (Top Right) */}
        <group position={[0.52, 0.22, 0.045]}>
          {/* Color Wheel Outer Ring */}
          <mesh>
            <ringGeometry args={[0.18, 0.22, 32]} />
            <meshStandardMaterial color="#1a1c28" emissive={ACCENT} emissiveIntensity={0.2} />
          </mesh>
          {/* Color Wheel Center Dot */}
          <mesh position={[0.04, -0.03, 0]}>
            <circleGeometry args={[0.025, 16]} />
            <meshBasicMaterial color={ACCENT} />
          </mesh>
          {/* Secondary scopes/meters */}
          <mesh position={[0, -0.18, 0]}>
            <planeGeometry args={[0.6, 0.08]} />
            <meshBasicMaterial color="#1a202c" />
          </mesh>
        </group>

        {/* Timeline Tracks (Bottom Panel) */}
        <group position={[0, -0.28, 0.045]}>
          {/* Timeline Background */}
          <mesh>
            <planeGeometry args={[1.85, 0.35]} />
            <meshBasicMaterial color="#0a0c12" />
          </mesh>

          {/* Track 1: Video Track V1 (Accent Color block) */}
          <mesh position={[-0.2, 0.1, 0.001]}>
            <planeGeometry args={[1.2, 0.06]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.3} />
          </mesh>

          {/* Track 2: VFX Track V2 (Cyan/Blue block) */}
          <mesh position={[0.1, 0.02, 0.001]}>
            <planeGeometry args={[0.9, 0.05]} />
            <meshStandardMaterial color="#00a8ff" emissive="#00a8ff" emissiveIntensity={0.3} />
          </mesh>

          {/* Track 3: Audio Waveform Track A1 */}
          <mesh position={[-0.1, -0.06, 0.001]}>
            <planeGeometry args={[1.3, 0.05]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.25} />
          </mesh>

          {/* Audio Waveforms bars */}
          {Array.from({ length: 24 }).map((_, i) => {
            const h = 0.015 + Math.sin(i * 0.8) * 0.012;
            return (
              <mesh key={`wave-${i}`} position={[-0.7 + i * 0.055, -0.06, 0.002]}>
                <planeGeometry args={[0.025, h]} />
                <meshBasicMaterial color="#4ade80" />
              </mesh>
            );
          })}

          {/* Playhead Vertical Line */}
          <mesh ref={playheadRef} position={[-0.6, 0.02, 0.003]}>
            <planeGeometry args={[0.015, 0.33]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Monitor Base Stand */}
        <group position={[0, -0.72, -0.05]}>
          {/* Stem */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.35, 16]} />
            <meshStandardMaterial color={METAL_MID} metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Oval Base */}
          <mesh position={[0, -0.05, 0.1]}>
            <cylinderGeometry args={[0.45, 0.48, 0.04, 32]} />
            <meshStandardMaterial color={METAL_BRIGHT} metalness={0.92} roughness={0.08} />
          </mesh>
        </group>

        {/* Power LED Indicator Dot */}
        <mesh position={[0.9, -0.56, 0.043]}>
          <circleGeometry args={[0.015, 12]} />
          <meshBasicMaterial color={ACCENT} />
        </mesh>
      </group>
    </EntranceWrap>
  );
}

function PostProductionRobot() {
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!headRef.current) return;
    headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.55) * 0.025;
  });

  return (
    <EntranceWrap>
      <group position={[0, -0.2, 0]} rotation={[0.05, -0.18, 0]}>
        <group ref={headRef} position={[0, 1.28, 0]}>
          <RoundedBox args={[1.15, 0.78, 0.52]} radius={0.12}>
            <meshStandardMaterial color="#24104f" emissive="#6d00ff" emissiveIntensity={0.18} metalness={0.7} roughness={0.24} />
          </RoundedBox>
          <mesh position={[-0.22, 0.08, 0.28]}>
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial color="#f5f5f5" emissive="#ffffff" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0.22, 0.08, 0.28]}>
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial color="#f5f5f5" emissive="#ffffff" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0, -0.22, 0.27]}>
            <planeGeometry args={[0.44, 0.045]} />
            <meshBasicMaterial color={ACCENT} />
          </mesh>
        </group>

        <group position={[0, 0.74, 0]}>
          <RoundedBox args={[0.38, 0.22, 0.32]} radius={0.06}>
            <meshStandardMaterial color={METAL_MID} metalness={0.85} roughness={0.18} />
          </RoundedBox>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.24, 12]} />
            <meshStandardMaterial color={METAL_BRIGHT} metalness={0.9} roughness={0.12} />
          </mesh>
        </group>

        <RoundedBox args={[1.05, 1.2, 0.72]} radius={0.12} position={[0, 0, 0]}>
          <meshStandardMaterial color="#111a3b" emissive="#18004d" emissiveIntensity={0.16} metalness={0.65} roughness={0.28} />
        </RoundedBox>
        <mesh position={[0, 0.05, 0.38]}>
          <planeGeometry args={[0.58, 0.28]} />
          <meshStandardMaterial color="#160f2f" emissive="#5b00ff" emissiveIntensity={0.35} />
        </mesh>

        <group position={[-0.7, 0.05, 0]} rotation={[0, 0, -0.18]}>
          <RoundedBox args={[0.22, 0.92, 0.22]} radius={0.08}>
            <meshStandardMaterial color={METAL_DARK} metalness={0.8} roughness={0.22} />
          </RoundedBox>
          <mesh position={[0, -0.52, 0]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color={METAL_LIGHT} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        <group position={[0.7, 0.05, 0]} rotation={[0, 0, 0.18]}>
          <RoundedBox args={[0.22, 0.92, 0.22]} radius={0.08}>
            <meshStandardMaterial color={METAL_DARK} metalness={0.8} roughness={0.22} />
          </RoundedBox>
          <mesh position={[0, -0.52, 0]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color={METAL_LIGHT} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        <RoundedBox args={[0.27, 0.72, 0.3]} radius={0.08} position={[-0.3, -0.98, 0]}>
          <meshStandardMaterial color={METAL_DARK} metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <RoundedBox args={[0.27, 0.72, 0.3]} radius={0.08} position={[0.3, -0.98, 0]}>
          <meshStandardMaterial color={METAL_DARK} metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, -1.35, 0.04]}>
          <boxGeometry args={[1.15, 0.06, 0.45]} />
          <meshStandardMaterial color="#120a2c" emissive="#5b00ff" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </EntranceWrap>
  );
}

/* ═══════════════════════════════════════════════════════════ */
const SCENE_OBJECTS = [StrategyChessSet, SteampunkCamera, PreProductionCamera, PostProductionRobot];

/* ═══════════════════════════════════════════════════════════
   Main Inner Scene with 3D Hotspot Cards
   ═══════════════════════════════════════════════════════════ */
function ServicesSceneInner({ activeIndex }: { activeIndex: number }) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [activeIndex]);

  const ActiveObject = SCENE_OBJECTS[activeIndex] ?? SCENE_OBJECTS[0];

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 6, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-5, 4, -3]} intensity={0.5} color="#c0c0ff" />
      <directionalLight position={[0, -3, 5]} intensity={0.35} color="#ffffff" />
      <spotLight position={[-3, 5, 4]} intensity={0.65} color={ACCENT} angle={0.4} penumbra={0.8} distance={16} decay={2} />
      <spotLight position={[4, 3, -2]} intensity={0.45} color="#ffffff" angle={0.5} penumbra={0.9} distance={14} decay={2} />
      <pointLight position={[0, 2, 4]} intensity={0.4} color="#ffffff" />
      <hemisphereLight args={["#444466", "#222222", 0.5]} />

      <OrbitControls
        ref={controlsRef}
        autoRotate
        autoRotateSpeed={1.2}
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.05}
        enableDamping
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
        makeDefault
      />

      <Center>
        <ActiveObject key={activeIndex} />
      </Center>

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.3}
        blur={2.5}
        far={5}
        color="#000000"
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Exported Canvas Wrapper
   ═══════════════════════════════════════════════════════════ */
export function ServicesScene({ activeIndex }: { activeIndex: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 36 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor("#0b0b0c", 1);
        scene.background = new THREE.Color("#0b0b0c");
      }}
      style={{ background: "transparent", cursor: "grab" }}
      onPointerDown={(e) => { (e.target as HTMLElement).style.cursor = "grabbing"; }}
      onPointerUp={(e) => { (e.target as HTMLElement).style.cursor = "grab"; }}
    >
      <ServicesSceneInner activeIndex={activeIndex} />
    </Canvas>
  );
}
