import type { Automation } from "../types/automation-types";
import { ChevronRight } from "lucide-react";
import { Highlight } from "./highlight";

const categoryColors = {
  shortcuts: "bg-blue-500/10 text-blue-500",
  applescript: "bg-purple-500/10 text-purple-500",
  raycast: "bg-orange-500/10 text-orange-500",
  terminal: "bg-green-500/10 text-green-500",
  other: "bg-zinc-500/10 text-zinc-500",
};

const difficultyColors = {
  beginner: "bg-emerald-500/10 text-emerald-500",
  intermediate: "bg-amber-500/10 text-amber-500",
  advanced: "bg-red-500/10 text-red-500",
};

export function AutomationCard({
  automation,
  searchQuery = "",
}: {
  automation: Automation;
  searchQuery?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", `/automations/${automation.slug}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a
      href={`/automations/${automation.slug}`}
      onClick={handleClick}
      className="group relative flex flex-col p-5 rounded-2xl border border-border bg-card hover:bg-muted/50 hover:border-foreground/20 transition-all duration-200 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-3">
        {automation.image ? (
          <img
            src={automation.image}
            alt={automation.title}
            className="w-12 h-12 rounded-xl object-contain"
          />
        ) : (
          <span className="text-4xl">{automation.icon}</span>
        )}
        <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>

      <h3 className="font-semibold text-lg mb-1">
        <Highlight text={automation.title} query={searchQuery} />
      </h3>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        <Highlight text={automation.description} query={searchQuery} />
      </p>

      <div className="mt-auto flex items-center gap-2 flex-wrap">
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${categoryColors[automation.category]}`}
        >
          {automation.category}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${difficultyColors[automation.difficulty]}`}
        >
          {automation.difficulty}
        </span>
      </div>
    </a>
  );
}
