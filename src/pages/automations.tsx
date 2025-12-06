import { Footer } from "../components/footer";

export function AutomationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto px-4 pt-24 pb-8 flex-1">
        <h1 className="text-3xl font-bold">Automations</h1>
        <p className="text-muted-foreground">
          Workflows and scripts to boost productivity.
        </p>
      </div>
      <Footer />
    </div>
  );
}
