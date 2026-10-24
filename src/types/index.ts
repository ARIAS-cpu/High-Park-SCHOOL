export type Language = 'ca' | 'es' | 'en' | 'de';

export type UserRole = 'student' | 'family' | 'teacher';

export type AppTab =
  | 'overview'
  | 'teen-community'
  | 'learning'
  | 'family-management'
  | 'teacher-panel'
  | 'pdf-study';

export interface CourseInfo {
  id: string;
  name: string;
  level: 'B2 First' | 'C1 Advanced' | 'Goethe B1' | 'Goethe B2' | 'Teens A2+' | 'PAU';
  schedule: string;
  room: string;
  teacher: string;
  book: string;
  dossierName: string;
  nextExamDate: string;
}

export interface HomeworkItem {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  unit: string;
}

export interface Flashcard {
  id: string;
  term: string;
  phonetic?: string;
  language: 'en' | 'de';
  translation: string;
  example: string;
  unit: string;
  level: string;
}

export interface ExamCountdown {
  id: string;
  examName: string;
  officialBody: 'Cambridge' | 'Goethe-Institut' | 'Generalitat PAU';
  date: string;
  daysRemaining: number;
  level: string;
  description: string;
  tips: string[];
}

export interface SlangWord {
  id: string;
  expression: string;
  language: 'en' | 'de';
  meaning: string;
  example: string;
  culturalNote: string;
  week: string;
}

export interface TrackOfTheWeek {
  id: string;
  title: string;
  artist: string;
  language: 'en' | 'de';
  level: string;
  youtubeUrl: string;
  spotifyUrl: string;
  albumCover: string;
  keyVocabulary: { word: string; meaning: string }[];
  culturalContext: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: 'examen' | 'activitat' | 'estiu' | 'exit';
  date: string;
  content: string;
  highlight?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'cancellation' | 'room_change' | 'payment' | 'exam' | 'enrollment';
  timestamp: string;
  read: boolean;
}

export interface InvoiceItem {
  id: string;
  concept: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending';
  term: string;
  paidDate?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'justified';
  justificationReason?: string;
  justificationStatus?: 'pending' | 'accepted';
}

export interface ExamQuestion {
  id: number;
  type: 'multiple-choice' | 'open-cloze' | 'key-word-transformation';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  userAnswer?: string;
}
