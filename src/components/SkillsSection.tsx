import React from 'react';
import { Wrench, CheckCircle2, Cpu, Server, Database, ShieldAlert } from 'lucide-react';
import { TECH_SKILLS } from '../data/initialData';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface SkillsSectionProps {
  lang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="skills" className="py-16 sm:py-20 border-t border-slate-900 bg-slate-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-3">
            <Wrench className="h-3.5 w-3.5" />
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t.skills.title}
          </h2>
          <p className="mt-2 text-base text-slate-400">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_SKILLS.map((group, gIdx) => {
            const title = lang === 'bn' ? group.categoryBn : group.category;

            return (
              <div
                key={gIdx}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl space-y-4 text-left"
              >
                <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    {title}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {group.items.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="text-emerald-400 font-mono font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
