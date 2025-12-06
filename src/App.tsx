import { useState, useEffect } from "react";
import "./index.css";
import { Header } from "./components/header";
import { useRouter } from "./hooks/use-router";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";
import { WebsitesPage } from "./pages/websites";
import { MacOSAppsPage } from "./pages/macos-apps";
import { AutomationsPage } from "./pages/automations";
import { AutomationDetailPage } from "./pages/automation-detail";
import { InstructionsPage } from "./pages/instructions";
import { InstructionDetailPage } from "./pages/instruction-detail";

export function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const { path } = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Check for detail routes
  const automationMatch = path.match(/^\/automations\/(.+)$/);
  const automationSlug = automationMatch?.[1];
  const instructionMatch = path.match(/^\/instructions\/(.+)$/);
  const instructionSlug = instructionMatch?.[1];

  return (
    <div className="min-h-screen">
      <Header dark={dark} setDark={setDark} />
      {path === "/" && <HomePage />}
      {path === "/about" && <AboutPage />}
      {path === "/websites" && <WebsitesPage />}
      {path === "/macos-apps" && <MacOSAppsPage />}
      {path === "/automations" && <AutomationsPage />}
      {automationSlug && <AutomationDetailPage slug={automationSlug} />}
      {path === "/instructions" && <InstructionsPage />}
      {instructionSlug && <InstructionDetailPage slug={instructionSlug} />}
    </div>
  );
}

export default App;
