"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  Center,
  Html,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

/* ─── Palette ─── */
const ACCENT = "#e33326";
const METAL_DARK = "#505058";
const METAL_MID = "#707078";
const METAL_LIGHT = "#9a9aa2";

/* ─── Hotspot Position Definitions per Service ─── */
const HOTSPOT_POSITIONS: Record<number, [number, number, number][]> = {
  0: [[-1.45, 0.6, 0.2], [1.45, 0.15, 0.3], [-1.35, -0.65, 0.3]],
  1: [[-1.45, 0.65, 0.3], [1.45, 0.15, 0.2], [-1.35, -0.6, 0.4]],
  2: [[-1.45, 0.65, 0.2], [1.45, 0.2, 0.3], [-1.35, -0.65, 0.4]],
  3: [[-1.45, 0.65, 0.3], [1.45, 0.15, 0.2], [-1.35, -0.6, 0.4]],
};

type HotspotData = {
  position: [number, number, number];
  title: string;
  tag: string;
  desc: string;
};

type DetailItem = {
  tag: string;
  title: string;
  description: string;
};

/* ═══════════════════════════════════════════════════════════
   3D Hotspot Card Component with HTML Callout
   ═══════════════════════════════════════════════════════════ */
function HotspotCard({ data }: { data: HotspotData }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={data.position}>
      {/* 3D Pulsing Pin */}
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      <mesh scale={hovered ? 1.5 : 1.1}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.25} />
      </mesh>

      {/* HTML overlay callout card */}
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
   4 Complementary Stage Entrance Animations (Spatial Journey)
   ═══════════════════════════════════════════════════════════ */

/* 01 · STRATEJİ — Drop & Spin from Above (TOP -> CENTER) */
function StrategyEntranceWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    progress.current = Math.min(1, progress.current + delta * 2.0);
    const t = 1 - Math.pow(1 - progress.current, 3);
    ref.current.scale.setScalar(t);
    ref.current.position.y = (1 - t) * 1.5;
    ref.current.rotation.y = (1 - t) * (Math.PI * 0.75);
  });

  return <group ref={ref} scale={0}>{children}</group>;
}

/* 02 · PRE PRODUCTION — Slide & Twist from Left (LEFT -> CENTER) */
function PreProdEntranceWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    progress.current = Math.min(1, progress.current + delta * 2.0);
    const t = 1 - Math.pow(1 - progress.current, 3);
    ref.current.scale.setScalar(t);
    ref.current.position.x = (1 - t) * -1.8;
    ref.current.rotation.z = (1 - t) * -0.4;
    ref.current.rotation.y = (1 - t) * 0.5;
  });

  return <group ref={ref} scale={0}>{children}</group>;
}

/* 03 · PRODUCTION + AI VIDEO — Optical Lens Zoom Out from Depth (DEPTH Z -> CENTER) */
function ProdEntranceWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    progress.current = Math.min(1, progress.current + delta * 1.9);
    const t = 1 - Math.pow(1 - progress.current, 3);
    ref.current.scale.setScalar(0.25 + t * 0.75);
    ref.current.position.z = (1 - t) * 1.6;
    ref.current.rotation.y = (1 - t) * -0.6;
  });

  return <group ref={ref} scale={0.25}>{children}</group>;
}

/* 04 · POST PRODUCTION — Rise & Tilt from Below (BOTTOM -> CENTER) */
function PostProdEntranceWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    progress.current = Math.min(1, progress.current + delta * 2.0);
    const t = 1 - Math.pow(1 - progress.current, 3);
    ref.current.scale.setScalar(t);
    ref.current.position.y = (1 - t) * -1.5;
    ref.current.rotation.x = (1 - t) * 0.35;
    ref.current.rotation.y = (1 - t) * -0.5;
  });

  return <group ref={ref} scale={0}>{children}</group>;
}

/* ═══════════════════════════════════════════════════════════
   Active 3D Models
   ═══════════════════════════════════════════════════════════ */

