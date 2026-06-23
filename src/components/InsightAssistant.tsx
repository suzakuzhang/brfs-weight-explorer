"use client";

import { useMemo, useState } from "react";
import type { Insight } from "@/data/brfs2016";

type InsightAssistantProps = {
  insights: Insight[];
};

export function InsightAssistant({ insights }: InsightAssistantProps) {
  const [activeId, setActiveId] = useState(insights[0]?.id ?? "");
  const active = useMemo(
    () => insights.find((insight) => insight.id === activeId) ?? insights[0],
    [activeId, insights]
  );

  if (!active) {
    return null;
  }

  return (
    <section id="ai-layer" className="section-band">
      <div className="section-inner space-y-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">AI explanation layer</p>
            <h2 className="section-title">Constrained interpretation, not new analysis</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">
            This panel mimics the AI-facing part of the service: it translates
            precomputed statistics into plain-language explanations and keeps a
            visible evidence trail.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="AI insight prompts">
          {insights.map((insight) => (
            <button
              key={insight.id}
              type="button"
              onClick={() => setActiveId(insight.id)}
              className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                insight.id === active.id
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)]"
              }`}
            >
              {insight.title}
            </button>
          ))}
        </div>
        <div className="rounded-md border border-[var(--border)] bg-[var(--panel)] p-5">
          <div className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
            Generated explanation template
          </div>
          <h3 className="mt-2 text-lg font-semibold">{active.title}</h3>
          <p className="mt-3 leading-relaxed">{active.body}</p>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-md bg-[var(--track)] p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                Evidence
              </div>
              <p className="mt-1 text-sm leading-relaxed">{active.evidence}</p>
            </div>
            <div className="rounded-md bg-[var(--track)] p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                Boundary
              </div>
              <p className="mt-1 text-sm leading-relaxed">
                {active.caveat ?? "No additional boundary note."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
