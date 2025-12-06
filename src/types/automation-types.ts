export type Automation = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: "shortcuts" | "applescript" | "raycast" | "terminal" | "other";
  difficulty: "beginner" | "intermediate" | "advanced";
  content: string; // Markdown content for the article
};

