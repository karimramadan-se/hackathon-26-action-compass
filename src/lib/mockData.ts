// Mock data for the Procurement Strategist application

export interface Part {
  id: string;
  mpn: string;
  description: string;
  manufacturer: string;
  lifecycle: 'Active' | 'NRND' | 'EOL' | 'Obsolete';
  leadTime: number; // weeks
  leadTimeTrend: 'increasing' | 'stable' | 'decreasing';
  priceUsd: number;
  priceTrend: 'increasing' | 'stable' | 'decreasing';
  inventoryGlobal: number;
  riskScore: number; // 0-100
  category: string;
}

export interface InternalInventory {
  partId: string;
  quantity: number;
  location: string;
  safetyStock: number;
  coverageWeeks: number;
}

export interface Forecast {
  partId: string;
  weeklyDemand: number;
  horizon: number; // weeks
}

export interface Recommendation {
  id: string;
  partId: string;
  action: 'Buy Now' | 'Wait' | 'Re-source';
  confidence: number; // 0-100
  explanation: string;
  drivers: string[];
  tradeoffs: string[];
  financialImpact: {
    savings: number;
    riskDelta: number;
  };
  timestamp: Date;
}

export interface KPIData {
  supplyRiskIndex: number;
  demandPressureIndex: number;
  inventoryCoverageWeeks: number;
  cashExposure: number;
  costAvoidancePotential: number;
}

export interface MarketPulse {
  leadTimeTrend: { week: string; value: number }[];
  pricingTrend: { week: string; value: number }[];
  eolRiskCount: number;
  regionalConstraints: { region: string; severity: 'low' | 'medium' | 'high' }[];
}

// Mock Parts Data
export const mockParts: Part[] = [
  {
    id: 'p1',
    mpn: 'STM32F407VGT6',
    description: '32-bit ARM Cortex-M4 MCU',
    manufacturer: 'STMicroelectronics',
    lifecycle: 'Active',
    leadTime: 18,
    leadTimeTrend: 'increasing',
    priceUsd: 12.45,
    priceTrend: 'increasing',
    inventoryGlobal: 45000,
    riskScore: 72,
    category: 'MCU',
  },
  {
    id: 'p2',
    mpn: 'ATMEGA328P-PU',
    description: '8-bit AVR Microcontroller',
    manufacturer: 'Microchip',
    lifecycle: 'Active',
    leadTime: 24,
    leadTimeTrend: 'stable',
    priceUsd: 3.85,
    priceTrend: 'stable',
    inventoryGlobal: 120000,
    riskScore: 45,
    category: 'MCU',
  },
  {
    id: 'p3',
    mpn: 'LM7805CT',
    description: '5V Linear Voltage Regulator',
    manufacturer: 'Texas Instruments',
    lifecycle: 'NRND',
    leadTime: 12,
    leadTimeTrend: 'decreasing',
    priceUsd: 0.85,
    priceTrend: 'increasing',
    inventoryGlobal: 500000,
    riskScore: 58,
    category: 'Power',
  },
  {
    id: 'p4',
    mpn: 'ESP32-WROOM-32E',
    description: 'WiFi + BT Module',
    manufacturer: 'Espressif',
    lifecycle: 'Active',
    leadTime: 16,
    leadTimeTrend: 'decreasing',
    priceUsd: 4.20,
    priceTrend: 'decreasing',
    inventoryGlobal: 250000,
    riskScore: 32,
    category: 'Wireless',
  },
  {
    id: 'p5',
    mpn: 'MLCC-0805-10uF',
    description: '10µF MLCC Capacitor',
    manufacturer: 'Murata',
    lifecycle: 'Active',
    leadTime: 8,
    leadTimeTrend: 'stable',
    priceUsd: 0.12,
    priceTrend: 'stable',
    inventoryGlobal: 5000000,
    riskScore: 15,
    category: 'Passive',
  },
  {
    id: 'p6',
    mpn: 'TPS62090RGTR',
    description: 'Step-Down DC/DC Converter',
    manufacturer: 'Texas Instruments',
    lifecycle: 'EOL',
    leadTime: 52,
    leadTimeTrend: 'increasing',
    priceUsd: 2.95,
    priceTrend: 'increasing',
    inventoryGlobal: 8500,
    riskScore: 92,
    category: 'Power',
  },
  {
    id: 'p7',
    mpn: 'NRF52840-QIAA',
    description: 'Bluetooth 5.0 SoC',
    manufacturer: 'Nordic Semi',
    lifecycle: 'Active',
    leadTime: 20,
    leadTimeTrend: 'stable',
    priceUsd: 6.75,
    priceTrend: 'stable',
    inventoryGlobal: 85000,
    riskScore: 48,
    category: 'Wireless',
  },
  {
    id: 'p8',
    mpn: 'AD7606BSTZ',
    description: '16-bit 8-Channel ADC',
    manufacturer: 'Analog Devices',
    lifecycle: 'Active',
    leadTime: 28,
    leadTimeTrend: 'increasing',
    priceUsd: 28.50,
    priceTrend: 'increasing',
    inventoryGlobal: 12000,
    riskScore: 78,
    category: 'Analog',
  },
];

