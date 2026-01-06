import type { Automation } from "../types/automation-types";
import * as PhosphorIcons from "@phosphor-icons/react";

export const automations: Automation[] = [
  {
    slug: "brew-install",
    title: "Brew Install",
    description: "How to install Homebrew",
    icon: "🥟",
    category: "terminal",
    difficulty: "beginner",
  },
  {
    slug: "convert-to-webp",
    title: "Convert to WebP in Finder",
    description: "How to convert an image to WebP",
    icon: <PhosphorIcons.Image className="w-9 h-9" />,
    category: "other",
    difficulty: "beginner",
    dependencies: [
      { name: "cwebp", install: "brew install cwebp" },
      { name: "Homebrew", url: "/automations/brew-install" },
    ],
  },
  {
    slug: "scale-image-by-multiply",
    title: "Scale Image by Multiply",
    description: "Scale an image by a multiply factor",
    icon: <PhosphorIcons.Image className="w-9 h-9" />,
    category: "other",
    difficulty: "beginner",
    dependencies: [
      { name: "cwebp", install: "brew install webp" },
      { name: "Homebrew", url: "/automations/brew-install" },
      { name: "Python 3", install: "brew install python3" },
    ],
  },
  {
    slug: "bulk-package-install",
    title: "Bulk Package Install",
    description: "One file to install all your packages",
    icon: "📦",
    category: "terminal",
    difficulty: "beginner",
    dependencies: [{ name: "Homebrew", url: "/automations/brew-install" }],
  },
  {
    slug: "ssh-port-forward",
    title: "SSH Port Forwarding",
    description: "Access your server's localhost in your Mac browser",
    icon: "🔗",
    category: "terminal",
    difficulty: "beginner",
  },
  {
    slug: "production-server",
    title: "Production Server Setup",
    description: "One config to set up a complete production server",
    icon: "🖥️",
    category: "terminal",
    difficulty: "intermediate",
  },
];
