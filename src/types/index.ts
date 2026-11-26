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

export interface Indicator {
  id: string;
  name: string;
  shortName: string;
  category: IndicatorCategory;
  value: number;
  unit: string;
  previousValue?: number;
  previousPeriod?: string; // period of previousValue when it is not the preceding year (survey held every two years)
  trend: TrendDirection;
  trendPercentage?: number;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
  description: string;
  context?: string;
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
  source: string;
  sourceUrl: string;
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
