import type { Automation } from "../types/automation-types";

export const automations: Automation[] = [
  {
    slug: "bun-server-setup",
    title: "Bun Server Init File",
    description: "How to set up a basic Bun server with routes and HMR",
    icon: "🥟",
    category: "terminal",
    difficulty: "intermediate",
    content: `
## Basic Server Structure

The server is created using \`Bun.serve()\` which provides a simple but powerful API for creating web servers.

\`\`\`curl
curl -fsSL https://bun.com/install | bash
\`\`\`
    `,
  },
  {},
];
