import React, { useState } from 'react';
import { UserCheck, Sparkles, CheckCircle2, Save, FileSpreadsheet } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EnrollmentForm: React.FC = () => {
  const { isTeenMode, student, showToast } = useApp();
  const [formData, setFormData] = useState({
    studentName: student.name,
    birthDate: '14/05/2010',
    schoolYear: '4t d’ESO',
    tutorName: student.tutorName,
    tutorPhone: student.tutorPhone,
    tutorEmail: student.tutorEmail,
    iban: 'ES91 2100 0418 4502 0005 1234',
    selectedNextCourse: 'C1 Advanced (CAE Mastery) - Curs 2027/2028',
    termsAccepted: true,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    showToast('💾 Dades desades al sistema! La renovació de plaça queda preconfirmada.');
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
            <UserCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xl font-bold tracking-tight">
              Inscripció & Renovació Ràpida (Dades Desades)
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Les dades es guarden d'un any per l'altre. Si fas més d'un curs a Hyde Park, no cal tornar a omplir formularis externs.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold">
          Dades Verificades
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Nom de l'alumne</label>
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent font-medium text-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Data de naixement</label>
            <input
              type="text"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent font-medium text-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Curs escolar ordinari</label>
            <input
              type="text"
              value={formData.schoolYear}
              onChange={(e) => setFormData({ ...formData, schoolYear: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent font-medium text-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Tutor/a legal</label>
            <input
              type="text"
              value={formData.tutorName}
              onChange={(e) => setFormData({ ...formData, tutorName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent font-medium text-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Telèfon de contacte</label>
            <input
              type="tel"
              value={formData.tutorPhone}
              onChange={(e) => setFormData({ ...formData, tutorPhone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent font-medium font-mono text-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Email avisos i rebuts</label>
            <input
              type="email"
              value={formData.tutorEmail}
              onChange={(e) => setFormData({ ...formData, tutorEmail: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent font-medium text-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-neutral-500 font-semibold mb-1">
            Pre-reserva per al curs següent (Opció preferent d'antic alumne)
          </label>
          <select
            value={formData.selectedNextCourse}
            onChange={(e) => setFormData({ ...formData, selectedNextCourse: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-medium text-slate-800 dark:text-white"
          >
            <option>C1 Advanced (CAE Mastery) - Curs 2027/2028</option>
            <option>Deutsch Goethe-Zertifikat B2 - Curs 2027/2028</option>
            <option>Intensiu Cambridge d'Estiu 2027</option>
          </select>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 dark:border-neutral-800">
          <span className="text-neutral-400">
            Dades allotjades en servidors europeus segurs d'acord amb la LOPD-GDD.
          </span>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md shadow-emerald-950 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Desar i Confirmar Renovació</span>
          </button>
        </div>
      </form>
    </div>
  );
};
