import React from 'react';
import { ShoppingBag, Radio, Sparkles, Award, Lock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeenMerch: React.FC = () => {
  const { streak, points, showToast } = useApp();

  const rewards = [
    {
      id: 'reward-bag',
      name: 'Bossa Oficial Teen Community',
      subtitle: 'Tote Bag negra amb el radiocasset vermell #E10E17 i lema "FLUENT IN STEREO"',
      unlocked: streak >= 10 || points >= 500,
      requirement: '10 dies de ratxa o 500 punts',
      icon: ShoppingBag,
      accent: 'border-red-500/50',
    },
    {
      id: 'reward-folder',
      name: 'Carpetes d’Examen "Fluent in Stereo"',
      subtitle: 'Pack de carpetes protectores per als dossiers de Cambridge B2/C1 i Goethe',
      unlocked: streak >= 7,
      requirement: '7 dies de ratxa',
      icon: Radio,
      accent: 'border-amber-500/50',
    },
    {
      id: 'reward-stickers',
      name: 'Pack d’Adhesius Cassette & Slang',
      subtitle: 'Adhesius vinílics per al portàtil amb "No Cap", "Rizz", "Ehrenmann"',
      unlocked: points >= 300,
      requirement: '300 punts',
      icon: Sparkles,
      accent: 'border-emerald-500/50',
    },
  ];

  const handleClaim = (rewardName: string) => {
    showToast(`🎁 Sol·licitud registrada! Pots recollir "${rewardName}" a recepció (Torras i Bages, 41).`);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-bold tracking-tight">
              Merchandising & Recompenses Teen
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Premis exclusius per a alumnes d'ESO i Batxillerat: fons negre, radiocasset vermell (#E10E17) i lema FLUENT IN STEREO.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-neutral-800 text-xs">
          <span className="text-neutral-400">Els teus punts:</span>
          <span className="font-mono font-bold text-amber-400">{points} pts</span>
          <span className="text-neutral-600">|</span>
          <span className="font-mono font-bold text-red-500">{streak} dies ratxa</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewards.map((reward) => {
          const Icon = reward.icon;

          return (
            <div
              key={reward.id}
              className={`p-5 rounded-2xl bg-neutral-950 border ${reward.accent} flex flex-col justify-between relative overflow-hidden transition-all`}
            >
              {reward.unlocked && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-bl-xl flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Desbloquejat!</span>
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <h4 className="font-bold text-base text-white">{reward.name}</h4>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  {reward.subtitle}
                </p>

                <div className="mt-4 p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Requisit: {reward.requirement}</span>
                </div>
              </div>

              <div className="mt-5">
                {reward.unlocked ? (
                  <button
                    onClick={() => handleClaim(reward.name)}
                    className="w-full py-2.5 rounded-xl bg-[#E10E17] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-950 cursor-pointer"
                  >
                    Recollir a Recepció
                  </button>
                ) : (
                  <div className="w-full py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 text-xs font-semibold flex items-center justify-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Bloquejat (segueix sumant)</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
