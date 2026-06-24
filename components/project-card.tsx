import type { Project } from "@/lib/site-data";
import { ExternalLinkIcon, GitHubIcon } from "@/components/icons";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-emerald-500/30 bg-black/35 p-6 backdrop-blur-sm transition hover:border-emerald-500/50 hover:bg-black/50">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-white">
          {project.title}
        </h3>

        <div className="flex shrink-0 items-center gap-2">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="rounded-full p-2 text-neutral-400 transition hover:bg-white/5 hover:text-emerald-400"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          ) : null}
          {project.href ? (
            <a
              href={project.href}
              target={project.href.startsWith("#") ? undefined : "_blank"}
              rel={
                project.href.startsWith("#")
                  ? undefined
                  : "noopener noreferrer"
              }
              aria-label={`Visit ${project.title}`}
              className="rounded-full p-2 text-neutral-400 transition hover:bg-white/5 hover:text-emerald-400"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-neutral-400">
        {project.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
