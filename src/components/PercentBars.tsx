import type { PercentDatum } from "@/data/brfs2016";

type PercentBarsProps = {
  data: PercentDatum[];
  tone?: "blue" | "green" | "red" | "neutral";
};

const toneClass = {
  blue: "bg-[var(--blue)]",
  green: "bg-[var(--green)]",
  red: "bg-[var(--red)]",
  neutral: "bg-[var(--accent)]"
};

export function PercentBars({ data, tone = "blue" }: PercentBarsProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex items-baseline justify-between gap-4">
            <div className="text-sm font-medium">{item.label}</div>
            <div className="shrink-0 tabular-nums text-sm font-semibold">
              {item.value.toFixed(1)}%
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--track)]">
            <div
              className={`h-full rounded-full ${toneClass[tone]}`}
              style={{ width: `${Math.min(item.value, 100)}%` }}
            />
          </div>
          {item.note ? (
            <div className="text-xs text-[var(--muted)]">{item.note}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
