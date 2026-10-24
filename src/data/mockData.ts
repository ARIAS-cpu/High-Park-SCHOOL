import {
  CourseInfo,
  HomeworkItem,
  Flashcard,
  ExamCountdown,
  SlangWord,
  TrackOfTheWeek,
  NoticeItem,
  NotificationItem,
  InvoiceItem,
  AttendanceRecord,
  ExamQuestion
} from '../types';

export const CURRENT_STUDENT = {
  name: 'Marc Rovira Soler',
  alias: 'Marc_Stereo',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  currentStreak: 12, // dies consecutius
  weeklyMinutes: 45,
  points: 840,
  levelBadge: 'B2 Candidate ⭐',
  tutorName: 'Montserrat Soler (Mare)',
  tutorPhone: '+34 612 345 678',
  tutorEmail: 'montserrat.soler@example.cat',
  parentConsentAccepted: true,
  consentDate: '15/09/2026',
};

export const COURSES: CourseInfo[] = [
  {
    id: 'b2-teens',
    name: 'B2 First for Schools (Teens 3)',
    level: 'B2 First',
    schedule: 'Dilluns i Dimecres 17:30 - 19:00 (1h30)',
    room: 'Aula 3 (Pissarra Digital)',
    teacher: 'David (Cap d’Estudis)',
    book: 'Complete First for Schools 3rd Ed. (Cambridge)',
    dossierName: 'Dossier Hyde Park B2 Teens - Vol. 1',
    nextExamDate: '12 de Juny 2027 (Cambridge Official)',
  },
  {
    id: 'c1-advanced',
    name: 'C1 Advanced (CAE Mastery)',
    level: 'C1 Advanced',
    schedule: 'Dimarts i Dijous 19:00 - 20:30',
    room: 'Aula 1',
    teacher: 'Sarah Jenkins',
    book: 'Compact Advanced 2nd Edition',
    dossierName: 'Hyde Park C1 Exam Pack',
    nextExamDate: '19 de Juny 2027',
  },
  {
    id: 'deutsch-b1',
    name: 'Deutsch Goethe-Zertifikat B1',
    level: 'Goethe B1',
    schedule: 'Divendres 16:30 - 18:30 (Intensiu)',
    room: 'Aula 4',
    teacher: 'Thomas Weber',
    book: 'Netzwerk neu B1 (Klett)',
    dossierName: 'Dossier Grammatik & Hören B1',
    nextExamDate: '26 de Juny 2027',
  },
];

