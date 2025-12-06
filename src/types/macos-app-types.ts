export type MacOSApp = {
  name: string;
  description: string;
  image: string;
  url: string;
  category:
    | "productivity"
    | "developer"
    | "utility"
    | "media"
    | "other"
    | "security";
  price: "free" | "paid" | "freemium";
  loginItem?: boolean;
  configUrl?: string;
};
