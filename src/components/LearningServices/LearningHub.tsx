import React, { useState } from 'react';
import {
  BookOpen,
  Layers,
  Headphones,
  Target,
  FileText,
  PenTool,
  Mic,
  Sparkles
} from 'lucide-react';
import { HomeworkTracker } from './HomeworkTracker';
import { VocabularyFlashcards } from './VocabularyFlashcards';
import { ListeningLab } from './ListeningLab';
import { ExamSimulator } from './ExamSimulator';
import { GrammarPocket } from './GrammarPocket';
import { WritingStudio } from './WritingStudio';
import { SpeakingRecorder } from './SpeakingRecorder';

export const LearningHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'all' | 'homework' | 'vocab' | 'listening' | 'mock' | 'grammar' | 'writing' | 'speaking'
  >('all');

  const tools = [
    { id: 'all', label: 'Tots els Serveis', icon: Sparkles },
    { id: 'homework', label: 'Deures', icon: BookOpen },
    { id: 'vocab', label: 'Vocabulari & Flashcards', icon: Layers },
    { id: 'listening', label: 'Listenings Dossier', icon: Headphones },
    { id: 'mock', label: 'Simulacres Cronometrats', icon: Target },
    { id: 'grammar', label: 'Gramàtica Butxaca', icon: FileText },
    { id: 'writing', label: 'Writing Studio', icon: PenTool },
    { id: 'speaking', label: 'Speaking (Mic)', icon: Mic },
  ];

  return (
    <div className="space-y-6">
      {/* Learning Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold text-red-500 tracking-wider">
            7 DIES EN CONTACTE AMB L'IDIOMA
          </span>
          <h2 className="text-2xl font-black tracking-tight mt-0.5">
            Serveis d'Aprenentatge & Pràctica Diària
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            L'app no substitueix la classe presencial sinó que la reforça: pràctiques curtes de 5-10 minuts diàries que garanteixen l'aprovat a B2 First, C1 Advanced i Goethe.
          </p>
        </div>

        {/* Sub-tabs pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isSelected = activeSubTab === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => setActiveSubTab(tool.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content */}
      {(activeSubTab === 'all' || activeSubTab === 'homework') && <HomeworkTracker />}
      {(activeSubTab === 'all' || activeSubTab === 'vocab') && <VocabularyFlashcards />}
      {(activeSubTab === 'all' || activeSubTab === 'listening') && <ListeningLab />}
      {(activeSubTab === 'all' || activeSubTab === 'mock') && <ExamSimulator />}
      {(activeSubTab === 'all' || activeSubTab === 'grammar') && <GrammarPocket />}
      {(activeSubTab === 'all' || activeSubTab === 'writing') && <WritingStudio />}
      {(activeSubTab === 'all' || activeSubTab === 'speaking') && <SpeakingRecorder />}
    </div>
  );
};
