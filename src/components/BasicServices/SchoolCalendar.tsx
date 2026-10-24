import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Download,
  AlertCircle,
  GraduationCap,
  Sparkles,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  category: 'inici_final' | 'festiu' | 'examen_escola' | 'oficial_cambridge' | 'oficial_goethe';
  description: string;
  badge: string;
}

const ACADEMIC_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Inici del Curs Escolar 2026-2027',
    date: '14 de Setembre 2026',
    category: 'inici_final',
    description: 'Comencen les classes regulars a totes les aules de Torras i Bages.',
    badge: 'Inici',
  },
  {
    id: 'ev-2',
    title: 'Festiu: Dia de la Hispanitat',
    date: '12 d’Octubre 2026',
    category: 'festiu',
    description: 'L’acadèmia romandrà tancada.',
    badge: 'Festiu',
  },
  {
    id: 'ev-3',
    title: 'Festiu: Tots Sants',
    date: '01 de Novembre 2026',
    category: 'festiu',
    description: 'Festa estatal.',
    badge: 'Festiu',
  },
  {
    id: 'ev-4',
    title: 'Vacances de Nadal i Any Nou',
    date: '23 de Desembre 2026 - 06 de Gener 2027',
    category: 'festiu',
    description: 'Pausa nadalenca. Retorn a les aules el dijous 7 de gener.',
    badge: 'Vacances',
  },
  {
    id: 'ev-5',
    title: 'Setmana de Mock Exams de Gener (Mid-term)',
    date: '18 al 23 de Gener 2027',
    category: 'examen_escola',
    description: 'Simulacres generals en condicions oficials per a B2 First, C1 Advanced i Goethe.',
    badge: 'Exàmens Escola',
  },
  {
    id: 'ev-6',
    title: 'Lliurament d’Informes de Febrer a les Famílies',
    date: '12 de Febrer 2027',
    category: 'inici_final',
    description: 'Publicació dels butlletins trimestrals amb valoració per competències.',
    badge: 'Avaluació',
  },
  {
    id: 'ev-7',
    title: 'Vacances de Setmana Santa',
    date: '22 al 29 de Març 2027',
    category: 'festiu',
    description: 'Setmana Santa.',
    badge: 'Vacances',
  },
  {
    id: 'ev-8',
    title: 'Setmana d’Exàmens Finals de Juny',
    date: '01 al 05 de Juny 2027',
    category: 'examen_escola',
    description: 'Avaluació final de curs i revisió dels últims detalls d’examen.',
    badge: 'Exàmens Finals',
  },
  {
    id: 'ev-9',
    title: 'Convocatòria Oficial Cambridge B2 First for Schools',
    date: '12 de Juny 2027 (Dissabte)',
    category: 'oficial_cambridge',
    description: 'Examen oficial de Cambridge English organitzat a la seu examinadora.',
    badge: 'Cambridge B2',
  },
  {
    id: 'ev-10',
    title: 'Convocatòria Oficial Cambridge C1 Advanced',
    date: '19 de Juny 2027 (Dissabte)',
    category: 'oficial_cambridge',
    description: 'Examen oficial internacional C1 CAE.',
    badge: 'Cambridge C1',
  },
  {
    id: 'ev-11',
    title: 'Convocatòria Oficial Goethe-Zertifikat B1 / B2',
    date: '26 de Juny 2027',
    category: 'oficial_goethe',
    description: 'Examen oficial del Goethe-Institut a Barcelona.',
    badge: 'Goethe B1/B2',
  },
  {
    id: 'ev-12',
    title: 'Festa de Cloenda i Lliurament de Diplomes',
    date: '29 de Juny 2027',
    category: 'inici_final',
    description: 'Comiat de curs, trobada amb famílies i anunci dels intensius d’estiu.',
    badge: 'Final de Curs',
  },
];

export const SchoolCalendar: React.FC = () => {
  const { isTeenMode, showToast } = useApp();
  const [filter, setFilter] = useState<string>('all');

  const filteredEvents = ACADEMIC_EVENTS.filter((e) => {
    if (filter === 'all') return true;
    if (filter === 'festius') return e.category === 'festiu';
    if (filter === 'exàmens') return e.category === 'examen_escola';
    if (filter === 'oficials') return e.category.startsWith('oficial_');
    return true;
  });

  const downloadICS = () => {
    // Generate clean iCalendar format
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Hyde Park School//Calendari Curs 2026-2027//CA
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Hyde Park School 2026-2027
${ACADEMIC_EVENTS.map(
  (ev, idx) => `BEGIN:VEVENT
UID:hydepark-${idx}@hydepark.cat
SUMMARY:${ev.title}
DESCRIPTION:${ev.description}
LOCATION:Torras i Bages, 41
STATUS:CONFIRMED
END:VEVENT`
).join('\n')}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'calendari_hyde_park_2026_2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('📅 Calendari escolar descarregat (.ics) per sincronitzar amb Google o Apple Calendar');
  };

  return (
    <div className="space-y-6">
      {/* Header action */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold tracking-tight">
              Calendari del Curs Escolar 2026 - 2027
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Inici i final de curs, festius escolars, setmanes d'exàmens de gener/juny i dates oficials Cambridge i Goethe.
          </p>
        </div>

        <button
          onClick={downloadICS}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#E10E17] hover:bg-red-700 text-white shadow-md shadow-red-950 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Sincronitzar amb el calendari mòbil (.ics)</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          Tots els esdeveniments ({ACADEMIC_EVENTS.length})
        </button>
        <button
          onClick={() => setFilter('festius')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'festius'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          Festius & Vacances
        </button>
        <button
          onClick={() => setFilter('exàmens')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'exàmens'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          Setmanes d'Exàmens (Gener & Juny)
        </button>
        <button
          onClick={() => setFilter('oficials')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'oficials'
              ? 'bg-[#E10E17] text-white'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          Oficials Cambridge & Goethe
        </button>
      </div>

      {/* Timeline event cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((ev) => {
          const isOfficial = ev.category.startsWith('oficial_');
          const isExam = ev.category === 'examen_escola';

          return (
            <div
              key={ev.id}
              className={`p-5 rounded-2xl border transition-all ${
                isOfficial
                  ? 'bg-gradient-to-r from-red-500/10 to-transparent border-red-500/30'
                  : isTeenMode
                  ? 'bg-neutral-900 border-neutral-800'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    isOfficial
                      ? 'bg-[#E10E17] text-white'
                      : isExam
                      ? 'bg-amber-500 text-white'
                      : 'bg-black/10 dark:bg-white/10 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {ev.badge}
                </span>

                <span className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {ev.date}
                </span>
              </div>

              <h3 className="font-bold text-sm mt-3 text-slate-900 dark:text-white">
                {ev.title}
              </h3>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                {ev.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
