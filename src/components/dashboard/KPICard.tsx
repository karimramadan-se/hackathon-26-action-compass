import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  delay?: number;
}

const variantStyles = {
  default: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-destructive',
};

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  variant = 'default',
  delay = 0,
}: KPICardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-destructive' : trend === 'down' ? 'text-success' : 'text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="kpi-card relative overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className={`text-3xl font-bold ${variantStyles[variant]}`}>{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center ${variantStyles[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className={`flex items-center gap-1 mt-3 text-sm ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="font-medium">{trendValue}</span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
      )}

      {/* Decorative gradient */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-xl" />
    </motion.div>
  );
}
