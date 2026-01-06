export type Dependency = {
  name: string;
  url?: string;
  install?: string;
};

export type Automation = {
  slug: string;
  title: string;
  description: string;
  icon?: string | React.ReactNode;
  image?: string;
  category: "shortcuts" | "applescript" | "raycast" | "terminal" | "other";
  difficulty: "beginner" | "intermediate" | "advanced";
  content?: string;
  dependencies?: Dependency[];
};
