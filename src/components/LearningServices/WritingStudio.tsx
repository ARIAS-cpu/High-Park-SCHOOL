import React, { useState } from 'react';
import { PenTool, Upload, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WritingStudio: React.FC = () => {
  const { isTeenMode, addPoints, showToast } = useApp();
  const [essayText, setEssayText] = useState(
    `In recent years, technology has transformed the way young people learn languages. On the one hand, applications allow students to practice vocabulary and listenings everyday from home. Furthermore, interactive challenges make revision far more motivating. On the other hand, the role of a dedicated teacher remains essential to clarify complex grammar and boost speaking fluency. In conclusion, combining classroom excellence with a daily app creates the ideal recipe for exam success.`
  );
  const [submissionStatus, setSubmissionStatus] = useState<'draft' | 'submitted' | 'corrected'>('corrected');

  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount < 40) {
      showToast('La redacció ha de tenir un mínim de paraules abans d’enviar-la.');
      return;
    }
    setSubmissionStatus('submitted');
    addPoints(30, 'Writing enviat al professor');
    showToast('📝 Redacció enviada a en David per a correcció!');
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
            <PenTool className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-bold tracking-tight">Writing Clinic & Redaccions</h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Envia la teva redacció (escrita directament o foto del quadern) i el teu professor te la retornarà amb correccions detallades.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
              wordCount >= 140 && wordCount <= 190
                ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
            }`}
          >
            {wordCount} paraules (Objectiu B2: 140 - 190)
          </span>
        </div>
      </div>

      {/* Editor & Photo upload area */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-neutral-600 dark:text-neutral-300">
            Tasca activa: Essay - "Is digital technology improving foreign language learning?"
          </span>
          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-bold hover:border-red-500 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-red-500" />
            <span>Pujar foto del quadern</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={() => showToast('📷 Foto del quadern adjuntada amb èxit per al professor')}
            />
          </label>
        </div>

        <textarea
          rows={6}
          value={essayText}
          onChange={(e) => setEssayText(e.target.value)}
          placeholder="Escriu aquí la teva redacció en anglès o alemany..."
          className="w-full p-4 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-800 dark:text-neutral-100 font-sans text-xs sm:text-sm leading-relaxed outline-none focus:border-red-500"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-950 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Redacció al Professor</span>
          </button>
        </div>
      </form>

      {/* Teacher's Marked Feedback (Real Exam Criteria) */}
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <MessageSquare className="w-4 h-4 text-emerald-500" />
            <span>Última Correcció Retornada pel Professor (David)</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold">
            Nota Cambridge: Band 5 (19/20) ⭐
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-500/20">
              <span className="text-[10px] text-neutral-400 block font-bold">Content</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">5 / 5</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-500/20">
              <span className="text-[10px] text-neutral-400 block font-bold">Comm. Achiev.</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">5 / 5</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-500/20">
              <span className="text-[10px] text-neutral-400 block font-bold">Organisation</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">4.5 / 5</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-500/20">
              <span className="text-[10px] text-neutral-400 block font-bold">Language</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">4.5 / 5</span>
            </div>
          </div>

          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans pt-1">
            💬 <strong>Comentari d'en David:</strong> "Molt bona estructura de 4 paràgrafs. Els connectors (On the one hand, Furthermore, In conclusion) estan perfectament integrats. Vigila només 'everyday' (adjectiu) vs 'every day' (adverbi de temps). Continua així, és redacció de C1!"
          </p>
        </div>
      </div>
    </div>
  );
};
