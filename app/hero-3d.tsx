"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, MeshReflectorMaterial, Html } from "@react-three/drei";
import { motion, useScroll, useMotionValue, useMotionValueEvent, useReducedMotion, useInView, type MotionValue } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

export type HeroCopy = {
  eyebrow: string;
  words: [string, string];
  headline: ReactNode;
  sub: string;
  rating: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  hint: string;
  callouts: [string, string, string];
  colors: [string, string, string];
  loading: string;
};

const PAINTS = ["#d9dee5", "#1f3b63", "#15171b"];
const MODEL = "/models/ferrari.glb";
const TAU = Math.PI * 2;

function Car({ progress, paint, mouse, mobile }: { progress: MotionValue<number>; paint: number; mouse: React.MutableRefObject<{ x: number; y: number }>; mobile: boolean }) {
  const { scene } = useGLTF(MODEL, "/draco/");
  const group = useRef<THREE.Group>(null);
  const bodyMat = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const targetColor = useMemo(() => new THREE.Color(PAINTS[paint]), [paint]);

  const prepared = useMemo(() => {
    const car = scene.clone(true);
    const box = new THREE.Box3().setFromObject(car);
    const size = box.getSize(new THREE.Vector3());
    const s = 4.4 / Math.max(size.x, size.z);
    car.scale.setScalar(s);
    const b2 = new THREE.Box3().setFromObject(car);
    car.position.set(-(b2.min.x + b2.max.x) / 2, -b2.min.y, -(b2.min.z + b2.max.z) / 2);
    car.traverse(o => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const mat = m.material as THREE.MeshStandardMaterial;
      const n = (mat.name || "").toLowerCase();
      if (n === "body_color") {
        const p = new THREE.MeshPhysicalMaterial({ color: PAINTS[0], metalness: 0.75, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.4 });
        m.material = p; bodyMat.current = p;
      } else if (/glass/.test(n)) {
        m.material = new THREE.MeshPhysicalMaterial({ color: "#9fb4c8", metalness: 0.1, roughness: 0.05, transmission: 0.6, transparent: true, opacity: 0.75, envMapIntensity: 1.2 });
      } else if (/chrome|metal_gray/.test(n)) {
        mat.metalness = 1; mat.roughness = 0.18; mat.envMapIntensity = 1.5;
      } else if (/tires/.test(n)) {
        mat.roughness = 0.9;
      }
      m.castShadow = true;
    });
    return car;
  }, [scene]);

  useFrame((state, dt) => {
    const g = group.current; if (!g) return;
    const p = progress.get();
    const idle = state.clock.elapsedTime * 0.12 * (1 - Math.min(p * 3, 1));
    const targetRot = 0.85 + p * TAU + idle + mouse.current.x * 0.08;
    g.rotation.y += (targetRot - g.rotation.y) * Math.min(1, dt * 6);
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.015;
    const cam = state.camera as THREE.PerspectiveCamera;
    const fov = mobile ? 40 : 30;
    if (cam.fov !== fov) { cam.fov = fov; cam.updateProjectionMatrix(); }
    const z = mobile ? 9.4 - p * 0.8 : 7.5 - p * 0.9;
    const y = 1.55 - p * 0.2 + mouse.current.y * -0.12;
    cam.position.x += ((mobile ? 0 : 0.6) + mouse.current.x * 0.35 - cam.position.x) * Math.min(1, dt * 3);
    cam.position.y += (y - cam.position.y) * Math.min(1, dt * 3);
    cam.position.z += (z - cam.position.z) * Math.min(1, dt * 3);
    cam.lookAt(0, 0.55 - p * (mobile ? 0.55 : 0.5), 0);
    if (bodyMat.current) bodyMat.current.color.lerp(targetColor, Math.min(1, dt * 4));
  });

  return <group ref={group}><primitive object={prepared} /></group>;
}

function Stage({ progress, paint, mouse, mobile }: { progress: MotionValue<number>; paint: number; mouse: React.MutableRefObject<{ x: number; y: number }>; mobile: boolean }) {
  const { gl } = useThree();
  useEffect(() => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.05; }, [gl]);
  return (
    <>
      <fog attach="fog" args={["#0b1420", 9, 18]} />
      <Environment preset="city" environmentIntensity={0.9} />
      <spotLight position={[4, 7, 4]} angle={0.55} penumbra={0.6} intensity={120} color="#ffffff" castShadow shadow-mapSize={1024} />
      <spotLight position={[-6, 4, -3]} angle={0.7} penumbra={0.7} intensity={80} color="#5ec8ff" />
      <spotLight position={[0, 5, -7]} angle={0.6} penumbra={0.8} intensity={50} color="#8fb3ff" />
      <ambientLight intensity={0.15} color="#8fb3d9" />
      <Suspense fallback={<Html center><span className="h3d-loading" /></Html>}>
        <Car progress={progress} paint={paint} mouse={mouse} mobile={mobile} />
      </Suspense>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <circleGeometry args={[9, 72]} />
        {mobile
          ? <meshStandardMaterial color="#0d1724" roughness={0.6} metalness={0.4} />
          : <MeshReflectorMaterial blur={[420, 110]} resolution={768} mixBlur={1} mixStrength={14} roughness={0.85} depthScale={1.1} minDepthThreshold={0.4} maxDepthThreshold={1.3} color="#0b1522" metalness={0.5} mirror={0.4} />}
      </mesh>
      <ContactShadows position={[0, 0.01, 0]} opacity={0.75} scale={12} blur={2.4} far={4} color="#000814" />
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.05, 3.12, 96]} />
        <meshBasicMaterial color="#5ec8ff" transparent opacity={0.35} />
      </mesh>
    </>
  );
}

function supportsWebGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

export function Hero3D({ c }: { c: HeroCopy }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [ok, setOk] = useState<boolean | null>(null);
  const [mobile, setMobile] = useState(false);
  const [paint, setPaint] = useState(0);
  const [manual, setManual] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const inView = useInView(ref, { margin: "20% 0px 20% 0px" });

  useEffect(() => {
    setOk(supportsWebGL());
    const u = () => setMobile(window.innerWidth < 760);
    u(); window.addEventListener("resize", u);
    return () => window.removeEventListener("resize", u);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => { mouse.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 }; };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const still = useMotionValue(0.35);
  const progress = reduce ? still : scrollYProgress;
  const [p, setP] = useState(0);
  useMotionValueEvent(progress, "change", v => setP(v));
  useEffect(() => { if (reduce) setP(0.35); }, [reduce]);

  useEffect(() => {
    if (manual) return;
    setPaint(p < 0.36 ? 0 : p < 0.7 ? 1 : 2);
  }, [p, manual]);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));
  const ramp = (from: number, to: number) => (p - from) / (to - from);
  const bump = (a: number, b: number, c: number, d: number) => (p < a || p > d ? 0 : p < b ? (p - a) / (b - a) : p > c ? (d - p) / (d - c) : 1);
  const wordsShift = lerp(0, mobile ? 60 : 160, ramp(0, 0.6));
  const wordsOp = p < 0.2 ? 0.9 : p < 0.75 ? lerp(0.9, 0.35, ramp(0.2, 0.75)) : lerp(0.35, 0, ramp(0.75, 0.9));
  const hintOp = lerp(1, 0, ramp(0, 0.15));
  const contentOp = lerp(0, 1, ramp(0.78, 0.95));
  const contentY = lerp(30, 0, ramp(0.78, 0.95));
  const callouts = [bump(0.14, 0.22, 0.36, 0.42), bump(0.42, 0.5, 0.64, 0.7), bump(0.7, 0.78, 0.9, 0.96)];

  return (
    <section ref={ref} className="h3d" aria-label="LUCKY RENT">
      <div className="h3d-stage">
        <div className="h3d-glow" aria-hidden />
        {ok === false ? (
          <div className="h3d-fallback" style={{ backgroundImage: "url(/images/ig-forester.webp)" }} />
        ) : (
          <Canvas className="h3d-canvas" frameloop={inView ? "always" : "never"} dpr={mobile ? 1 : [1, 1.5]} camera={{ fov: 30, position: [0.6, 1.55, 7.5], near: 0.1, far: 60 }} gl={{ antialias: true, powerPreference: "high-performance", alpha: true }} shadows>
            <Stage progress={progress} paint={paint} mouse={mouse} mobile={mobile} />
          </Canvas>
        )}

        <div className="h3d-words" style={{ opacity: wordsOp }} aria-hidden>
          <span style={{ transform: `translateX(${-wordsShift}px)` }}>{c.words[0]}</span>
          <span style={{ transform: `translateX(${wordsShift}px)` }}>{c.words[1]}</span>
        </div>

        <div className="h3d-top">
          <p className="eyebrow light">{c.eyebrow}</p>
        </div>

        {c.callouts.map((label, i) => (
          <div key={label} className={`h3d-callout h3d-callout-${i}`} style={{ opacity: callouts[i] }} aria-hidden>
            <span className="h3d-callout-line" /><span className="h3d-callout-dot" />
            <b>{label}</b>
          </div>
        ))}

        <div className="h3d-paints" role="group" aria-label="Colour" style={mobile ? { opacity: 1 - contentOp, pointerEvents: contentOp > 0.5 ? "none" : "auto" } : undefined}>
          {PAINTS.map((pc, i) => (
            <button key={pc} className={`h3d-paint${paint === i ? " active" : ""}`} style={{ background: pc }} onClick={() => { setManual(true); setPaint(i); }} aria-label={c.colors[i]} title={c.colors[i]} />
          ))}
        </div>

        <div className="h3d-content" style={{ opacity: contentOp, transform: `translateY(${contentY}px)`, pointerEvents: contentOp > 0.5 ? "auto" : "none" }}>
          <h1 className="h3d-h1">{c.headline}</h1>
          <p className="h3d-sub">{c.sub}</p>
          <p className="h3d-rating"><span>★★★★★</span>{c.rating}</p>
          <div className="h3d-actions">
            <a className="btn btn-accent" href={c.primary.href}>{c.primary.label}</a>
            <a className="btn btn-ghost" href={c.secondary.href} target="_blank" rel="noopener noreferrer">{c.secondary.label}</a>
          </div>
        </div>

        <div className="h3d-hint" style={{ opacity: hintOp }} aria-hidden>
          <span>{c.hint}</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>↓</motion.span>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload(MODEL, "/draco/");
