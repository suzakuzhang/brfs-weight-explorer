import { InsightAssistant } from "@/components/InsightAssistant";
import { MatrixHeatmap } from "@/components/MatrixHeatmap";
import { MethodsPanel } from "@/components/MethodsPanel";
import { MetricStrip } from "@/components/MetricStrip";
import { PercentBars } from "@/components/PercentBars";
import { StackedBar } from "@/components/StackedBar";
import { brfs2016 } from "@/data/brfs2016";

const metrics = [
  {
    label: "Sample",
    value: brfs2016.meta.sampleSize.toLocaleString("en-US"),
    detail: "Adults aged 18-64 in BRFS April 2016"
  },
  {
    label: "Overweight or obese",
    value: "41.5%",
    detail: "BMI table: overweight 21.0% + obese 20.5%"
  },
  {
    label: "Perceived overweight",
    value: "26.3%",
    detail: "Self-perceived weight status"
  },
  {
    label: "Under-recognition",
    value: "61.9%",
    detail: "Overweight respondents reporting just right or underweight"
  }
];

export default function Home() {
  return (
    <div>
      <section className="px-5 py-10 md:py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <div className="inline-flex rounded-md border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
              Public behavioural-risk survey portfolio
            </div>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">
                Body weight perception in Hong Kong adults
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                A static, reproducible dashboard built around the April 2016
                Behavioural Risk Factor Survey. It turns a MSc-style
                behavioural-health analysis into a data product with transparent
                statistics and a constrained AI explanation layer.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="#dashboard" className="primary-action">
                View dashboard
              </a>
              <a href="#methods" className="secondary-action">
                Check methods
              </a>
            </div>
          </div>
          <div className="rounded-md border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
              Core descriptive gap
            </div>
            <div className="mt-4">
              <StackedBar
                data={[
                  { label: "BMI overweight / obese", value: 41.5 },
                  { label: "Self-perceived overweight", value: 26.3 },
                  { label: "Gap", value: 15.2 },
                  { label: "Remaining", value: 17.0 }
                ]}
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              The chart is intentionally descriptive: it shows that objective
              BMI status and self-perceived status do not collapse into one
              measure.
            </p>
          </div>
        </div>
      </section>

      <section id="dashboard" className="section-band">
        <div className="section-inner space-y-7">
          <MetricStrip metrics={metrics} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="panel-block">
              <div className="panel-heading">
                <p className="section-kicker">Objective status</p>
                <h2 className="section-title">BMI categories</h2>
              </div>
              <PercentBars data={brfs2016.bmiCategories} tone="green" />
            </div>

            <div className="panel-block">
              <div className="panel-heading">
                <p className="section-kicker">Self-report</p>
                <h2 className="section-title">Perceived weight status</h2>
              </div>
              <PercentBars data={brfs2016.perceivedWeight} tone="blue" />
            </div>
          </div>

          <div className="panel-block">
            <div className="panel-heading max-w-3xl">
              <p className="section-kicker">Objective x perceived</p>
              <h2 className="section-title">Where perception diverges from BMI</h2>
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                Each row is a BMI group. Values show the percentage of people in
                that BMI group selecting each self-perception category.
              </p>
            </div>
            <MatrixHeatmap data={brfs2016.perceptionByBmi} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="panel-block">
              <div className="panel-heading">
                <p className="section-kicker">Derived profile</p>
                <h2 className="section-title">Perception accuracy</h2>
              </div>
              <StackedBar data={brfs2016.interpretationProfile} />
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                Derived from the published cross-table. It is useful for
                communication, but subgroup-level modelling should be rebuilt
                from the raw abridged dataset.
              </p>
            </div>

            <div className="panel-block">
              <div className="panel-heading">
                <p className="section-kicker">Behavioural context</p>
                <h2 className="section-title">Selected health behaviours</h2>
              </div>
              <PercentBars data={brfs2016.healthBehaviours} tone="neutral" />
            </div>
          </div>
        </div>
      </section>

      <InsightAssistant insights={brfs2016.insights} />
      <MethodsPanel />

      <section className="px-5 py-8">
        <div className="mx-auto max-w-6xl rounded-md border border-[var(--border)] bg-[var(--panel)] p-5 text-sm leading-relaxed text-[var(--muted)]">
          <p>
            Source:{" "}
            <a className="source-link" href={brfs2016.meta.sourceUrl}>
              {brfs2016.meta.sourceName}
            </a>
            . Aggregate values are from the April 2016 public report; variable
            references follow the April 2016 code table.
          </p>
        </div>
      </section>
    </div>
  );
}
