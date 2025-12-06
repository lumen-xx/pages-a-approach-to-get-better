export type Website = {
  type: "website" | "app" | "tool" | "other";
  title: string;
  description: string;
  url: string;
  tags: string[];
  tagIcon: React.ReactNode[];
};
