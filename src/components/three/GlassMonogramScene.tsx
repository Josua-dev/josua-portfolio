"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/**
 * The hero's single glass monogram — an abstract solid-form mark rendered in
 * translucent "glass". Two design rules keep it premium and honest:
 *   · ONE object. No particle fields, no wireframes, no orbiting extras —
 *     just a restrained form that reads as a mark, not a tech demo.
 *   · Deep pine tint (the accent), not neon. On ivory paper it should look
 *     like etched glass catching light, not a VFX reel.
 *
 * The mesh is transmission-refractive (drei) so it genuinely shows the warm
 * canvas behind it; a soft rim light carves the silhouette against the paper.
 *
 * Parent decides whether this component ever mounts: it is rendered only when
 * the user has a fine pointer AND no reduced-motion preference (see
 * GlassMonogram.tsx). On touch / reduced-motion a plain static mark is shown.
 */

const ACCENT = "#16584c";

function GlassMark() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  // Slow, subtle idle drift + faint pointer parallax. Scaled to the hero so
  // the motion conveys "alive" without ever stealing attention from the type.
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.12) * 0.35 + pointer.x * 0.18;
      group.current.rotation.x = Math.cos(t * 0.09) * 0.18 - pointer.y * 0.12;
    }
  });

  return (
    <group ref={group} rotation={[0, 0.3, 0]}>
      <mesh ref={mesh} scale={1}>
        <torusKnotGeometry args={[0.86, 0.3, 220, 32]} />
        <MeshTransmissionMaterial
          backside={false}
          samples={4}
          resolution={512}
          transmission={1}
          thickness={0.9}
          roughness={0.12}
          ior={1.5}
          chromaticAberration={0.03}
          anisotropicBlur={0.2}
          distortion={0.12}
          distortionScale={0.4}
          temporalDistortion={0.04}
          color={ACCENT}
          attenuationColor={ACCENT}
          attenuationDistance={1.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Warm fill so the near side of the glass reads on ivory, not black. */}
      <hemisphereLight args={["#ffffff", "#f4f0e7", 1.1]} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <directionalLight position={[-6, -3, 4]} intensity={0.6} color="#d9cdb6" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#ffffff" />
    </group>
  );
}

export default function GlassMonogramScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.4], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.3}>
        <GlassMark />
      </Float>
    </Canvas>
  );
}