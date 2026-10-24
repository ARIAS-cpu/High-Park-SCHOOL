import React from 'react';
import { CheckCircle2, Circle, Clock, BookOpen, Plus, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HomeworkTracker: React.FC = () => {
  const { homeworkList, toggleHomework, isTeenMode, activeCourseId, userRole } = useApp();
  const currentHomework = homeworkList.filter((hw) => hw.courseId === activeCourseId || !hw.courseId);

  const completedCount = currentHomework.filter((h) => h.completed).length;

  return (
    <div
      className={`p-6 sm:p-7 rounded-3xl border ${
        isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-bold tracking-tight">Deures de la Setmana</h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Revisa i marca els deures fets abans de la propera classe per mantenir la teva ratxa diària.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold">
          <span>{completedCount} de {currentHomework.length} completats</span>
        </div>
      </div>

      <div className="space-y-3">
        {currentHomework.map((hw) => (
          <div
            key={hw.id}
            onClick={() => toggleHomework(hw.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              hw.completed
                ? 'bg-emerald-500/5 border-emerald-500/30 opacity-75'
                : isTeenMode
                ? 'bg-neutral-950 border-neutral-800 hover:border-red-500/50'
                : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                className={`mt-0.5 transition-colors cursor-pointer ${
                  hw.completed ? 'text-emerald-500' : 'text-neutral-400 hover:text-red-500'
                }`}
              >
                {hw.completed ? (
                  <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-neutral-600 dark:text-neutral-300">
                    {hw.unit}
                  </span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Lliurament: {hw.dueDate}
                  </span>
                </div>

                <h4
                  className={`text-sm font-bold ${
                    hw.completed ? 'line-through text-neutral-400 dark:text-neutral-500' : ''
                  }`}
                >
                  {hw.title}
                </h4>

                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {hw.description}
                </p>
              </div>
            </div>

            <span className="shrink-0 text-xs font-bold text-amber-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+25 pts</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