export const HOMEWORK_ITEMS: HomeworkItem[] = [
  {
    id: 'hw-1',
    courseId: 'b2-teens',
    title: 'Workbook Unit 4: Phrasal Verbs & Reading',
    description: 'Pàgines 34 i 35, exercicis 1 al 4. Practicar phrasal verbs amb "look" i "take".',
    dueDate: 'Dilluns vinent',
    completed: true,
    unit: 'Unit 4: Digital World',
  },
  {
    id: 'hw-2',
    courseId: 'b2-teens',
    title: 'Essay Writing: Technology in Education',
    description: 'Redacció de 140-190 paraules seguint l’estructura de 4 paràgrafs explicada a classe.',
    dueDate: 'Dimecres 28 Oct',
    completed: false,
    unit: 'Writing Clinic B2',
  },
  {
    id: 'hw-3',
    courseId: 'b2-teens',
    title: 'Flashcards de vocabulari: Environment & Wildlife',
    description: 'Completar la sessió de repetició espaiada de 15 targetes de la Unitat 5 a l’app.',
    dueDate: 'Divendres 30 Oct',
    completed: false,
    unit: 'Unit 5: Planet Earth',
  },
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    term: 'Over the moon',
    phonetic: '/ˌəʊ.və ðə ˈmuːn/',
    language: 'en',
    translation: 'Molt content / Feliç com un gínjol',
    example: 'She was over the moon when she passed her B2 First with Grade A!',
    unit: 'Idioms & Emotions',
    level: 'B2',
  },
  {
    id: 'fc-2',
    term: 'Bring about',
    phonetic: '/brɪŋ əˈbaʊt/',
    language: 'en',
    translation: 'Provocar / causar un canvi',
    example: 'The new school initiative brought about major improvements in eco-awareness.',
    unit: 'Phrasal Verbs',
    level: 'B2',
  },
  {
    id: 'fc-3',
    term: 'Ausgezeichnet',
    phonetic: '/ˈaʊ̯sɡəˌtsaɪ̯çnət/',
    language: 'de',
    translation: 'Excel·lent / magnífic',
    example: 'Deine Aussprache auf Deutsch ist wirklich ausgezeichnet!',
    unit: 'Adjektive B1',
    level: 'Goethe B1',
  },
  {
    id: 'fc-4',
    term: 'Take for granted',
    phonetic: '/teɪk fɔː ˈɡrɑːn.tɪd/',
    language: 'en',
    translation: 'Donar per fet / no valorar',
    example: 'You should never take good health or education for granted.',
    unit: 'Fixed Expressions',
    level: 'B2-C1',
  },
  {
    id: 'fc-5',
    term: 'Feierabend machen',
    phonetic: '/ˈfaɪ̯ɐˌʔaːbn̩t ˈmaxn̩/',
    language: 'de',
    translation: 'Plegar de treballar / acabar la jornada',
    example: 'Um 18:00 Uhr machen wir Feierabend und gehen ins Café.',
    unit: 'Alltag & Beruf',
    level: 'Goethe B1',
  },
  {
    id: 'fc-6',
    term: 'Call it a day',
    phonetic: '/kɔːl ɪt ə deɪ/',
    language: 'en',
    translation: 'Donar per acabat el dia / la sessió',
    example: 'We have revised five grammar units today; let’s call it a day.',
    unit: 'Colloquial B2',
    level: 'B2',
  },
];

export const TRACK_OF_THE_WEEK: TrackOfTheWeek = {
  id: 'track-current',
  title: 'As It Was',
  artist: 'Harry Styles',
  language: 'en',
  level: 'B2 / Teen Vibes',
  youtubeUrl: 'https://www.youtube.com/results?search_query=harry+styles+as+it+was',
  spotifyUrl: 'https://open.spotify.com/search/harry%20styles%20as%20it%20was',
  albumCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
  culturalContext: 'Una cançó britànica que utilitza passats simples i transicions d’estats d’ànim ideals per practicar Use of English.',
  keyVocabulary: [
    { word: 'Gravity holding me back', meaning: 'Sentir-se frenat per les circumstàncies o la rutina' },
    { word: 'Ringin’ the bell', meaning: 'Trucar a la porta o activar una memòria/record' },
    { word: 'No use searching', meaning: 'No val la pena buscar (estructura No use + gerundi - típica d’examen B2!)' },
    { word: 'Leave America', meaning: 'Exemple de verb d’acció amb complement de lloc' },
  ],
};

export const TRACK_GERMAN: TrackOfTheWeek = {
  id: 'track-de',
  title: 'Komet',
  artist: 'Udo Lindenberg & Apache 207',
  language: 'de',
  level: 'Goethe B1/B2',
  youtubeUrl: 'https://www.youtube.com/results?search_query=udo+lindenberg+apache+207+komet',
  spotifyUrl: 'https://open.spotify.com/search/komet+udo+lindenberg',
  albumCover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
  culturalContext: 'L’èxit absolut que combina rock clàssic alemany i rap melòdic modern. Ideal per aprendre llenguatge col·loquial.',
  keyVocabulary: [
    { word: 'Einen Fußabdruck hinterlassen', meaning: 'Deixar empremta / deixar llegat' },
    { word: 'Zweimal vergehen', meaning: 'Passar o extingir-se dues vegades' },
    { word: 'Überleben', meaning: 'Sobreviure (verb inseparable clau de B1)' },
  ],
};

