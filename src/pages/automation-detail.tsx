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
    <div className="relative group my-4">
      {language && (
        <div className="absolute top-0 left-0 px-3 py-1 text-xs text-muted-foreground bg-muted/50 rounded-tl-lg rounded-br-lg font-mono">
          {language}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
        title="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-4 pt-8 rounded-lg overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
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
          <span className="text-5xl">{automation.icon}</span>
          <div>
            <h1 className="text-3xl font-bold mb-2">{automation.title}</h1>
            <p className="text-muted-foreground mb-3">{automation.description}</p>
            <div className="flex items-center gap-2">
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
      content: match[2].trim(),
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
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>'
      )
      // Ordered lists
      .replace(
        /^\d+\. (.*$)/gim,
        '<li class="ml-6 mb-2 list-decimal">$1</li>'
      )
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
