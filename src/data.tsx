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
];
