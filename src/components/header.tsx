import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
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

export function Header({
  dark,
  setDark,
}: {
  dark: boolean;
  setDark: (dark: boolean) => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <NavLink href="/">
        <span className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-medium">pages</span>
        </span>
      </NavLink>
      <nav className="flex items-center gap-6">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <Button variant="ghost" size="icon" onClick={() => setDark(!dark)}>
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </nav>
    </header>
  );
}
