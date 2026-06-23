import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hong Kong Body Weight Perception Explorer",
  description:
    "A static dashboard for exploring BMI, perceived weight status, and behavioural-risk survey aggregates from Hong Kong BRFS April 2016."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-[var(--border)] bg-[var(--panel)] px-5 py-4">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
            <a href="/" className="text-base font-semibold tracking-wide">
              BRFS Weight Explorer
            </a>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
              <a href="#dashboard" className="hover:text-[var(--foreground)]">
                Dashboard
              </a>
              <a href="#ai-layer" className="hover:text-[var(--foreground)]">
                AI layer
              </a>
              <a href="#methods" className="hover:text-[var(--foreground)]">
                Methods
              </a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-[var(--border)] px-5 py-5">
          <div className="mx-auto max-w-6xl text-sm text-[var(--muted)]">
            Static research portfolio. Descriptive public-health dashboard, not
            medical advice.
          </div>
        </footer>
      </body>
    </html>
  );
}
