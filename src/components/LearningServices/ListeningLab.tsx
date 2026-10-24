import React, { useState } from 'react';
import { Headphones, Play, Pause, RotateCcw, FastForward, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ListeningLab: React.FC = () => {
  const { isTeenMode, addPoints, showToast } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeTrack, setActiveTrack] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [trackProgress, setTrackProgress] = useState(25);

  const audioTracks = [
    {
      id: 'track-1',
      title: 'Cambridge B2 First - Listening Part 1 (Short Conversations)',
      unit: 'Dossier Unit 4 · Track 12',
      duration: '02:45',
      transcript: `Examiner: You will hear people talking in eight different situations. For questions 1-8, choose the best answer (A, B or C).
Speaker 1: When I first stepped onto the campus in London, I was slightly overwhelmed by the sheer size of the student union. But once the tutor introduced us to the study groups, everything fell into place...`,
      quiz: {
        question: 'How did the speaker feel initially upon arriving at campus?',
        options: ['Relaxed and confident', 'Slightly overwhelmed by the size', 'Disappointed with the tutor'],
        correct: 1,
      },
    },
    {
      id: 'track-2',
      title: 'Goethe-Zertifikat B1 - Hören Teil 2 (Radiointerview)',
      unit: 'Dossier Netzwerk neu · Hören 08',
      duration: '03:10',
      transcript: `Moderator: Herzlich willkommen zu unserer Sendung 'Campus und Zukunft'. Heute sprechen wir mit Frau Weber über die neuen Austauschprogramme in Freiburg...
Frau Weber: Ja, guten Tag! Wir freuen uns sehr, dass in diesem Semester über dreißig Schülerinnen und Schüler aus Barcelona teilnehmen...`,
      quiz: {
        question: 'Worüber spricht Frau Weber im Radiointerview?',
        options: ['Über ein neues Sprachprogramm in Freiburg', 'Über die Mensa-Preise', 'Über die Zugverspätungen'],
        correct: 0,
      },
    },
  ];

  const current = audioTracks[activeTrack];

  const handleTogglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    if (next) {
      addPoints(10, 'Listening practicat');
      showToast(`🎧 Reproduint àudio a velocitat ${playbackSpeed}x`);
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    showToast(`⚡ Velocitat ajustada a ${speed}x`);
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
            <Headphones className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-bold tracking-tight">
              Listenings del Dossier & Velocitat Ajustable
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Els àudios del teu dossier oficial sempre a mà: redueix la velocitat per captar detalls o augmenta-la per a un entrenament d'alt nivell.
          </p>
        </div>

        {/* Speed controllers */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold font-mono">
          <span className="text-[10px] text-neutral-400 px-2 uppercase">Velocitat:</span>
          {[0.75, 1.0, 1.25, 1.5].map((spd) => (
            <button
              key={spd}
              onClick={() => changeSpeed(spd)}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                playbackSpeed === spd
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Track selector pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs mb-4">
        {audioTracks.map((tr, idx) => (
          <button
            key={tr.id}
            onClick={() => {
              setActiveTrack(idx);
              setIsPlaying(false);
              setTrackProgress(20);
            }}
            className={`px-3 py-2 rounded-xl font-semibold border transition-all whitespace-nowrap cursor-pointer ${
              activeTrack === idx
                ? 'bg-red-600 border-red-500 text-white shadow-sm'
                : 'bg-neutral-100 dark:bg-neutral-800/60 border-transparent text-neutral-600 dark:text-neutral-300'
            }`}
          >
            {tr.title}
          </button>
        ))}
      </div>

      {/* Audio Player Card */}
      <div
        className={`p-6 rounded-2xl border ${
          isTeenMode ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-50 border-slate-200'
        } space-y-4`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-red-500 block">
              {current.unit}
            </span>
            <h4 className="text-base font-bold mt-0.5">{current.title}</h4>
          </div>
          <span className="text-xs font-mono text-neutral-400">Durada: {current.duration}</span>
        </div>

        {/* Scrubber progress */}
        <div className="space-y-1">
          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden cursor-pointer">
            <div
              className={`h-full bg-red-600 transition-all ${isPlaying ? 'animate-pulse' : ''}`}
              style={{ width: `${trackProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-neutral-400">
            <span>00:38</span>
            <span>{current.duration}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className="w-12 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-950/40 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <div>
              <span className="text-xs font-bold block">
                {isPlaying ? `Reproduint (${playbackSpeed}x)...` : 'En pausa'}
              </span>
              <span className="text-[10px] text-neutral-400">Àudio oficial del dossier d'exercicis</span>
            </div>
          </div>

          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold hover:border-red-500 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-400" />
            <span>{showTranscript ? 'Amagar Transcripció' : 'Veure Transcripció'}</span>
          </button>
        </div>

        {/* Transcript Box */}
        {showTranscript && (
          <div className="mt-4 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono leading-relaxed text-neutral-700 dark:text-neutral-300 whitespace-pre-line animate-in fade-in">
            {current.transcript}
          </div>
        )}
      </div>

      {/* Comprehension check */}
      <div className="mt-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
        <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
          Comprovació ràpida de comprensió:
        </span>
        <p className="text-xs font-semibold mb-3">{current.quiz.question}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {current.quiz.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === current.quiz.correct) {
                  addPoints(20, 'Resposta de listening encertada!');
                  showToast('✅ Resposta correcta! Molt bona oïda.');
                } else {
                  showToast('❌ No és correcte. Torna a escoltar el fragment.');
                }
              }}
              className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs text-left hover:border-indigo-500 transition-colors cursor-pointer"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
