import { createRoot } from "octane";
import { App } from "./App.tsrx";

const root = createRoot(document.getElementById("root")!);
root.render(App);
