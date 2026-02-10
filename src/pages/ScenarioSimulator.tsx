import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Clock,
  AlertTriangle,
  ShoppingCart,
  RefreshCw,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { generateRecommendation, mockParts } from '@/lib/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ScenarioSimulator() {
  const [selectedPart, setSelectedPart] = useState(mockParts[0].id);
  const [forecastChange, setForecastChange] = useState([0]);
  const [inventoryChange, setInventoryChange] = useState([0]);
  const [priceChange, setPriceChange] = useState([0]);
  const [leadTimeChange, setLeadTimeChange] = useState([0]);

  const part = mockParts.find((p) => p.id === selectedPart) || mockParts[0];

  const recommendation = useMemo(() => {
    return generateRecommendation(selectedPart, {
      forecastChange: forecastChange[0],
      inventoryChange: inventoryChange[0],
      priceChange: priceChange[0],
      leadTimeChange: leadTimeChange[0],
    });
  }, [selectedPart, forecastChange, inventoryChange, priceChange, leadTimeChange]);

  const actionConfig = {
    'Buy Now': {
      icon: ShoppingCart,
      color: 'text-success',
      bg: 'bg-success/20',
      border: 'border-success/30',
    },
    Wait: {
      icon: Clock,
      color: 'text-warning',
      bg: 'bg-warning/20',
      border: 'border-warning/30',
    },
    'Re-source': {
      icon: RefreshCw,
      color: 'text-primary',
      bg: 'bg-primary/20',
      border: 'border-primary/30',
    },
  };

  const config = actionConfig[recommendation.action];
  const ActionIcon = config.icon;

  const resetScenario = () => {
    setForecastChange([0]);
    setInventoryChange([0]);
    setPriceChange([0]);
    setLeadTimeChange([0]);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="section-title">Scenario Simulator</h1>
            <p className="section-subtitle">
              Explore what-if scenarios to optimize procurement decisions
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Adjust Parameters</h3>
            <button
              onClick={resetScenario}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Part Selector */}
          <div className="mb-8">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Select Part
            </label>
            <Select value={selectedPart} onValueChange={setSelectedPart}>
              <SelectTrigger className="w-full bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockParts.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.mpn} - {p.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Forecast Change */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Demand Forecast Change
                  </span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    forecastChange[0] > 0
                      ? 'text-destructive'
                      : forecastChange[0] < 0
                      ? 'text-success'
                      : 'text-muted-foreground'
                  }`}
                >
                  {forecastChange[0] > 0 ? '+' : ''}
                  {forecastChange[0]}%
                </span>
              </div>
              <Slider
                value={forecastChange}
                onValueChange={setForecastChange}
                min={-50}
                max={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>-50%</span>
                <span>+50%</span>
              </div>
            </div>

            {/* Inventory Change */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Internal Inventory Adjustment
                  </span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    inventoryChange[0] > 0
                      ? 'text-success'
                      : inventoryChange[0] < 0
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }`}
                >
                  {inventoryChange[0] > 0 ? '+' : ''}
                  {inventoryChange[0]}%
                </span>
              </div>
              <Slider
                value={inventoryChange}
                onValueChange={setInventoryChange}
                min={-50}
                max={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>-50%</span>
                <span>+50%</span>
              </div>
            </div>

            {/* Price Change */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Expected Price Change
                  </span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    priceChange[0] > 0
                      ? 'text-destructive'
                      : priceChange[0] < 0
                      ? 'text-success'
                      : 'text-muted-foreground'
                  }`}
                >
                  {priceChange[0] > 0 ? '+' : ''}
                  {priceChange[0]}%
                </span>
              </div>
              <Slider
                value={priceChange}
                onValueChange={setPriceChange}
                min={-30}
                max={30}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>-30%</span>
                <span>+30%</span>
              </div>
            </div>

            {/* Lead Time Change */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Lead Time Extension
                  </span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    leadTimeChange[0] > 0
                      ? 'text-destructive'
                      : leadTimeChange[0] < 0
                      ? 'text-success'
                      : 'text-muted-foreground'
                  }`}
                >
                  {leadTimeChange[0] > 0 ? '+' : ''}
                  {leadTimeChange[0]} weeks
                </span>
              </div>
              <Slider
                value={leadTimeChange}
                onValueChange={setLeadTimeChange}
                min={-8}
                max={16}
                step={2}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>-8 wks</span>
                <span>+16 wks</span>
              </div>
            </div>
          </div>

          {/* Part Info */}
          <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-3">
              Current Part Status: {part.mpn}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Lifecycle</p>
                <p className="font-medium text-foreground">{part.lifecycle}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Base Lead Time</p>
                <p className="font-medium text-foreground">{part.leadTime} weeks</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Price</p>
                <p className="font-medium text-foreground">${part.priceUsd.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Risk Score</p>
                <p className="font-medium text-foreground">{part.riskScore}/100</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Result Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Recommendation */}
          <div className="glass-card p-6 gradient-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Scenario Recommendation
            </h3>

            <div
              className={`flex items-center gap-3 p-4 rounded-lg ${config.bg} border ${config.border} mb-4`}
            >
              <ActionIcon className={`w-8 h-8 ${config.color}`} />
              <div>
                <p className={`text-xl font-bold ${config.color}`}>
                  {recommendation.action}
                </p>
                <p className="text-sm text-muted-foreground">
                  {recommendation.confidence}% confidence
                </p>
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="mb-4">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${recommendation.confidence}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-primary)' }}
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {recommendation.explanation}
            </p>

            {/* Key Drivers */}
            <div className="space-y-2">
              {recommendation.drivers.slice(0, 3).map((driver, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  {driver}
                </div>
              ))}
            </div>
          </div>

          {/* Financial Impact */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Projected Impact
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Savings</span>
                </div>
                <p className="text-2xl font-bold text-success">
                  ${(recommendation.financialImpact.savings / 1000).toFixed(0)}K
                </p>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Risk Δ</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {recommendation.financialImpact.riskDelta > 0 ? '+' : ''}
                  {recommendation.financialImpact.riskDelta}%
                </p>
              </div>
            </div>

            {/* Tradeoffs */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-2">Tradeoffs:</p>
              <ul className="space-y-1">
                {recommendation.tradeoffs.map((tradeoff, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5" />
                    {tradeoff}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
