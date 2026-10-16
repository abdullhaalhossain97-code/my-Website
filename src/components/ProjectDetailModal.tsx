import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Shield, Calendar, Layers } from 'lucide-react';
import { ProjectItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  lang,
  onClose
}) => {
  if (!project) return null;
  const t = TRANSLATIONS[lang];

  const title = lang === 'bn' ? (project.titleBn || project.title) : project.title;
  const subtitle = lang === 'bn' ? (project.subtitleBn || project.subtitle) : project.subtitle;
  const description = lang === 'bn' ? (project.descriptionBn || project.description) : project.description;
  const metrics = lang === 'bn' ? (project.metricsBn || project.metrics) : project.metrics;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden my-8">
        
        {/* Header Image */}
        <div className="relative h-64 w-full bg-slate-950">
          <img
            src={project.image}
            alt={title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-slate-950/70 p-2 text-slate-400 hover:text-white hover:bg-slate-900 transition"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Category badge */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="rounded-lg bg-sky-600 px-3 py-1 text-xs font-bold text-white shadow">
              {project.category}
            </span>
            {metrics && (
              <span className="rounded-lg bg-emerald-950/90 border border-emerald-700/50 px-3 py-1 text-xs font-bold text-emerald-300">
                {metrics}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {title}
            </h2>
            <p className="text-sm font-medium text-sky-400 mt-1">
              {subtitle}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {lang === 'bn' ? 'প্রজেক্ট আর্কিটেকচার ও বিবরণ' : 'Architecture & Scope Overview'}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {lang === 'bn' ? 'ব্যবহৃত প্রযুক্তি ও ফ্রেমওয়ার্ক' : 'Integrated Technologies & Protocols'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-mono font-medium text-slate-200 border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span>Released: {project.createdAt}</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-bold text-white transition"
              >
                <Github className="h-4 w-4" />
                <span>{t.projects.sourceCode}</span>
              </a>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-600/25 transition"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{t.projects.liveDemo}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
