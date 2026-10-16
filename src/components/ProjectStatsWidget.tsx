import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  Layers, 
  Cpu, 
  Globe2, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Filter
} from 'lucide-react';
import { ProjectItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ProjectStatsWidgetProps {
  projects: ProjectItem[];
  lang: Language;
  onSelectFilter: (type: 'category' | 'tag', value: string) => void;
  activeCategory?: string;
  activeTag?: string;
}

const COLOR_PALETTE = [
  '#0284c7', // Sky 600
  '#6366f1', // Indigo 500
  '#10b981', // Emerald 500
  '#8b5cf6', // Violet 500
  '#06b6d4', // Cyan 500
  '#f59e0b', // Amber 500
  '#ec4899', // Pink 500
  '#14b8a6', // Teal 500
  '#f43f5e', // Rose 500
  '#3b82f6'  // Blue 500
];

export const ProjectStatsWidget: React.FC<ProjectStatsWidgetProps> = ({
  projects,
  lang,
  onSelectFilter,
  activeCategory,
  activeTag
}) => {
  const [metricMode, setMetricMode] = useState<'tech' | 'category'>('tech');
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [isExpanded, setIsExpanded] = useState(true);

  const t = TRANSLATIONS[lang];
  const pT = t.projects;

  // Bengali number formatting helper
  const formatCount = (num: number) => {
    if (lang !== 'bn') return num.toString();
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, d => bnDigits[Number(d)]);
  };

  // Tech stack distribution
  const techData = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach(p => {
      p.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count], index) => ({
        name,
        count,
        percentage: Math.round((count / projects.length) * 100),
        color: COLOR_PALETTE[index % COLOR_PALETTE.length]
      }));
  }, [projects]);

  // Category distribution
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count], index) => ({
        name,
        count,
        percentage: Math.round((count / projects.length) * 100),
        color: COLOR_PALETTE[(index + 2) % COLOR_PALETTE.length]
      }));
  }, [projects]);

  const activeData = metricMode === 'tech' ? techData : categoryData;
  const totalUniqueTech = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => set.add(t)));
    return set.size;
  }, [projects]);

  const totalCategories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => set.add(p.category));
    return set.size;
  }, [projects]);

  // Custom Recharts Dark Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-700/80 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md text-xs z-50">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: data.color || '#38bdf8' }}
            />
            <span className="font-bold text-white font-mono text-sm">{data.name}</span>
          </div>
          <div className="text-slate-300">
            <span>
              {lang === 'bn' ? 'ব্যবহার:' : 'Used in:'}{' '}
              <strong className="text-sky-400 font-bold">{formatCount(data.count)}</strong>{' '}
              {lang === 'bn' ? 'টি প্রজেক্ট' : 'projects'} ({formatCount(data.percentage)}%)
            </span>
          </div>
          <div className="mt-1.5 pt-1.5 border-t border-slate-800 text-[10px] text-sky-400/90 flex items-center gap-1 font-medium">
            <Filter className="h-3 w-3" />
            <span>{pT.chartHint}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6 backdrop-blur-md shadow-xl transition-all">
      {/* Top Header & Accordion Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-950/40 px-3 py-0.5 text-xs font-semibold text-sky-400 mb-2">
            <Sparkles className="h-3 w-3" />
            <span>{pT.statsBadge}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>{pT.statsTitle}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
            {pT.statsSubtitle}
          </p>
        </div>

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="inline-flex items-center self-start sm:self-auto gap-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition cursor-pointer"
        >
          {isExpanded ? (
            <>
              <span>{lang === 'bn' ? 'সংক্ষেপ করুন' : 'Collapse'}</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>{lang === 'bn' ? 'অ্যানালিটিক্স চার্ট খুলুন' : 'Show Analytics'}</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
        {/* Total Projects */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-3.5 transition hover:border-slate-700">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">{pT.totalProjectsLabel}</span>
            <Globe2 className="h-4 w-4 text-sky-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white">
            {formatCount(projects.length)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {lang === 'bn' ? 'সম্পূর্ণ লাইভ ও প্রোডাকশন' : '100% Production Grade'}
          </div>
        </div>

        {/* Unique Tech Stacks */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-3.5 transition hover:border-slate-700">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">{pT.totalTechStacksLabel}</span>
            <Cpu className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white">
            {formatCount(totalUniqueTech)}+
          </div>
          <div className="text-[11px] text-indigo-300 mt-0.5">
            React, Next.js, Node, TS, etc.
          </div>
        </div>

        {/* Architecture Domains */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-3.5 transition hover:border-slate-700">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">{pT.totalDomainsLabel}</span>
            <Layers className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white">
            {formatCount(totalCategories)}
          </div>
          <div className="text-[11px] text-emerald-300 mt-0.5">
            Full-Stack, Cloud, AI, Systems
          </div>
        </div>

        {/* Live / Open Source Ratio */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-3.5 transition hover:border-slate-700">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">{pT.openSourceRatioLabel}</span>
            <CheckCircle2 className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-400">
            ১০০%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {lang === 'bn' ? 'লাইভ ডেমো ও গিটহাব লিংক' : 'Live Demos & Repositories'}
          </div>
        </div>
      </div>

      {/* Expanded Chart Section */}
      {isExpanded && (
        <div className="pt-3 border-t border-slate-800/70">
          {/* Controls: Mode Switcher & Chart Type Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            {/* Metric Mode Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-950/90 border border-slate-800">
              <button
                type="button"
                onClick={() => setMetricMode('tech')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  metricMode === 'tech'
                    ? 'bg-sky-600 text-white shadow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {pT.distributionByTech}
              </button>
              <button
                type="button"
                onClick={() => setMetricMode('category')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  metricMode === 'category'
                    ? 'bg-sky-600 text-white shadow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {pT.distributionByCategory}
              </button>
            </div>

            {/* Chart Type Toggle (Bar vs Pie) */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-950/90 border border-slate-800">
              <button
                type="button"
                onClick={() => setChartType('bar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  chartType === 'bar'
                    ? 'bg-indigo-600 text-white shadow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={pT.chartBarView}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>{pT.chartBarView}</span>
              </button>
              <button
                type="button"
                onClick={() => setChartType('pie')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  chartType === 'pie'
                    ? 'bg-indigo-600 text-white shadow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={pT.chartPieView}
              >
                <PieIcon className="h-3.5 w-3.5" />
                <span>{pT.chartPieView}</span>
              </button>
            </div>
          </div>

          {/* Interactive Recharts Container */}
          <div className="h-64 w-full bg-slate-950/50 rounded-xl p-3 border border-slate-800/80">
            {chartType === 'bar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activeData}
                  margin={{ top: 15, right: 10, left: -20, bottom: 25 }}
                  onClick={(state: any) => {
                    if (state && state.activePayload && state.activePayload[0]) {
                      const item = state.activePayload[0].payload;
                      onSelectFilter(metricMode === 'tech' ? 'tag' : 'category', item.name);
                    }
                  }}
                >
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(56, 189, 248, 0.08)' }} />
                  <Bar
                    dataKey="count"
                    radius={[6, 6, 0, 0]}
                    className="cursor-pointer"
                  >
                    {activeData.map((entry, index) => {
                      const isHighlighted =
                        (metricMode === 'tech' && activeTag?.toLowerCase() === entry.name.toLowerCase()) ||
                        (metricMode === 'category' && activeCategory === entry.name);
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={isHighlighted ? '#ffffff' : 'none'}
                          strokeWidth={isHighlighted ? 2 : 0}
                          opacity={isHighlighted ? 1 : 0.85}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={activeData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    className="cursor-pointer"
                    onClick={(entry: any) => {
                      if (entry && entry.name) {
                        onSelectFilter(metricMode === 'tech' ? 'tag' : 'category', entry.name);
                      }
                    }}
                  >
                    {activeData.map((entry, index) => {
                      const isHighlighted =
                        (metricMode === 'tech' && activeTag?.toLowerCase() === entry.name.toLowerCase()) ||
                        (metricMode === 'category' && activeCategory === entry.name);
                      return (
                        <Cell
                          key={`pie-cell-${index}`}
                          fill={entry.color}
                          stroke={isHighlighted ? '#ffffff' : '#0f172a'}
                          strokeWidth={isHighlighted ? 2.5 : 1}
                        />
                      );
                    })}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Quick Legend Chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-800/60 text-xs">
            {activeData.map(item => (
              <button
                key={item.name}
                type="button"
                onClick={() => onSelectFilter(metricMode === 'tech' ? 'tag' : 'category', item.name)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950/80 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition cursor-pointer"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-mono">{item.name}</span>
                <span className="text-slate-400 font-bold">({formatCount(item.count)})</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
