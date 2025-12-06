import { useMemo, useState } from "react";
import { WebsiteCard } from "../components/website-card";
import { Input } from "../components/ui/input";
import { websites } from "../data";

export function HomePage() {
  const [search, setSearch] = useState("");

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
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto px-4 pt-24 pb-8">
      <Input
        placeholder="Search tags, descriptions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredWebsites.map((website) => (
        <WebsiteCard key={website.url} website={website} searchQuery={search} />
      ))}
    </div>
  );
}
