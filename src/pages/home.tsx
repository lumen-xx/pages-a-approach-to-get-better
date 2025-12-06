import { Button } from "../components/ui/button";
import {
  Globe,
  Monitor,
  Apple,
  Zap,
  ArrowRight,
  Sparkles,
  Search,
  Bookmark,
} from "lucide-react";
import { Footer } from "../components/footer";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <div
      className="group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <Icon className="w-8 h-8 mb-4 text-foreground/70 group-hover:text-foreground transition-colors" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function CategoryCard({
  href,
  icon: Icon,
  title,
  count,
  gradient,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  count: number;
  gradient: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`absolute inset-0 ${gradient} opacity-90`} />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      <div className="relative z-10 flex flex-col h-full min-h-[140px]">
        <Icon className="w-10 h-10 text-white mb-auto" />
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-white/70 text-sm">{count} resources</p>
        </div>
      </div>
      <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
    </a>
  );
}

function FloatingOrb({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 animate-pulse ${className}`}
    />
  );
}

export function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <FloatingOrb className="w-96 h-96 bg-blue-500 top-20 -left-48" />
        <FloatingOrb className="w-80 h-80 bg-purple-500 top-40 right-0" />
        <FloatingOrb className="w-72 h-72 bg-emerald-500 bottom-20 left-1/3" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">An approach to get better</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover the best
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              tools & resources
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A curated collection of websites, apps, and automations to help you
            work smarter, not harder.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <NavLink href="/websites">
              <Button size="lg" className="gap-2 px-8">
                Explore Resources
                <ArrowRight className="w-4 h-4" />
              </Button>
            </NavLink>
            <NavLink href="/about">
              <Button size="lg" variant="outline" className="gap-2 px-8">
                Learn More
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Jump straight to what you need. Each category is carefully organized
            and searchable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CategoryCard
              href="/websites"
              icon={Globe}
              title="Websites"
              count={12}
              gradient="bg-gradient-to-br from-blue-600 to-blue-800"
            />
            <CategoryCard
              href="/macos-apps"
              icon={Monitor}
              title="macOS Apps"
              count={8}
              gradient="bg-gradient-to-br from-purple-600 to-purple-800"
            />
            <CategoryCard
              href="/macos"
              icon={Apple}
              title="macOS"
              count={5}
              gradient="bg-gradient-to-br from-zinc-600 to-zinc-800"
            />
            <CategoryCard
              href="/automations"
              icon={Zap}
              title="Automations"
              count={6}
              gradient="bg-gradient-to-br from-amber-600 to-orange-700"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-foreground/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why use Pages?
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            We've done the research so you don't have to.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Search}
              title="Instant Search"
              description="Find exactly what you need with our fuzzy search across titles, descriptions, and tags."
              delay={0}
            />
            <FeatureCard
              icon={Bookmark}
              title="Curated Quality"
              description="Every resource is hand-picked and tested. No bloat, no outdated tools."
              delay={100}
            />
            <FeatureCard
              icon={Sparkles}
              title="Always Updated"
              description="New tools added regularly. Old ones removed when they're no longer useful."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-20" />
            <h2 className="relative text-4xl md:text-5xl font-bold mb-6">
              Ready to level up?
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mb-10">
            Start exploring our curated collection of tools and resources.
          </p>
          <NavLink href="/websites">
            <Button size="lg" className="gap-2 px-10 py-6 text-lg">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </NavLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}
