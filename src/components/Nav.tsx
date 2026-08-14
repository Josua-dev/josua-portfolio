"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";

const WORK_ID = "work";
const ABOUT_ID = "about";
const STACK_ID = "stack";
const AI_ID = "ai";
const CONTACT_ID = "contact";

/** Desktop / mobile nav destinations. All routes exist on the page; "Resume"
 *  is deliberately omitted because no real artifact exists for Josua (the
 *  do-not-invent rule). */
const LINKS = [
  { id: "home", label: "Home", href: "/#hero-section" },
  { id: WORK_ID, label: "Work", href: "/#" + WORK_ID },
  { id: ABOUT_ID, label: "About", href: "/#" + ABOUT_ID },
  { id: STACK_ID, label: "Stack", href: "/#" + STACK_ID },
  { id: CONTACT_ID, label: "Contact", href: `mailto:${site.contact.email}` },
];

/** Serif wordmark on the ink of the page — the quiet brand mark. */
function Logo({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Link
      href="/#hero-section"
      onClick={onNavigate}
      aria-label="Home"
      className="flex h-12 items-center"
    >
      <span className="accent-serif text-[30px] leading-none">{site.name}</span>
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Condense the bar once the page is scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section spy over the section ids that exist on the page.
  useEffect(() => {
    const roots = [WORK_ID, ABOUT_ID, STACK_ID, AI_ID]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!roots.length) return;
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
        },
        { rootMargin: "-38% 0px -55% 0px" }
      );
      roots.forEach((el) => observer?.observe(el));
    } catch {
      /* leave active empty; nav links still navigate */
    }
    return () => observer?.disconnect();
  }, []);

  // Mobile overlay: Escape closes, focus is contained within the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onFocus = (e: FocusEvent) => {
      const menu = document.getElementById("mobile-menu");
      const target = e.target as Node | null;
      if (menu && target && !menu.contains(target)) {
        (document.getElementById("nav-toggle") as HTMLElement | null)?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  // Body scroll lock while open; focus the first menu link on open and
  // restore focus to the toggle on close (ARIA APG dialog pattern).
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      (document.querySelector<HTMLElement>("#mobile-menu a") as HTMLElement | null)?.focus();
      return () => {
        document.body.style.overflow = "";
        (document.getElementById("nav-toggle") as HTMLElement | null)?.focus();
      };
    }
  }, [open]);

  const close = () => setOpen(false);

  const desktopLinkCls = (id: string) =>
    `nav-link ${active === id ? "is-active" : ""}`;

  return (
    <>
      <div className={`nav px-6 md:px-16 ${scrolled ? "nav-condensed" : ""}`}>
        {/* Mobile bar: logo + hamburger */}
        <nav aria-label="Primary" className="flex w-full items-center justify-between pt-4 md:hidden">
          <Logo onNavigate={close} />
          <button
            id="nav-toggle"
            type="button"
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        {/* Mobile overlay */}
        <div
          id="mobile-menu"
          className={`js-mobile-menu ${open ? "open" : ""}`}
          aria-hidden={!open}
          inert={!open}
        >
          <div className="flex items-center justify-between">
            <Logo onNavigate={close} />
            <div className="nav-rule mx-5" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-accent-line hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center pb-20">
            {LINKS.map((l) =>
              l.href.startsWith("/") ? (
                <Link key={l.id} href={l.href} aria-current={active === l.id ? "true" : undefined} onClick={close}>
                  {l.label}
                  <small>{l.id === "home" ? "01" : l.id === "work" ? "02" : l.id === "about" ? "03" : l.id === "stack" ? "04" : "05"}</small>
                </Link>
              ) : (
                <a key={l.id} href={l.href} onClick={close}>
                  {l.label}
                  <small>05</small>
                </a>
              )
            )}
          </nav>
        </div>

        {/* Desktop bar: logo + divider + links */}
        <nav aria-label="Primary" className="hidden w-full items-center justify-between pt-5 md:flex">
          <Logo onNavigate={close} />
          <div className="nav-rule mx-12" />
          <div className="flex items-center gap-2">
            {LINKS.map((l) =>
              l.href.startsWith("/") ? (
                <Link key={l.id} href={l.href} aria-current={active === l.id ? "true" : undefined} className={desktopLinkCls(l.id)} onClick={close}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.id} href={l.href} aria-current={active === l.id ? "true" : undefined} className={desktopLinkCls(l.id)} onClick={close}>
                  {l.label}
                </a>
              )
            )}
          </div>
        </nav>
      </div>

      {/* Scroll-top button */}
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`back-to-top ${scrolled ? "visible" : ""}`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* No-JS mobile fallback */}
      <div className="no-js-mobile-links">
        {LINKS.map((l) =>
          l.href.startsWith("/") ? (
            <Link key={l.id} href={l.href}>{l.label}</Link>
          ) : (
            <a key={l.id} href={l.href}>{l.label}</a>
          )
        )}
      </div>
    </>
  );
}