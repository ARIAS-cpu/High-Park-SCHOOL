import React, { useState } from 'react';
import { Award, Download, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EvaluationReports: React.FC = () => {
  const { isTeenMode, showToast, student } = useApp();
  const [selectedTerm, setSelectedTerm] = useState<'feb' | 'jun'>('feb');

  const reportData = {
    feb: {
      term: 'Informe 1r Semestre (Febrer 2027)',
      date: '12 de Febrer de 2027',
      globalGrade: 'Notable Alt (8.8 / 10)',
      cambridgeProjection: 'Cambridge B2 First - Grade A / B',
      skills: [
        { name: 'Speaking & Fluency', score: 85, comment: 'Molt bona interacció i pronúncia natural' },
        { name: 'Listening Comprehension', score: 90, comment: 'Excel·lent comprensió d’accents variats' },
        { name: 'Reading & Use of English', score: 88, comment: 'Gran precisió amb phrasal verbs i collocations' },
        { name: 'Writing & Organisation', score: 85, comment: 'Estructura clara de paràgrafs i connectors rics' },
      ],
      teacherNote:
        'En Marc mostra una dedicació constant a les sessions presencials i destaca pel manteniment de la ratxa a l’app. Si manté aquest ritme, superarà la convocatòria oficial de juny amb una qualificació destacada.',
      teacherName: 'David (Cap d’Estudis)',
    },
    jun: {
      term: 'Informe Final de Curs (Juny 2027)',
      date: 'Propera publicació: 25 de Juny de 2027',
      globalGrade: 'Pendent d’avaluació final',
      cambridgeProjection: 'Previsió d’èxit oficial',
      skills: [],
      teacherNote: 'L’informe final de juny s’emetrà un cop finalitzades les convocatòries oficials.',
      teacherName: 'David (Cap d’Estudis)',
    },
  };

  const current = reportData[selectedTerm];

  const handleDownload = () => {
    const textReport = `========================================================
HYDE PARK SCHOOL - INFORME D'AVALUACIÓ OFICIAL
Torras i Bages, 41 · Tel: 93 876 54 32
========================================================
Alumne: ${student.name}
Grup: B2 First for Schools (Teens)
Període: ${current.term}
Data d'emissió: ${current.date}
Qualificació global: ${current.globalGrade}
Projecció oficial: ${current.cambridgeProjection}
--------------------------------------------------------
DESGLOSSAMENT PER COMPETÈNCIES LINGÜÍSTIQUES:
${current.skills.map((s) => `- ${s.name}: ${s.score}% (${s.comment})`).join('\n')}
--------------------------------------------------------
VALORACIÓ DOCENT:
"${current.teacherNote}"
Docent responsable: ${current.teacherName}
========================================================`;

    const blob = new Blob([textReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `informe_avaluacio_${student.name.replace(/\s+/g, '_')}_${selectedTerm}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('📄 Butlletí oficial descarregat en el teu dispositiu');
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
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold tracking-tight">Informes d'Avaluació Trimestrals</h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Butlletins oficials de febrer i juny amb desglossament de competències per al seguiment de la família.
          </p>
        </div>

        {/* Term Switcher */}
        <div className="flex items-center p-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-xs font-bold">
          <button
            onClick={() => setSelectedTerm('feb')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedTerm === 'feb'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Informe Febrer
          </button>
          <button
            onClick={() => setSelectedTerm('jun')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedTerm === 'jun'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Informe Juny
          </button>
        </div>
      </div>

      {/* Main Report Card */}
      <div
        className={`p-6 rounded-2xl border ${
          isTeenMode ? 'bg-neutral-950 border-neutral-800' : 'bg-slate-50 border-slate-200'
        } space-y-6`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-red-500">
              {current.term}
            </span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Alumne: {student.name}
            </h4>
            <span className="text-xs text-neutral-400">Emès: {current.date}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                Qualificació Global
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {current.globalGrade}
              </span>
            </div>

            {selectedTerm === 'feb' && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-950 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descarregar Butlletí</span>
              </button>
            )}
          </div>
        </div>

        {/* Skills Bars */}
        {current.skills.length > 0 ? (
          <div className="space-y-4">
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block">
              Valoració per Competències Cambridge B2:
            </span>

            <div className="space-y-3">
              {current.skills.map((skill, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-neutral-200">
                      {skill.name}
                    </span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {skill.score}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500 italic">{skill.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-neutral-400">
            Aquest informe estarà disponible en finalitzar el curs i les convocatòries de juny 2027.
          </div>
        )}

        {/* Teacher Note */}
        <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs space-y-1">
          <span className="font-bold text-neutral-700 dark:text-neutral-300 block">
            Comentari pedagògic de {current.teacherName}:
          </span>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
            "{current.teacherNote}"
          </p>
        </div>
      </div>
    </div>
  );
};
