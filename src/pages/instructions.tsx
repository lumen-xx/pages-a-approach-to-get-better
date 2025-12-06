import { useMemo, useState } from "react";
import { Input } from "../components/ui/input";
import { InstructionCard } from "../components/instruction-card";
import { instructions } from "../data/instructions";
import { Footer } from "../components/footer";

export function InstructionsPage() {
  const [search, setSearch] = useState("");

  const filteredInstructions = useMemo(() => {
    if (!search) return instructions;
    const q = search.toLowerCase();
    return instructions.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.difficulty.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-5xl mx-auto px-4 pt-24 pb-20 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Instructions</h1>
          <p className="text-muted-foreground">
            Guides and tutorials to help you get started.
          </p>
        </div>

        <div className="mb-6 max-w-md">
          <Input
            placeholder="Search instructions, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInstructions.map((instruction) => (
            <InstructionCard
              key={instruction.slug}
              instruction={instruction}
              searchQuery={search}
            />
          ))}
        </div>

        {filteredInstructions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No instructions found matching "{search}"
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

