import type { PercentDatum } from "@/data/brfs2016";

const colors = [
  "var(--green)",
  "var(--amber)",
  "var(--red)",
  "var(--muted-light)"
];

export function StackedBar({ data }: { data: PercentDatum[] }) {
  return (
    <div className="space-y-4">
      <div
        className="flex h-8 overflow-hidden rounded-md border border-[var(--border)]"
        aria-label="Stacked percentage bar"
      >
        {data.map((item, index) => (
          <div
            key={item.label}
            title={`${item.label}: ${item.value.toFixed(1)}%`}
            style={{
              width: `${item.value}%`,
              background: colors[index % colors.length]
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {data.map((item, index) => (
          <div key={item.label} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="h-3 w-3 shrink-0 rounded-sm"
                style={{ background: colors[index % colors.length] }}
              />
              <span className="truncate text-sm">{item.label}</span>
            </div>
            <span className="shrink-0 tabular-nums text-sm font-medium">
              {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
