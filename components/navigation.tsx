"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, BookOpen } from "lucide-react";
import { navigation, author, books } from "@/lib/content";
export function Brand() {
  return (
    <span className="brand">
      {author.logo ? (
        <Image
          src={author.logo}
          alt="Howard Saffold Books"
          width={44}
          height={44}
        />
      ) : (
        <span className="brand-icon">
          <BookOpen size={25} strokeWidth={1} />
        </span>
      )}
      <span>
        HOWARD SAFFOLD<small>BOOKS & LEGACY</small>
      </span>
    </span>
  );
}
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className={`header ${path === "/" ? "home-header" : ""}`}>
      <div className="container header-inner">
        <Link
          aria-label="Howard Saffold Books home"
          href="/"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </Link>
        <nav
          id="primary-nav"
          aria-label="Main navigation"
          className={open ? "nav is-open" : "nav"}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                (item.href === "/" ? path === "/" : path.startsWith(item.href))
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className="header-purchase"
          href={books[0].amazon}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the Book <ArrowUpRight size={16} />
        </a>
        <button
          ref={trigger}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top reveal">
          <div>
            <Link href="/" aria-label="Howard Saffold Books home">
              <Brand />
            </Link>
            <p>
              A life of service. A voice for justice.
              <br />
              Stories that matter.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="footer-note">
            <span>ROOTED IN CHICAGO</span>
            <p>
              Words that carry
              <br />a lifetime of perspective.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Howard Saffold Books. All rights
            reserved.
          </span>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
