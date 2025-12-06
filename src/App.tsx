import "./index.css";
import { WebsiteCard } from "./components/website-card";

export function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <WebsiteCard
        title="Diagrams.net"
        description="Diagrams.net is a free online diagramming tool that allows you to create diagrams, flowcharts, UML diagrams, and more."
        url="https://app.diagrams.net/"
      />
    </div>
  );
}

export default App;
