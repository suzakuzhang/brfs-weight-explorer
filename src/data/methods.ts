export const methodsNotes = [
  {
    title: "Public-data boundary",
    body:
      "The MVP uses aggregate values published in the April 2016 BRFS report. Raw individual-level records are not committed to the repository."
  },
  {
    title: "BMI classification",
    body:
      "BMI categories follow the published BRFS table. A rebuild from raw data should preserve the survey code table's special missing-value codes before deriving BMI."
  },
  {
    title: "Perception profile",
    body:
      "Perception accuracy is derived descriptively by comparing objective BMI group with self-perceived weight status. It is an interpretive recoding, not a clinical diagnosis."
  },
  {
    title: "Causal restraint",
    body:
      "BRFS April 2016 is cross-sectional. The dashboard uses 'association', 'profile', and 'gap' language, and avoids causal claims."
  }
];

export const variableMap = [
  { code: "v4x", label: "Height" },
  { code: "v5x", label: "Weight" },
  { code: "v7_r", label: "Self-perceived weight status" },
  { code: "v54", label: "Age" },
  { code: "v55", label: "Education" },
  { code: "v60 / v61", label: "Household income" },
  { code: "weight", label: "Survey weighting variable" }
];
