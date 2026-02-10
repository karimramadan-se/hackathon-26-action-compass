import { motion } from 'framer-motion';
import { ArrowRight, TrendingDown, AlertTriangle, ShoppingCart, Clock, RefreshCw } from 'lucide-react';
import { Recommendation } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const actionConfig = {
  'Buy Now': {
    icon: ShoppingCart,
    badgeClass: 'recommendation-buy',
    color: 'text-success',
  },
  'Wait': {
    icon: Clock,
    badgeClass: 'recommendation-wait',
    color: 'text-warning',
  },
  'Re-source': {
    icon: RefreshCw,
    badgeClass: 'recommendation-resource',
    color: 'text-primary',
  },
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const navigate = useNavigate();
  const config = actionConfig[recommendation.action];
  const ActionIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Current Recommendation</h3>
          <p className="text-sm text-muted-foreground">Based on latest market analysis</p>
        </div>
        <div className={`recommendation-badge ${config.badgeClass}`}>
          <ActionIcon className="w-4 h-4" />
          {recommendation.action}
        </div>
      </div>

      {/* Confidence Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Confidence Score</span>
          <span className={`font-bold ${config.color}`}>{recommendation.confidence}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${recommendation.confidence}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-primary)' }}
          />
        </div>
      </div>

      {/* Explanation */}
      <p className="text-sm text-foreground mb-4 leading-relaxed">
        {recommendation.explanation}
      </p>

      {/* Key Drivers */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          Key Drivers
        </h4>
        <ul className="space-y-1">
          {recommendation.drivers.slice(0, 3).map((driver, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              {driver}
            </li>
          ))}
        </ul>
      </div>

      {/* Financial Impact */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg mb-4">
        <div>
          <p className="text-xs text-muted-foreground">Potential Savings</p>
          <p className="text-lg font-bold text-success">
            ${(recommendation.financialImpact.savings / 1000).toFixed(0)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Risk Reduction</p>
          <p className="text-lg font-bold text-primary flex items-center gap-1">
            <TrendingDown className="w-4 h-4" />
            {Math.abs(recommendation.financialImpact.riskDelta)}%
          </p>
        </div>
      </div>

      <Button
        onClick={() => navigate('/chat')}
        className="w-full bg-primary text-primary-foreground hover:opacity-90"
      >
        Explore in Action Compass
      </Button>
    </motion.div>
  );
}
