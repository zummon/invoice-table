import "./style.css";
import App from "./App.svelte";

// "ref": Math.random().toString().slice(2, 8),
// "date": new Date().toLocaleDateString(undefined),

// "ref": Math.random().toString().slice(2, 8),
// "date": new Date().toLocaleDateString("th",{ year: 'numeric', month: 'long', day: 'numeric' }),

const app = new App({
  target: document.getElementById("app"),
});

export default app;
