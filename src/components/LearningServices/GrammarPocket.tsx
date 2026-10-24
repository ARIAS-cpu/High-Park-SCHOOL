import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GrammarPocket: React.FC = () => {
  const { isTeenMode, addPoints, showToast } = useApp();
  const [expandedTopic, setExpandedTopic] = useState<number | null>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const topics = [
    {
      id: 0,
      title: 'Conditionals (Zero, First, Second, Third & Mixed)',
      level: 'B2 - C1',
      summary: 'Regles bàsiques explicades a la pissarra per en David:',
      points: [
        'Zero: If + present, present (Fets generals)',
        'First: If + present, will + infinitive (Futur probable)',
        'Second: If + past simple, would + infinitive (Hipotètic present)',
        'Third: If + past perfect, would have + past participle (Passat impossible)',
        'Inversions condicionals: "Had I known..." = "If I had known..."',
      ],
      quickTest: {
        question: 'If she had left earlier, she _____ missed the train.',
        options: ["wouldn't have", 'will not', "won't have"],
        correct: "wouldn't have",
      },
    },
    {
      id: 1,
      title: 'Inversions per a Èmfasi Formal (C1 Advanced)',
      level: 'C1 Mastery',
      summary: 'Estructures que impressionen els examinadors de Cambridge:',
      points: [
        'Never before have I seen such talent.',
        'Not only did he pass the exam, but he also got Grade A.',
        'Seldom do we encounter students as motivated as in Hyde Park.',
        'Under no circumstances should you open the exam paper before the signal.',
      ],
      quickTest: {
        question: 'Scarcely _____ the phone rang. (had he arrived / he had arrived)',
        options: ['had he arrived', 'he had arrived', 'did he arrived'],
        correct: 'had he arrived',
      },
    },
    {
      id: 2,
      title: 'Konjunktiv II & Passiv auf Deutsch (Goethe B1/B2)',
      level: 'Goethe B1',
      summary: 'Punts de pissarra amb el professor Thomas Weber:',
      points: [
        'Konjunktiv II present: würde + Infinitiv (ex. ich würde gern lernen)',
        'Verbs especials: wäre (sein), hätte (haben), könnte (können)',
        'Passiv: werden + Partizip II (ex. Der Brief wird von der Lehrerin geschrieben)',
      ],
      quickTest: {
        question: 'Wenn ich mehr Zeit hätte, _____ ich mehr Vokabeln lernen.',
        options: ['würde', 'werde', 'wäre'],
        correct: 'würde',
      },
    },
  ];

  const handleAnswer = (topicId: number, ans: string, correct: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [topicId]: ans }));
    setRevealed((prev) => ({ ...prev, [topicId]: true }));
    if (ans === correct) {
      addPoints(15, 'Gramàtica encertada!');
      showToast('✅ Resposta correcta a la fitxa de butxaca!');
    } else {
      showToast('❌ Resposta incorrecta. Revisa la regla a dalt.');
    }
  };

  return (
    <div
      className={`p-6 sm:p-7 rounded-3xl border ${
        isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-indigo-500" />
        <h3 className="text-xl font-bold tracking-tight">Gramàtica de Butxaca</h3>
      </div>
      <p className="text-xs text-neutral-500 mb-6">
        Fitxes resum dels punts explicats a la pissarra de classe amb mini-exercicis autocorregibles.
      </p>

      <div className="space-y-4">
        {topics.map((t) => {
          const isOpen = expandedTopic === t.id;
          const isAnswered = revealed[t.id];

          return (
            <div
              key={t.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isTeenMode ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                onClick={() => setExpandedTopic(isOpen ? null : t.id)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-500 border border-indigo-500/30">
                    {t.level}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {t.title}
                  </h4>
                </div>

                {isOpen ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
              </div>

              {isOpen && (
                <div className="p-5 pt-0 border-t border-neutral-200 dark:border-neutral-800/80 space-y-4 text-xs mt-3">
                  <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                    <span className="font-bold text-neutral-700 dark:text-neutral-300 block">
                      {t.summary}
                    </span>
                    <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400 list-disc list-inside">
                      {t.points.map((pt, pIdx) => (
                        <li key={pIdx} className="leading-relaxed font-mono text-[11px]">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Micro self-correcting exercise */}
                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                    <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 block mb-1">
                      Mini-test autocorregible de butxaca:
                    </span>
                    <p className="font-semibold text-slate-800 dark:text-white mb-3">
                      {t.quickTest.question}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {t.quickTest.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(t.id, opt, t.quickTest.correct)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedAnswers[t.id] === opt
                              ? opt === t.quickTest.correct
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-red-600 text-white border-red-600'
                              : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 hover:border-neutral-500'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {isAnswered && (
                      <p className="mt-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Resposta correcta: {t.quickTest.correct}</span>
                      </p>
                    )}
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
