import { useMemo, useState } from "react";
import { Input } from "../components/ui/input";
import { AutomationCard } from "../components/automation-card";
import { automations } from "../data/automations";
import { Footer } from "../components/footer";

export function AutomationsPage() {
  const [search, setSearch] = useState("");

  const filteredAutomations = useMemo(() => {
    if (!search) return automations;
    const q = search.toLowerCase();
    return automations.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.difficulty.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-5xl mx-auto px-4 pt-24 pb-20 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Automations</h1>
          <p className="text-muted-foreground">
            Workflows and scripts to boost your productivity.
          </p>
        </div>

        <div className="mb-6 max-w-md">
          <Input
            placeholder="Search automations, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAutomations.map((automation) => (
            <AutomationCard
              key={automation.slug}
              automation={automation}
              searchQuery={search}
            />
          ))}
        </div>

        {filteredAutomations.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No automations found matching "{search}"
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
