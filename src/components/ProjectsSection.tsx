import React, { useState, useMemo } from 'react';
import { 
  ExternalLink, 
  Github, 
  Layers, 
  Search, 
  SlidersHorizontal,
  Info,
  CheckCircle,
  Tag,
  Code2,
  X,
  RotateCcw
} from 'lucide-react';
import { ProjectItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ProjectStatsWidget } from './ProjectStatsWidget';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  lang: Language;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  lang,
  onSelectProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[lang];

  const handleStatsFilter = (type: 'category' | 'tag', value: string) => {
    if (type === 'category') {
      setSelectedCategory(prev => (prev === value ? 'All' : value));
    } else {
      setSearchQuery(prev => (prev.toLowerCase() === value.toLowerCase() ? '' : value));
    }
  };

  // Bengali number formatting helper
  const formatCount = (num: number) => {
    if (lang !== 'bn') return num.toString();
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, d => bnDigits[Number(d)]);
  };

  // Extract all categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => set.add(p.category));
    return ['All', ...Array.from(set)];
  }, [projects]);

  // Extract all unique tech stack tags ordered by popularity
  const allTags = useMemo(() => {
    const tagCountMap = new Map<string, number>();
    projects.forEach(p => {
      p.tags.forEach(tag => {
        tagCountMap.set(tag, (tagCountMap.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [projects]);

  // Filter projects dynamically by category, title, tech stack tags, or description
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const titleMatch = (p.title + ' ' + (p.titleBn || '')).toLowerCase().includes(query);
      const descMatch = (p.description + ' ' + (p.descriptionBn || '') + ' ' + (p.subtitle || '') + ' ' + (p.subtitleBn || '')).toLowerCase().includes(query);
      const tagMatch = p.tags.some(tag => tag.toLowerCase().includes(query));
      const catMatch = p.category.toLowerCase().includes(query);

      return matchesCat && (titleMatch || descMatch || tagMatch || catMatch);
    });
  }, [projects, selectedCategory, searchQuery]);

  // Helper to determine if a tag matches the current search query
  const isTagMatched = (tag: string) => {
    const query = searchQuery.toLowerCase().trim();
    return query.length > 0 && tag.toLowerCase().includes(query);
  };

  return (
    <section id="projects" className="py-16 sm:py-20 border-t border-slate-900 bg-slate-950/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/40 px-3.5 py-1 text-xs font-semibold text-sky-400 mb-3">
            <Layers className="h-3.5 w-3.5" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t.projects.title}
          </h2>
          <p className="mt-2 text-base text-slate-400">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Dynamic Search Bar & Tech Filter Header */}
        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
          {/* Main Search Input */}
          <div className="relative">
            <label htmlFor="project-search-input" className="sr-only">
              {t.projects.searchPlaceholder}
            </label>
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-sky-400" />
              <input
                id="project-search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.projects.searchPlaceholder}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/85 py-3.5 pl-12 pr-28 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
                  title={t.projects.clearSearch}
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{t.projects.clearSearch}</span>
                </button>
              )}
            </div>
          </div>

          {/* Popular Tech Stack Chips (Quick Filters) */}
          {allTags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 mr-1.5 py-0.5">
                <Code2 className="h-3.5 w-3.5 text-sky-400" />
                <span>{t.projects.quickTechTitle}</span>
              </div>
              {allTags.slice(0, 10).map(tag => {
                const isSelected = searchQuery.toLowerCase().trim() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(isSelected ? '' : tag)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-xs transition cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500 text-white font-bold border border-sky-400 shadow-md shadow-sky-500/25 ring-1 ring-sky-300'
                        : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{tag}</span>
                    {isSelected && <X className="h-3 w-3 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Categories & Results Status Row */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3.5 border-t border-slate-800/80">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map(cat => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 font-bold'
                        : 'bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat === 'All' ? t.projects.filterAll : cat}
                  </button>
                );
              })}
            </div>

            {/* Live Count & Clear Filters Button */}
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950/90 px-3 py-1.5 text-slate-300 border border-slate-800 font-medium">
                <SlidersHorizontal className="h-3.5 w-3.5 text-sky-400" />
                <span>
                  {t.projects.showingResults}{' '}
                  <strong className="text-white font-bold">{formatCount(filteredProjects.length)}</strong>{' '}
                  {t.projects.ofProjects}{' '}
                  <span className="text-slate-400">{formatCount(projects.length)}</span>{' '}
                  {t.projects.projectsCount}
                </span>
              </div>

              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-950/20 px-2.5 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-900/40 hover:text-white transition cursor-pointer"
                  title={t.projects.clearAllFilters}
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>{t.projects.clearAllFilters}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Project Distribution & Tech Stack Statistics Widget (Recharts) */}
        <ProjectStatsWidget
          projects={projects}
          lang={lang}
          onSelectFilter={handleStatsFilter}
          activeCategory={selectedCategory}
          activeTag={searchQuery}
        />

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center max-w-xl mx-auto">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/80 text-slate-400 mb-4 border border-slate-700">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-white">
              {t.projects.noProjects}
            </h3>
            <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
              {t.projects.noProjectsHint}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-500 transition cursor-pointer shadow-lg shadow-sky-600/25"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t.projects.clearAllFilters}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => {
              const title = lang === 'bn' ? (project.titleBn || project.title) : project.title;
              const subtitle = lang === 'bn' ? (project.subtitleBn || project.subtitle) : project.subtitle;
              const description = lang === 'bn' ? (project.descriptionBn || project.description) : project.description;
              const metrics = lang === 'bn' ? (project.metricsBn || project.metrics) : project.metrics;

              return (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/50 hover:bg-slate-900/80 transition duration-300 hover:border-slate-700 shadow-xl overflow-hidden"
                >
                  {/* Project Screenshot / Header Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-sky-400 border border-slate-700/50">
                        <Tag className="h-3 w-3" />
                        {project.category}
                      </span>
                    </div>

                    {/* Featured / Metrics badge */}
                    {metrics && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-950/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-emerald-300 border border-emerald-700/40">
                          <CheckCircle className="h-3 w-3 text-emerald-400" />
                          {metrics}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition">
                        {title}
                      </h3>
                      <p className="text-xs font-medium text-slate-400 mt-1 line-clamp-2">
                        {subtitle}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {description}
                      </p>
                    </div>

                    {/* Tech Stack Pills with active query highlight */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.slice(0, 5).map(tag => {
                        const matched = isTagMatched(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSearchQuery(tag)}
                            className={`rounded-md px-2 py-0.5 font-mono text-[11px] transition cursor-pointer ${
                              matched
                                ? 'bg-sky-500/25 text-sky-200 border border-sky-400 font-semibold shadow-sm shadow-sky-500/20'
                                : 'bg-slate-800/80 text-slate-300 border border-slate-700/40 hover:bg-slate-700 hover:text-white'
                            }`}
                            title={`Filter projects by ${tag}`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                      {project.tags.length > 5 && (
                        <span className="rounded-md bg-slate-800/50 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 self-center">
                          +{project.tags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Primary Action Buttons: Live Demo + Source Code */}
                  <div className="p-4 pt-0 border-t border-slate-800/60 mt-3 flex items-center gap-2">
                    {/* Live Demo Button */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 py-2.5 text-xs font-bold text-white shadow-md shadow-sky-600/20 transition cursor-pointer"
                      title={t.projects.demoNotice}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>{t.projects.liveDemo}</span>
                    </a>

                    {/* Source Code Button */}
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 hover:bg-slate-700/90 hover:text-white py-2.5 text-xs font-bold text-slate-200 transition cursor-pointer"
                      title={t.projects.sourceNotice}
                    >
                      <Github className="h-3.5 w-3.5 text-slate-300" />
                      <span>{t.projects.sourceCode}</span>
                    </a>

                    {/* Details Modal Trigger */}
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex items-center justify-center rounded-xl p-2.5 bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                      title={t.projects.viewDetails}
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
