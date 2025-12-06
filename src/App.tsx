import { useState, useEffect, useMemo } from "react";
import "./index.css";
import { WebsiteCard } from "./components/website-card";
import { Button } from "./components/ui/button";
import { Sun, Moon } from "lucide-react";
import { websites } from "./data";
import { Input } from "./components/ui/input";

export function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const filteredWebsites = useMemo(() => {
    if (!search) return websites;
    const q = search.toLowerCase();
    return websites.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4"
      >
        {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>
      <div className="flex flex-col gap-4 w-xl max-w-2xl px-4">
        <Input
          placeholder="Search tags, descriptions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredWebsites.map((website) => (
          <WebsiteCard
            key={website.url}
            website={website}
            searchQuery={search}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
