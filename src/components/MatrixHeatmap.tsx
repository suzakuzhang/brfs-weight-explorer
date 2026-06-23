import { objectiveOrder, perceivedOrder, type MatrixCell } from "@/data/brfs2016";

function cellValue(data: MatrixCell[], objective: string, perceived: string) {
  return (
    data.find((cell) => cell.objective === objective && cell.perceived === perceived)
      ?.value ?? 0
  );
}

function cellColor(value: number) {
  const alpha = Math.max(0.08, Math.min(0.9, value / 80));
  return `rgba(14, 116, 144, ${alpha})`;
}

export function MatrixHeatmap({ data }: { data: MatrixCell[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-[150px_repeat(4,1fr)] gap-1 text-sm">
          <div />
          {perceivedOrder.map((perceived) => (
            <div
              key={perceived}
              className="rounded-md bg-[var(--track)] px-3 py-2 text-center font-medium"
            >
              {perceived}
            </div>
          ))}
          {objectiveOrder.map((objective) => (
            <div key={objective} className="contents">
              <div className="rounded-md bg-[var(--track)] px-3 py-3 font-medium">
                {objective}
              </div>
              {perceivedOrder.map((perceived) => {
                const value = cellValue(data, objective, perceived);
                return (
                  <div
                    key={`${objective}-${perceived}`}
                    className="rounded-md px-3 py-3 text-center font-semibold tabular-nums text-white"
                    style={{ background: cellColor(value) }}
                    title={`${objective} respondents who perceived themselves as ${perceived}: ${value.toFixed(1)}%`}
                  >
                    {value.toFixed(1)}%
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
