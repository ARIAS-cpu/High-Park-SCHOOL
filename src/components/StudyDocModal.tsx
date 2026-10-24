import React, { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Radio,
  Clock,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';
import { STUDY_DOCUMENT_SUMMARY } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const StudyDocModal: React.FC<{ isModal?: boolean; onClose?: () => void }> = ({
  isModal = false,
  onClose,
}) => {
  const { isTeenMode, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'summary' | 'phases' | 'tech' | 'embed'>('summary');

  const pdfUrl = '/assets/aistudio/App_Hyde_Park_School_Estudi_de_serveis_2cace1c0.pdf';

  return (
    <div
      className={`${
        isModal
          ? 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in'
          : 'space-y-6'
      }`}
    >
      <div
        className={`${
          isModal
            ? 'w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl relative'
            : 'p-6 sm:p-8 rounded-3xl border shadow-sm'
        } ${
          isTeenMode
            ? 'bg-neutral-900 border-neutral-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal close button */}
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-black/10 dark:bg-white/10 text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Title Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-red-600/10 text-red-600">
                <FileText className="w-6 h-6" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-red-500">
                  DOCUMENT ORIGINAL · {STUDY_DOCUMENT_SUMMARY.author} ({STUDY_DOCUMENT_SUMMARY.date})
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                  App Hyde Park School – Estudi de Serveis
                </h2>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2 max-w-2xl">
              {STUDY_DOCUMENT_SUMMARY.coreIdea}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="App_Hyde_Park_School_Estudi_de_serveis.pdf"
              onClick={() => showToast('Descarregant el fitxer PDF original...')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E10E17] hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descarregar PDF</span>
            </a>
          </div>
        </div>

        {/* Inner Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-6 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'summary'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Resum Executiu & Marques
          </button>
          <button
            onClick={() => setActiveTab('phases')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'phases'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Priorització en 3 Fases
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'tech'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Tecnologies & Privacitat
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'embed'
                ? 'bg-red-600 text-white'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Visor del PDF Incrustat
          </button>
        </div>

        {/* Tab 1: Summary & Brands */}
        {activeTab === 'summary' && (
          <div className="space-y-6 text-xs animate-in fade-in">
            {/* Value Proposition Table from PDF Page 1 */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800/60 font-bold text-sm">
                Per a qui i què hi guanya (Pàgina 1 del PDF)
              </div>
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <span className="font-bold text-slate-800 dark:text-white">Alumnes</span>
                  <div className="sm:col-span-3 text-neutral-600 dark:text-neutral-400">
                    Practicar entre classes (vocabulari, listenings, simulacres), veure el seu progrés, sentir-se part d'un grup (Teen Community).
                  </div>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <span className="font-bold text-slate-800 dark:text-white">Famílies</span>
                  <div className="sm:col-span-3 text-neutral-600 dark:text-neutral-400">
                    Horaris, festius, faltes, informes de febrer i juny i pagaments, sense haver de preguntar.
                  </div>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <span className="font-bold text-slate-800 dark:text-white">Acadèmia</span>
                  <div className="sm:col-span-3 text-neutral-600 dark:text-neutral-400">
                    Menys trucades i missatges repetits, avisos instantanis (classe anul·lada, canvi d'aula), cobrament més fàcil, imatge moderna davant d'altres acadèmies.
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Strategy (Opció A vs Opció B) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    Opció A (Recomanada per en David)
                  </span>
                  <span className="text-[10px] uppercase font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">
                    Triada & Implementada
                  </span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300">
                  <strong>Una sola app:</strong> Icona vermella amb el radiocasset blanc. L'usuari adolescent veu la zona Teen Community amb estètica fosca (#000) i vermella (#E10E17, radiocasset, lema FLUENT IN STEREO). Els alumnes petits i les famílies veuen la imatge neta de Hyde Park School amb colors vius.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/40 border border-neutral-300 dark:border-neutral-700 space-y-2 opacity-75">
                <span className="font-bold text-neutral-600 dark:text-neutral-400">
                  Opció B (Descartada a l'estudi)
                </span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  <strong>Dues apps separades:</strong> Duplica el cost de manteniment i la publicació a les botigues d'apps. No compensa per al volum d'una acadèmia local.
                </p>
              </div>
            </div>

            {/* Open question answered in PDF */}
            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-1">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">
                ❓ Pregunta oberta formulada per en David a la Pàgina 5:
              </span>
              <p className="text-neutral-600 dark:text-neutral-400">
                <em>"Qui mantindrà els continguts (deures, vocabulari, avisos)? Si els professors no hi pengen res, l'app és buida."</em>
                <br />
                A la nostra implementació, el <strong>Panell Docent</strong> permet als professors passar llista en 15 segons, penjar deures amb 2 clics i llençar avisos push directes sense sobrecàrrega administrativa.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: 3 Phases */}
        {activeTab === 'phases' && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <p className="text-neutral-500">
              "La recomanació és llançar primer una app petita que funcioni i que tothom faci servir, i anar-hi afegint serveis."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {STUDY_DOCUMENT_SUMMARY.keyPhases.map((phase) => (
                <div
                  key={phase.phase}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-black/5 dark:bg-white/5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="w-7 h-7 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs">
                      {phase.phase}
                    </span>
                    <h4 className="font-bold text-sm">{phase.title}</h4>
                    <p className="text-neutral-500 italic">{phase.goal}</p>

                    <div className="pt-2 space-y-1">
                      {phase.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="text-neutral-700 dark:text-neutral-300">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ 100% Implementat a l'App
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Tech Comparison & GDPR */}
        {activeTab === 'tech' && (
          <div className="space-y-6 text-xs animate-in fade-in">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800/60 font-bold text-sm">
                Comparativa Tecnològica de l'Estudi (Pàgina 5)
              </div>
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {STUDY_DOCUMENT_SUMMARY.techComparison.map((item, idx) => (
                  <div key={idx} className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <span className="font-bold text-slate-900 dark:text-white">{item.option}</span>
                    <div className="text-emerald-600 dark:text-emerald-400">
                      <strong>Avantatges:</strong> {item.pros}
                    </div>
                    <div className="text-neutral-500">
                      <strong>Inconvenients:</strong> {item.cons}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GDPR & Privacy */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Privacitat dels Menors de 14 Anys (Document Pàgina 5)</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {STUDY_DOCUMENT_SUMMARY.gdprMinorConsentNote}
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Direct PDF Viewer */}
        {activeTab === 'embed' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-neutral-500">
                Fitxer adjunt local: {pdfUrl}
              </span>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-red-600 hover:underline"
              >
                <span>Obrir en nova pestanya</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="w-full h-[550px] rounded-2xl border border-neutral-300 dark:border-neutral-700 overflow-hidden bg-neutral-900">
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                title="App Hyde Park School - Estudi de serveis"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
