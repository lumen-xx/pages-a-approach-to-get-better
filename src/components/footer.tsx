import { Coffee } from "lucide-react";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 py-4 px-6 border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
        <span>© 2024 Pages. An approach to get better.</span>
        <div className="flex items-center gap-6">
          <NavLink href="/about">
            <span className="hover:text-foreground transition-colors">
              About
            </span>
          </NavLink>
          <a
            href="https://buymeacoffee.com/luuuuumen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFDD00] text-black font-medium text-sm hover:bg-[#FFDD00]/90 transition-colors"
          >
            <Coffee className="w-4 h-4" />
            Buy me a coffee
          </a>
        </div>
      </div>
    </footer>
  );
}