export const mockInventory: InternalInventory[] = [
  { partId: 'p1', quantity: 2500, location: 'Austin TX', safetyStock: 1000, coverageWeeks: 8 },
  { partId: 'p2', quantity: 15000, location: 'Austin TX', safetyStock: 5000, coverageWeeks: 24 },
  { partId: 'p3', quantity: 8000, location: 'Shenzhen', safetyStock: 3000, coverageWeeks: 12 },
  { partId: 'p4', quantity: 6000, location: 'Austin TX', safetyStock: 2000, coverageWeeks: 10 },
  { partId: 'p5', quantity: 500000, location: 'Multiple', safetyStock: 100000, coverageWeeks: 52 },
  { partId: 'p6', quantity: 450, location: 'Austin TX', safetyStock: 500, coverageWeeks: 3 },
  { partId: 'p7', quantity: 4200, location: 'Austin TX', safetyStock: 1500, coverageWeeks: 14 },
  { partId: 'p8', quantity: 800, location: 'Shenzhen', safetyStock: 400, coverageWeeks: 6 },
];

export const mockForecasts: Forecast[] = [
  { partId: 'p1', weeklyDemand: 300, horizon: 26 },
  { partId: 'p2', weeklyDemand: 600, horizon: 26 },
  { partId: 'p3', weeklyDemand: 650, horizon: 26 },
  { partId: 'p4', weeklyDemand: 580, horizon: 26 },
  { partId: 'p5', weeklyDemand: 9500, horizon: 26 },
  { partId: 'p6', weeklyDemand: 150, horizon: 26 },
  { partId: 'p7', weeklyDemand: 300, horizon: 26 },
  { partId: 'p8', weeklyDemand: 120, horizon: 26 },
];

export const mockKPIs: KPIData = {
  supplyRiskIndex: 67,
  demandPressureIndex: 54,
  inventoryCoverageWeeks: 11.4,
  cashExposure: 2850000,
  costAvoidancePotential: 485000,
};

export const mockMarketPulse: MarketPulse = {
  leadTimeTrend: [
    { week: 'W1', value: 14 },
    { week: 'W2', value: 15 },
    { week: 'W3', value: 16 },
    { week: 'W4', value: 16 },
    { week: 'W5', value: 18 },
    { week: 'W6', value: 19 },
    { week: 'W7', value: 20 },
    { week: 'W8', value: 21 },
  ],
  pricingTrend: [
    { week: 'W1', value: 100 },
    { week: 'W2', value: 102 },
    { week: 'W3', value: 101 },
    { week: 'W4', value: 105 },
    { week: 'W5', value: 108 },
    { week: 'W6', value: 107 },
    { week: 'W7', value: 112 },
    { week: 'W8', value: 115 },
  ],
  eolRiskCount: 3,
  regionalConstraints: [
    { region: 'Asia Pacific', severity: 'high' },
    { region: 'Europe', severity: 'medium' },
    { region: 'Americas', severity: 'low' },
  ],
};

