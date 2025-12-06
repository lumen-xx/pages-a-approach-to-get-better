import { useState, useEffect } from "react";
import "./index.css";
import { Header } from "./components/header";
import { useRouter } from "./hooks/use-router";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";

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

  return (
    <div className="min-h-screen">
      <Header dark={dark} setDark={setDark} />
      {path === "/" && <HomePage />}
      {path === "/about" && <AboutPage />}
    </div>
  );
}

export default App;
