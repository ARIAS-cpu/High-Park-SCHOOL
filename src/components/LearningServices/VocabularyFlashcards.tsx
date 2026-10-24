import React, { useState } from 'react';
import {
  Layers,
  Volume2,
  RotateCw,
  Check,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { FLASHCARDS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const VocabularyFlashcards: React.FC = () => {
  const { addPoints, showToast, isTeenMode } = useApp();
  const [cards, setCards] = useState(FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  const currentCard = cards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const speak = (e: React.MouseEvent, text: string, lang: 'en' | 'de') => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-GB' : 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
      showToast(`🔊 Pronunciant en ${lang === 'en' ? 'anglès' : 'alemany'}...`);
    } else {
      showToast(`Pronunciant: ${text}`);
    }
  };

  const handleNext = (mastered: boolean) => {
    if (mastered) {
      setMasteredCount((m) => m + 1);
      addPoints(15, 'Vocabulari après!');
    }

    setIsFlipped(false);
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Loop back or celebrate
      showToast('🎉 Has completat la ronda de repetició espaiada!');
      setCurrentIndex(0);
    }
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
            <Layers className="w-5 h-5 text-indigo-500" />
            <h3 className="text-xl font-bold tracking-tight">
              Vocabulari & Flashcards (Repetició Espaiada)
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Estil Quizlet / Anki: llistes per unitat amb àudio natiu de pronunciació per a una memorització duradora.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-neutral-400">Targeta {currentIndex + 1} de {cards.length}</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
            {masteredCount} dominades
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Interactive Flip Card */}
      <div className="flex justify-center">
        <div
          onClick={handleFlip}
          className={`w-full max-w-xl min-h-[260px] rounded-3xl border p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 relative shadow-lg ${
            isFlipped
              ? 'bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-indigo-500'
              : isTeenMode
              ? 'bg-neutral-950 border-neutral-800 text-white hover:border-red-500/40'
              : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-300'
          }`}
        >
          {/* Card Top Meta */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
              {currentCard.unit} · {currentCard.level}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => speak(e, currentCard.term, currentCard.language)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                title="Escoltar àudio de pronunciació"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
              </button>
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Gira</span>
              </span>
            </div>
          </div>

          {/* Card Center Content */}
          <div className="text-center py-6">
            {!isFlipped ? (
              <div className="space-y-2">
                <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {currentCard.term}
                </h4>
                {currentCard.phonetic && (
                  <p className="text-sm font-mono text-neutral-400">
                    {currentCard.phonetic}
                  </p>
                )}
                <span className="inline-block mt-3 text-xs text-neutral-400">
                  (Fes clic per veure la traducció en català i l'exemple)
                </span>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-bold block">
                  Traducció en català:
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white">
                  {currentCard.translation}
                </h4>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 mt-3 text-xs text-neutral-300 italic">
                  "{currentCard.example}"
                </div>
              </div>
            )}
          </div>

          {/* Card Footer prompt */}
          <div className="text-center text-[11px] text-neutral-400">
            {isFlipped ? 'Comprova si ho sabies abans de girar:' : 'Pensa la resposta abans de mirar'}
          </div>
        </div>
      </div>

      {/* Spaced Repetition Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => handleNext(false)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-500/40 text-amber-500 hover:bg-amber-500/10 text-xs font-bold transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Vull repassar</span>
        </button>

        <button
          onClick={() => handleNext(true)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Ho sé bé! (+15 pts)</span>
        </button>
      </div>
    </div>
  );
};
