import { createRoot } from "remix/ui";
import { App } from "./App.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
