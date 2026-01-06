import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 group">
      <div className="rounded-lg overflow-hidden bg-zinc-900 ring-1 ring-white/10 text-left">
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

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 mb-4">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border text-foreground">
        {title}
      </h2>
      <div className="text-muted-foreground space-y-4">{children}</div>
    </section>
  );
}

export function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 mb-3">
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {children}
    </a>
  );
}

export function InternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
    >
      {children}
      <svg
        className="w-3 h-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </a>
  );
}

export function DownloadButton({ text, url }: { text: string; url: string }) {
  const ext = url.split(".").pop()?.toLowerCase();
  const openInBrowser = ["pdf", "txt"].includes(ext || "");
  const downloadAttr = openInBrowser ? {} : { download: "" };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      {...downloadAttr}
      className="inline-flex items-center gap-2 px-4 py-2 my-2 rounded-lg text-sm font-medium bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
    >
      {openInBrowser ? (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      )}
      {text}
    </a>
  );
}
