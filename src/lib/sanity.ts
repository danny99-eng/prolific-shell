// Read environment variables from process.env (server/Nitro) or import.meta.env (Vite)
export function readEnv(key: string): string | undefined {
  // Check process.env first (Node/Nitro server)
  if (typeof process !== "undefined" && (process as any).env?.[key]) {
    return (process as any).env[key];
  }
  // Fallback to import.meta.env (Vite / client-side)
  // Use (import.meta as any) to avoid TS errors in projects without custom typing
  if (typeof import !== "undefined" && typeof (import.meta as any) !== "undefined" && (import.meta as any).env?.[key]) {
    return (import.meta as any).env[key];
  }
  return undefined;
}
