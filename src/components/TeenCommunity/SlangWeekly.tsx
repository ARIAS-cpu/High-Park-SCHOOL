import React, { useState } from 'react';
import { Sparkles, Volume2, Globe, Bookmark, Check } from 'lucide-react';
import { SLANG_LIST } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const SlangWeekly: React.FC = () => {
  const { addPoints, showToast } = useApp();
  const [filterLang, setFilterLang] = useState<'all' | 'en' | 'de'>('all');
  const [savedSlang, setSavedSlang] = useState<string[]>([]);

  const filtered = SLANG_LIST.filter((s) => {
    if (filterLang === 'all') return true;
    return s.language === filterLang;
  });

  const speakWord = (text: string, lang: 'en' | 'de') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[^a-zA-Z\s]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang === 'en' ? 'en-GB' : 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      showToast(`🗣️ Pronunciant: "${cleanText}" (${lang.toUpperCase()})`);
    } else {
      showToast(`Pronúncia: ${text}`);
    }
  };

  const toggleSave = (id: string) => {
    if (savedSlang.includes(id)) {
      setSavedSlang((prev) => prev.filter((item) => item !== id));
    } else {
      setSavedSlang((prev) => [...prev, id]);
      addPoints(5, 'Expressió guardada al teu quadern');
      showToast('📌 Expressió desada a favorits!');
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold tracking-tight">
              Slang & Jugendsprache
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Expressions reals del carrer i de xarxes socials usades pel jovent al Regne Unit i Alemanya.
          </p>
        </div>

        {/* Language Filter */}
        <div className="flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-bold">
          <button
            onClick={() => setFilterLang('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterLang === 'all' ? 'bg-[#E10E17] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Tots
          </button>
          <button
            onClick={() => setFilterLang('en')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterLang === 'en' ? 'bg-[#E10E17] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            🇬🇧 Slang UK/US
          </button>
          <button
            onClick={() => setFilterLang('de')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterLang === 'de' ? 'bg-[#E10E17] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            🇩🇪 Jugendsprache
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isSaved = savedSlang.includes(item.id);

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-red-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        item.language === 'en'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {item.language === 'en' ? '🇬🇧 Anglès' : '🇩🇪 Alemany'}
                    </span>
                    <span className="text-[10px] text-neutral-500">{item.week}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => speakWord(item.expression, item.language)}
                      className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="Escoltar pronúncia autèntica"
                    >
                      <Volume2 className="w-4 h-4 text-red-500" />
                    </button>
                    <button
                      onClick={() => toggleSave(item.id)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-red-600 text-white'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                      title="Guardar expressió"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="text-lg font-black text-white tracking-wide flex items-center gap-2">
                  <span>{item.expression}</span>
                </h4>

                <p className="text-xs font-semibold text-red-400 mt-1">
                  {item.meaning}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                    Exemple d'ús real:
                  </span>
                  <p className="text-xs text-neutral-200 italic">
                    "{item.example}"
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/60 text-[11px] text-neutral-400 flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-neutral-500" />
                <span>{item.culturalNote}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
