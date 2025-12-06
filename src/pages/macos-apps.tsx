import { useMemo, useState } from "react";
import { Input } from "../components/ui/input";
import { MacOSAppCard } from "../components/macos-app-card";
import { macosApps } from "../data/macos-apps";
import { Footer } from "../components/footer";

export function MacOSAppsPage() {
  const [search, setSearch] = useState("");

  const filteredApps = useMemo(() => {
    if (!search) return macosApps;
    const q = search.toLowerCase();
    return macosApps.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.price.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-5xl mx-auto px-4 pt-24 pb-20 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">macOS Apps</h1>
          <p className="text-muted-foreground">The macOS apps I use daily.</p>
        </div>

        <div className="mb-6 max-w-md">
          <Input
            placeholder="Search apps, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map((app) => (
            <MacOSAppCard key={app.url} app={app} searchQuery={search} />
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No apps found matching "{search}"
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
