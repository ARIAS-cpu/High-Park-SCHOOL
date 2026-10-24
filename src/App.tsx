import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { OverviewHub } from './components/BasicServices/OverviewHub';
import { TeenHub } from './components/TeenCommunity/TeenHub';
import { LearningHub } from './components/LearningServices/LearningHub';
import { FamilyHub } from './components/FamilyServices/FamilyHub';
import { TeacherDashboard } from './components/TeacherPanel/TeacherDashboard';
import { StudyDocModal } from './components/StudyDocModal';
import { Radio, MapPin, Phone, MessageCircle, FileText, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentTab,
    isTeenMode,
    showStudyDocModal,
    setShowStudyDocModal,
    toastMessage,
    setCurrentTab,
    setIsTeenMode
  } = useApp();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 font-sans ${
        isTeenMode
          ? 'bg-neutral-950 text-neutral-100 selection:bg-[#E10E17] selection:text-white'
          : 'bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white'
      }`}
    >
      {/* Top Header */}
      <Header />

      {/* Main Tab Navigation */}
      <Navigation />

      {/* Main Application Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {currentTab === 'overview' && <OverviewHub />}
        {currentTab === 'teen-community' && <TeenHub />}
        {currentTab === 'learning' && <LearningHub />}
        {currentTab === 'family-management' && <FamilyHub />}
        {currentTab === 'teacher-panel' && <TeacherDashboard />}
        {currentTab === 'pdf-study' && <StudyDocModal isModal={false} />}
      </main>

      {/* Modal for PDF Study if invoked from header button */}
      {showStudyDocModal && (
        <StudyDocModal isModal={true} onClose={() => setShowStudyDocModal(false)} />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 ${
              isTeenMode
                ? 'bg-neutral-900 border-red-500/50 text-white'
                : 'bg-slate-900 border-slate-700 text-white'
            }`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className={`border-t py-8 text-xs transition-colors ${
          isTeenMode
            ? 'bg-black border-neutral-800 text-neutral-400'
            : 'bg-white border-slate-200 text-slate-500'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-white">Hyde Park School</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              Torras i Bages, 41
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Tel: 93 876 54 32</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => {
                setIsTeenMode(true);
                setCurrentTab('teen-community');
              }}
              className="hover:text-red-500 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-[#E10E17]" />
              <span>Teen Community (Fluent in Stereo)</span>
            </button>

            <button
              onClick={() => setShowStudyDocModal(true)}
              className="hover:text-red-500 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Estudi de serveis @David</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
