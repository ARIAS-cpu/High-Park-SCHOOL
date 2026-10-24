import React, { useState } from 'react';
import { CreditCard, UserCheck, RefreshCw, Award, Users, FileText, Sparkles } from 'lucide-react';
import { PaymentsBilling } from './PaymentsBilling';
import { AttendanceTracker } from './AttendanceTracker';
import { ClassRecovery } from './ClassRecovery';
import { EvaluationReports } from './EvaluationReports';
import { TutorMeetingModal } from './TutorMeetingModal';
import { EnrollmentForm } from './EnrollmentForm';

export const FamilyHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'all' | 'payments' | 'attendance' | 'recovery' | 'reports' | 'tutoring' | 'enrollment'
  >('all');

  const tabs = [
    { id: 'all', label: 'Tota la Gestió', icon: Sparkles },
    { id: 'payments', label: 'Pagaments & Rebuts', icon: CreditCard },
    { id: 'attendance', label: 'Faltes & Justificacions', icon: UserCheck },
    { id: 'recovery', label: 'Recuperar Classes', icon: RefreshCw },
    { id: 'reports', label: 'Informes Febrer/Juny', icon: Award },
    { id: 'tutoring', label: 'Demanar Tutoria', icon: Users },
    { id: 'enrollment', label: 'Inscripció & Dades', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Family Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold text-indigo-600 tracking-wider">
            ESPAI PER A FAMÍLIES I GESTIÓ
          </span>
          <h2 className="text-2xl font-black tracking-tight mt-0.5">
            Gestió Acadèmica Integral
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Substitueix Google Forms, trucades i efectiu: consulta horaris, faltes, informes d'avaluació i paga quotes amb targeta o Bizum sense haver de demanar-ho.
          </p>
        </div>

        {/* Sub-tabs pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSubTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Sub-components */}
      {(activeSubTab === 'all' || activeSubTab === 'payments') && <PaymentsBilling />}
      {(activeSubTab === 'all' || activeSubTab === 'attendance') && <AttendanceTracker />}
      {(activeSubTab === 'all' || activeSubTab === 'recovery') && <ClassRecovery />}
      {(activeSubTab === 'all' || activeSubTab === 'reports') && <EvaluationReports />}
      {(activeSubTab === 'all' || activeSubTab === 'tutoring') && <TutorMeetingModal />}
      {(activeSubTab === 'all' || activeSubTab === 'enrollment') && <EnrollmentForm />}
    </div>
  );
};
