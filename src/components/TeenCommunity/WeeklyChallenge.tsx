import React, { useState, useEffect } from 'react';
import { Trophy, Timer, CheckCircle, Zap, Flame, Award, ArrowRight } from 'lucide-react';
import { TEEN_RANKING } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const WeeklyChallenge: React.FC = () => {
  const { streak, points, addPoints, showToast } = useApp();
  const [inQuiz, setInQuiz] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes (300s)

  const challengeQuestions = [
    {
      q: 'Which preposition completes this fixed phrase? "She succeeded _____ passing her Cambridge C1 exam."',
      options: ['in', 'at', 'on', 'with'],
      correct: 'in',
      hint: '"succeed in doing something" és una combinació fixa requerida a Use of English.',
    },
    {
      q: 'Wähle das richtige Wort: "Obwohl das Wetter schlecht war, _____ wir den Berg bestiegen."',
      options: ['haben', 'sind', 'waren', 'haben wir'],
      correct: 'haben',
      hint: 'A la frase principal després de subordinada amb "obwohl", el verb conjugat va en primera posició.',
    },
    {
      q: 'Transform: "I am sure he didn’t steal the money." -> "He _____ the money." (CANNOT)',
      options: ['cannot have stolen', 'cannot steal', 'cannot had stolen', 'cannot be stealing'],
      correct: 'cannot have stolen',
      hint: 'Modal de deducció negativa en el passat: cannot + have + past participle.',
    },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inQuiz && !quizFinished && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [inQuiz, quizFinished, secondsLeft]);

  const startChallenge = () => {
    setInQuiz(true);
    setQuizFinished(false);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setSecondsLeft(300);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (selectedAnswer === challengeQuestions[currentQIndex].correct) {
      setScore((s) => s + 1);
    }

    if (currentQIndex + 1 < challengeQuestions.length) {
      setCurrentQIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
      const earned = (score + 1) * 35;
      addPoints(earned, 'Repte setmanal de 5 minuts completat!');
      showToast(`🏆 Excel·lent repte! Has sumat +${earned} punts.`);
    }
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 5-Minute Daily Challenge Interactive Card */}
      <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h3 className="font-black text-lg">Repte Setmanal de 5 Minuts</h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs bg-black/60 px-3 py-1 rounded-xl border border-neutral-800">
              <Timer className="w-3.5 h-3.5 text-red-500" />
              <span className={secondsLeft < 60 ? 'text-red-400 font-bold animate-pulse' : 'text-neutral-300'}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 mb-6">
            Només 5 minuts al dia de preguntes ràpides d'examen per guanyar punts per al teu grup i mantenir la ratxa.
          </p>

          {!inQuiz && !quizFinished ? (
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mx-auto">
                <Flame className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-white">Preparat per al mini-sprint?</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                3 preguntes cronometrades de nivell B2 First & Goethe B1. Respondre correctament atorga fins a +105 punts!
              </p>
              <button
                onClick={startChallenge}
                className="px-6 py-3 rounded-xl bg-[#E10E17] hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-950 transition-all cursor-pointer"
              >
                Començar Repte (5 min)
              </button>
            </div>
          ) : inQuiz && !quizFinished ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Pregunta {currentQIndex + 1} de {challengeQuestions.length}</span>
                <span className="font-mono text-emerald-400">Encerts: {score}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all"
                  style={{ width: `${((currentQIndex + 1) / challengeQuestions.length) * 100}%` }}
                />
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-sm font-semibold text-white leading-relaxed">
                {challengeQuestions[currentQIndex].q}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {challengeQuestions[currentQIndex].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedAnswer(opt)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                      selectedAnswer === opt
                        ? 'bg-red-600 border-red-500 text-white shadow-md'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedAnswer
                      ? 'bg-white text-neutral-900 hover:bg-neutral-200'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <span>{currentQIndex + 1 === challengeQuestions.length ? 'Finalitzar' : 'Següent'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-neutral-950 border border-emerald-500/40 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg text-white">Repte setmanal assolit!</h4>
              <p className="text-xs text-neutral-300">
                Has respost correctament {score} de {challengeQuestions.length} preguntes.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>+{(score) * 35} Punts afegits al teu rànquing</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={startChallenge}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Tornar a practicar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Group Ranking with Aliases (Protected by Minor Privacy) */}
      <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-base">Rànquing per Grups</h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase bg-black/40 px-2 py-0.5 rounded">
              Amb Àlies
            </span>
          </div>

          <p className="text-xs text-neutral-400 mb-4">
            Classificació opcional amb pseudònims per respectar la privacitat dels menors segons el document de serveis.
          </p>

          <div className="space-y-2">
            {TEEN_RANKING.map((user) => {
              const isCurrentUser = user.alias.includes('(Tu)');

              return (
                <div
                  key={user.rank}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    isCurrentUser
                      ? 'bg-[#E10E17]/20 border-red-500/50 text-white font-bold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold ${
                        user.rank === 1
                          ? 'bg-amber-400 text-neutral-950'
                          : user.rank === 2
                          ? 'bg-neutral-300 text-neutral-950'
                          : user.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {user.rank}
                    </span>

                    <div>
                      <span className="font-semibold block">{user.alias}</span>
                      <span className="text-[10px] text-neutral-500">{user.level}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-400 block">{user.points} pts</span>
                    <span className="text-[10px] text-neutral-500">{user.streak} dies ratxa</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between">
          <span>Actualitzat diàriament</span>
          <span className="text-red-400 font-semibold font-mono">Top 3 guanya merch al final de trimestre</span>
        </div>
      </div>
    </div>
  );
};
