import { Footer } from "../components/footer";
import { Heart, Github, Twitter, Coffee } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-2xl mx-auto px-4 pt-24 pb-20 flex-1">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Pages</h1>
          <p className="text-lg text-muted-foreground">
            A curated collection of tools, apps, and automations.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">The Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            In a world full of tools and resources, finding the right ones can be overwhelming.
            Pages is my personal approach to get better — a carefully curated collection of
            websites, macOS apps, and automations that I actually use and recommend.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            No sponsored content. No affiliate links. Just genuine recommendations.
          </p>
        </div>

        <hr className="border-border my-8" />

        {/* Made by */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold">Made by Lumen</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            A developer passionate about clean design, great tools, and sharing knowledge.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/lumen-xx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://twitter.com/luuuuumen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </a>
            <a
              href="https://buymeacoffee.com/luuuuumen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 transition-colors text-sm font-medium"
            >
              <Coffee className="w-4 h-4" />
              Buy me a coffee
            </a>
          </div>
        </div>

        <hr className="border-border my-8" />

        {/* Tech Stack */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Built With</h2>
          <div className="flex flex-wrap gap-2">
            {["Bun", "React", "TypeScript", "Tailwind CSS"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full bg-muted text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
