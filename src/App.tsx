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

// Instruction Pages
import MicroEditorPage from "./pages/instructions/micro-editor";
import NginxApiSetupPage from "./pages/instructions/nginx-api-setup";

// Automation Pages
import BrewInstallPage from "./pages/automations/brew-install";
import ConvertToWebpPage from "./pages/automations/convert-to-webp";
import ScaleImageByMultiplyPage from "./pages/automations/scale-image-by-multiply";
import BulkPackageInstallPage from "./pages/automations/bulk-package-install";
import SshPortForwardPage from "./pages/automations/ssh-port-forward";
import ProductionServerPage from "./pages/automations/production-server";

const instructionRoutes: Record<string, React.ComponentType> = {
  "micro-editor": MicroEditorPage,
  "nginx-api-setup": NginxApiSetupPage,
};

const automationRoutes: Record<string, React.ComponentType> = {
  "brew-install": BrewInstallPage,
  "convert-to-webp": ConvertToWebpPage,
  "scale-image-by-multiply": ScaleImageByMultiplyPage,
  "bulk-package-install": BulkPackageInstallPage,
  "ssh-port-forward": SshPortForwardPage,
  "production-server": ProductionServerPage,
};

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

  const renderAutomation = () => {
    if (!automationSlug) return null;
    const Component = automationRoutes[automationSlug];
    if (Component) return <Component />;
    return <AutomationDetailPage slug={automationSlug} />;
  };

  const renderInstruction = () => {
    if (!instructionSlug) return null;
    const Component = instructionRoutes[instructionSlug];
    if (Component) return <Component />;
    return <InstructionDetailPage slug={instructionSlug} />;
  };

  return (
    <div className="min-h-screen">
      <Header dark={dark} setDark={setDark} />
      {path === "/" && <HomePage />}
      {path === "/about" && <AboutPage />}
      {path === "/websites" && <WebsitesPage />}
      {path === "/macos-apps" && <MacOSAppsPage />}
      {path === "/automations" && <AutomationsPage />}
      {renderAutomation()}
      {path === "/instructions" && <InstructionsPage />}
      {renderInstruction()}
    </div>
  );
}

export default App;
