export type Dependency = {
  name: string;
  url?: string;
  install?: string;
};

export type Instruction = {
  slug: string;
  title: string;
  description: string;
  icon?: string | React.ReactNode;
  image?: string;
  category: "setup" | "config" | "tips" | "troubleshooting" | "other";
  difficulty: "beginner" | "intermediate" | "advanced";
  content: string;
  dependencies?: Dependency[];
};

