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
      className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-foreground/20 transition-all"
    >
      {automation.image ? (
        <img
          src={automation.image}
          alt={automation.title}
          className="w-10 h-10 rounded-lg object-contain flex-shrink-0"
        />
      ) : (
        <span className="text-3xl flex-shrink-0">{automation.icon}</span>
      )}

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold">
          <Highlight text={automation.title} query={searchQuery} />
        </h3>
        <p className="text-sm text-muted-foreground truncate">
          <Highlight text={automation.description} query={searchQuery} />
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
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

      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform" />
    </a>
  );
}
