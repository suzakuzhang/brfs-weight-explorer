# Hong Kong Body Weight Perception Explorer

Static research portfolio for turning a MSc-style behavioural-health analysis
into a public, reproducible data product.

The app uses the same basic framework as `zhouyi`: Next.js App Router,
TypeScript, Tailwind, local typed data, and a small set of reusable components.
It does not use a backend service or live LLM key.

## Current Scope

- Public source: Hong Kong Department of Health, Change4Health BRFS resources.
- MVP data: published aggregate values from the April 2016 BRFS report.
- Main display: BMI status, self-perceived weight status, perception-by-BMI
  cross-tab, selected behavioural indicators, and a constrained AI-style
  explanation panel.
- Privacy boundary: respondent-level rows are not committed. Raw Excel files
  belong in `data/raw/`, which is gitignored.

Official pages:

- https://www.change4health.gov.hk/en/resources/brfs/index.html
- https://www.chp.gov.hk/files/pdf/brfa_report_april_2016_eng.pdf
- https://www.change4health.gov.hk/filemanager/common/pdf/brfs/BRFS%20April%202016_Code%20Table_e.pdf

## Run

```bash
npm install
npm run dev -- -p 10020
```

For the current local workspace, the project can also reuse the existing
`zhouyi/node_modules` directory with a symlink if network access is unavailable.

## Rebuild From Raw BRFS Data

Download the official April 2016 abridged dataset as:

```text
data/raw/2016apr.xlsx
```

Then run:

```bash
python scripts/build_from_raw.py \
  --raw data/raw/2016apr.xlsx \
  --out data/public/brfs2016_summary.json
```

The script is deliberately conservative. Before using generated subgroup
claims in an application, verify variable names and code values against the
official April 2016 code table.

## Application Framing

Use this as a quantitative-health portfolio artifact:

> I transformed a public behavioural-risk survey dataset into an interactive,
> AI-assisted analytical dashboard, combining transparent preprocessing,
> descriptive epidemiological restraint, and user-facing explanation.

Do not present it as a causal model. The April 2016 BRFS is cross-sectional.
