import React from 'react';
import { Tv, Youtube, Plane, ExternalLink, MessageSquare, Star } from 'lucide-react';
import { RECOMMENDED_MEDIA } from '../../data/mockData';

export const MediaHub: React.FC = () => {
  const testimonials = [
    {
      name: 'Carla M. (16 anys)',
      level: 'Aprovada C1 Advanced',
      dest: 'Estada a Brighton (Anglaterra)',
      text: 'Viure amb una host family em va donar la seguretat per aprovar el Speaking de Cambridge amb Grade A. Hyde Park va organitzar-ho tot genial.',
    },
    {
      name: 'Pol G. (15 anys)',
      level: 'Goethe B1',
      dest: 'Intercanvi a Munic (Alemanya)',
      text: 'Poder utilitzar el que aprenem a classe menjant un Brezel i agafant el metro a Baviera és la millor sensació del món.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Recommended VO Shows & YouTubers */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white space-y-4">
        <div className="flex items-center gap-2">
          <Tv className="w-5 h-5 text-red-500" />
          <h3 className="text-xl font-bold tracking-tight">
            Sèries & YouTubers Recomanats en Versió Original
          </h3>
        </div>
        <p className="text-xs text-neutral-400">
          Recomanacions acurades pel professorat segons el teu nivell per submergir-te en accents reals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {RECOMMENDED_MEDIA.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between hover:border-red-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/20">
                    {item.recommendedFor}
                  </span>
                  <span className="text-[10px] text-neutral-400">{item.type}</span>
                </div>

                <h4 className="font-bold text-sm text-white">{item.title}</h4>
                <p className="text-xs text-neutral-400 mt-1">{item.language}</p>

                <p className="text-xs text-neutral-300 mt-3 italic bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-800">
                  "{item.why}"
                </p>
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-neutral-200 transition-colors"
              >
                <span>Veure informació</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Summer & Exchange Programs with Student Testimonials */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl font-bold tracking-tight">
              Estades a l'Estranger & Intercanvis amb Alemanya
            </h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
            Estiu 2027 · Inscripcions Obertes
          </span>
        </div>

        <p className="text-xs text-neutral-400">
          Immersió 100% real: classes matinals en escoles col·laboradores, activitats esportives i convivència amb famílies locals seleccionades per l'equip de Hyde Park School.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-white">{t.name}</h4>
                  <span className="text-xs text-emerald-400 font-medium">{t.level}</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-neutral-900 text-neutral-300">
                  {t.dest}
                </span>
              </div>

              <p className="text-xs text-neutral-300 italic leading-relaxed">
                "{t.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