function StrategyChessSet({ label }: { label: string }) {
  const { scene } = useGLTF("/assets/strategy-chess-set/chess_set_1k.glb");

  return (
    <group position={[0, -0.25, 0]} rotation={[0.08, -0.32, 0.06]}>
      <primitive object={scene} scale={4.1} />
      <Html center position={[0, 0.68, 0.15]} distanceFactor={4}>
        <div style={{
          color: "#e33326",
          fontFamily: "monospace",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          whiteSpace: "nowrap",
        }}>
          {label}
        </div>
      </Html>
    </group>
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

function PostProductionRobot() {
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!headRef.current) return;
    headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.55) * 0.025;
  });

  return (
    <group position={[0, -0.2, 0]} rotation={[0.05, -0.18, 0]}>
      <group ref={headRef} position={[0, 1.28, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.15, 0.78, 0.52]} />
          <meshStandardMaterial color="#24104f" emissive="#6d00ff" emissiveIntensity={0.18} metalness={0.7} roughness={0.24} />
        </mesh>
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
        <mesh>
          <boxGeometry args={[0.38, 0.22, 0.32]} />
          <meshStandardMaterial color={METAL_MID} metalness={0.85} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.24, 12]} />
          <meshStandardMaterial color={METAL_LIGHT} metalness={0.9} roughness={0.12} />
        </mesh>
      </group>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.05, 1.2, 0.72]} />
        <meshStandardMaterial color="#111a3b" emissive="#18004d" emissiveIntensity={0.16} metalness={0.65} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.05, 0.38]}>
        <planeGeometry args={[0.58, 0.28]} />
        <meshStandardMaterial color="#160f2f" emissive="#5b00ff" emissiveIntensity={0.35} />
      </mesh>

      <group position={[-0.7, 0.05, 0]} rotation={[0, 0, -0.18]}>
        <mesh>
          <boxGeometry args={[0.22, 0.92, 0.22]} />
          <meshStandardMaterial color={METAL_DARK} metalness={0.8} roughness={0.22} />
        </mesh>
        <mesh position={[0, -0.52, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color={METAL_LIGHT} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      <group position={[0.7, 0.05, 0]} rotation={[0, 0, 0.18]}>
        <mesh>
          <boxGeometry args={[0.22, 0.92, 0.22]} />
          <meshStandardMaterial color={METAL_DARK} metalness={0.8} roughness={0.22} />
        </mesh>
        <mesh position={[0, -0.52, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color={METAL_LIGHT} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      <mesh position={[-0.3, -0.98, 0]}>
        <boxGeometry args={[0.27, 0.72, 0.3]} />
        <meshStandardMaterial color={METAL_DARK} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.3, -0.98, 0]}>
        <boxGeometry args={[0.27, 0.72, 0.3]} />
        <meshStandardMaterial color={METAL_DARK} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.35, 0.04]}>
        <boxGeometry args={[1.15, 0.06, 0.45]} />
        <meshStandardMaterial color="#120a2c" emissive="#5b00ff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   Preloader & Main Canvas Wrapper
   ═══════════════════════════════════════════════════════════ */

const MODEL_URLS: Partial<Record<number, string>> = {
  0: "/assets/strategy-chess-set/chess_set_1k.glb",
  1: "/assets/steampunk_camera.glb",
  2: "/assets/preproduction-camera/Camera_01_1k.glb",
};

export function preloadServicesScene(activeIndex = 0) {
  const modelUrl = MODEL_URLS[activeIndex];
  if (modelUrl) useGLTF.preload(modelUrl);
}

function ServicesSceneInner({
  active,
  activeIndex,
  reducedMotion,
  sceneLabel,
  details,
}: {
  active: boolean;
  activeIndex: number;
  reducedMotion: boolean;
  sceneLabel: string;
  details?: DetailItem[][];
}) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [activeIndex]);

  const serviceDetails = details?.[activeIndex];
  const positions = HOTSPOT_POSITIONS[activeIndex] ?? HOTSPOT_POSITIONS[0];
  const hotspotsData: HotspotData[] = (serviceDetails ?? []).map((item, idx) => ({
    position: positions[idx] ?? [0, 0, 0],
    title: item.title,
    tag: item.tag,
    desc: item.description,
  }));

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
        autoRotate={active && !reducedMotion}
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
        {activeIndex === 0 ? (
          <StrategyEntranceWrap key={`stage-0-${activeIndex}`}>
            <StrategyChessSet label={sceneLabel} />
          </StrategyEntranceWrap>
        ) : null}
        {activeIndex === 1 ? (
          <PreProdEntranceWrap key={`stage-1-${activeIndex}`}>
            <SteampunkCamera />
          </PreProdEntranceWrap>
        ) : null}
        {activeIndex === 2 ? (
          <ProdEntranceWrap key={`stage-2-${activeIndex}`}>
            <PreProductionCamera />
          </ProdEntranceWrap>
        ) : null}
        {activeIndex === 3 ? (
          <PostProdEntranceWrap key={`stage-3-${activeIndex}`}>
            <PostProductionRobot />
          </PostProdEntranceWrap>
        ) : null}
      </Center>

      {/* Render Localized 3D Hotspots */}
      {hotspotsData.map((hotspot, idx) => (
        <HotspotCard key={`${activeIndex}-hotspot-${idx}-${hotspot.title}`} data={hotspot} />
      ))}

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.3}
        blur={2.5}
        far={5}
        color="#000000"
        frames={40}
        resolution={256}
      />
    </>
  );
}

export function ServicesScene({
  active,
  activeIndex,
  reducedMotion,
  sceneLabel,
  details,
}: {
  active: boolean;
  activeIndex: number;
  reducedMotion: boolean;
  sceneLabel: string;
  details?: DetailItem[][];
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ServicesSceneInner
        active={active}
        activeIndex={activeIndex}
        reducedMotion={reducedMotion}
        sceneLabel={sceneLabel}
        details={details}
      />
    </Canvas>
  );
}
