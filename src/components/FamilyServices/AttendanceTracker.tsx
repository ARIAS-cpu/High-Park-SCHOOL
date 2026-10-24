import React, { useState } from 'react';
import { UserCheck, AlertTriangle, CheckCircle2, Clock, FileText, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AttendanceTracker: React.FC = () => {
  const { attendance, justifyAbsence, isTeenMode, showToast } = useApp();
  const [justifyingId, setJustifyingId] = useState<string | null>(null);
  const [reasonText, setReasonText] = useState('');

  const presents = attendance.filter((a) => a.status === 'present').length;
  const total = attendance.length;
  const attendanceRate = total > 0 ? Math.round((presents / total) * 100) : 100;

  const handleJustifySubmit = (id: string) => {
    if (!reasonText.trim()) {
      showToast('Cal especificar el motiu de la falta.');
      return;
    }
    justifyAbsence(id, reasonText);
    setJustifyingId(null);
    setReasonText('');
  };

  return (
    <div
      className={`p-6 sm:p-7 rounded-3xl border ${
        isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xl font-bold tracking-tight">Faltes & Justificacions Digitals</h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            El professor passa llista a l'inici de la sessió. Les famílies reben avís instantani i poden justificar l'absència directament.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold font-mono">
          <span>Assistència global: {attendanceRate}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {attendance.map((rec) => {
          const isAbsent = rec.status === 'absent';
          const isJustified = rec.status === 'justified';
          const isLate = rec.status === 'late';
          const isPresent = rec.status === 'present';

          return (
            <div
              key={rec.id}
              className={`p-4 rounded-2xl border transition-all ${
                isAbsent
                  ? 'bg-red-500/10 border-red-500/30'
                  : isJustified
                  ? 'bg-indigo-500/5 border-indigo-500/20'
                  : isLate
                  ? 'bg-amber-500/5 border-amber-500/20'
                  : isTeenMode
                  ? 'bg-neutral-950 border-neutral-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                    {isPresent && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {isAbsent && <AlertTriangle className="w-5 h-5 text-red-500" />}
                    {isLate && <Clock className="w-5 h-5 text-amber-500" />}
                    {isJustified && <FileText className="w-5 h-5 text-indigo-500" />}
                  </div>

                  <div>
                    <span className="text-xs font-bold block text-slate-900 dark:text-white">
                      {rec.date}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {isPresent && 'Assistència confirmada pel docent'}
                      {isAbsent && 'Falta d’assistència no justificada'}
                      {isLate && 'Retard registrat a l’aula'}
                      {isJustified && `Falta justificada: "${rec.justificationReason}"`}
                    </span>
                  </div>
                </div>

                {isAbsent && (
                  <button
                    onClick={() => setJustifyingId(rec.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Justificar Falta
                  </button>
                )}

                {isJustified && (
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg">
                    Validada per Direcció
                  </span>
                )}
              </div>

              {/* Justification Form */}
              {justifyingId === rec.id && (
                <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                  <span className="text-xs font-bold block text-neutral-700 dark:text-neutral-300">
                    Justificant per al Cap d'Estudis (David):
                  </span>
                  <textarea
                    rows={2}
                    placeholder="Indiqueu el motiu de l’absència (mèdic, viatge familiar, etc.)..."
                    value={reasonText}
                    onChange={(e) => setReasonText(e.target.value)}
                    className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs bg-white dark:bg-neutral-900 outline-none focus:border-red-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setJustifyingId(null)}
                      className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                    >
                      Cancel·lar
                    </button>
                    <button
                      onClick={() => handleJustifySubmit(rec.id)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Enviar Justificant
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
