import { useState, useEffect } from "react";
import "./index.css";
import { WebsiteCard } from "./components/website-card";
import { Button } from "./components/ui/button";
import * as LucideIcons from "lucide-react";
import * as PhosphorIcons from "@phosphor-icons/react";

export function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4"
      >
        {dark ? (
          <LucideIcons.Sun className="w-5 h-5" />
        ) : (
          <LucideIcons.Moon className="w-5 h-5" />
        )}
      </Button>
      <div className="flex flex-col gap-4 w-xl max-w-2xl px-4">
        <WebsiteCard
          title="Diagrams.net"
          description="Diagrams.net, gives you LTS vibes with a modern UI and a lot of extensive features. One of my favorite for fast simple and good looking diagrams."
          url="https://app.diagrams.net/"
          tags={["Google Drive compatible", "Simple", "LTS-Feel", "Free"]}
          tagIcon={[
            <PhosphorIcons.GoogleDriveLogo className="w-3 h-3" />,
            <LucideIcons.Circle className="w-3 h-3" />,
            <LucideIcons.Clock className="w-3 h-3" />,
            <LucideIcons.CheckCircle className="w-3 h-3" />,
          ]}
        />
      </div>
    </div>
  );
}

export default App;
