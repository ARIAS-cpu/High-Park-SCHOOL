import React, { useState, useEffect } from 'react';
import { Target, Timer, CheckCircle2, XCircle, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { MOCK_EXAM_QUESTIONS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const ExamSimulator: React.FC = () => {
  const { isTeenMode, addPoints, showToast } = useApp();
  const [questions, setQuestions] = useState(MOCK_EXAM_QUESTIONS);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600s)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!submitted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [submitted, timeLeft]);

  const handleSelectOption = (qId: number, val: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correctCount = 0;
    questions.forEach((q) => {
      const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
      const rightAns = q.correctAnswer.trim().toLowerCase();
      if (userAns === rightAns) {
        correctCount += 1;
      }
    });

    const pts = correctCount * 30;
    addPoints(pts, `Simulacre d'examen corregit (${correctCount}/${questions.length})`);
    showToast(`🎯 Simulacre completat: ${correctCount}/${questions.length} correctes (+${pts} pts)`);
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
    setTimeLeft(600);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className={`p-6 sm:p-7 rounded-3xl border ${
        isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-bold tracking-tight">
              Fulls d'Exercicis Digitals & Simulacres Autocorregibles
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Versió digital dels fulls de Cambridge B2 First, C1 i Goethe B1: cronometrats i amb correcció immediata.
          </p>
        </div>

        {/* Timer Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-xs font-bold">
          <Timer className="w-4 h-4 text-red-500" />
          <span className={timeLeft < 120 ? 'text-red-500 animate-pulse' : 'text-neutral-400 dark:text-neutral-200'}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
          const isCorrect = userAns === q.correctAnswer.trim().toLowerCase();

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : 'bg-red-500/5 border-red-500/30'
                  : isTeenMode
                  ? 'bg-neutral-950 border-neutral-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-neutral-600 dark:text-neutral-300">
                  Pregunta {idx + 1} · {q.type.replace(/-/g, ' ')}
                </span>

                {submitted && (
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${
                      isCorrect ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{isCorrect ? 'Correcte' : 'Incorrecte'}</span>
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-slate-800 dark:text-white mb-3">
                {q.prompt}
              </p>

              {/* Multiple choice options */}
              {q.options && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(q.id, opt)}
                      disabled={submitted}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                        userAnswers[q.id] === opt
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Text input for open-cloze or key word transformation */}
              {!q.options && (
                <div className="mt-2">
                  <input
                    type="text"
                    disabled={submitted}
                    placeholder="Escriu aquí la resposta..."
                    value={userAnswers[q.id] || ''}
                    onChange={(e) => handleSelectOption(q.id, e.target.value)}
                    className="w-full sm:w-80 px-3 py-2 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white font-mono outline-none focus:border-red-500"
                  />
                </div>
              )}

              {/* Pedagogical explanation after submit */}
              {submitted && (
                <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                  <p className="font-semibold text-neutral-700 dark:text-neutral-300">
                    💡 Resposta oficial: <span className="font-mono text-emerald-600 dark:text-emerald-400">{q.correctAnswer}</span>
                  </p>
                  <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <span className="text-xs text-neutral-400">
          {Object.keys(userAnswers).length} de {questions.length} respostes marcades
        </span>

        <div className="flex items-center gap-3">
          {submitted ? (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Tornar a intentar</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-950 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Corregir Simulacre</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
