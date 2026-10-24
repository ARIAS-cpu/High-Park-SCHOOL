import React, { useState } from 'react';
import { Calendar, Clock, Video, Users, CheckCircle2, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TutorMeetingModal: React.FC = () => {
  const { isTeenMode, showToast } = useApp();
  const [format, setFormat] = useState<'presencial' | 'online'>('presencial');
  const [selectedSlot, setSelectedSlot] = useState<string>('Dimecres 28 Oct - 19:15');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableSlots = [
    'Dimecres 28 Oct - 19:15 (després de classe)',
    'Divendres 30 Oct - 18:45',
    'Dilluns 02 Nov - 12:30 (Matí)',
    'Dijous 05 Nov - 19:30',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(`📅 Sol·licitud de tutoria amb en David enviada (${format} - ${selectedSlot})`);
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
            <Users className="w-5 h-5 text-indigo-500" />
            <h3 className="text-xl font-bold tracking-tight">Sol·licitud de Tutoria amb el Professor</h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Demana una reunió de 20 minuts amb en David o qualsevol docent per parlar de l'evolució i l'examen oficial.
          </p>
        </div>

        {submitted && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Sol·licitud confirmada</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-neutral-500 font-semibold mb-2">Format de la reunió:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat('presencial')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                format === 'presencial'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-black/5 dark:bg-white/5 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Presencial (Torras i Bages, 41)</span>
            </button>

            <button
              type="button"
              onClick={() => setFormat('online')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                format === 'online'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-black/5 dark:bg-white/5 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Videotrucada (Google Meet)</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-neutral-500 font-semibold mb-2">Franja horària disponible:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-xl border text-left font-semibold transition-all cursor-pointer ${
                  selectedSlot === slot
                    ? 'border-indigo-600 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'border-neutral-300 dark:border-neutral-800 bg-black/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-neutral-500 font-semibold mb-1">
            Motiu o tema a tractar (Opcional):
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: Valorar si convé presentar-se a la convocatòria de juny o si cal reforç en writing..."
            className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-800 dark:text-white outline-none focus:border-red-500"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md shadow-indigo-950 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Reservar Tutoria</span>
          </button>
        </div>
      </form>
    </div>
  );
};
