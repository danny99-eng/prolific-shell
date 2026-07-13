// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Nitro is only auto-enabled inside the Lovable sandbox. On external CI (Vercel),
// enable the Nitro Vite plugin so it merges nitro.config.ts (preset: "vercel").
const enableNitro =
  process.env.NITRO_PRESET === "vercel" ||
  process.env.VERCEL === "1" ||
  process.env.VERCEL === "true";

export default defineConfig({
  // Expose SANITY_ and VITE_ env vars to the client/server runtime
  envPrefix: ["SANITY_", "VITE_"],

  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(enableNitro
    ? {
        nitro: {
          preset: "vercel",
        },
      }
    : {}),
});
