import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  AlertTriangle,
  PenTool,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AcademyRules: React.FC = () => {
  const { rulesAccepted, acceptRules, isTeenMode, student, showToast } = useApp();
  const [signatureName, setSignatureName] = useState(student.tutorName);
  const [dni, setDni] = useState('47892341K');
  const [agreed, setAgreed] = useState(rulesAccepted);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signatureName.trim()) {
      showToast('Si us plau, introduïu el nom del tutor legal.');
      return;
    }
    setAgreed(true);
    acceptRules();
  };

  return (
    <div className="space-y-6">
      {/* Title banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight">
              Normativa de l'Acadèmia & Protecció de Menors
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Lectura obligatòria i acceptació digital a l'inici de curs segons el reglament de règim intern de Hyde Park School.
          </p>
        </div>

        {rulesAccepted ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Signada digitalment ({student.consentDate})</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-bold animate-pulse">
            <AlertTriangle className="w-4 h-4" />
            <span>Pendent de signatura del tutor</span>
          </div>
        )}
      </div>

      {/* Rules Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div
          className={`p-5 rounded-2xl border ${
            isTeenMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white">
            <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Mètode i Compromís dels 7 Dies</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            La classe setmanal d'1h30 és l'eix central, però l'èxit als exàmens oficials (B2, C1, Goethe) depèn del contacte curt i diari a través de l'app: deures setmanals, llistes de vocabulari i simulacres cronometrats.
          </p>
        </div>

        <div
          className={`p-5 rounded-2xl border ${
            isTeenMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white">
            <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Puntualitat i Assistència a l'Aula</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Es prega màxima puntualitat a l'aula (Torras i Bages, 41). En cas d'absència, la família rebrà notificació automàtica i disposarà de la funcionalitat per recuperar la sessió en un altre grup del mateix nivell durant la mateixa setmana.
          </p>
        </div>

        <div
          className={`p-5 rounded-2xl border ${
            isTeenMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white">
            <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Ús del Mòbil & Espai Comunitari</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Durant la classe presencial el dispositiu només s'utilitzarà quan el docent ho indiqui per a exercicis interactius. A l'espai Teen Community no hi ha xats oberts per protegir la privacitat dels menors; la interacció es fa mitjançant reaccions i enquestes moderades.
          </p>
        </div>

        <div
          className={`p-5 rounded-2xl border ${
            isTeenMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white">
            <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">
              4
            </span>
            <span>Quotes, Rebuts i Devolucions</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Les quotes trimestrals o mensuals s'abonen mitjançant targeta bancària o Bizum a través de l'app amb emissió instantània de factura/rebut oficial descarregable per a la declaració fiscal o desgravació.
          </p>
        </div>
      </div>

      {/* Minor protection & GDPR Box (Directly from Page 5 of PDF) */}
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400">
          <Lock className="w-4 h-4" />
          <span>Privacitat dels menors de 14 anys (RGPD i LOPD-GDD)</span>
        </div>
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          A Espanya, els menors de 14 anys requereixen el consentiment exprés dels pares o tutors legals per al tractament de dades educatives. El compte de l'alumne queda vinculat al compte del tutor. Totes les dades es processen en servidors ubicats a la Unió Europea sota contracte d'encarregat de tractament amb xifratge d'extrem a extrem.
        </p>
      </div>

      {/* Signature form */}
      <form
        onSubmit={handleSign}
        className={`p-6 rounded-2xl border ${
          isTeenMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'
        } space-y-4`}
      >
        <div className="flex items-center gap-2 text-sm font-bold">
          <PenTool className="w-4 h-4 text-red-500" />
          <span>Signatura Digital d'Acceptació del Tutor</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-neutral-500 font-semibold mb-1">
              Nom complet del Pare / Mare / Tutor legal
            </label>
            <input
              type="text"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              disabled={agreed}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-800 dark:text-white font-medium outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">
              DNI / NIE del Signatari
            </label>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              disabled={agreed}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-800 dark:text-white font-mono font-medium outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            {agreed ? (
              <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Consentiment vigent i emmagatzemat al servidor.
              </span>
            ) : (
              <span>En fer clic a "Signar Digitalment", confirmeu que heu llegit i accepteu les condicions.</span>
            )}
          </div>

          <button
            type="submit"
            disabled={agreed}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              agreed
                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-950 cursor-pointer'
            }`}
          >
            {agreed ? 'Acceptat & Signat' : 'Signar Digitalment'}
          </button>
        </div>
      </form>
    </div>
  );
};
