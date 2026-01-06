import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Footer } from "./footer";

interface ContentLayoutProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  children: React.ReactNode;
  backUrl: string;
  backLabel: string;
  dependencies?: Array<{ name: string; url?: string; install?: string }>;
}

const categoryColors: Record<string, string> = {
  setup: "bg-blue-500/10 text-blue-500",
  config: "bg-purple-500/10 text-purple-500",
  tips: "bg-orange-500/10 text-orange-500",
  troubleshooting: "bg-red-500/10 text-red-500",
  terminal: "bg-zinc-500/10 text-zinc-500",
  other: "bg-zinc-500/10 text-zinc-500",
};

const difficultyColors = {
  beginner: "bg-emerald-500/10 text-emerald-500",
  intermediate: "bg-amber-500/10 text-amber-500",
  advanced: "bg-red-500/10 text-red-500",
};

export function ContentLayout({
  title,
  description,
  icon,
  category,
  difficulty,
  children,
  backUrl,
  backLabel,
  dependencies,
}: ContentLayoutProps) {
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", backUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-3xl mx-auto px-4 pt-16 pb-20 flex-1">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {backLabel}
        </Button>

        <div className="flex items-start gap-4 mb-8">
          <span className="text-5xl">{icon}</span>
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground mb-3">{description}</p>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${
                  categoryColors[category.toLowerCase()] || categoryColors.other
                }`}
              >
                {category}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${difficultyColors[difficulty]}`}
              >
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none">
          {children}
        </article>

        {dependencies && dependencies.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Dependencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {dependencies.map((dep, index) => (
                <div key={index} className="group relative">
                  {dep.url ? (
                    <a
                      href={dep.url}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {dep.name}
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted">
                      <span className="w-2 h-2 rounded-full bg-zinc-500" />
                      {dep.name}
                      {dep.install && (
                        <code className="ml-1 text-xs text-muted-foreground font-mono">
                          {dep.install}
                        </code>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