export const SLANG_LIST: SlangWord[] = [
  {
    id: 'slang-1',
    expression: 'No cap 🧢',
    language: 'en',
    meaning: 'De veritat / sense broma / t’ho juro (contrari de "cap" = mentida)',
    example: 'Hyde Park mock exams are tough, no cap!',
    culturalNote: 'Molt utilitzat per la generació Z a Londres i Nova York.',
    week: 'Setmana 42',
  },
  {
    id: 'slang-2',
    expression: 'Ehrenmann / Ehrenfrau 👑',
    language: 'de',
    meaning: 'Persona d’honor / algú que fa un gran favor desinteressadament',
    example: 'Danke für die Hausaufgaben-Erklärung, du bist ein echter Ehrenmann!',
    culturalNote: 'Escollida com a paraula jove de l’any (Jugendwort des Jahres) a Alemanya.',
    week: 'Setmana 42',
  },
  {
    id: 'slang-3',
    expression: 'Rizz ⚡',
    language: 'en',
    meaning: 'Carisma, facilitat per caure bé o lligar (abreviació de charisma)',
    example: 'His English accent gives him so much rizz during the speaking exam.',
    culturalNote: 'Paraula de l’any per Oxford Dictionary.',
    week: 'Setmana 41',
  },
  {
    id: 'slang-4',
    expression: 'Lost sein 🧭',
    language: 'de',
    meaning: 'Estar perdut, no entendre res del que està passant',
    example: 'Bei dieser Mathe-Aufgabe war ich komplett lost.',
    culturalNote: 'Exemple perfecte de com el jovent alemany integra termes en anglès.',
    week: 'Setmana 40',
  },
];

export const EXAM_COUNTDOWNS: ExamCountdown[] = [
  {
    id: 'b2-first',
    examName: 'Cambridge B2 First (FCE for Schools)',
    officialBody: 'Cambridge',
    date: '12 de Juny 2027',
    daysRemaining: 234,
    level: 'B2',
    description: 'Proves de Reading & Use of English, Writing, Listening i Speaking.',
    tips: [
      'Al Use of English Part 4 (Key Word Transformation), vigila no canviar mai la paraula donada.',
      'Al Writing, utilitza conectors formals: "Furthermore", "In addition", "On the other hand".',
      'Al Speaking Part 2, tens 1 minut exacte per comparar 2 fotografies, no per descriure-les individualment.',
    ],
  },
  {
    id: 'c1-adv',
    examName: 'Cambridge C1 Advanced (CAE)',
    officialBody: 'Cambridge',
    date: '19 de Juny 2027',
    daysRemaining: 241,
    level: 'C1',
    description: 'Nivell d’excel·lència per a accés universitari internacional i màsters.',
    tips: [
      'Domina les inversions ("Rarely have I seen...", "Under no circumstances...").',
      'Practica el col·loquialisme acadèmic i la riquesa lèxica sense repetir adjectius simples com "good" o "bad".',
    ],
  },
  {
    id: 'goethe-b1',
    examName: 'Goethe-Zertifikat B1 / B2',
    officialBody: 'Goethe-Institut',
    date: '26 de Juny 2027',
    daysRemaining: 248,
    level: 'Goethe B1-B2',
    description: 'Certificació oficial internacional de domini de la llengua alemanya.',
    tips: [
      'Recorda la posició del verb a les oracions subordinades amb "weil", "dass", "obwohl" (al final!).',
      'Als exercicis de Hören, llegeix sempre les preguntes abans que comenci la gravació.',
    ],
  },
  {
    id: 'pau-angles',
    examName: 'PAU - Proves d’Accés a la Universitat (Anglès / Alemany)',
    officialBody: 'Generalitat PAU',
    date: '8 de Juny 2027',
    daysRemaining: 230,
    level: 'PAU',
    description: 'Prova oficial de Batxillerat a Catalunya per a nota de tall universitària.',
    tips: [
      'El text de comprensió lectora sol ser divulgatiu o d’opinió contemporània.',
      'Evita faltes greus de concordança de 3a persona singular ("he/she -s") a la redacció.',
    ],
  },
];

