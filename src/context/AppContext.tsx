import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Language,
  UserRole,
  AppTab,
  HomeworkItem,
  NotificationItem,
  InvoiceItem,
  AttendanceRecord,
} from '../types';
import {
  HOMEWORK_ITEMS,
  NOTIFICATIONS,
  INVOICES,
  ATTENDANCE_HISTORY,
  CURRENT_STUDENT,
} from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentTab: AppTab;
  setCurrentTab: (tab: AppTab) => void;
  isTeenMode: boolean;
  setIsTeenMode: (val: boolean) => void;
  activeCourseId: string;
  setActiveCourseId: (id: string) => void;
  homeworkList: HomeworkItem[];
  toggleHomework: (id: string) => void;
  addHomework: (item: { title: string; description: string; dueDate: string; unit: string; courseId: string }) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  addNotification: (item: { title: string; message: string; type: NotificationItem['type'] }) => void;
  streak: number;
  points: number;
  addPoints: (pts: number, reason?: string) => void;
  invoices: InvoiceItem[];
  payInvoice: (id: string, method: 'Bizum' | 'Targeta') => void;
  attendance: AttendanceRecord[];
  justifyAbsence: (id: string, reason: string) => void;
  rulesAccepted: boolean;
  acceptRules: () => void;
  bookedRecoveries: string[];
  bookRecovery: (classId: string) => void;
  showStudyDocModal: boolean;
  setShowStudyDocModal: (val: boolean) => void;
  student: typeof CURRENT_STUDENT;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ca');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentTab, setCurrentTab] = useState<AppTab>('overview');
  const [isTeenMode, setIsTeenMode] = useState<boolean>(false);
  const [activeCourseId, setActiveCourseId] = useState<string>('b2-teens');
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(HOMEWORK_ITEMS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [streak, setStreak] = useState<number>(CURRENT_STUDENT.currentStreak);
  const [points, setPoints] = useState<number>(CURRENT_STUDENT.points);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INVOICES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(ATTENDANCE_HISTORY);
  const [rulesAccepted, setRulesAccepted] = useState<boolean>(true);
  const [bookedRecoveries, setBookedRecoveries] = useState<string[]>([]);
  const [showStudyDocModal, setShowStudyDocModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync teen mode automatically if tab changes to teen-community
  useEffect(() => {
    if (currentTab === 'teen-community') {
      setIsTeenMode(true);
    }
  }, [currentTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toggleHomework = (id: string) => {
    setHomeworkList((prev) =>
      prev.map((hw) => {
        if (hw.id === id) {
          const nextState = !hw.completed;
          if (nextState) {
            addPoints(25, 'Deures completats!');
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 },
            });
            showToast('✅ Deures marcats com a fets (+25 pts)');
          }
          return { ...hw, completed: nextState };
        }
        return hw;
      })
    );
  };

  const addHomework = (item: { title: string; description: string; dueDate: string; unit: string; courseId: string }) => {
    const newHw: HomeworkItem = {
      id: `hw-${Date.now()}`,
      completed: false,
      ...item,
    };
    setHomeworkList((prev) => [newHw, ...prev]);
    showToast('📚 Deures publicats correctament al grup');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addNotification = (item: { title: string; message: string; type: NotificationItem['type'] }) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Ara mateix',
      read: false,
      ...item,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`🔔 Nova notificació enviada: ${item.title}`);
  };

  const addPoints = (pts: number, reason?: string) => {
    setPoints((prev) => prev + pts);
    if (pts > 30) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
      });
    }
    if (reason) {
      showToast(`🎉 +${pts} punts Hyde Park! ${reason}`);
    }
  };

  const payInvoice = (id: string, method: 'Bizum' | 'Targeta') => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              status: 'paid',
              paidDate: `${new Date().toLocaleDateString('ca-ES')} via ${method}`,
            }
          : inv
      )
    );
    addPoints(50, 'Pagament gestionat des de l’app');
    showToast(`💳 Pagament completat amb èxit mitjançant ${method}`);
  };

  const justifyAbsence = (id: string, reason: string) => {
    setAttendance((prev) =>
      prev.map((att) =>
        att.id === id
          ? {
              ...att,
              status: 'justified',
              justificationReason: reason,
              justificationStatus: 'accepted',
            }
          : att
      )
    );
    showToast('📝 Justificant registrat correctament per a la direcció');
  };

  const acceptRules = () => {
    setRulesAccepted(true);
    addPoints(20, 'Normativa de Hyde Park acceptada');
    showToast('✍️ Normativa acadèmica signada digitalment');
  };

  const bookRecovery = (classId: string) => {
    if (bookedRecoveries.includes(classId)) {
      showToast('Ja has reservat plaça en aquesta classe');
      return;
    }
    setBookedRecoveries((prev) => [...prev, classId]);
    showToast('📅 Plaça confirmada per a la classe de recuperació!');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        userRole,
        setUserRole,
        currentTab,
        setCurrentTab,
        isTeenMode,
        setIsTeenMode,
        activeCourseId,
        setActiveCourseId,
        homeworkList,
        toggleHomework,
        addHomework,
        notifications,
        markNotificationRead,
        addNotification,
        streak,
        points,
        addPoints,
        invoices,
        payInvoice,
        attendance,
        justifyAbsence,
        rulesAccepted,
        acceptRules,
        bookedRecoveries,
        bookRecovery,
        showStudyDocModal,
        setShowStudyDocModal,
        student: CURRENT_STUDENT,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
