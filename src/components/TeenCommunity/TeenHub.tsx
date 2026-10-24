import React, { useState } from 'react';
import { Radio, Sparkles, Trophy, Target, Tv, ShoppingBag, ShieldCheck, Music } from 'lucide-react';
import { CassettePlayer } from './CassettePlayer';
import { WeeklyChallenge } from './WeeklyChallenge';
import { ExamZone } from './ExamZone';
import { SlangWeekly } from './SlangWeekly';
import { MediaHub } from './MediaHub';
import { TeenMerch } from './TeenMerch';
import { SafeWall } from './SafeWall';

export const TeenHub: React.FC = () => {
  const [teenSubSection, setTeenSubSection] = useState<'all' | 'music' | 'challenge' | 'exams' | 'slang' | 'merch'>('all');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Brand Identity Hero - The Red Cassette and Black background */}
      <div className="bg-black border-2 border-red-600/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-800/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#E10E17] text-white tracking-widest font-mono uppercase shadow-lg shadow-red-950">
                FLUENT IN STEREO
              </span>
              <span className="text-xs text-neutral-400 font-mono tracking-wider">
                ESO · BATXILLERAT · CICLES
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              Espai <span className="text-[#E10E17]">Teen Community</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              La teva zona amb personalitat pròpia dins de Hyde Park: connecta 7 dies a la setmana amb anglès i alemany a través de cançons, expressions reals de carrer, reptes curts i el camí cap al B2 First o C1.
            </p>
          </div>

          {/* Quick Sub-navigation */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => setTeenSubSection('all')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                teenSubSection === 'all'
                  ? 'bg-white text-black'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              Tot l'espai
            </button>
            <button
              onClick={() => setTeenSubSection('music')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                teenSubSection === 'music'
                  ? 'bg-[#E10E17] text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Track of the Week</span>
            </button>
            <button
              onClick={() => setTeenSubSection('challenge')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                teenSubSection === 'challenge'
                  ? 'bg-[#E10E17] text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Repte & Rànquing</span>
            </button>
            <button
              onClick={() => setTeenSubSection('exams')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                teenSubSection === 'exams'
                  ? 'bg-[#E10E17] text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Exam Zone</span>
            </button>
            <button
              onClick={() => setTeenSubSection('slang')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                teenSubSection === 'slang'
                  ? 'bg-[#E10E17] text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Slang & Idioms</span>
            </button>
            <button
              onClick={() => setTeenSubSection('merch')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                teenSubSection === 'merch'
                  ? 'bg-[#E10E17] text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Merch & Premis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Render based on subsection */}
      {(teenSubSection === 'all' || teenSubSection === 'music') && (
        <section>
          <CassettePlayer />
        </section>
      )}

      {(teenSubSection === 'all' || teenSubSection === 'challenge') && (
        <section>
          <WeeklyChallenge />
        </section>
      )}

      {(teenSubSection === 'all' || teenSubSection === 'exams') && (
        <section>
          <ExamZone />
        </section>
      )}

      {(teenSubSection === 'all' || teenSubSection === 'slang') && (
        <section>
          <SlangWeekly />
        </section>
      )}

      {teenSubSection === 'all' && (
        <section>
          <MediaHub />
        </section>
      )}

      {(teenSubSection === 'all' || teenSubSection === 'merch') && (
        <section>
          <TeenMerch />
        </section>
      )}

      {teenSubSection === 'all' && (
        <section>
          <SafeWall />
        </section>
      )}
    </div>
  );
};
