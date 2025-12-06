import { useMemo, useState } from "react";
import { WebsiteCard } from "../components/website-card";
import { Input } from "../components/ui/input";
import { websites } from "../data/websites";
import { Footer } from "../components/footer";

export function WebsitesPage() {
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
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto px-4 pt-24 pb-8 flex-1">
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2">Websites</h1>
          <p className="text-muted-foreground">
            Curated web tools and resources to boost your productivity.
          </p>
        </div>
        <Input
          placeholder="Search tags, descriptions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredWebsites.map((website) => (
          <WebsiteCard key={website.url} website={website} searchQuery={search} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
