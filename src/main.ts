import { mount } from "svelte";
import "@fontsource/fira-sans/400.css";
import "@fontsource/fira-sans/700.css";
import "@fontsource/fira-sans/400-italic.css";
import "@fontsource/fira-sans/700-italic.css";
import "./app.css";
import App from "./App.svelte";

const app = mount(App, {
  // biome-ignore lint/style/noNonNullAssertion: it's by default in Vite
  target: document.getElementById("app")!
});

export default app;
