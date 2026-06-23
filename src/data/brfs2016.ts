export type PercentDatum = {
  label: string;
  value: number;
  note?: string;
};

export type MatrixCell = {
  objective: string;
  perceived: string;
  value: number;
};

export type Insight = {
  id: string;
  title: string;
  body: string;
  evidence: string;
  caveat?: string;
};

export const brfs2016 = {
  meta: {
    title: "Hong Kong Body Weight Perception Explorer",
    survey: "Behavioural Risk Factor Survey, April 2016",
    sampleSize: 4071,
    geography: "Hong Kong adults aged 18-64",
    sourceName: "Hong Kong Department of Health, Change4Health BRFS resources",
    sourceUrl: "https://www.change4health.gov.hk/en/resources/brfs/index.html",
    reportUrl: "https://www.chp.gov.hk/files/pdf/brfa_report_april_2016_eng.pdf",
    codeTableUrl:
      "https://www.change4health.gov.hk/filemanager/common/pdf/brfs/BRFS%20April%202016_Code%20Table_e.pdf",
    status:
      "MVP uses published April 2016 aggregate tables. The raw abridged dataset can be placed in data/raw/ for finer stratified rebuilds."
  },
  bmiCategories: [
    { label: "Underweight", value: 6.4 },
    { label: "Normal weight", value: 52.1 },
    { label: "Overweight", value: 21.0 },
    { label: "Obese", value: 20.5 }
  ] satisfies PercentDatum[],
  perceivedWeight: [
    { label: "Perceived overweight", value: 26.3 },
    { label: "Perceived just right", value: 53.1 },
    { label: "Perceived underweight", value: 18.6 },
    { label: "Unknown / missing", value: 2.0 }
  ] satisfies PercentDatum[],
  perceptionByBmi: [
    { objective: "Underweight", perceived: "Overweight", value: 4.0 },
    { objective: "Underweight", perceived: "Just right", value: 27.4 },
    { objective: "Underweight", perceived: "Underweight", value: 65.6 },
    { objective: "Underweight", perceived: "Unknown", value: 2.9 },
    { objective: "Normal weight", perceived: "Overweight", value: 12.0 },
    { objective: "Normal weight", perceived: "Just right", value: 61.9 },
    { objective: "Normal weight", perceived: "Underweight", value: 24.3 },
    { objective: "Normal weight", perceived: "Unknown", value: 1.8 },
    { objective: "Overweight", perceived: "Overweight", value: 36.0 },
    { objective: "Overweight", perceived: "Just right", value: 53.2 },
    { objective: "Overweight", perceived: "Underweight", value: 8.7 },
    { objective: "Overweight", perceived: "Unknown", value: 2.1 },
    { objective: "Obese", perceived: "Overweight", value: 67.9 },
    { objective: "Obese", perceived: "Just right", value: 28.0 },
    { objective: "Obese", perceived: "Underweight", value: 2.4 },
    { objective: "Obese", perceived: "Unknown", value: 1.8 }
  ] satisfies MatrixCell[],
  healthBehaviours: [
    {
      label: "Leisure-time physical activity at least once per week",
      value: 56.1,
      note: "Self-reported"
    },
    {
      label: "No leisure-time physical activity",
      value: 40.9,
      note: "Self-reported"
    },
    {
      label: "Two or more servings of fruit per day",
      value: 23.9,
      note: "Self-reported"
    },
    {
      label: "Three or more servings of vegetables per day",
      value: 10.8,
      note: "Self-reported"
    },
    {
      label: "At least five servings of fruit and vegetables per day",
      value: 7.7,
      note: "Self-reported"
    },
    {
      label: "Consumed alcoholic drinks in the previous 12 months",
      value: 42.3,
      note: "Self-reported"
    }
  ] satisfies PercentDatum[],
  interpretationProfile: [
    { label: "Accurate", value: 59.7 },
    { label: "Underestimation", value: 29.4 },
    { label: "Overestimation", value: 8.4 },
    { label: "Unknown", value: 2.0 }
  ] satisfies PercentDatum[],
  insights: [
    {
      id: "bmi-burden",
      title: "Objective weight status and perceived status separate",
      body:
        "The survey reports 41.5% of respondents as overweight or obese by BMI, but only 26.3% described themselves as overweight.",
      evidence:
        "Published aggregate tables: overweight 21.0%, obese 20.5%, perceived overweight 26.3%.",
      caveat:
        "This is a descriptive gap in cross-sectional self-report data, not a causal estimate."
    },
    {
      id: "under-recognition",
      title: "A large share of overweight respondents do not report overweight",
      body:
        "Among respondents classified as overweight, 53.2% described themselves as just right and 8.7% as underweight.",
      evidence:
        "BMI-by-perceived-weight table: overweight row, perceived just right + underweight = 61.9%.",
      caveat:
        "The public table collapses perception into three broad categories, so this cannot distinguish mild from severe misclassification."
    },
    {
      id: "data-product",
      title: "AI is used as an explanation layer, not as the source of findings",
      body:
        "The dashboard separates precomputed statistics from explanatory text. The AI-style panel is constrained to summarize charted values and methodological limits.",
      evidence:
        "All numbers shown in the MVP are stored as typed aggregate data in src/data/brfs2016.ts.",
      caveat:
        "For application use, regenerate the aggregates from the official abridged dataset before presenting fine-grained subgroup claims."
    }
  ] satisfies Insight[]
};

export const perceivedOrder = ["Overweight", "Just right", "Underweight", "Unknown"];
export const objectiveOrder = ["Underweight", "Normal weight", "Overweight", "Obese"];
