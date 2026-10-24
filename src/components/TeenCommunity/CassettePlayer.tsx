import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  ExternalLink,
  Sparkles,
  Music,
  Radio,
  BookOpen
} from 'lucide-react';
import { TRACK_OF_THE_WEEK, TRACK_GERMAN } from '../../data/mockData';
import { TrackOfTheWeek } from '../../types';
import { useApp } from '../../context/AppContext';

export const CassettePlayer: React.FC = () => {
  const { addPoints, showToast } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'de'>('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [tapeCounter, setTapeCounter] = useState(137);

  const currentTrack: TrackOfTheWeek = selectedLanguage === 'en' ? TRACK_OF_THE_WEEK : TRACK_GERMAN;

  const handlePlayToggle = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    if (next) {
      setTapeCounter((c) => c + 1);
      addPoints(10, 'Track of the Week escoltat!');
      showToast(`▶️ Reproduint cinta: "${currentTrack.title}" (${currentTrack.artist})`);
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#E10E17]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section with cassette switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E10E17] text-white flex items-center justify-center shadow-lg shadow-red-950/60 border border-red-500/40">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#E10E17] text-white tracking-widest font-mono">
                FLUENT IN STEREO
              </span>
              <span className="text-xs text-neutral-400 font-mono">TRACK OF THE WEEK</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
              Radiocasset Hyde Park
            </h2>
          </div>
        </div>

        {/* Cassette Tape Switcher (English vs Deutsch) */}
        <div className="flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-bold">
          <button
            onClick={() => {
              setSelectedLanguage('en');
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedLanguage === 'en'
                ? 'bg-[#E10E17] text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            🇬🇧 English Hit
          </button>
          <button
            onClick={() => {
              setSelectedLanguage('de');
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedLanguage === 'de'
                ? 'bg-[#E10E17] text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            🇩🇪 Deutsch Song
          </button>
        </div>
      </div>

      {/* Physical Boombox & Cassette Body (#E10E17 theme) */}
      <div className="bg-gradient-to-b from-[#b3080f] via-[#E10E17] to-[#8a060b] rounded-2xl p-5 sm:p-7 border-2 border-red-500/50 shadow-2xl relative">
        {/* Boombox Details: Speakers Left & Right in desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Cassette Center Window */}
          <div className="lg:col-span-8 bg-neutral-950 rounded-xl p-4 border-2 border-neutral-800 relative shadow-inner">
            {/* Cassette Tape Housing */}
            <div className="bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800 rounded-lg p-3 border border-neutral-700 relative">
              {/* Tape Label */}
              <div className="bg-amber-100 text-neutral-900 rounded p-2 text-center border-b-2 border-amber-300 shadow-xs mb-3 flex items-center justify-between">
                <span className="text-[10px] font-mono font-black tracking-widest text-red-700">
                  SIDE A · STEREO 90 MIN
                </span>
                <span className="text-xs font-black tracking-tight uppercase truncate px-2">
                  {currentTrack.title} — {currentTrack.artist}
                </span>
                <span className="text-[10px] font-mono font-bold bg-neutral-900 text-amber-200 px-1.5 py-0.5 rounded">
                  {currentTrack.level}
                </span>
              </div>

              {/* Tape Spools & Magnetic Ribbon */}
              <div className="flex items-center justify-around py-3 bg-neutral-950/80 rounded-md border border-neutral-800 px-4">
                {/* Left Spool */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-14 h-14 rounded-full border-4 border-neutral-600 bg-neutral-900 flex items-center justify-center ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '3s' }}
                  >
                    <div className="w-6 h-6 rounded-full bg-neutral-700 border-2 border-neutral-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* Center Tape Window with Magnetic Ribbon */}
                <div className="w-28 sm:w-36 h-10 bg-neutral-900/90 rounded border border-neutral-700 flex flex-col items-center justify-center px-2">
                  <div className="w-full h-2 bg-gradient-to-r from-neutral-800 via-amber-950 to-neutral-800 rounded-full" />
                  <span className="text-[9px] font-mono text-neutral-400 mt-1">
                    COUNT: 00{tapeCounter}
                  </span>
                </div>

                {/* Right Spool */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-14 h-14 rounded-full border-4 border-neutral-600 bg-neutral-900 flex items-center justify-center ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '3s' }}
                  >
                    <div className="w-6 h-6 rounded-full bg-neutral-700 border-2 border-neutral-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Equalizer Wave simulation */}
            <div className="mt-3 flex items-center justify-center gap-1.5 h-6">
              {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85, 50, 60].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-red-500' : 'bg-neutral-800'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(20, (h * (i % 2 === 0 ? 0.9 : 1.1)) % 100)}%` : '20%',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Controls & Streaming links */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 text-white">
              <span className="text-[10px] uppercase font-bold text-red-200 block">
                Reproductor Oficial
              </span>
              <p className="text-sm font-black mt-1">{currentTrack.title}</p>
              <p className="text-xs text-neutral-300">{currentTrack.artist}</p>
              <p className="text-[11px] text-neutral-300 mt-2 italic leading-relaxed">
                "{currentTrack.culturalContext}"
              </p>
            </div>

            {/* Play Button & Streaming Links */}
            <div className="space-y-2">
              <button
                onClick={handlePlayToggle}
                className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300'
                    : 'bg-white text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pausar Tape' : 'Reproduir Cassette'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={currentTrack.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-lg bg-black/60 hover:bg-black text-[11px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>Spotify</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>

                <a
                  href={currentTrack.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-lg bg-black/60 hover:bg-black text-[11px] font-bold text-red-300 border border-red-500/30 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>YouTube</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track of the Week: Key Vocabulary & Idioms (as specified in PDF) */}
      <div className="mt-6 pt-6 border-t border-neutral-800">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-red-500" />
          <h3 className="font-bold text-sm text-neutral-200">
            Vocabulari clau & Estructures d'examen a la cançó
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {currentTrack.keyVocabulary.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-red-500/40 transition-colors"
            >
              <span className="text-xs font-bold text-red-400 block font-mono">
                {item.word}
              </span>
              <p className="text-xs text-neutral-400 mt-1">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
