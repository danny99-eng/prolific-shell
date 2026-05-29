import { Instagram } from "lucide-react";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M19.6 6.3a5.3 5.3 0 0 1-3.4-1.2 5.3 5.3 0 0 1-1.9-3H11v12.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V8.4a6 6 0 0 0-.8-.1 6 6 0 1 0 6 6V9.7a8.4 8.4 0 0 0 5.2 1.8V8.2a5.4 5.4 0 0 1 0-1.9z" />
    </svg>
  );
}

export function SocialProofBanner() {
  return (
    <section className="border-y border-border bg-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-4 py-10 sm:flex-row sm:gap-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-background/80">
          Follow us{" "}
          <span className="text-gold">@prolificcollections</span>
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/prolificcollections"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-background/25 text-background/80 transition-colors hover:border-gold hover:text-gold"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://tiktok.com/@prolificcollections"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-background/25 text-background/80 transition-colors hover:border-gold hover:text-gold"
          >
            <TikTokIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
