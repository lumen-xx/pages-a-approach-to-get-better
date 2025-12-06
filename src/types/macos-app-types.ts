export type MacOSApp = {
  name: string;
  description: string;
  icon: string;
  url: string;
  category: "productivity" | "developer" | "utility" | "media" | "other";
  price: "free" | "paid" | "freemium";
};

