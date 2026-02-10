import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Upload,
  Search,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockParts, mockInventory, Part } from '@/lib/mockData';

export default function PartRiskAnalysis() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'risk' | 'leadTime' | 'price'>('risk');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedPart, setExpandedPart] = useState<string | null>(null);

  const categories = ['all', ...new Set(mockParts.map((p) => p.category))];

  const filteredParts = mockParts
    .filter((part) => {
      const matchesSearch =
        part.mpn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || part.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'risk':
          comparison = a.riskScore - b.riskScore;
          break;
        case 'leadTime':
          comparison = a.leadTime - b.leadTime;
          break;
        case 'price':
          comparison = a.priceUsd - b.priceUsd;
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-destructive';
    if (score >= 40) return 'text-warning';
    return 'text-success';
  };

  const getRiskBg = (score: number) => {
    if (score >= 70) return 'bg-destructive/10 border-destructive/20';
    if (score >= 40) return 'bg-warning/10 border-warning/20';
    return 'bg-success/10 border-success/20';
  };

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'increasing') return <TrendingUp className="w-4 h-4 text-destructive" />;
    if (trend === 'decreasing') return <TrendingDown className="w-4 h-4 text-success" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="section-title">Part Risk Analysis</h1>
              <p className="section-subtitle">
                Analyze risk profiles for critical components
              </p>
            </div>
          </div>

          <Button className="bg-primary text-white hover:opacity-90">
            <Upload className="w-4 h-4 mr-2" />
            Upload BOM
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 mb-6"
      >
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by MPN or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-40">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-secondary">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="w-40">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger className="bg-secondary">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="risk">Risk Score</SelectItem>
                <SelectItem value="leadTime">Lead Time</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="bg-secondary"
          >
            {sortOrder === 'desc' ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </Button>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <div className="glass-card p-4">
          <p className="text-sm text-muted-foreground">Total Parts</p>
          <p className="text-2xl font-bold text-foreground">{filteredParts.length}</p>
        </div>
        <div className="glass-card p-4 border-l-4 border-l-destructive">
          <p className="text-sm text-muted-foreground">High Risk</p>
          <p className="text-2xl font-bold text-destructive">
            {filteredParts.filter((p) => p.riskScore >= 70).length}
          </p>
        </div>
        <div className="glass-card p-4 border-l-4 border-l-warning">
          <p className="text-sm text-muted-foreground">Medium Risk</p>
          <p className="text-2xl font-bold text-warning">
            {filteredParts.filter((p) => p.riskScore >= 40 && p.riskScore < 70).length}
          </p>
        </div>
        <div className="glass-card p-4 border-l-4 border-l-success">
          <p className="text-sm text-muted-foreground">Low Risk</p>
          <p className="text-2xl font-bold text-success">
            {filteredParts.filter((p) => p.riskScore < 40).length}
          </p>
        </div>
      </motion.div>

      {/* Parts List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredParts.map((part, index) => {
            const inventory = mockInventory.find((i) => i.partId === part.id);
            const isExpanded = expandedPart === part.id;

            return (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card overflow-hidden"
              >
                {/* Main Row */}
                <button
                  onClick={() => setExpandedPart(isExpanded ? null : part.id)}
                  className="w-full p-4 flex items-center gap-4 text-left hover:bg-secondary/30 transition-colors"
                >
                  {/* Risk Score */}
                  <div
                    className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center border ${getRiskBg(
                      part.riskScore
                    )}`}
                  >
                    <span className={`text-2xl font-bold ${getRiskColor(part.riskScore)}`}>
                      {part.riskScore}
                    </span>
                    <span className="text-xs text-muted-foreground">Risk</span>
                  </div>

                  {/* Part Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{part.mpn}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          part.lifecycle === 'Active'
                            ? 'bg-success/20 text-success'
                            : part.lifecycle === 'EOL'
                            ? 'bg-destructive/20 text-destructive'
                            : 'bg-warning/20 text-warning'
                        }`}
                      >
                        {part.lifecycle}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{part.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {part.manufacturer} • {part.category}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="hidden md:flex items-center gap-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <TrendIcon trend={part.leadTimeTrend} />
                        <span className="text-lg font-semibold text-foreground">
                          {part.leadTime}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Lead Time (wks)</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <TrendIcon trend={part.priceTrend} />
                        <span className="text-lg font-semibold text-foreground">
                          ${part.priceUsd.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Unit Price</p>
                    </div>

                    <div className="text-center">
                      <span className="text-lg font-semibold text-foreground">
                        {(part.inventoryGlobal / 1000).toFixed(0)}K
                      </span>
                      <p className="text-xs text-muted-foreground">Global Inventory</p>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 border-t border-border">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                          {/* Risk Factors */}
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-warning" />
                              Risk Factors
                            </h4>
                            <ul className="space-y-2">
                              {part.lifecycle !== 'Active' && (
                                <li className="text-sm text-destructive flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                                  Non-active lifecycle status
                                </li>
                              )}
                              {part.leadTimeTrend === 'increasing' && (
                                <li className="text-sm text-warning flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                                  Lead times extending
                                </li>
                              )}
                              {part.priceTrend === 'increasing' && (
                                <li className="text-sm text-warning flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                                  Price trending upward
                                </li>
                              )}
                              {inventory && inventory.coverageWeeks < 8 && (
                                <li className="text-sm text-destructive flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                                  Low inventory coverage
                                </li>
                              )}
                            </ul>
                          </div>

                          {/* Internal Inventory */}
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">
                              Internal Inventory
                            </h4>
                            {inventory ? (
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">On Hand</span>
                                  <span className="font-medium text-foreground">
                                    {inventory.quantity.toLocaleString()} units
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Safety Stock</span>
                                  <span className="font-medium text-foreground">
                                    {inventory.safetyStock.toLocaleString()} units
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Coverage</span>
                                  <span
                                    className={`font-medium ${
                                      inventory.coverageWeeks < 8
                                        ? 'text-destructive'
                                        : 'text-success'
                                    }`}
                                  >
                                    {inventory.coverageWeeks} weeks
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Location</span>
                                  <span className="font-medium text-foreground">
                                    {inventory.location}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No inventory data available
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">
                              Recommended Actions
                            </h4>
                            <div className="space-y-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View in SiliconExpert
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start"
                              >
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                Set Alert
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
