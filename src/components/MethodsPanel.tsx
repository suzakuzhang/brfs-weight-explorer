import { methodsNotes, variableMap } from "@/data/methods";

export function MethodsPanel() {
  return (
    <section id="methods" className="section-band">
      <div className="section-inner space-y-6">
        <div>
          <p className="section-kicker">Methods boundary</p>
          <h2 className="section-title">What the dashboard claims</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {methodsNotes.map((note) => (
            <div
              key={note.title}
              className="rounded-md border border-[var(--border)] bg-[var(--panel)] p-4"
            >
              <h3 className="text-sm font-semibold">{note.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {note.body}
              </p>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-md border border-[var(--border)]">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-[var(--track)] text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">BRFS code</th>
                <th className="px-4 py-3 font-semibold">Dashboard role</th>
              </tr>
            </thead>
            <tbody>
              {variableMap.map((row) => (
                <tr key={row.code} className="border-t border-[var(--border)]">
                  <td className="px-4 py-3 font-mono text-xs">{row.code}</td>
                  <td className="px-4 py-3">{row.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
