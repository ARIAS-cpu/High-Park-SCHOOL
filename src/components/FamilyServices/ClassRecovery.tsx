import React from 'react';
import { RefreshCw, Calendar, Clock, User, CheckCircle2 } from 'lucide-react';
import { ALTERNATIVE_CLASSES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const ClassRecovery: React.FC = () => {
  const { bookedRecoveries, bookRecovery, isTeenMode } = useApp();

  return (
    <div
      className={`p-6 sm:p-7 rounded-3xl border ${
        isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-indigo-500" />
            <h3 className="text-xl font-bold tracking-tight">Recuperar Classes Perdudes</h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Si faltes a la teva sessió regular, l'app et proposa assistir a un altre grup del mateix nivell durant la mateixa setmana.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ALTERNATIVE_CLASSES.map((cls) => {
          const isBooked = bookedRecoveries.includes(cls.id);

          return (
            <div
              key={cls.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isBooked
                  ? 'bg-emerald-500/10 border-emerald-500/40'
                  : isTeenMode
                  ? 'bg-neutral-950 border-neutral-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-neutral-600 dark:text-neutral-300">
                    {cls.group}
                  </span>
                  <span className="text-xs font-bold text-red-500">
                    {cls.availableSpots} places lliures
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span>{cls.day}</span>
                </h4>

                <div className="text-xs text-neutral-500 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{cls.time} · {cls.room}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Professor/a: {cls.teacher}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => bookRecovery(cls.id)}
                  disabled={isBooked}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isBooked
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-950'
                  }`}
                >
                  {isBooked ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Plaça Reservada</span>
                    </>
                  ) : (
                    <span>Reservar Aquesta Classe</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