export const MOCK_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    type: 'multiple-choice',
    prompt: 'She decided to ________ up tennis because she wanted to get fit before the summer.',
    options: ['take', 'put', 'make', 'bring'],
    correctAnswer: 'take',
    explanation: 'El phrasal verb "take up" significa començar una nova afició o esport.',
  },
  {
    id: 2,
    type: 'multiple-choice',
    prompt: 'If you had arrived on time, you ________ seen the opening ceremony.',
    options: ['would have', 'will have', 'would', 'had'],
    correctAnswer: 'would have',
    explanation: 'Third Conditional: If + past perfect, would have + past participle.',
  },
  {
    id: 3,
    type: 'open-cloze',
    prompt: 'He was so tired that he could ________ keep his eyes open during the lecture.',
    correctAnswer: 'hardly',
    explanation: '"Hardly" significa "gairebé no" i expressa dificultat extrema.',
  },
  {
    id: 4,
    type: 'key-word-transformation',
    prompt: 'I regret not visiting the museum while I was in London. (WISH) -> I ________ the museum while I was in London.',
    correctAnswer: 'wish I had visited',
    explanation: 'Estructura "wish + Past Perfect" per expressar lamentacions sobre el passat.',
  },
];

export const NOTICES: NoticeItem[] = [
  {
    id: 'not-1',
    title: '🎉 98% d’aprovats als exàmens Cambridge de la convocatòria de Juny!',
    category: 'exit',
    date: '18 d’Octubre 2026',
    content: 'Moltíssimes felicitats a tots els nostres alumnes de B2 First i C1 Advanced per la seva dedicació. Més del 40% van aconseguir la qualificació Grade A!',
    highlight: true,
  },
  {
    id: 'not-2',
    title: 'Obertura de preinscripció per a les Estades d’Estiu a Dublín i Brighton 2027',
    category: 'estiu',
    date: '10 d’Octubre 2026',
    content: 'Viatges d’immersió lingüística amb famílies amfitriones i classes d’anglès i activitats culturals. Places limitades per a joves de 12 a 17 anys.',
    highlight: false,
  },
  {
    id: 'not-3',
    title: 'Simulacres generals d’examen (Mock Exams) - Dissabte 16 de Gener',
    category: 'examen',
    date: '05 d’Octubre 2026',
    content: 'Jornada intensiva amb condicions reals d’examen oficial per avaluar el nivell abans de la inscripció definitiva.',
    highlight: false,
  },
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Canvi d’aula avui per al grup B2 Teens',
    message: 'Per motius tècnics, la classe de dimecres es farà a l’Aula 4 en lloc de l’Aula 3.',
    type: 'room_change',
    timestamp: 'Fa 2 hores',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Recordatori de pagament del 1r Trimestre',
    message: 'La quota de novembre està disponible per a pagament amb Bizum o targeta des de l’app.',
    type: 'payment',
    timestamp: 'Ahir a les 10:30',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Simulacre cronometrat d’examen activat',
    message: 'En David ha publicat un mini-simulacre de Use of English Part 1-4 per preparar el repte de la setmana.',
    type: 'exam',
    timestamp: 'Fa 2 dies',
    read: true,
  },
];

