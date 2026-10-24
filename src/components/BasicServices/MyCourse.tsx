import React from 'react';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  BookOpen,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Download,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COURSES } from '../../data/mockData';

export const MyCourse: React.FC = () => {
  const { activeCourseId, isTeenMode, homeworkList, streak, setCurrentTab, showToast } = useApp();
  const course = COURSES.find((c) => c.id === activeCourseId) || COURSES[0];
  const pendingHw = homeworkList.filter((h) => !h.completed && h.courseId === activeCourseId).length;

  return (
    <div className="space-y-6">
      {/* Course Hero Banner */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-sm ${
          isTeenMode
            ? 'bg-gradient-to-br from-neutral-900 via-neutral-900 to-red-950/40 border-neutral-800 text-white'
            : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 border-slate-800 text-white'
        }`}
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white tracking-wider">
                {course.level}
              </span>
              <span className="text-xs text-neutral-300 font-mono">
                Curs 2026 - 2027
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {course.name}
            </h1>
            <p className="text-sm text-neutral-300 max-w-xl">
              Mètode clàssic i resultats. Transformem la sessió d'1h30 setmanal en un contacte continu de 7 dies amb l'idioma.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                showToast(`Descarregant el dossier: ${course.dossierName}`);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-xs transition-all border border-white/10 cursor-pointer"
            >
              <Download className="w-4 h-4 text-red-400" />
              <span>Dossier PDF</span>
            </button>
            <button
              onClick={() => setCurrentTab('learning')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E10E17] hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-950 cursor-pointer"
            >
              <span>Practicar ara</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Course Core Specs Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Clock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Dia i Horari
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">
                {course.schedule}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <User className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Professor / Docent
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">
                {course.teacher}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Aula i Recursos
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">
                {course.room}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Examen Oficial Objectiu
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">
                {course.nextExamDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Materials & Weekly status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`p-6 rounded-2xl border ${
            isTeenMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-sm">Material Didàctic del Curs</h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Llibre Oficial</span>
              <p className="font-semibold text-slate-800 dark:text-neutral-100">{course.book}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Dossier de Treball</span>
                <p className="font-semibold text-slate-800 dark:text-neutral-100">{course.dossierName}</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 font-bold text-[10px]">
                Actiu
              </span>
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-2xl border ${
            isTeenMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-indigo-500" />
              <h3 className="font-bold text-sm">Estat dels Deures</h3>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-600">
              {pendingHw} pendents
            </span>
          </div>
          <p className="text-xs text-neutral-500 mb-4">
            Recorda marcar els deures a mesura que els completis per mantenir la teva ratxa activa.
          </p>
          <button
            onClick={() => setCurrentTab('learning')}
            className="w-full py-2 rounded-xl text-xs font-bold border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
          >
            Veure els deures de la setmana
          </button>
        </div>

        <div
          className={`p-6 rounded-2xl border ${
            isTeenMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-sm">El Mètode Hyde Park</h3>
          </div>
          <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Vocabulari i deures connectats dia a dia</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Simulacres d'examen oficials cronometrats</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Feedbacks d'expressió oral i escrita directes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Comunitat adolescent: Teen Community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
