import { Footer } from "../components/footer";

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto px-4 pt-24 pb-20 flex-1">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="text-muted-foreground">
          A curated collection of useful websites, tools, and resources to help
          you get better at what you do.
        </p>
      </div>
      <Footer />
    </div>
  );
}
