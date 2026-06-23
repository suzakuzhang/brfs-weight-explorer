#!/usr/bin/env python3
"""Build public aggregate JSON from the BRFS April 2016 abridged dataset.

The dashboard should not publish respondent-level rows. Put the official Excel
file in data/raw/2016apr.xlsx, run this script locally, and commit only the
aggregate JSON output if needed.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

MISSING_CODES = {777, 7777, 999, 9998, 9999}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--raw", default="data/raw/2016apr.xlsx")
    parser.add_argument("--out", default="data/public/brfs2016_summary.json")
    parser.add_argument("--height", default="v4x")
    parser.add_argument("--weight", default="v5x")
    parser.add_argument("--perception", default="v7_r")
    parser.add_argument("--survey-weight", default="")
    return parser.parse_args()


def clean_numeric(series):
    values = series.copy()
    values = values.where(~values.isin(MISSING_CODES))
    return values


def bmi_group(bmi: float) -> str | None:
    if bmi != bmi:
        return None
    if bmi < 18.5:
        return "Underweight"
    if bmi < 23:
        return "Normal weight"
    if bmi < 25:
        return "Overweight"
    return "Obese"


def perception_label(value) -> str | None:
    mapping = {
        1: "Overweight",
        2: "Just right",
        3: "Underweight",
    }
    try:
        return mapping.get(int(value))
    except (TypeError, ValueError):
        return None


def percent_table(rows, group_col, weight_col=None):
    if weight_col:
        grouped = rows.groupby(group_col, dropna=False)[weight_col].sum()
        total = grouped.sum()
    else:
        grouped = rows.groupby(group_col, dropna=False).size()
        total = len(rows)
    return [
        {"label": str(label), "value": round(float(value / total * 100), 2)}
        for label, value in grouped.items()
        if label == label
    ]


def main() -> None:
    args = parse_args()
    raw_path = Path(args.raw)
    if not raw_path.exists():
        raise SystemExit(
            f"Raw dataset not found: {raw_path}. Download 2016apr.xlsx from the official BRFS page first."
        )

    try:
        import pandas as pd
    except ImportError as exc:
        raise SystemExit("Install pandas and openpyxl to rebuild from Excel.") from exc

    df = pd.read_excel(raw_path)
    df.columns = [str(col).strip().lower() for col in df.columns]

    height_col = args.height.lower()
    weight_col = args.weight.lower()
    perception_col = args.perception.lower()
    survey_weight_col = args.survey_weight.lower() or None

    for required in [height_col, weight_col, perception_col]:
        if required not in df.columns:
            raise SystemExit(f"Missing expected column: {required}")

    df[height_col] = clean_numeric(pd.to_numeric(df[height_col], errors="coerce"))
    df[weight_col] = clean_numeric(pd.to_numeric(df[weight_col], errors="coerce"))

    df["height_m"] = df[height_col] / 100
    df["bmi"] = df[weight_col] / (df["height_m"] ** 2)
    df.loc[(df["height_m"] <= 0) | (df["bmi"] > 80), "bmi"] = None
    df["bmi_group"] = df["bmi"].map(bmi_group)
    df["perceived_weight"] = df[perception_col].map(perception_label).fillna("Unknown")

    if survey_weight_col and survey_weight_col in df.columns:
        df[survey_weight_col] = pd.to_numeric(df[survey_weight_col], errors="coerce").fillna(0)
    else:
        survey_weight_col = None

    output = {
        "n_rows": int(len(df)),
        "bmi_categories": percent_table(df.dropna(subset=["bmi_group"]), "bmi_group", survey_weight_col),
        "perceived_weight": percent_table(df, "perceived_weight", survey_weight_col),
        "notes": [
            "Derived from raw abridged BRFS dataset.",
            "Respondent-level data are excluded from this output.",
            "Check category coding against the official code table before use in an application package."
        ],
    }

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(output, indent=2), encoding="utf-8")
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
