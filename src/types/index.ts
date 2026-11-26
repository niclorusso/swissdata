// Indicator types
export type IndicatorCategory = "economic" | "demographic" | "social";

export type QuestionSubcategory =
  // Economic
  | "employment"
  | "wages"
  | "trade"
  | "budget"
  // Demographic
  | "population"
  | "migration"
  | "age-family"
  // Social
  | "health"
  | "education"
  | "housing"
  | "crime"
  | "environment"
  | "transport";

export type TrendDirection = "up" | "down" | "stable";

/**
 * How the card writes the change against the previous figure:
 * points: difference in percentage points (values in %); years: difference in years;
 * relative: change in % (amounts, counts, indices, rates per 1000); previous: only the previous figure
 * (values that are themselves yearly changes, such as GDP growth and inflation).
 */
export type ChangeKind = "points" | "years" | "relative" | "previous";

/** Another official measure of the same thing, named on the card so that the two are not confused. */
export interface RelatedMeasure {
  /** text with {value} and {year}; for the two unemployment rates {ilo}, {seco} and {year} */
  text: string;
  value?: number;
  unit?: string;
  year?: number;
}

export interface Indicator {
  id: string;
  name: string;
  /** title on cards and charts */
  shortName: string;
  category: IndicatorCategory;
  value: number;
  unit: string;
  previousValue?: number;
  previousPeriod?: string; // period of previousValue when it is not the preceding year (survey held every two years)
  trend: TrendDirection;
  trendPercentage?: number;
  changeKind: ChangeKind;
  /**
   * value and previousValue before rounding, where the source publishes more decimals: the difference in points
   * is computed from these, as trendPercentage is (e.g. 5.452 against 5.210 gives +0.2, not +0.3)
   */
  unrounded?: { value: number; previous: number };
  source: string;
  sourceUrl: string;
  /** publication date of the latest figure by the source: ISO date, or "YYYY-MM" when only the month is known */
  sourcePublished?: string;
  lastUpdated: string;
  /** definition in one or two sentences */
  description: string;
  /** what the unit refers to and the period, with {year} */
  unitLine: string;
  context?: string;
  related?: RelatedMeasure;
  /** how to read the chart, with {value} and {diff} where needed */
  howToRead?: string;
  /** the acronym in the title, written out */
  acronym?: string;
  historicalData?: DataPoint[];
}

export interface DataPoint {
  year: number;
  value: number;
}

// Quiz question types (neutral data questions)
export interface QuizQuestion {
  id: string;
  category: IndicatorCategory;
  subcategory: QuestionSubcategory;
  question: string;
  unit: string;
  minValue: number;
  maxValue: number;
  actualValue: number;
  explanation: string;
  /** who publishes the answer, in the four languages (offices as "full name (acronym)") */
  source: LocalizedText;
  sourceUrl: string;
  /** publication date of the answer's table by the source, when known: ISO date or "YYYY-MM" */
  sourcePublished?: string;
  period: string; // reference year or period of the answer, shown in the source line
  context?: string;
  comparisonData?: ComparisonPoint[];
  comparisonLabel?: string; // title of the chart when it shows another measure than the question
}


export interface ComparisonPoint {
  label: string;
  value: number;
}

export interface QuizResult {
  questionId: string;
  userGuess: number;
  actualValue: number;
  accuracy: number; // 0-100
}

// Canton types
export interface Canton {
  id: string;
  name: string;
  nameDE: string;
  nameFR: string;
  nameIT: string;
  abbreviation: string;
  capital: string;
  population: number;
  area: number; // km²
  indicators: CantonIndicator[];
}

export interface CantonIndicator {
  indicatorId: string;
  value: number;
}

// Reference year and source of the canton figures (generated with src/data/cantons.ts)
export type LocalizedText = Record<"en" | "it" | "de" | "fr", string>;

export interface CantonIndicatorMeta {
  id: string;
  unit: string; // "%", "CHF", "CHF/month", "per 1,000 inhabitants"
  year: number; // one reference year for all cantons
  provisional: boolean;
  currentBorders: boolean; // true: cantonal borders of cantonBordersDate; false: borders of the reference year
  national: number; // Switzerland, same table and year
  source: LocalizedText;
  sourceUrl: string;
}

export interface CantonBaseMeta {
  referenceDate: string; // ISO date
  national: number;
  source: LocalizedText;
  sourceUrl: string;
}

// UI types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
