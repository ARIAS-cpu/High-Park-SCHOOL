import React from 'react';
import {
  BookOpen,
  Radio,
  GraduationCap,
  Users,
  Settings,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';
import { UI_TEXT } from '../utils/translations';

export const Navigation: React.FC = () => {
  const { currentTab, setCurrentTab, isTeenMode, setIsTeenMode, language, userRole } = useApp();
  const t = UI_TEXT[language];

  interface NavItem {
    id: AppTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    teenOnly?: boolean;
    familyOnly?: boolean;
    teacherOnly?: boolean;
  }

  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: t.overviewTab,
      icon: BookOpen,
    },
    {
      id: 'teen-community',
      label: 'Teen Community',
      icon: Radio,
      badge: 'STEREO',
    },
    {
      id: 'learning',
      label: t.learningTab,
      icon: GraduationCap,
      badge: '7 DIES',
    },
    {
      id: 'family-management',
      label: t.familyTab,
      icon: Users,
    },
    {
      id: 'teacher-panel',
      label: t.teacherTab,
      icon: Settings,
      teacherOnly: true,
    },
    {
      id: 'pdf-study',
      label: t.studyDocTab,
      icon: FileSpreadsheet,
    },
  ];

  const handleTabClick = (tabId: AppTab) => {
    setCurrentTab(tabId);
    if (tabId === 'teen-community') {
      setIsTeenMode(true);
    }
  };

  return (
    <nav
      className={`border-b sticky top-[73px] z-30 transition-colors backdrop-blur-md ${
        isTeenMode
          ? 'bg-neutral-950/90 border-neutral-800'
          : 'bg-white/95 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isTeenItem = item.id === 'teen-community';

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? isTeenMode || isTeenItem
                      ? 'bg-[#E10E17] text-white shadow-md shadow-red-950/50'
                      : 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : isTeenMode
                    ? 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-white'
                      : isTeenItem
                      ? 'text-red-500'
                      : 'text-neutral-500'
                  }`}
                />
                <span>{item.label}</span>

                {item.badge && (
                  <span
                    className={`text-[10px] font-black uppercase px-1.5 py-0.2 rounded ${
                      isActive
                        ? 'bg-black/30 text-white'
                        : isTeenItem
                        ? 'bg-red-500/20 text-red-500 font-mono'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
