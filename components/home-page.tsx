"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { ScrollIndicator } from "@/components/scroll-indicator";
import {
  ScrollReveal,
  staggerContainer,
  staggerItem,
} from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { SiteHeader } from "@/components/site-header";
import { StarfieldBackground } from "@/components/starfield-background";
import { SocialLinks } from "@/components/social-links";
import {
  about,
  contact,
  projects,
  site,
  skills,
  socialLinks,
} from "@/lib/site-data";

const sectionClassName =
  "scroll-mt-28 border-t border-emerald-500/30 px-5 py-24 sm:px-8 lg:px-10";

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <StarfieldBackground />
      <div className="relative z-10">
        <SiteHeader />

        <div className="relative">
          <HeroSection />
          <ScrollIndicator />
        </div>

        <SectionReveal id="projects" className={sectionClassName}>
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionHeading title="Projects" eyebrow="Selected Work" />
            </ScrollReveal>

            {projects.length > 0 ? (
              <motion.div
                className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.12, margin: "-60px" }}
                variants={staggerContainer}
              >
                {projects.map((project) => (
                  <motion.div key={project.title} variants={staggerItem}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </div>
        </SectionReveal>

        <SectionReveal id="skills" className={sectionClassName}>
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionHeading title="Skills" eyebrow="What I Use" />
            </ScrollReveal>

            <motion.div
              className="mt-12 grid gap-5 md:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.12, margin: "-60px" }}
              variants={staggerContainer}
            >
              {skills.map((skill) => (
                <motion.article
                  key={skill.title}
                  variants={staggerItem}
                  className="glass-panel rounded-2xl p-6 transition hover:border-emerald-500/50 hover:bg-white/[0.05]"
                >
                  <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-400">
                    {skill.description}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </SectionReveal>

        <SectionReveal id="about" className={sectionClassName}>
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionHeading title={about.heading} eyebrow="Get to Know Me" />
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-neutral-400 sm:text-lg">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </SectionReveal>

        <SectionReveal id="contact" className={`${sectionClassName} min-h-[50vh]`}>
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionHeading title={contact.heading} eyebrow="Let's Connect" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mt-8 flex max-w-3xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <p className="text-base leading-8 text-neutral-400 sm:text-lg">
                  {contact.description}
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-lg font-medium text-white transition hover:text-emerald-400"
                    >
                      {site.email}
                    </a>
                    <a
                      href={`mailto:${site.schoolEmail}`}
                      className="text-lg font-medium text-white transition hover:text-emerald-400"
                    >
                      {site.schoolEmail}
                    </a>
                  </div>
                  <SocialLinks links={socialLinks} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </SectionReveal>

        <footer className="border-t border-emerald-500/30 px-5 py-8 sm:px-8 lg:px-10">
          <p className="mx-auto max-w-7xl text-sm text-neutral-400">
            © {new Date().getFullYear()} {site.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
