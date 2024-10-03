import { registerRootComponent } from "expo";
import App from "./App";

if (typeof window !== "undefined") {
  // Register the service worker when the app is mounted
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  });
}

// Register the root component
registerRootComponent(App);
