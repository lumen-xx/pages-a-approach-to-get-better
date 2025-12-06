import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Footer } from "../components/footer";
import { instructions } from "../data/instructions";

const categoryColors = {
  setup: "bg-blue-500/10 text-blue-500",
  config: "bg-purple-500/10 text-purple-500",
  tips: "bg-orange-500/10 text-orange-500",
  troubleshooting: "bg-red-500/10 text-red-500",
  other: "bg-zinc-500/10 text-zinc-500",
};

const difficultyColors = {
  beginner: "bg-emerald-500/10 text-emerald-500",
  intermediate: "bg-amber-500/10 text-amber-500",
  advanced: "bg-red-500/10 text-red-500",
};

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 group">
      <div className="rounded-lg overflow-hidden bg-zinc-900 ring-1 ring-white/10">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5">
          {language ? (
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              {language}
            </span>
          ) : (
            <span />
          )}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium transition-all ${
              copied
                ? "text-emerald-400 bg-emerald-400/10"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="px-4 py-4 overflow-x-auto">
          <pre className="text-[13px] leading-6">
            <code className="font-mono text-zinc-300">{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export function InstructionDetailPage({ slug }: { slug: string }) {
  const instruction = instructions.find((i) => i.slug === slug);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", "/instructions");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  if (!instruction) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="w-full max-w-3xl mx-auto px-4 pt-24 pb-20 flex-1">
          <h1 className="text-3xl font-bold mb-4">Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This instruction doesn't exist.
          </p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Instructions
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const content = parseContent(instruction.content);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-3xl mx-auto px-4 pt-16 pb-20 flex-1">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Instructions
        </Button>

        <div className="flex items-start gap-4 mb-8">
          {instruction.image ? (
            <img
              src={instruction.image}
              alt={instruction.title}
              className="w-14 h-14 rounded-xl object-contain"
            />
          ) : (
            <span className="text-5xl">{instruction.icon}</span>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">{instruction.title}</h1>
            <p className="text-muted-foreground mb-3">
              {instruction.description}
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${
                  categoryColors[instruction.category]
                }`}
              >
                {instruction.category}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${
                  difficultyColors[instruction.difficulty]
                }`}
              >
                {instruction.difficulty}
              </span>
            </div>
          </div>
        </div>

        <article className="space-y-4">
          {content.map((block, index) => {
            if (block.type === "code") {
              return (
                <CodeBlock
                  key={index}
                  code={block.content}
                  language={block.language}
                />
              );
            }
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            );
          })}
        </article>

        {instruction.dependencies && instruction.dependencies.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Dependencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {instruction.dependencies.map((dep, index) => (
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

type ContentBlock =
  | { type: "text"; content: string }
  | { type: "code"; content: string; language?: string };

function parseContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index);
      if (textContent.trim()) {
        blocks.push({
          type: "text",
          content: parseMarkdown(textContent),
        });
      }
    }

    blocks.push({
      type: "code",
      language: match[1] || undefined,
      content: (match[2] || "").trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex);
    if (textContent.trim()) {
      blocks.push({
        type: "text",
        content: parseMarkdown(textContent),
      });
    }
  }

  return blocks;
}

function parseMarkdown(content: string): string {
  return (
    content
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-xl font-bold mt-8 mb-4 pb-2 border-b border-border">$1</h2>'
      )
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">$1</code>'
      )
      .replace(/\{\{download:([^|]+)\|([^}]+)\}\}/g, (_, text, url) => {
        const ext = url.split(".").pop()?.toLowerCase();
        const openInBrowser = ["pdf", "txt"].includes(ext);
        const downloadAttr = openInBrowser ? "" : " download";
        const icon = openInBrowser
          ? '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>'
          : '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>';
        return `<a href="${url}" target="_blank"${downloadAttr} class="inline-flex items-center gap-2 px-4 py-2 my-2 rounded-lg text-sm font-medium bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors">${icon}${text}</a>`;
      })
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
        if (url.startsWith("/")) {
          return `<a href="${url}" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors">${text}<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></a>`;
        }
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${text}</a>`;
      })
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 list-decimal">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 list-disc">$1</li>')
      .replace(
        /(<li class="ml-6 mb-2 list-(?:decimal|disc)">.*<\/li>\n?)+/g,
        '<ul class="my-4">$&</ul>'
      )
      .split("\n\n")
      .map((para) => {
        if (para.trim() === "") return "";
        if (para.startsWith("<")) return para;
        return `<p class="mb-4 leading-relaxed">${para.trim()}</p>`;
      })
      .join("\n")
  );
}

