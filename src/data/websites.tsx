import * as LucideIcons from "lucide-react";
import * as PhosphorIcons from "@phosphor-icons/react";
import type { Website } from "@/types/website-types";

export const websites: Website[] = [
  {
    title: "Diagrams.net",
    type: "website",
    description:
      "Diagrams.net, gives you LTS vibes with a modern UI and a lot of extensive features. One of my favorite for fast simple and good looking diagrams.",
    url: "https://app.diagrams.net/",
    tags: [
      "Google Drive compatible",
      "Simple",
      "LTS-Feel",
      "Free",
      "Flowchart",
    ],
    tagIcon: [
      <PhosphorIcons.GoogleDriveLogo className="w-3 h-3" />,
      <LucideIcons.Circle className="w-3 h-3" />,
      <LucideIcons.Clock className="w-3 h-3" />,
      <LucideIcons.CheckCircle className="w-3 h-3" />,
      <LucideIcons.BarChartBig className="w-3 h-3" />,
    ],
  },
  {
    title: "Pairdrop",
    type: "tool",
    description:
      "Pairdrop is a tool that allows you to share files with your friends. It's a great tool for quick and easy file sharing.",
    url: "https://pairdrop.net/",
    tags: ["Simple", "Free", "File Sharing", "Collaboration"],
    tagIcon: [<LucideIcons.Share2 className="w-3 h-3" />],
  },
  {
    title: "Filebin",
    type: "website",
    description: "Filebin is a simple and free file sharing tool.",
    url: "https://filebin.net",
    tags: ["Simple", "Free", "File Sharing"],
    tagIcon: [<LucideIcons.FileText className="w-3 h-3" />],
  },
  {
    title: "Paint.js.org",
    type: "website",
    description:
      "Paint.js.org is a simple and free online paint tool. Ngl makes me nostalgic.",
    url: "https://paint.js.org",
    tags: ["Simple", "Free", "Paint"],
    tagIcon: [<LucideIcons.Palette className="w-3 h-3" />],
  },
  {
    title: "Piskel",
    type: "website",
    description:
      "Piskel is a free online editor for animated sprites and pixel art. It features a live preview of your animation and supports exporting to GIF, PNG and more.",
    url: "https://www.piskelapp.com/",
    tags: ["Pixel Art", "Animation", "Free", "Open Source", "Editor"],
    tagIcon: [
      <LucideIcons.Image className="w-3 h-3" />,
      <LucideIcons.Clock className="w-3 h-3" />,
      <LucideIcons.CheckCircle className="w-3 h-3" />,
      <LucideIcons.GitBranchIcon className="w-3 h-3" />,
      <LucideIcons.Edit3 className="w-3 h-3" />,
    ],
  },
];
