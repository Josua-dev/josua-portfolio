"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

/**
 * Glue between the hero and the 3D glass monogram.
 *
 * The 3D canvas is expensive, so it only mounts when the visitor can actually
 * experience it: a fine pointer (not touch) AND no reduced-motion preference.
 * Everyone else — touch, low-motion, no-JS — gets the same mark as an inert
 * static element, so the hero never depends on WebGL.
 *
 * The scene is loaded via next/dynamic (code-splitting). Because the dynamic
 * component only renders after `canRender` is true, the WebGL chunk isn't even
 * fetched on touch or reduced-motion devices.
 */

/** Hydration detector: false on the server, true once mounted on the client. */
function subscribeEmpty(): () => void {
  return () => {};
}

function subscribeMotion(callback: () => void): () => void {
  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mqCoarse = window.matchMedia("(pointer: coarse)");
  const onChange = () => callback();
  mqReduced.addEventListener("change", onChange);
  mqCoarse.addEventListener("change", onChange);
  return () => {
    mqReduced.removeEventListener("change", onChange);
    mqCoarse.removeEventListener("change", onChange);
  };
}

function getCanRender(): boolean {
  if (typeof window === "undefined") return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return !reduced && !coarse;
}

/** Inert editorial mark — the no-motion / touch turn the same monogram. */
function StaticMark({ large }: { large: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={
        large
          ? "flex h-[54vmin] w-[54vmin] select-none items-center justify-center md:h-[42vmin] md:w-[42vmin]"
          : "flex h-24 w-24 select-none items-center justify-center"
      }
    >
      <span className="accent-serif" style={{ fontSize: large ? "1.1em" : "1.2em", lineHeight: 1 }}>
        J
      </span>
    </div>
  );
}

/** Code-split scene: its module (and the WebGL context) loads on demand. */
const GlassMonogramScene = dynamic(
  () => import("./GlassMonogramScene"),
  { ssr: false, loading: () => null }
);

export default function GlassMonogram({ large = true }: { large?: boolean }) {
  const mounted = useSyncExternalStore(subscribeEmpty, () => true, () => false);
  const canRender = useSyncExternalStore(subscribeMotion, getCanRender, () => false);

  if (!mounted || !canRender) return <StaticMark large={large} />;

  const size = large
    ? "h-[54vmin] w-[54vmin] md:h-[42vmin] md:w-[42vmin]"
    : "h-28 w-28";
  return (
    <div className={`${size} relative`} aria-hidden="true">
      <GlassMonogramScene />
    </div>
  );
}