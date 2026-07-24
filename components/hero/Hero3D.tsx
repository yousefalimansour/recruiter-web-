"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero3D — flat burgundy wireframe icosahedron over a drifting node network
 * (gray points + thin burgundy links). Scroll drives a camera dolly; pointer
 * adds a gentle parallax. FLAT shading only — no bloom, no gradient.
 * Rendered client-side only (see Hero.tsx dynamic import, ssr:false).
 */

const BURGUNDY = "#94243f";
const BURGUNDY_LINK = "#6a1528";
const GRAY_POINT = "#a6a6ae";

function buildNetwork(count: number, radius: number, linkDist: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    // distribute in a rounded volume
    const v = new THREE.Vector3(
      (Math.random() * 2 - 1) * radius,
      (Math.random() * 2 - 1) * radius,
      (Math.random() * 2 - 1) * radius
    );
    if (v.length() > radius) v.setLength(radius * (0.4 + Math.random() * 0.6));
    pts.push(v);
  }

  const positions = new Float32Array(count * 3);
  pts.forEach((p, i) => {
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
  });

  const linePts: number[] = [];
  for (let i = 0; i < count; i++) {
    const a = pts[i]!;
    for (let j = i + 1; j < count; j++) {
      const b = pts[j]!;
      if (a.distanceTo(b) < linkDist) {
        linePts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
  }
  return { positions, linePositions: new Float32Array(linePts) };
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const { positions, linePositions } = useMemo(
    () => buildNetwork(150, 3.4, 1.35),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight || 1;
      scroll.current = Math.min(1, Math.max(0, window.scrollY / h));
    };
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useFrame((_state, delta) => {
    const d = Math.min(delta, 0.05);
    if (group.current) {
      group.current.rotation.y += d * 0.06;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * 0.18,
        0.04
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        pointer.current.x * 0.1,
        0.04
      );
    }
    // scroll-driven camera dolly + rise
    const targetZ = 6.2 - scroll.current * 2.6;
    const targetY = scroll.current * 1.4;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial
          color={BURGUNDY}
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh scale={0.55}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color={BURGUNDY} wireframe transparent opacity={0.4} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={GRAY_POINT}
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={BURGUNDY_LINK}
          transparent
          opacity={0.45}
        />
      </lineSegments>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Scene />
    </Canvas>
  );
}
