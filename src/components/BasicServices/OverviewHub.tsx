import React, { useState } from 'react';
import { BookOpen, Calendar, ShieldCheck, Megaphone, MapPin, Sparkles } from 'lucide-react';
import { MyCourse } from './MyCourse';
import { SchoolCalendar } from './SchoolCalendar';
import { AcademyRules } from './AcademyRules';
import { NoticeBoard } from './NoticeBoard';
import { ContactCard } from './ContactCard';

export const OverviewHub: React.FC = () => {
  const [subSection, setSubSection] = useState<'all' | 'course' | 'calendar' | 'rules' | 'notices' | 'contact'>('all');

  const navs = [
    { id: 'all', label: 'Tots els serveis bàsics', icon: Sparkles },
    { id: 'course', label: 'El meu Curs', icon: BookOpen },
    { id: 'calendar', label: 'Calendari Escolar', icon: Calendar },
    { id: 'rules', label: 'Normativa & Menors', icon: ShieldCheck },
    { id: 'notices', label: 'Tauler de Notícies', icon: Megaphone },
    { id: 'contact', label: 'Contacte & Mapa', icon: MapPin },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Sub-nav quick filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold">
        {navs.map((n) => {
          const Icon = n.icon;
          const isSelected = subSection === n.id;

          return (
            <button
              key={n.id}
              onClick={() => setSubSection(n.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{n.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render sub-sections */}
      {(subSection === 'all' || subSection === 'course') && <MyCourse />}
      {(subSection === 'all' || subSection === 'calendar') && <SchoolCalendar />}
      {(subSection === 'all' || subSection === 'rules') && <AcademyRules />}
      {(subSection === 'all' || subSection === 'notices') && <NoticeBoard />}
      {(subSection === 'all' || subSection === 'contact') && <ContactCard />}
    </div>
  );
};
