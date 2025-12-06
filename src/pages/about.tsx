import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/footer";
import { Heart, Github, Twitter, Coffee } from "lucide-react";

function FloatingCube() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientY / window.innerHeight - 0.5) * 30;
      const y = (e.clientX / window.innerWidth - 0.5) * 30;
      setRotation({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="perspective-[1000px] w-32 h-32">
      <div
        ref={cubeRef}
        className="relative w-full h-full transform-style-3d transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div
          className="absolute w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
          style={{ transform: "translateZ(64px)" }}
        >
          <span className="text-4xl">✨</span>
        </div>
        {/* Back */}
        <div
          className="absolute w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
          style={{ transform: "rotateY(180deg) translateZ(64px)" }}
        >
          <span className="text-4xl">🚀</span>
        </div>
        {/* Left */}
        <div
          className="absolute w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
          style={{ transform: "rotateY(-90deg) translateZ(64px)" }}
        >
          <span className="text-4xl">💡</span>
        </div>
        {/* Right */}
        <div
          className="absolute w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
          style={{ transform: "rotateY(90deg) translateZ(64px)" }}
        >
          <span className="text-4xl">⚡</span>
        </div>
        {/* Top */}
        <div
          className="absolute w-32 h-32 bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
          style={{ transform: "rotateX(90deg) translateZ(64px)" }}
        >
          <span className="text-4xl">🎯</span>
        </div>
        {/* Bottom */}
        <div
          className="absolute w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
          style={{ transform: "rotateX(-90deg) translateZ(64px)" }}
        >
          <span className="text-4xl">🔥</span>
        </div>
      </div>
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute top-40 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-40 left-1/3 w-56 h-56 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}

function InteractiveCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingOrbs />

      <div className="w-full max-w-4xl mx-auto px-4 pt-24 pb-20 flex-1 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <FloatingCube />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Pages
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A curated collection of tools, apps, and automations to help you work smarter.
          </p>
        </div>

        {/* Mission Card */}
        <InteractiveCard className="mb-8">
          <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">The Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              In a world full of tools and resources, finding the right ones can be overwhelming.
              Pages is my personal approach to get better — a carefully curated collection of
              websites, macOS apps, and automations that I actually use and recommend.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              No sponsored content. No affiliate links. Just genuine recommendations from one
              developer to another.
            </p>
          </div>
        </InteractiveCard>

        {/* Made with Love */}
        <InteractiveCard className="mb-8">
          <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold">Made with Love</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This project was built by{" "}
              <span className="text-foreground font-semibold">Lumen</span> — a developer
              passionate about clean design, great tools, and sharing knowledge with the community.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/lumen-xx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://twitter.com/luuuuumen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
              <a
                href="https://buymeacoffee.com/luuuuumen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 transition-colors"
              >
                <Coffee className="w-4 h-4" />
                Buy me a coffee
              </a>
            </div>
          </div>
        </InteractiveCard>

        {/* Tech Stack */}
        <InteractiveCard>
          <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Built With</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Bun", emoji: "🥟" },
                { name: "React", emoji: "⚛️" },
                { name: "TypeScript", emoji: "💙" },
                { name: "Tailwind", emoji: "🎨" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="p-4 rounded-xl bg-muted/50 text-center hover:bg-muted transition-colors"
                >
                  <span className="text-2xl mb-2 block">{tech.emoji}</span>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </InteractiveCard>

        {/* Interactive hint */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          ✨ Move your mouse around to interact with the elements
        </p>
      </div>

      <Footer />
    </div>
  );
}
