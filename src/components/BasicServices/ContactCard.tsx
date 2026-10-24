import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactCard: React.FC = () => {
  const { isTeenMode, showToast } = useApp();

  return (
    <div
      className={`p-6 sm:p-8 rounded-3xl border ${
        isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold tracking-tight">On Som & Contacte Immediat</h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Sense esperes: contacta amb recepció i secretaria directament des del mòbil.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
          Obert avui de 09:30 a 20:30
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick action buttons */}
        <div className="space-y-3">
          <a
            href="tel:+34938765432"
            onClick={() => showToast('Iniciant trucada telefònica amb secretaria...')}
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Trucada directa</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-blue-600">
                  93 876 54 32
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="https://wa.me/34600123456?text=Hola%20Hyde%20Park%20School,%20volia%20fer%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => showToast('Obrint xat de WhatsApp d’atenció al client...')}
            className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block">WhatsApp Escola</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-emerald-600">
                  +34 600 12 34 56
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="mailto:info@hydeparkschool.cat?subject=Consulta%20Hyde%20Park%20School"
            onClick={() => showToast('Obrint gestor de correu electrònic...')}
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-700 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Correu oficial</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-red-600">
                  info@hydeparkschool.cat
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Address and Interactive Map Simulation */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 relative bg-slate-900 min-h-[220px] flex flex-col justify-between p-6 text-white shadow-inner">
          {/* Stylized Map Background Pattern */}
          <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <span className="px-2.5 py-1 rounded bg-[#E10E17] text-white font-mono text-xs font-bold">
                SEU PRINCIPAL
              </span>
              <h3 className="text-lg font-bold mt-2">Torras i Bages, 41</h3>
              <p className="text-xs text-neutral-300">
                A 3 minuts del metro i transport públic. Accés adaptat i sales d'estudi.
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg animate-bounce">
              <MapPin className="w-6 h-6" />
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-white/10">
            <span className="text-xs text-neutral-300">
              Coordenades: 41.4412° N, 2.1915° E
            </span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Torras+i+Bages+41"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-neutral-100 transition-colors shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-red-600" />
              <span>Com arribar-hi (Google Maps)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
