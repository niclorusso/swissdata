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

// UI types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
