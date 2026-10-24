import React, { useState } from 'react';
import {
  UserCheck,
  PlusCircle,
  Bell,
  CheckCircle2,
  Briefcase,
  AlertCircle,
  Clock,
  Send,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COURSES } from '../../data/mockData';

export const TeacherDashboard: React.FC = () => {
  const { isTeenMode, addHomework, addNotification, activeCourseId, showToast } = useApp();
  const currentCourse = COURSES.find((c) => c.id === activeCourseId) || COURSES[0];

  // Roll call local state
  const [studentsRoll, setStudentsRoll] = useState([
    { id: 1, name: 'Marc Rovira Soler', status: 'present' as const },
    { id: 2, name: 'Clara Pons Vilà', status: 'present' as const },
    { id: 3, name: 'Alexandre Puig Martí', status: 'present' as const },
    { id: 4, name: 'Mireia Fontanals', status: 'absent' as const },
    { id: 5, name: 'Nil Casals Costa', status: 'late' as const },
  ]);

  // New Homework Form State
  const [hwTitle, setHwTitle] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDueDate, setHwDueDate] = useState('Dilluns vinent');
  const [hwUnit, setHwUnit] = useState('Unitat 5 · Cambridge First');

  // Push Announcement Form State
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState<'room_change' | 'cancellation' | 'exam' | 'payment'>('room_change');

  const handleRollToggle = (studentId: number, status: 'present' | 'absent' | 'late') => {
    setStudentsRoll((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
  };

  const handleSaveRollCall = () => {
    showToast(`📋 Llista de ${currentCourse.name} desada i avisos enviats automàticament a les famílies amb faltes.`);
  };

  const handlePostHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle.trim()) {
      showToast('Si us plau, introduïu un títol per als deures.');
      return;
    }
    addHomework({
      title: hwTitle,
      description: hwDesc || 'Exercicis del dossier per preparar la sessió.',
      dueDate: hwDueDate,
      unit: hwUnit,
      courseId: activeCourseId,
    });
    setHwTitle('');
    setHwDesc('');
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim() || !notifMessage.trim()) {
      showToast('Si us plau, ompliu el títol i el missatge de l’avís.');
      return;
    }
    addNotification({
      title: notifTitle,
      message: notifMessage,
      type: notifType,
    });
    setNotifTitle('');
    setNotifMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold text-emerald-600 tracking-wider">
            PORTAL DEL PROFESSORAT & DIRECCIÓ
          </span>
          <h2 className="text-2xl font-black tracking-tight mt-0.5">
            Panell Docent: {currentCourse.name}
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-xl">
            Passa llista amb el mòbil, penja deures de la setmana, envia notificacions push instantànies al grup i gestiona les correccions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            Docent: David (Cap d’Estudis)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Passar Llista amb un toc */}
        <div
          className={`lg:col-span-6 p-6 rounded-3xl border ${
            isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
          } flex flex-col justify-between`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-base">Passar Llista a l'Aula</h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {currentCourse.room} · Avui
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {studentsRoll.map((st) => (
                <div
                  key={st.id}
                  className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold">{st.name}</span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleRollToggle(st.id, 'present')}
                      className={`px-2 py-1 rounded-lg font-bold text-[11px] cursor-pointer ${
                        st.status === 'present'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-black/10 dark:bg-white/10 text-neutral-500'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleRollToggle(st.id, 'absent')}
                      className={`px-2 py-1 rounded-lg font-bold text-[11px] cursor-pointer ${
                        st.status === 'absent'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-black/10 dark:bg-white/10 text-neutral-500'
                      }`}
                    >
                      Falta
                    </button>
                    <button
                      onClick={() => handleRollToggle(st.id, 'late')}
                      className={`px-2 py-1 rounded-lg font-bold text-[11px] cursor-pointer ${
                        st.status === 'late'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-black/10 dark:bg-white/10 text-neutral-500'
                      }`}
                    >
                      Retard
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveRollCall}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950 cursor-pointer"
          >
            Confirmar Assistència i Notificar Famílies
          </button>
        </div>

        {/* Penjar Deures de la Setmana */}
        <div
          className={`lg:col-span-6 p-6 rounded-3xl border ${
            isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-base">Penjar Deures per a la Setmana</h3>
          </div>

          <form onSubmit={handlePostHomework} className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-500 font-semibold mb-1">Títol de la tasca:</label>
              <input
                type="text"
                placeholder="Ex: Workbook Pàgs 42-43 & Phrasal Verbs"
                value={hwTitle}
                onChange={(e) => setHwTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-900 dark:text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-neutral-500 font-semibold mb-1">Descripció o instruccions:</label>
              <textarea
                rows={2}
                placeholder="Explicació breu del que s'ha de preparar per a la propera sessió..."
                value={hwDesc}
                onChange={(e) => setHwDesc(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-900 dark:text-white outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-500 font-semibold mb-1">Unitat / Dossier:</label>
                <input
                  type="text"
                  value={hwUnit}
                  onChange={(e) => setHwUnit(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-500 font-semibold mb-1">Lliurament:</label>
                <input
                  type="text"
                  value={hwDueDate}
                  onChange={(e) => setHwDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md shadow-indigo-950 cursor-pointer"
              >
                Publicar Deures al Grup
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Enviar Avisos Push Instantanis */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border ${
          isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-red-500" />
          <h3 className="font-bold text-base">Enviar Avís Push Urgent al Grup</h3>
        </div>

        <form onSubmit={handleSendAnnouncement} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-neutral-500 font-semibold mb-1">Tipus d'avís:</label>
              <select
                value={notifType}
                onChange={(e) => setNotifType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white"
              >
                <option value="room_change">Canvi d'aula</option>
                <option value="cancellation">Classe anul·lada / Festiu</option>
                <option value="exam">Recordatori d'examen</option>
                <option value="payment">Recordatori de pagament</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-neutral-500 font-semibold mb-1">Títol de la notificació:</label>
              <input
                type="text"
                placeholder="Ex: Canvi d'aula avui o Porteu el dossier 2..."
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-900 dark:text-white outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Text del missatge push:</label>
            <input
              type="text"
              placeholder="Missatge que rebran els alumnes i famílies al seu telèfon mòbil..."
              value={notifMessage}
              onChange={(e) => setNotifMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-slate-900 dark:text-white outline-none focus:border-red-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-md shadow-red-950 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Notificació Push</span>
            </button>
          </div>
        </form>
      </div>

      {/* BEST Solutions Future Enterprise Portal Preview (Page 4 of PDF) */}
      <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 text-white flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold uppercase text-amber-400">
              BEST Solutions · Business Language Solutions
            </span>
          </div>
          <h4 className="font-bold text-sm">
            Accés per a Alumnes d'Empresa (Fase 3 del Document de Serveis)
          </h4>
          <p className="text-xs text-neutral-400 max-w-xl">
            Mòdul previst per a classes corporatives online, documents d'anglès professional i formació bonificada per a empreses associades a Hyde Park School.
          </p>
        </div>

        <button
          onClick={() => showToast('BEST Solutions: Mòdul en fase de desplegament corporatiu')}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
        >
          Consultar Mòdul Empresa
        </button>
      </div>
    </div>
  );
};
