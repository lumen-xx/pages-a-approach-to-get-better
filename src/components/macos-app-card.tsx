import type { MacOSApp } from "../types/macos-app-types";
import { ExternalLink, Power, Download } from "lucide-react";
import { Highlight } from "./highlight";

const priceColors = {
  free: "bg-emerald-500/10 text-emerald-500",
  paid: "bg-amber-500/10 text-amber-500",
  freemium: "bg-blue-500/10 text-blue-500",
};

const categoryColors = {
  productivity: "bg-purple-500/10 text-purple-500",
  developer: "bg-orange-500/10 text-orange-500",
  utility: "bg-cyan-500/10 text-cyan-500",
  media: "bg-pink-500/10 text-pink-500",
  other: "bg-zinc-500/10 text-zinc-500",
  security: "bg-red-500/10 text-red-500",
};

export function MacOSAppCard({
  app,
  searchQuery = "",
}: {
  app: MacOSApp;
  searchQuery?: string;
}) {
  const handleConfigDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (app.configUrl) {
      window.open(app.configUrl, "_blank");
    }
  };

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col p-5 rounded-2xl border border-border bg-card hover:bg-muted/50 hover:border-foreground/20 transition-all duration-200 hover:-translate-y-1"
    >
      {/* Login Item Indicator */}
      {app.loginItem && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium"
          title="Starts at login"
        >
          <Power className="w-3 h-3" />
          <span>Login Item</span>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <img
          src={app.image}
          alt={app.name}
          className="w-12 h-12 rounded-xl object-contain"
        />
        {!app.loginItem && (
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      <h3 className="font-semibold text-lg mb-1">
        <Highlight text={app.name} query={searchQuery} />
      </h3>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        <Highlight text={app.description} query={searchQuery} />
      </p>

      <div className="mt-auto flex items-center gap-2 flex-wrap">
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${categoryColors[app.category]}`}
        >
          {app.category}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${priceColors[app.price]}`}
        >
          {app.price}
        </span>
        {app.configUrl && (
          <button
            onClick={handleConfigDownload}
            className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-md bg-foreground/10 hover:bg-foreground/20 text-xs font-medium transition-colors"
            title="Download config"
          >
            <Download className="w-3 h-3" />
            Config
          </button>
        )}
      </div>
    </a>
  );
}
