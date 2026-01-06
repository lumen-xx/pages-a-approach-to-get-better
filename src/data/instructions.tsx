import type { Instruction } from "../types/instruction-types";

export const instructions: Instruction[] = [
  {
    slug: "micro-editor",
    title: "Micro Terminal Editor",
    description: "Install and use Micro - a modern terminal text editor",
    icon: "📝",
    category: "setup",
    difficulty: "beginner",
    dependencies: [{ name: "Micro", install: "apt install micro" }],
  },
  {
    slug: "nginx-api-setup",
    title: "Nginx API Proxy Setup",
    description: "Set up Nginx as a reverse proxy for your API on Linux",
    icon: "🔧",
    category: "setup",
    difficulty: "intermediate",
    dependencies: [
      { name: "Nginx", install: "apt install nginx" },
      { name: "Certbot", install: "apt install certbot python3-certbot-nginx" },
      { name: "Micro", url: "/instructions/micro-editor" },
    ],
  },
];