export const mockCurrentRecommendation: Recommendation = {
  id: 'rec1',
  partId: 'p1',
  action: 'Buy Now',
  confidence: 87,
  explanation: 'Strong indicators suggest acting now: lead times are extending by 2 weeks/month, global inventory is declining 8% weekly, and Q3 demand forecast shows 15% increase. Current price is 12% below projected Q3 levels.',
  drivers: [
    'Lead time increasing 12% month-over-month',
    'Global inventory down 45% from 6-month high',
    'Price increase of 8% projected in next 60 days',
    'Internal coverage below safety stock threshold',
  ],
  tradeoffs: [
    'Early buy ties up $1.2M in working capital',
    'Storage costs increase by $15K/month',
    'Risk of demand forecast revision',
  ],
  financialImpact: {
    savings: 245000,
    riskDelta: -23,
  },
  timestamp: new Date(),
};

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  recommendation?: Recommendation;
}

export const mockChatHistory: ChatMessage[] = [
  {
    id: 'c1',
    role: 'user',
    content: 'Should I buy $2M of MCU stock now?',
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: 'c2',
    role: 'assistant',
    content: `Based on my analysis of the STM32F407VGT6 and market conditions, I recommend **Buy Now** with 87% confidence.

**Key Factors:**
• Lead times have increased from 14 to 21 weeks over the past 2 months
• Global distributor inventory is at a 6-month low
• Price is currently $12.45, projected to rise 8% by Q3

**Financial Impact:**
• Estimated cost avoidance: $245,000
• Risk reduction: 23% improvement in supply continuity

**Recommended Action:**
Place orders for 60% of forecasted demand immediately, with remaining 40% in 30 days to hedge against forecast changes.`,
    timestamp: new Date(Date.now() - 240000),
    recommendation: mockCurrentRecommendation,
  },
];

export function generateRecommendation(partId: string, scenario?: { forecastChange: number; inventoryChange: number; priceChange: number; leadTimeChange: number }): Recommendation {
  const part = mockParts.find(p => p.id === partId) || mockParts[0];
  const inventory = mockInventory.find(i => i.partId === partId);
  
  let action: 'Buy Now' | 'Wait' | 'Re-source' = 'Wait';
  let confidence = 75;
  
  // Simple rule-based logic for demo
  const effectiveRisk = part.riskScore + (scenario?.leadTimeChange || 0) * 2 + (scenario?.priceChange || 0);
  const effectiveCoverage = (inventory?.coverageWeeks || 10) * (1 + (scenario?.inventoryChange || 0) / 100);
  
  if (effectiveRisk > 70 && effectiveCoverage < 8) {
    action = 'Buy Now';
    confidence = 85 + Math.floor(Math.random() * 10);
  } else if (part.lifecycle === 'EOL' || part.lifecycle === 'Obsolete') {
    action = 'Re-source';
    confidence = 90 + Math.floor(Math.random() * 8);
  } else if (effectiveCoverage > 16 && effectiveRisk < 40) {
    action = 'Wait';
    confidence = 70 + Math.floor(Math.random() * 15);
  }
  
  return {
    id: `rec-${Date.now()}`,
    partId,
    action,
    confidence,
    explanation: `Analysis based on current market conditions and ${scenario ? 'modified scenario parameters' : 'default assumptions'}.`,
    drivers: [
      `${part.lifecycle} lifecycle status`,
      `${part.leadTime} week lead time (${part.leadTimeTrend})`,
      `Price trend: ${part.priceTrend}`,
      `Global inventory: ${part.inventoryGlobal.toLocaleString()} units`,
    ],
    tradeoffs: [
      'Working capital impact',
      'Storage and handling costs',
      'Demand forecast uncertainty',
    ],
    financialImpact: {
      savings: Math.floor(Math.random() * 300000) + 50000,
      riskDelta: action === 'Buy Now' ? -20 - Math.floor(Math.random() * 15) : Math.floor(Math.random() * 10),
    },
    timestamp: new Date(),
  };
}
