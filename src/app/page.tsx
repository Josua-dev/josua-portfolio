import About from "@/components/About";
import AiSection from "@/components/AiSection";
import Contact from "@/components/Contact";
import { Cursor } from "@/components/Cursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Nav from "@/components/Nav";
import Path from "@/components/Path";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import TechEcosystem from "@/components/TechEcosystem";
import SmoothScroll from "@/lib/SmoothScroll";

/**
 * Home — one light-editorial page in reading order: who I am, what I build,
 * where it's heading, and how to reach me. Each section carries its own
 * real, on-GitHub work — nothing categorical or a skill bar is invented.
 */
export default function Home() {
  return (
    <div className="is-noise">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header>
        <Nav />
      </header>
      <main id="main" tabIndex={-1}>
        <Hero />
        <Manifesto />
        <ProjectsShowcase />
        <About />
        <Path />
        <TechEcosystem />
        <AiSection />
        <Contact />
      </main>
      <Footer />
      <Cursor />
      <SmoothScroll />
    </div>
  );
}