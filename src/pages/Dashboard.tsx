import { motion } from 'framer-motion';
import {
  ShieldAlert,
  TrendingUp,
  Package,
  DollarSign,
  PiggyBank,
  RefreshCw,
} from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { RecommendationCard } from '@/components/dashboard/RecommendationCard';
import { MarketPulseChart } from '@/components/dashboard/MarketPulseChart';
import {
  mockKPIs,
  mockCurrentRecommendation,
  mockMarketPulse,
  mockParts,
} from '@/lib/mockData';

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="section-title">Executive Dashboard</h1>
            <p className="section-subtitle mt-1">
              Real-time procurement intelligence and recommendations
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="w-4 h-4" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <KPICard
          title="Supply Risk Index"
          value={mockKPIs.supplyRiskIndex}
          subtitle="Score out of 100"
          trend="up"
          trendValue="+8%"
          icon={ShieldAlert}
          variant="warning"
          delay={0}
        />
        <KPICard
          title="Demand Pressure"
          value={mockKPIs.demandPressureIndex}
          subtitle="Score out of 100"
          trend="stable"
          trendValue="0%"
          icon={TrendingUp}
          variant="default"
          delay={0.1}
        />
        <KPICard
          title="Inventory Coverage"
          value={`${mockKPIs.inventoryCoverageWeeks} wks`}
          subtitle="Avg across parts"
          trend="down"
          trendValue="-2.1 wks"
          icon={Package}
          variant="danger"
          delay={0.2}
        />
        <KPICard
          title="Cash Exposure"
          value={`$${(mockKPIs.cashExposure / 1000000).toFixed(1)}M`}
          subtitle="At-risk inventory value"
          trend="up"
          trendValue="+$420K"
          icon={DollarSign}
          variant="warning"
          delay={0.3}
        />
        <KPICard
          title="Cost Avoidance"
          value={`$${(mockKPIs.costAvoidancePotential / 1000).toFixed(0)}K`}
          subtitle="Potential savings"
          icon={PiggyBank}
          variant="success"
          delay={0.4}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommendation Card */}
        <div className="lg:col-span-1">
          <RecommendationCard recommendation={mockCurrentRecommendation} />
        </div>

        {/* Market Pulse */}
        <div className="lg:col-span-2">
          <MarketPulseChart data={mockMarketPulse} />
        </div>
      </div>

      {/* Critical Parts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Critical Parts Watchlist</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">MPN</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Lifecycle</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Lead Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price Trend</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {mockParts
                .filter((p) => p.riskScore > 50)
                .slice(0, 5)
                .map((part, index) => (
                  <motion.tr
                    key={part.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-foreground">{part.mpn}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{part.description}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          part.lifecycle === 'Active'
                            ? 'bg-success/20 text-success'
                            : part.lifecycle === 'EOL'
                            ? 'bg-destructive/20 text-destructive'
                            : 'bg-warning/20 text-warning'
                        }`}
                      >
                        {part.lifecycle}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {part.leadTime} wks
                      {part.leadTimeTrend === 'increasing' && (
                        <TrendingUp className="inline w-3 h-3 ml-1 text-destructive" />
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-sm ${
                          part.priceTrend === 'increasing'
                            ? 'text-destructive'
                            : part.priceTrend === 'decreasing'
                            ? 'text-success'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {part.priceTrend === 'increasing'
                          ? '↑'
                          : part.priceTrend === 'decreasing'
                          ? '↓'
                          : '→'}{' '}
                        ${part.priceUsd.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`risk-indicator ${
                            part.riskScore > 70
                              ? 'risk-high'
                              : part.riskScore > 40
                              ? 'risk-medium'
                              : 'risk-low'
                          }`}
                        />
                        <span className="text-sm font-medium text-foreground">{part.riskScore}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