export const INVOICES: InvoiceItem[] = [
  {
    id: 'inv-101',
    concept: 'Quota Curs 2026-2027 - 1r Trimestre (Octubre - Desembre)',
    amount: 285.00,
    dueDate: '10/11/2026',
    status: 'paid',
    term: '1r Trimestre',
    paidDate: '12/10/2026 via Bizum',
  },
  {
    id: 'inv-102',
    concept: 'Dossier didàctic & Llibre de text Cambridge Complete B2',
    amount: 54.50,
    dueDate: '20/10/2026',
    status: 'paid',
    term: 'Material curs',
    paidDate: '18/09/2026 via Targeta',
  },
  {
    id: 'inv-103',
    concept: 'Quota Curs 2026-2027 - 2n Trimestre (Gener - Març)',
    amount: 285.00,
    dueDate: '10/01/2027',
    status: 'pending',
    term: '2n Trimestre',
  },
];

export const ATTENDANCE_HISTORY: AttendanceRecord[] = [
  { id: 'att-1', date: '21/10/2026 (Dimecres)', status: 'present' },
  { id: 'att-2', date: '19/10/2026 (Dilluns)', status: 'present' },
  {
    id: 'att-3',
    date: '14/10/2026 (Dimecres)',
    status: 'absent',
    justificationReason: 'Visita odontològica programada amb justificant mèdic.',
    justificationStatus: 'accepted',
  },
  { id: 'att-4', date: '12/10/2026 (Dilluns)', status: 'present' },
  { id: 'att-5', date: '07/10/2026 (Dimecres)', status: 'late' },
];

export const ALTERNATIVE_CLASSES = [
  {
    id: 'rec-1',
    day: 'Dijous 22 d’Octubre',
    time: '18:00 - 19:30',
    group: 'B2 First Teens Grup B',
    room: 'Aula 2',
    teacher: 'Sarah Jenkins',
    availableSpots: 2,
  },
  {
    id: 'rec-2',
    day: 'Divendres 23 d’Octubre',
    time: '17:00 - 18:30',
    group: 'B2 First Teens Grup C',
    room: 'Aula 1',
    teacher: 'David',
    availableSpots: 1,
  },
];

export const TEEN_RANKING = [
  { rank: 1, alias: 'Alex_Cambridge', points: 960, streak: 18, level: 'C1' },
  { rank: 2, alias: 'Marc_Stereo (Tu)', points: 840, streak: 12, level: 'B2.2' },
  { rank: 3, alias: 'Clara_Goethe', points: 810, streak: 14, level: 'Deutsch B1' },
  { rank: 4, alias: 'Nil_RizzMaster', points: 750, streak: 9, level: 'B2.1' },
  { rank: 5, alias: 'Emma_Oxford', points: 720, streak: 8, level: 'B2.2' },
  { rank: 6, alias: 'Pol_Vibes', points: 690, streak: 6, level: 'Teens A2' },
];

export const RECOMMENDED_MEDIA = [
  {
    title: 'Heartstopper (Netflix)',
    type: 'Sèrie',
    language: 'Anglès britànic natural (UK)',
    recommendedFor: 'B1 - B2 Teens',
    why: 'Vocabulari adolescent modern, pronúncia clara i subtítols adaptats.',
    link: 'https://netflix.com',
  },
  {
    title: 'Easy German (YouTube / Podcast)',
    type: 'Canal de YouTube',
    language: 'Alemany al carrer (Berlin)',
    recommendedFor: 'Goethe A2 - B2',
    why: 'Entrevistes a persones reals pels carrers d’Alemanya amb subtítols bilingües.',
    link: 'https://youtube.com',
  },
  {
    title: 'BBC 6 Minute English',
    type: 'Podcast setmanal',
    language: 'Anglès formal i col·loquial',
    recommendedFor: 'B2 First - C1 Advanced',
    why: '6 minuts exactes de conversa rica amb explicació de lèxic específic.',
    link: 'https://bbc.co.uk',
  },
  {
    title: 'Stranger Things (Netflix)',
    type: 'Sèrie',
    language: 'Anglès americà (US)',
    recommendedFor: 'B2 - C1',
    why: 'Expressivitat, diàlegs ràpids i gran varietat de registres informals.',
    link: 'https://netflix.com',
  },
];

