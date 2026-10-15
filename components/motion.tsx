"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { author } from "@/lib/content";
import { assetPath } from "@/lib/assets";
gsap.registerPlugin(ScrollTrigger);
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    const media = gsap.matchMedia();
    let intro: HTMLDivElement | null = null;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        let show = false;
        try {
          show = path === "/" && !sessionStorage.getItem("hs-intro");
          if (show) sessionStorage.setItem("hs-intro", "1");
        } catch {}
        if (show) {
          intro = document.createElement("div");
          intro.className = "logo-intro";
          intro.setAttribute("aria-hidden", "true");
          const mark = document.createElement("div");
          mark.className = "intro-mark";
          if (author.logo) {
            const img = document.createElement("img");
            img.src = assetPath(author.logo);
            img.alt = "";
            img.onerror = () => { mark.textContent = "HS"; };
            mark.appendChild(img);
          } else mark.textContent = "HS";
          const line = document.createElement("div");
          line.className = "intro-line";
          const name = document.createElement("p");
          name.textContent = "HOWARD SAFFOLD BOOKS";
          intro.appendChild(mark);
          intro.appendChild(line);
          intro.appendChild(name);
          document.body.appendChild(intro);
          gsap
            .timeline({ onComplete: () => intro?.remove() })
            .from(mark, { opacity: 0, scale: 0.94, duration: 0.5 })
            .from(line, { scaleX: 0, duration: 0.35 })
            .from(name, { opacity: 0, y: 8, duration: 0.35 })
            .to(intro, { opacity: 0, duration: 0.6, delay: 0.25 });
        }
        if (document.querySelector(".hero-reveal")) gsap.from(".hero-reveal", {
          y: 24,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          delay: show ? 1.8 : 0.08,
          clearProps: "all",
        });
        gsap.utils
          .toArray<HTMLElement>(".reveal")
          .forEach((el) =>
            gsap.from(el, {
              y: 24,
              opacity: 0,
              duration: 0.7,
              clearProps: "all",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            }),
          );
        if (document.querySelector(".hero"))
          gsap.to("[data-parallax]", {
            y: -22,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
      });
      const hero = document.querySelector<HTMLElement>(".hero");
      const move = (e: PointerEvent) => {
        if (e.pointerType === "mouse")
          gsap.to(".hero-glow", {
            x: (e.clientX / window.innerWidth - 0.5) * 22,
            y: (e.clientY / window.innerHeight - 0.5) * 15,
            duration: 1.5,
            overwrite: "auto",
          });
      };
      hero?.addEventListener("pointermove", move);
      return () => {
        context.revert();
        hero?.removeEventListener("pointermove", move);
        intro?.remove();
      };
    });
    const skip = () => intro?.remove();
    document.addEventListener("keydown", skip, { once: true });
    const timer = window.setTimeout(skip, 3200);
    return () => {
      media.revert();
      intro?.remove();
      window.clearTimeout(timer);
      document.removeEventListener("keydown", skip);
    };
  }, [path]);
  return null;
}
