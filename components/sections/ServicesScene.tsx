"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  Center,
  RoundedBox,
  Html,
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

/* ═══════════════════════════════════════════════════════════
   04 · POST PRODUCTION — Film Reel
   ═══════════════════════════════════════════════════════════ */
function FilmReel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = clock.getElapsedTime() * 0.15;
  });

  const spokeCount = 6;
  const cutoutCount = 6;

  return (
    <EntranceWrap>
      <group rotation={[0.35, -0.25, 0]}>
        <group ref={groupRef}>
          <mesh>
            <torusGeometry args={[1.15, 0.065, 24, 80]} />
            <meshStandardMaterial color={METAL_MID} metalness={0.9} roughness={0.08} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.95, 0.045, 20, 72]} />
            <meshStandardMaterial color={METAL_DARK} metalness={0.85} roughness={0.12} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.22, 0.22, 0.14, 32]} />
            <meshStandardMaterial color={METAL_BRIGHT} metalness={0.92} roughness={0.06} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.13, 0.022, 12, 32]} />
            <meshStandardMaterial color={METAL_MID} metalness={0.88} roughness={0.1} />
          </mesh>
          {Array.from({ length: spokeCount }).map((_, i) => {
            const angle = (i / spokeCount) * Math.PI * 2;
            return (
              <mesh key={`sp-${i}`} position={[Math.cos(angle) * 0.55, Math.sin(angle) * 0.55, 0]} rotation={[Math.PI / 2, 0, angle]}>
                <boxGeometry args={[0.045, 0.12, 0.72]} />
                <meshStandardMaterial color={METAL_DARK} metalness={0.84} roughness={0.15} />
              </mesh>
            );
          })}
          <mesh>
            <cylinderGeometry args={[1.08, 1.08, 0.09, 64, 1, true]} />
            <meshStandardMaterial color={BODY_DARK} metalness={0.15} roughness={0.8} side={THREE.DoubleSide} />
          </mesh>
          {[0.85, 0.7, 0.55, 0.4].map((r, i) => (
            <mesh key={`fl-${i}`}>
              <cylinderGeometry args={[r, r, 0.09 + i * 0.005, 48, 1, true]} />
              <meshStandardMaterial color={i % 2 === 0 ? BODY_MID : BODY_DARK} metalness={0.12} roughness={0.85} side={THREE.DoubleSide} transparent opacity={0.7} />
            </mesh>
          ))}
          <mesh position={[0, 0, 0.065]}>
            <ringGeometry args={[0.24, 1.14, 64]} />
            <meshStandardMaterial color={METAL_DARK} metalness={0.78} roughness={0.18} />
          </mesh>
          {Array.from({ length: cutoutCount }).map((_, i) => {
            const angle = (i / cutoutCount) * Math.PI * 2 + Math.PI / cutoutCount;
            const r = 0.62;
            return (
              <mesh key={`cut-${i}`} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0.07]}>
                <circleGeometry args={[0.13, 24]} />
                <meshStandardMaterial color="#0e0e12" metalness={0.2} roughness={0.85} />
              </mesh>
            );
          })}
          <mesh>
            <torusGeometry args={[0.24, 0.014, 12, 32]} />
            <meshStandardMaterial color={ACCENT} metalness={0.72} roughness={0.18} emissive={ACCENT} emissiveIntensity={0.3} />
          </mesh>
        </group>

        <group position={[1.0, -0.6, 0]} rotation={[0, 0, -0.3]}>
          {Array.from({ length: 5 }).map((_, i) => (
            <group key={`fs-${i}`} position={[i * 0.2, -i * 0.15, i * 0.02]} rotation={[0, 0, -i * 0.05]}>
              <RoundedBox args={[0.18, 0.12, 0.006]} radius={0.003}>
                <meshStandardMaterial color={BODY_MID} metalness={0.12} roughness={0.8} />
              </RoundedBox>
              <mesh position={[0, 0.05, 0.004]}>
                <planeGeometry args={[0.022, 0.016]} />
                <meshBasicMaterial color="#0a0a0e" />
              </mesh>
              <mesh position={[0, -0.05, 0.004]}>
                <planeGeometry args={[0.022, 0.016]} />
                <meshBasicMaterial color="#0a0a0e" />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </EntranceWrap>
  );
}

/* ═══════════════════════════════════════════════════════════ */
const SCENE_OBJECTS = [CreativeBrief, Clapperboard, CameraLens, FilmReel];

/* ═══════════════════════════════════════════════════════════
   Main Inner Scene with 3D Hotspot Cards
   ═══════════════════════════════════════════════════════════ */
function ServicesSceneInner({ activeIndex }: { activeIndex: number }) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  useEffect(() => {
    if (controlsRef.current) {
      (controlsRef.current as any).reset();
    }
  }, [activeIndex]);

  const ActiveObject = SCENE_OBJECTS[activeIndex] ?? SCENE_OBJECTS[0];
  const activeHotspots = HOTSPOTS_PER_SERVICE[activeIndex] ?? HOTSPOTS_PER_SERVICE[0];

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

      {/* Render 3D Hotspots around the centered object */}
      <group key={`hotspots-${activeIndex}`}>
        {activeHotspots.map((hs, i) => (
          <HotspotCard key={i} data={hs} />
        ))}
      </group>

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
      style={{ background: "transparent", cursor: "grab" }}
      onPointerDown={(e) => { (e.target as HTMLElement).style.cursor = "grabbing"; }}
      onPointerUp={(e) => { (e.target as HTMLElement).style.cursor = "grab"; }}
    >
      <ServicesSceneInner activeIndex={activeIndex} />
    </Canvas>
  );
}
