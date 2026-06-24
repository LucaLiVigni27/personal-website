"use client";

import { useEffect, useState } from "react";
import { navLinks, site, socialLinks } from "@/lib/site-data";
import { SocialLinks } from "@/components/social-links";

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const syncActiveSection = () => {
      const offset = 180;
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;

      setActiveSection((current) => {
        let next = current;

        if (window.scrollY < 280) {
          next = "top";
        } else if (nearBottom) {
          next = navLinks[navLinks.length - 1]?.sectionId ?? "contact";
        } else {
          next = navLinks[0]?.sectionId ?? "top";

          for (const link of navLinks) {
            const element = document.getElementById(link.sectionId);
            if (!element) {
              continue;
            }

            const top = element.getBoundingClientRect().top - offset;
            if (top <= 0) {
              next = link.sectionId;
            }
          }
        }

        return next === current ? current : next;
      });
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-500/30 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:px-8 lg:px-10">
        <a
          href="#top"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white transition hover:text-emerald-400"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.45)]" />
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden justify-self-center md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative px-3 py-2 text-sm transition lg:px-4 ${
                      isActive
                        ? "text-emerald-400"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive ? (
                      <span className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-emerald-400 lg:inset-x-4" />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <SocialLinks
          links={socialLinks}
          className="justify-self-end"
          iconClassName="h-4 w-4"
        />
      </div>

      <nav
        aria-label="Mobile primary"
        className="flex gap-1 overflow-x-auto border-t border-emerald-500/30 px-4 py-2 md:hidden"
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.sectionId;

          return (
            <a
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
