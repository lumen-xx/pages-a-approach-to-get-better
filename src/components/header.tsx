import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sun,
  Moon,
  ChevronDown,
  Globe,
  Monitor,
  Apple,
  Zap,
} from "lucide-react";
import logo from "../logo.svg";

function NavLink({
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
      className="text-sm hover:opacity-70 transition-opacity"
    >
      {children}
    </a>
  );
}

function DropdownItem({
  href,
  icon: Icon,
  title,
  description,
  onClose,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  onClose: () => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    onClose();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
    >
      <Icon className="w-5 h-5 mt-0.5 text-muted-foreground" />
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </a>
  );
}

function Dropdown({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity">
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2">
          <div className="bg-card border border-border rounded-xl shadow-lg p-2 min-w-[280px]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header({
  dark,
  setDark,
}: {
  dark: boolean;
  setDark: (dark: boolean) => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <NavLink href="/">
        <span className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-medium">pages</span>
        </span>
      </NavLink>
      <nav className="flex items-center gap-6">
        <Dropdown label="Projects">
          <DropdownItem
            href="/websites"
            icon={Globe}
            title="Websites"
            description="Curated web tools and resources"
            onClose={() => setDropdownOpen(false)}
          />
          <DropdownItem
            href="/macos-apps"
            icon={Monitor}
            title="macOS Apps"
            description="Best apps for your Mac"
            onClose={() => setDropdownOpen(false)}
          />
          <DropdownItem
            href="/macos"
            icon={Apple}
            title="macOS"
            description="Tips and configurations"
            onClose={() => setDropdownOpen(false)}
          />
          <DropdownItem
            href="/automations"
            icon={Zap}
            title="Automations"
            description="Workflows and scripts"
            onClose={() => setDropdownOpen(false)}
          />
        </Dropdown>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <Button variant="ghost" size="icon" onClick={() => setDark(!dark)}>
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </nav>
    </header>
  );
}
