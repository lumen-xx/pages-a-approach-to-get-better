import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Footer } from "../components/footer";
import { automations } from "../data/automations";

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
        {/* Header */}
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
        {/* Code */}
        <div className="px-4 py-4 overflow-x-auto">
          <pre className="text-[13px] leading-6">
            <code className="font-mono text-zinc-300">{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export function AutomationDetailPage({ slug }: { slug: string }) {
  const automation = automations.find((a) => a.slug === slug);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", "/automations");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  if (!automation) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="w-full max-w-3xl mx-auto px-4 pt-24 pb-20 flex-1">
          <h1 className="text-3xl font-bold mb-4">Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This automation doesn't exist.
          </p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Automations
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const content = parseContent(automation.content);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-3xl mx-auto px-4 pt-24 pb-20 flex-1">
        {/* Back button */}
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Automations
        </Button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          {automation.image ? (
            <img
              src={automation.image}
              alt={automation.title}
              className="w-14 h-14 rounded-xl object-contain"
            />
          ) : (
            <span className="text-5xl">{automation.icon}</span>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">{automation.title}</h1>
            <p className="text-muted-foreground mb-3">
              {automation.description}
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${
                  categoryColors[automation.category]
                }`}
              >
                {automation.category}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${
                  difficultyColors[automation.difficulty]
                }`}
              >
                {automation.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
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
    // Add text before code block
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index);
      if (textContent.trim()) {
        blocks.push({
          type: "text",
          content: parseMarkdown(textContent),
        });
      }
    }

    // Add code block
    blocks.push({
      type: "code",
      language: match[1] || undefined,
      content: (match[2] || "").trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
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
      // Headers
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-xl font-bold mt-8 mb-4 pb-2 border-b border-border">$1</h2>'
      )
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Inline code
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">$1</code>'
      )
      // Links - internal links get tag style, external links get regular style
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
        if (url.startsWith("/")) {
          // Internal deeplink - tag style
          return `<a href="${url}" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors">${text}<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></a>`;
        }
        // External link
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${text}</a>`;
      })
      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 list-decimal">$1</li>')
      // Unordered lists
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 list-disc">$1</li>')
      // Wrap consecutive list items
      .replace(
        /(<li class="ml-6 mb-2 list-(?:decimal|disc)">.*<\/li>\n?)+/g,
        '<ul class="my-4">$&</ul>'
      )
      // Paragraphs
      .split("\n\n")
      .map((para) => {
        if (para.trim() === "") return "";
        if (para.startsWith("<")) return para;
        return `<p class="mb-4 leading-relaxed">${para.trim()}</p>`;
      })
      .join("\n")
  );
}