export const SAFE_WALL_POSTS = [
  {
    id: 'wall-1',
    author: 'David (Cap d’Estudis)',
    avatar: '👨‍🏫',
    role: 'Professor',
    date: 'Fa 1 dia',
    content: '🎧 Quin ha estat el vostre vers preferit de "As It Was" per al vocabulari de la setmana? Deixeu les vostres reaccions!',
    likes: 24,
    fire: 18,
    mindblown: 9,
    poll: {
      question: 'Quin connector utilitzes més al Writing B2?',
      options: [
        { label: 'Furthermore', votes: 42 },
        { label: 'In addition', votes: 31 },
        { label: 'On the flip side', votes: 15 },
        { label: 'Nevertheless', votes: 28 },
      ],
    },
  },
  {
    id: 'wall-2',
    author: 'Sarah Jenkins',
    avatar: '👩‍🏫',
    role: 'Professora C1',
    date: 'Fa 3 dies',
    content: '📢 Recordatori: Les carpetes vermelles i la bossa oficial "FLUENT IN STEREO" ja estan a recepció per a qui arribi a 15 dies de ratxa!',
    likes: 38,
    fire: 29,
    mindblown: 12,
  },
];

export const STUDY_DOCUMENT_SUMMARY = {
  author: 'David',
  date: '21 d’Octubre de 2026',
  pdfPath: '/public/assets/aistudio/App_Hyde_Park_School_Estudi_de_serveis_2cace1c0.pdf',
  coreIdea: 'Convertir la classe setmanal d’1h30 en un contacte de 7 dies amb l’idioma i alliberar de feina administrativa l’acadèmia.',
  address: 'Carrer de Torras i Bages, 41',
  keyPhases: [
    {
      phase: 1,
      title: 'Fase 1 · Llançament (App mínima útil - MVP)',
      goal: 'Dona valor a les famílies des del primer dia.',
      features: ['El meu curs i horari', 'Calendari i festius', 'Normativa digital', 'Avisos push', 'Contacte i notícies'],
    },
    {
      phase: 2,
      title: 'Fase 2 · Aprenentatge (Pràctica entre classes)',
      goal: 'Fa que els alumnes obrin l’app cada setmana.',
      features: ['Deures i vocabulari flashcards', 'Listenings del dossier', 'Zona Teen Community (Fluent in Stereo)', 'Pagaments amb targeta i Bizum', 'Ratxes i reptes'],
    },
    {
      phase: 3,
      title: 'Fase 3 · Gestió completa (Menys feina administrativa)',
      goal: 'Automatització docent i relació amb famílies.',
      features: ['Simulacres d’examen cronometrats', 'Writing i speaking feedback', 'Faltes i informes d’avaluació', 'Inscripció dins l’app', 'Accés BEST Solutions per a empreses'],
    },
  ],
  techComparison: [
    {
      option: 'PWA (App Web Instal·lable - Recomanada)',
      pros: 'Barata, es penja fàcilment, actualitzacions immediates, accés amb un sol enllaç sense botigues.',
      cons: 'Notificacions push a iOS requereixen afegir la icona a la pantalla d’inici.',
    },
    {
      option: 'Eina No-Code (Glide / FlutterFlow)',
      pros: 'Ràpida de muntar amb base de dades i usuaris.',
      cons: 'Quota mensual recurrent alta, menys control del disseny i de la marca.',
    },
    {
      option: 'App nativa a mida (App Store & Google Play)',
      pros: 'Presència oficial a botigues, màxima integració nativa.',
      cons: 'Costos molt elevats de desenvolupament i quotes fixes ($99/any Apple + $25 Google).',
    },
  ],
  gdprMinorConsentNote: 'Segons la legislació vigent, els menors de 14 anys necessiten el consentiment explícit dels tutors legals. El compte el dona d’alta la família i les dades es tracten en servidors europeus amb contracte d’encarregat de tractament.',
};
