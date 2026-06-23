type Metric = {
  label: string;
  value: string;
  detail: string;
};

export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-md border border-[var(--border)] bg-[var(--panel)] p-4"
        >
          <div className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
            {metric.label}
          </div>
          <div className="mt-2 text-2xl font-semibold">{metric.value}</div>
          <p className="mt-1 text-sm leading-snug text-[var(--muted)]">
            {metric.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
