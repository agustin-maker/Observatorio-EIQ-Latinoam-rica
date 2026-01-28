
export interface Study {
  institution: string;
  title: string;
  country: string;
  crop: string;
  eiq: string;
  notes: string;
  year: number;
}

export interface CropReference {
  id: string;
  name: string;
  range: string;
  unit: string;
  low: number;
  avg: number;
  high: number;
  icon: string;
  color: string;
  borderColor: string;
}

export interface ChartDataPoint {
  name: string;
  avg: number;
  max: number;
}

export interface TrendDataPoint {
  year: string;
  Argentina: number;
  Brasil: number;
  Region: number;
}
