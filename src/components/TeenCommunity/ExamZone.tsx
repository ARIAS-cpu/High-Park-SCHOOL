import React, { useState } from 'react';
import { Target, Clock, Award, CheckCircle2, ChevronRight, HelpCircle, Flame } from 'lucide-react';
import { EXAM_COUNTDOWNS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const ExamZone: React.FC = () => {
  const { setCurrentTab, showToast } = useApp();
  const [selectedExamId, setSelectedExamId] = useState<string>('b2-first');

  const selectedExam = EXAM_COUNTDOWNS.find((e) => e.id === selectedExamId) || EXAM_COUNTDOWNS[0];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-bold tracking-tight">
              Exam Zone · Compte Enrere Oficial
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Cambridge B2 First, C1 Advanced, Goethe-Zertifikat i PAU. Seguiment de dates i consells clau d'examinador.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentTab('learning');
            showToast('Obrint el simulador cronometrat de preguntes oficials...');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E10E17] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-950 transition-all cursor-pointer"
        >
          <Clock className="w-4 h-4" />
          <span>Fes un Simulacre Cronometrat</span>
        </button>
      </div>

      {/* Countdown Cards Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EXAM_COUNTDOWNS.map((exam) => {
          const isSelected = exam.id === selectedExamId;

          return (
            <div
              key={exam.id}
              onClick={() => setSelectedExamId(exam.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-gradient-to-b from-[#E10E17]/30 to-neutral-950 border-red-500 shadow-lg shadow-red-950/40 scale-[1.02]'
                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-black/60 text-red-400 border border-red-500/20">
                  {exam.level}
                </span>
                <span className="text-[10px] text-neutral-400">{exam.officialBody}</span>
              </div>

              <h4 className="font-bold text-sm text-white line-clamp-1">
                {exam.examName}
              </h4>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-red-500">
                  {exam.daysRemaining}
                </span>
                <span className="text-xs text-neutral-400 font-semibold">dies restants</span>
              </div>

              <span className="block mt-1 text-[11px] text-neutral-400">
                Data: {exam.date}
              </span>
            </div>
          );
        })}
      </div>

      {/* Selected Exam In-Depth Tips & Strategy */}
      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
              Estratègia de preparació
            </span>
            <h4 className="font-bold text-base text-white mt-0.5">
              {selectedExam.examName}
            </h4>
          </div>
          <span className="text-xs text-neutral-400">{selectedExam.description}</span>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold text-neutral-300 block">
            Consells clau del Cap d'Estudis (David & Cambridge Examiners):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {selectedExam.tips.map((tip, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 leading-relaxed flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
