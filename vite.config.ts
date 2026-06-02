// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Nitro is only auto-enabled inside the Lovable sandbox. On external CI like
// Vercel we opt in explicitly and override the Lovable wrapper's `dist/`
// output paths so Nitro emits Vercel's Build Output API layout.
// Vercel sets VERCEL=1 during builds; NITRO_PRESET can override locally or in vercel.json.
const nitroPreset =
  process.env.NITRO_PRESET ?? (process.env.VERCEL ? "vercel" : undefined);
const isVercel = nitroPreset === "vercel";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(nitroPreset
    ? {
        nitro: {
          preset: nitroPreset,
          ...(isVercel
            ? {
                output: {
                  dir: ".vercel/output",
                  serverDir: ".vercel/output/functions/__nitro.func",
                  publicDir: ".vercel/output/static",
                },
              }
            : {}),
        },
      }
    : {}),
});
