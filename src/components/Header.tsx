import React, { useState } from 'react';
import {
  Bell,
  Sparkles,
  Radio,
  FileText,
  Phone,
  MessageCircle,
  MapPin,
  Flame,
  Award,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UI_TEXT } from '../utils/translations';
import { COURSES } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    userRole,
    setUserRole,
    currentTab,
    setCurrentTab,
    isTeenMode,
    setIsTeenMode,
    notifications,
    markNotificationRead,
    streak,
    points,
    setShowStudyDocModal,
    activeCourseId,
    setActiveCourseId,
    showToast
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const t = UI_TEXT[language];
  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentCourse = COURSES.find((c) => c.id === activeCourseId) || COURSES[0];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 border-b shadow-sm ${
        isTeenMode
          ? 'bg-neutral-950 border-neutral-800 text-white'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Top micro bar for Contact info & Address */}
      <div
        className={`px-4 py-1 text-xs border-b flex flex-wrap items-center justify-between gap-2 transition-colors ${
          isTeenMode
            ? 'bg-black/60 border-neutral-800 text-neutral-400'
            : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            Torras i Bages, 41
          </span>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
          <a
            href="tel:+34938765432"
            className="hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-emerald-600" />
            93 876 54 32
          </a>
          <a
            href="https://wa.me/34600123456?text=Hola%20Hyde%20Park%20School"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-500 transition-colors flex items-center gap-1 text-emerald-700 font-medium"
          >
            <MessageCircle className="w-3 h-3 text-emerald-500" />
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-2">
          {/* PDF Study Button */}
          <button
            onClick={() => setShowStudyDocModal(true)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
            title="Consulteu el document original de l'estudi de serveis"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Estudi de serveis (PDF)</span>
          </button>

          {/* Language selector */}
          <div className="flex items-center bg-black/5 dark:bg-white/10 rounded p-0.5 text-xs font-bold">
            {(['ca', 'es', 'en', 'de'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-1.5 py-0.5 rounded uppercase text-[10px] transition-colors ${
                  language === lang
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main header bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand identity & logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentTab('overview');
              setIsTeenMode(false);
            }}
            className="flex items-center gap-3 text-left group"
          >
            {isTeenMode ? (
              /* Teen Boombox Badge */
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E10E17] to-red-800 flex items-center justify-center shadow-lg shadow-red-950/40 border border-red-500/30 group-hover:scale-105 transition-transform">
                <Radio className="w-5 h-5 text-white animate-pulse" />
              </div>
            ) : (
              /* Hyde Park Crest */
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white flex items-center justify-center font-black tracking-wider text-lg shadow-md border border-slate-700">
                HP
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight leading-none">
                  {isTeenMode ? 'TEEN COMMUNITY' : 'Hyde Park School'}
                </span>
                {isTeenMode && (
                  <span className="text-[10px] uppercase font-black px-1.5 py-0.5 bg-[#E10E17] text-white rounded tracking-widest animate-pulse">
                    STEREO
                  </span>
                )}
              </div>
              <p
                className={`text-xs font-medium tracking-wide ${
                  isTeenMode ? 'text-red-400 font-mono tracking-widest' : 'text-slate-500'
                }`}
              >
                {isTeenMode ? 'FLUENT IN STEREO · ESO & BATX' : t.tagline}
              </p>
            </div>
          </button>

          {/* Brand Switcher Pill */}
          <div className="hidden md:flex items-center p-1 rounded-full bg-slate-200/70 dark:bg-neutral-800 text-xs font-semibold ml-2">
            <button
              onClick={() => {
                setIsTeenMode(false);
                if (currentTab === 'teen-community') setCurrentTab('overview');
              }}
              className={`px-3 py-1 rounded-full transition-all ${
                !isTeenMode
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Acadèmia
            </button>
            <button
              onClick={() => {
                setIsTeenMode(true);
                setCurrentTab('teen-community');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                isTeenMode
                  ? 'bg-[#E10E17] text-white shadow-sm font-bold shadow-red-900/50'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-red-500'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Teen Community</span>
            </button>
          </div>
        </div>

        {/* Right side controls: Role selector, streak, notifications, profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Course Selector */}
          <div className="hidden lg:flex items-center">
            <select
              value={activeCourseId}
              onChange={(e) => {
                setActiveCourseId(e.target.value);
                showToast(`Curs canviat a: ${COURSES.find(c => c.id === e.target.value)?.name}`);
              }}
              className={`text-xs font-semibold py-1.5 px-2.5 rounded-lg border outline-none cursor-pointer transition-colors ${
                isTeenMode
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-200 focus:border-red-500'
                  : 'bg-white border-slate-300 text-slate-800 focus:border-indigo-600'
              }`}
            >
              {COURSES.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.level})
                </option>
              ))}
            </select>
          </div>

          {/* Gamification Streak & Points */}
          <div
            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl border text-xs ${
              isTeenMode
                ? 'bg-neutral-900 border-neutral-800 text-neutral-200'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1 font-bold text-amber-500" title="Ratxa de dies consecutius practicant">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
              <span>{streak}d</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 font-semibold text-emerald-600" title="Punts Hyde Park acumulats">
              <Award className="w-4 h-4" />
              <span>{points} pts</span>
            </div>
          </div>

          {/* Role Switcher (Student / Family / Teacher) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isTeenMode
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:border-neutral-500'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">
                {userRole === 'student' ? t.roleStudent : userRole === 'family' ? t.roleFamily : t.roleTeacher}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {showRoleMenu && (
              <div
                className={`absolute right-0 mt-2 w-52 rounded-xl shadow-xl border py-2 z-50 animate-in fade-in zoom-in-95 ${
                  isTeenMode
                    ? 'bg-neutral-900 border-neutral-700 text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Canviar perfil de vista
                </div>
                <button
                  onClick={() => {
                    setUserRole('student');
                    setIsTeenMode(true);
                    setCurrentTab('teen-community');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-neutral-800/20 ${
                    userRole === 'student' ? 'text-red-500 font-bold' : ''
                  }`}
                >
                  <span>🎧 {t.roleStudent}</span>
                  {userRole === 'student' && <CheckCircle2 className="w-4 h-4 text-red-500" />}
                </button>
                <button
                  onClick={() => {
                    setUserRole('family');
                    setIsTeenMode(false);
                    setCurrentTab('family-management');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-neutral-800/20 ${
                    userRole === 'family' ? 'text-indigo-600 font-bold' : ''
                  }`}
                >
                  <span>👨‍👩‍👧 {t.roleFamily}</span>
                  {userRole === 'family' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                </button>
                <button
                  onClick={() => {
                    setUserRole('teacher');
                    setIsTeenMode(false);
                    setCurrentTab('teacher-panel');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-neutral-800/20 ${
                    userRole === 'teacher' ? 'text-emerald-600 font-bold' : ''
                  }`}
                >
                  <span>👨‍🏫 {t.roleTeacher}</span>
                  {userRole === 'teacher' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className={`p-2 rounded-xl relative border transition-colors cursor-pointer ${
                isTeenMode
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title="Avisos i Notificacions Push"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div
                className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl border p-4 z-50 animate-in fade-in zoom-in-95 ${
                  isTeenMode
                    ? 'bg-neutral-900 border-neutral-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-sm">Avisos de l'acadèmia</span>
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">
                    {unreadCount} pendents
                  </span>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        notif.read
                          ? 'opacity-60 bg-transparent border-neutral-200 dark:border-neutral-800'
                          : isTeenMode
                          ? 'bg-neutral-800 border-red-500/40 text-white'
                          : 'bg-red-50/50 border-red-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold">{notif.title}</span>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="mt-1 text-neutral-400 dark:text-neutral-300 leading-relaxed">
                        {notif.message}
                      </p>
                      <span className="block mt-2 text-[10px] text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notif.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
