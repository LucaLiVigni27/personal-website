import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import type { SocialLink } from "@/lib/site-data";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
} as const;

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
  iconClassName?: string;
};

export function SocialLinks({
  links,
  className = "",
  iconClassName = "h-5 w-5",
}: SocialLinksProps) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => {
        const Icon = iconMap[link.icon];

        return (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.icon === "email" ? undefined : "_blank"}
              rel={link.icon === "email" ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white/5 hover:text-emerald-400"
            >
              <Icon className={iconClassName} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
