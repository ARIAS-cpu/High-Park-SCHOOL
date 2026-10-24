import React from 'react';
import { Megaphone, Award, Plane, BookMarked, Sparkles } from 'lucide-react';
import { NOTICES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const NoticeBoard: React.FC = () => {
  const { isTeenMode } = useApp();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Megaphone className="w-5 h-5 text-red-500" />
        <h2 className="text-xl font-bold tracking-tight">Tauler de Notícies de l'Acadèmia</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {NOTICES.map((notice) => {
          const isSuccess = notice.category === 'exit';
          const isSummer = notice.category === 'estiu';

          return (
            <div
              key={notice.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                notice.highlight
                  ? 'bg-gradient-to-br from-amber-500/10 via-transparent to-red-500/10 border-amber-500/40 shadow-sm'
                  : isTeenMode
                  ? 'bg-neutral-900 border-neutral-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1 ${
                      isSuccess
                        ? 'bg-amber-500 text-white'
                        : isSummer
                        ? 'bg-indigo-600 text-white'
                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {isSuccess ? <Award className="w-3 h-3" /> : isSummer ? <Plane className="w-3 h-3" /> : <BookMarked className="w-3 h-3" />}
                    {notice.category}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-medium">
                    {notice.date}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2 leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {notice.content}
                </p>
              </div>

              {notice.highlight && (
                <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Orgull de la comunitat Hyde Park!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
