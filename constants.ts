
import { Study, CropReference, ChartDataPoint, TrendDataPoint } from './types';

export const CROP_REFERENCES: CropReference[] = [
  {
    id: 'soja',
    name: 'Soja (1ra)',
    range: '45 - 85',
    unit: 'EIQ/ha',
    low: 35,
    avg: 55,
    high: 100,
    icon: '🌱',
    color: 'emerald',
    borderColor: 'border-emerald-100'
  },
  {
    id: 'maiz',
    name: 'Maíz Tardío',
    range: '30 - 65',
    unit: 'EIQ/ha',
    low: 25,
    avg: 40,
    high: 70,
    icon: '🌽',
    color: 'amber',
    borderColor: 'border-yellow-100'
  },
  {
    id: 'trigo',
    name: 'Trigo',
    range: '20 - 50',
    unit: 'EIQ/ha',
    low: 15,
    avg: 30,
    high: 60,
    icon: '🌾',
    color: 'orange',
    borderColor: 'border-amber-100'
  },
  {
    id: 'algodon',
    name: 'Algodón',
    range: '120 - 250',
    unit: 'EIQ/ha',
    low: 100,
    avg: 160,
    high: 300,
    icon: '👕',
    color: 'indigo',
    borderColor: 'border-indigo-100'
  }
];

export const STUDIES_DATA: Study[] = [
  {
    institution: "INTA Oliveros / Pergamino",
    title: "Impacto ambiental de estrategias de manejo de malezas en soja",
    country: "Argentina",
    crop: "Soja",
    eiq: "45.0 - 78.0",
    notes: "El uso de pre-emergentes residuales aumenta el EIQ inicial pero reduce aplicaciones post-emergentes.",
    year: 2019
  },
  {
    institution: "Embrapa Soja",
    title: "Avaliação de impacto ambiental em sistemas de produção no Mato Grosso",
    country: "Brasil",
    crop: "Soja",
    eiq: "60.0 - 95.0",
    notes: "Alta presión de roya asiática y orugas defoliadoras elevan el uso de fungicidas e insecticidas.",
    year: 2021
  },
  {
    institution: "Facultad de Agronomía (Udelar)",
    title: "Indicadores de sustentabilidad en rotaciones agrícolas",
    country: "Uruguay",
    crop: "Trigo",
    eiq: "25.0 - 35.0",
    notes: "Valores estables. El principal aporte al EIQ proviene de fungicidas para fusariosis y roya.",
    year: 2020
  },
  {
    institution: "Fundación Producir Conservando",
    title: "Evolución del uso de fitosanitarios en Argentina",
    country: "Argentina",
    crop: "Maíz",
    eiq: "30.0 - 55.0",
    notes: "Maíces tardíos presentan mayor EIQ debido a aplicaciones para cogollero (Spodoptera).",
    year: 2018
  },
  {
    institution: "Investigación Privada / CREA",
    title: "Benchmarking de EIQ en Chaco y Santiago del Estero",
    country: "Argentina",
    crop: "Algodón",
    eiq: "140.0 - 220.0",
    notes: "Múltiples aplicaciones de insecticidas para picudo del algodonero dominan el índice.",
    year: 2022
  },
  {
    institution: "Universidad Nacional de Asunción",
    title: "Impacto de agroquímicos en soja zafriña",
    country: "Paraguay",
    crop: "Soja",
    eiq: "55.0 - 85.0",
    notes: "Ciclos cortos con alta presión de plagas. Uso intensivo de desecantes.",
    year: 2019
  }
];

export const COMPARISON_CHART_DATA: ChartDataPoint[] = [
  { name: 'Soja 1ra', avg: 55, max: 90 },
  { name: 'Soja 2da', avg: 65, max: 110 },
  { name: 'Maíz Temp.', avg: 35, max: 50 },
  { name: 'Maíz Tardío', avg: 48, max: 75 },
  { name: 'Trigo', avg: 30, max: 55 },
  { name: 'Girasol', avg: 28, max: 45 },
  { name: 'Algodón', avg: 160, max: 280 }
];

export const TREND_CHART_DATA: TrendDataPoint[] = [
  { year: '2014', Argentina: 35, Brasil: 50, Region: 25 },
  { year: '2016', Argentina: 42, Brasil: 58, Region: 28 },
  { year: '2018', Argentina: 48, Brasil: 65, Region: 32 },
  { year: '2020', Argentina: 55, Brasil: 72, Region: 35 },
  { year: '2022', Argentina: 62, Brasil: 78, Region: 38 },
  { year: '2024', Argentina: 65, Brasil: 82, Region: 40 }
];
