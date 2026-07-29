"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Award,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronDown,
  CirclePlay,
  Cpu,
  Globe2,
  Headphones,
  Languages,
  LockKeyhole,
  Menu,
  MessageSquareMore,
  PhoneCall,
  Play,
  QrCode,
  Radio,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

type Language = "he" | "en" | "ar" | "ru" | "fr" | "es";
type Direction = "rtl" | "ltr";

type Translation = {
  dir: Direction;
  locale: string;
  languageName: string;
  nav: { product: string; ai: string; phone: string; faq: string };
  actions: { join: string; create: string; demo: string; start: string };
  hero: {
    badge: string;
    title: string;
    gradient: string;
    description: string;
    live: string;
    questions: string;
    uptime: string;
  };
  demo: {
    badge: string;
    title: string;
    question: string;
    options: string[];
    responses: string;
    responseTime: string;
  };
  features: { badge: string; title: string; description: string; cards: { title: string; text: string }[] };
  ai: { badge: string; title: string; description: string; placeholder: string; button: string; ready: string; loading: string; result: string };
  phone: { badge: string; title: string; description: string; steps: { title: string; text: string }[] };
  faq: { badge: string; title: string; description: string; items: { q: string; a: string }[] };
  footer: string;
};

const translations: Record<Language, Translation> = {
  he: {
    dir: "rtl",
    locale: "he-IL",
    languageName: "עברית",
    nav: { product: "יכולות", ai: "סטודיו AI", phone: "טלפון כשר", faq: "שאלות נפוצות" },
    actions: { join: "הצטרפות למשחק", create: "יצירת פעילות", demo: "צפייה בהדגמה", start: "מתחילים בחינם" },
    hero: {
      badge: "פלטפורמת מעורבות הקהל החדשה כבר כאן",
      title: "הופכים כל קהל",
      gradient: "לחוויה שאי אפשר לשכוח.",
      description: "חידונים, סקרים, משחקים ותוכן חי — בסנכרון מלא בין סמארטפונים, מחשבים וטלפונים כשרים. הכול בזמן אמת, בעיצוב עוצמתי ועם מנוע AI שמקצר שעות עבודה לדקות.",
      live: "משתתפים פעילים",
      questions: "שאלות שנענו",
      uptime: "זמינות מערכת",
    },
    demo: {
      badge: "שידור חי",
      title: "סקר קהל בזמן אמת",
      question: "איזו יכולת תשנה הכי הרבה את האירוע הבא שלכם?",
      options: ["יצירת שאלות עם AI", "השתתפות מטלפון כשר", "תוצאות וגרפים בזמן אמת", "תעודות אוטומטיות"],
      responses: "תשובות התקבלו",
      responseTime: "זמן תגובה ממוצע",
    },
    features: {
      badge: "מערכת אחת. אינסוף אפשרויות.",
      title: "כל מה שצריך כדי להפעיל קהל בצורה חכמה",
      description: "מהשאלה הראשונה ועד לדוח הסופי — MegaClick מרכזת במקום אחד את התוכן, ההשתתפות, המדידה והחוויה.",
      cards: [
        { title: "חידונים תחרותיים", text: "ניקוד לפי מהירות, טבלאות מובילים, בונוסים, רצפים ואנימציות שמחזיקות את כולם דרוכים." },
        { title: "סקרים חיים", text: "אוספים דעות בזמן אמת ומציגים תוצאות בגרפים חיים, ברורים ומרשימים על המסך המרכזי." },
        { title: "טלפונים כשרים", text: "המשתתפים מחייגים, מקישים קוד ומשיבים דרך מקשי הטלפון — ללא אפליקציה וללא אינטרנט." },
        { title: "תעודות ודוחות", text: "מפיקים תעודות אישיות, דוחות ביצועים, נתוני השתתפות ותובנות לשיתוף עם הנהלה ולקוחות." },
        { title: "שפות וכיווניות", text: "תמיכה מלאה בעברית, אנגלית, ערבית, רוסית, צרפתית וספרדית, כולל RTL ו־LTR." },
        { title: "אבטחה ויציבות", text: "תשתית מאובטחת, ניטור רציף, הרשאות מתקדמות וגיבויים כדי שהאירוע ימשיך לעבוד גם בעומסים." },
      ],
    },
    ai: {
      badge: "MegaClick AI Studio",
      title: "מנושא אחד למערך שאלות שלם בתוך שניות",
      description: "כתבו נושא, גיל קהל ורמת קושי. המנוע ייצור שאלות, תשובות, מסיחים, הסברים ורעיונות לפעילות — מוכנים לעריכה ולהפעלה.",
      placeholder: "לדוגמה: חידון היסטוריה לכיתה ח׳ ברמה בינונית...",
      button: "יצירת מערך",
      ready: "המערכת מוכנה לקבל נושא",
      loading: "מנתח את הנושא ובונה שאלות...",
      result: "נוצר מערך לדוגמה עם 12 שאלות, 4 דרגות קושי והסברים מלאים.",
    },
    phone: {
      badge: "נגישות ללא פשרות",
      title: "גם טלפון כשר הופך לשלט משחק חכם",
      description: "אין צורך בסמארטפון. כל משתתף יכול להתחבר בשיחת טלפון רגילה, לשמוע את השאלות ולהשיב באמצעות המקשים.",
      steps: [
        { title: "מחייגים למספר", text: "המשתתף מתקשר למספר המערכת מכל טלפון." },
        { title: "מקישים קוד פעילות", text: "קוד קצר שמופיע על המסך מחבר אותו לפעילות הנכונה." },
        { title: "שומעים ומשיבים", text: "השאלה מוקראת והמשתתף משיב באמצעות המקשים 1–4." },
      ],
    },
    faq: {
      badge: "כל מה שחשוב לדעת",
      title: "שאלות ותשובות",
      description: "תשובות ברורות על חיבור משתתפים, טלפונים כשרים, AI, אבטחה, תעודות ועומסים.",
      items: [
        { q: "איך משתתפים מצטרפים לפעילות?", a: "באמצעות קוד קצר, קישור, סריקת QR או שיחת טלפון. המנחה בוחר אילו דרכי חיבור לפתוח בכל פעילות." },
        { q: "האם המערכת עובדת עם טלפונים כשרים?", a: "כן. המשתתף מחייג למספר, מקיש את קוד הפעילות ומשיב דרך מקשי הטלפון. ניתן גם להשמיע שאלות והנחיות בקול." },
        { q: "כמה משתתפים יכולים להתחבר יחד?", a: "המערכת בנויה לעבודה בקנה מידה רחב. הקיבולת המדויקת נקבעת לפי החבילה והתשתית, וניתן להתאים אותה לאירועים גדולים במיוחד." },
        { q: "מה בדיוק מנוע ה־AI יוצר?", a: "שאלות, תשובות נכונות, מסיחים, הסברים, חלוקה לרמות קושי ורעיונות לפעילויות. כל התוכן ניתן לעריכה לפני פרסום." },
        { q: "האם אפשר להציג תוצאות בזמן אמת?", a: "כן. ניתן להציג גרפים, אחוזי הצבעה, טבלת מובילים, זמני תגובה והשוואות בין קבוצות בזמן אמת." },
        { q: "האם אפשר להפיק תעודות?", a: "כן. ניתן ליצור תעודות אישיות עם שם, ציון, דירוג, תאריך, חתימה וקוד אימות." },
        { q: "אילו שפות נתמכות?", a: "עברית, אנגלית, ערבית, רוסית, צרפתית וספרדית, עם מעבר אוטומטי בין כיווניות ימין־לשמאל ושמאל־לימין." },
        { q: "האם אפשר להשתמש במערכת בבתי ספר ובארגונים?", a: "כן. המערכת מתאימה לבתי ספר, ארגונים, כנסים, אירועי חברה, הדרכות, קהילות ותוכניות לימוד." },
      ],
    },
    footer: "כל הזכויות שמורות ל־MegaClick",
  },
  en: {
    dir: "ltr", locale: "en-US", languageName: "English",
    nav: { product: "Features", ai: "AI Studio", phone: "Phone access", faq: "FAQ" },
    actions: { join: "Join a game", create: "Create activity", demo: "Watch demo", start: "Start free" },
    hero: { badge: "The new audience engagement platform is here", title: "Turn every audience", gradient: "into an unforgettable experience.", description: "Quizzes, polls, games and live content synchronized across smartphones, computers and phone dial-in — powered by real-time data and AI.", live: "Active players", questions: "Answers submitted", uptime: "Platform uptime" },
    demo: { badge: "Live", title: "Real-time audience poll", question: "Which capability will transform your next event?", options: ["AI question generation", "Phone dial-in", "Live charts", "Automatic certificates"], responses: "Responses received", responseTime: "Average response time" },
    features: { badge: "One platform. Endless possibilities.", title: "Everything you need to engage an audience", description: "From the first question to the final report, MegaClick combines content, participation, measurement and experience.", cards: [
      { title: "Competitive quizzes", text: "Speed scoring, leaderboards, streaks, bonuses and high-energy animations." },
      { title: "Live polls", text: "Collect opinions and display clear, dynamic results in real time." },
      { title: "Phone access", text: "Participants can call, enter a code and respond using keypad buttons." },
      { title: "Certificates and reports", text: "Generate personal certificates, performance reports and participation insights." },
      { title: "Six languages", text: "Full support for Hebrew, English, Arabic, Russian, French and Spanish." },
      { title: "Security and stability", text: "Monitoring, permissions, backups and infrastructure built for live events." },
    ] },
    ai: { badge: "MegaClick AI Studio", title: "From one topic to a complete quiz in seconds", description: "Enter a topic, audience and difficulty. AI creates questions, answers, distractors and explanations.", placeholder: "Example: Medium-level history quiz for 8th grade...", button: "Generate", ready: "Ready for your topic", loading: "Building your quiz...", result: "A sample set with 12 questions and full explanations was created." },
    phone: { badge: "Access without compromise", title: "Every phone becomes a smart game controller", description: "No smartphone required. Participants call, listen and answer using keypad buttons.", steps: [
      { title: "Call the number", text: "Participants dial the system from any phone." },
      { title: "Enter the activity code", text: "A short code connects them to the right activity." },
      { title: "Listen and respond", text: "Questions are read aloud and answered with keys 1–4." },
    ] },
    faq: { badge: "Everything you need to know", title: "Frequently asked questions", description: "Clear answers about access, AI, scale, security and certificates.", items: [
      { q: "How do participants join?", a: "Using a short code, link, QR scan or phone call." },
      { q: "Does it support phone dial-in?", a: "Yes. Participants call, enter the activity code and answer using keypad buttons." },
      { q: "How many participants are supported?", a: "Capacity depends on the selected plan and can be scaled for large events." },
      { q: "What does the AI generate?", a: "Questions, correct answers, distractors, explanations and difficulty levels." },
    ] },
    footer: "All rights reserved to MegaClick",
  },
  ar: {
    dir: "rtl", locale: "ar", languageName: "العربية",
    nav: { product: "المميزات", ai: "استوديو الذكاء الاصطناعي", phone: "الاتصال الهاتفي", faq: "الأسئلة الشائعة" },
    actions: { join: "الانضمام", create: "إنشاء نشاط", demo: "مشاهدة العرض", start: "ابدأ مجاناً" },
    hero: { badge: "منصة تفاعل الجمهور الجديدة وصلت", title: "حوّل كل جمهور", gradient: "إلى تجربة لا تُنسى.", description: "اختبارات واستطلاعات وألعاب ومحتوى مباشر متزامن بين الهواتف الذكية والحواسيب والاتصال الهاتفي، مع ذكاء اصطناعي ونتائج فورية.", live: "مشاركون نشطون", questions: "إجابات مستلمة", uptime: "توفر النظام" },
    demo: { badge: "مباشر", title: "استطلاع جمهور فوري", question: "أي ميزة ستغير فعاليتك القادمة؟", options: ["إنشاء أسئلة بالذكاء الاصطناعي", "المشاركة عبر الهاتف", "رسوم بيانية مباشرة", "شهادات تلقائية"], responses: "إجابات مستلمة", responseTime: "متوسط زمن الاستجابة" },
    features: { badge: "منصة واحدة. إمكانيات بلا حدود.", title: "كل ما تحتاجه لتفاعل ذكي", description: "من السؤال الأول حتى التقرير النهائي، تجمع MegaClick المحتوى والمشاركة والتحليل في مكان واحد.", cards: [
      { title: "اختبارات تنافسية", text: "نقاط حسب السرعة ولوحات صدارة ومؤثرات حماسية." },
      { title: "استطلاعات مباشرة", text: "جمع الآراء وعرض النتائج فوراً." },
      { title: "اتصال هاتفي", text: "المشاركة عبر مكالمة وأزرار الهاتف." },
      { title: "شهادات وتقارير", text: "شهادات شخصية وتقارير أداء مفصلة." },
      { title: "ست لغات", text: "دعم كامل للعبرية والإنجليزية والعربية والروسية والفرنسية والإسبانية." },
      { title: "أمان واستقرار", text: "مراقبة ونسخ احتياطي وصلاحيات متقدمة." },
    ] },
    ai: { badge: "استوديو MegaClick AI", title: "من موضوع واحد إلى اختبار كامل خلال ثوانٍ", description: "اكتب الموضوع والجمهور ومستوى الصعوبة، وسيتم إنشاء الأسئلة والإجابات والتفسيرات.", placeholder: "مثال: اختبار تاريخ للصف الثامن...", button: "إنشاء", ready: "النظام جاهز", loading: "يتم إنشاء الأسئلة...", result: "تم إنشاء نموذج من 12 سؤالاً مع تفسيرات كاملة." },
    phone: { badge: "وصول بلا تنازلات", title: "كل هاتف يصبح وحدة تحكم ذكية", description: "لا حاجة لهاتف ذكي. يتصل المشاركون ويستمعون ويجيبون عبر الأزرار.", steps: [
      { title: "الاتصال بالرقم", text: "يتصل المشارك من أي هاتف." },
      { title: "إدخال رمز النشاط", text: "رمز قصير يربطه بالنشاط الصحيح." },
      { title: "الاستماع والإجابة", text: "تُقرأ الأسئلة ويجيب بالأزرار 1–4." },
    ] },
    faq: { badge: "كل ما تحتاج معرفته", title: "الأسئلة الشائعة", description: "إجابات حول الاتصال والذكاء الاصطناعي والأمان والشهادات.", items: [
      { q: "كيف ينضم المشاركون؟", a: "عبر رمز قصير أو رابط أو QR أو مكالمة هاتفية." },
      { q: "هل يدعم الاتصال الهاتفي؟", a: "نعم، يمكن الإجابة باستخدام أزرار الهاتف." },
      { q: "ماذا ينشئ الذكاء الاصطناعي؟", a: "أسئلة وإجابات ومشتتات وتفسيرات ومستويات صعوبة." },
      { q: "هل تظهر النتائج مباشرة؟", a: "نعم، مع رسوم بيانية ولوحات صدارة فورية." },
    ] },
    footer: "جميع الحقوق محفوظة لـ MegaClick",
  },
  ru: {
    dir: "ltr", locale: "ru", languageName: "Русский",
    nav: { product: "Возможности", ai: "AI-студия", phone: "Телефон", faq: "Вопросы" },
    actions: { join: "Присоединиться", create: "Создать", demo: "Демо", start: "Начать бесплатно" },
    hero: { badge: "Новая платформа вовлечения аудитории", title: "Превратите любую аудиторию", gradient: "в незабываемое событие.", description: "Викторины, опросы, игры и живой контент для смартфонов, компьютеров и телефонных звонков — в реальном времени и с AI.", live: "Активные участники", questions: "Полученные ответы", uptime: "Доступность" },
    demo: { badge: "Прямой эфир", title: "Опрос в реальном времени", question: "Какая функция изменит ваше следующее мероприятие?", options: ["Генерация с AI", "Участие по телефону", "Живые графики", "Автосертификаты"], responses: "Ответов получено", responseTime: "Среднее время ответа" },
    features: { badge: "Одна платформа. Безграничные возможности.", title: "Все для умной работы с аудиторией", description: "Контент, участие, аналитика и отчеты в одной системе.", cards: [
      { title: "Соревновательные викторины", text: "Скоростной счет, рейтинги и бонусы." }, { title: "Живые опросы", text: "Мгновенные результаты и графики." }, { title: "Телефонное участие", text: "Ответы через клавиши телефона." }, { title: "Сертификаты", text: "Персональные сертификаты и отчеты." }, { title: "Шесть языков", text: "Полная мультиязычная поддержка." }, { title: "Безопасность", text: "Мониторинг, резервирование и права доступа." },
    ] },
    ai: { badge: "MegaClick AI Studio", title: "Полная викторина за секунды", description: "Введите тему и уровень — AI создаст вопросы, ответы и объяснения.", placeholder: "Например: история для 8 класса...", button: "Создать", ready: "Система готова", loading: "Создание вопросов...", result: "Создан пример из 12 вопросов с объяснениями." },
    phone: { badge: "Доступ без ограничений", title: "Любой телефон становится контроллером", description: "Участники звонят и отвечают клавишами.", steps: [{ title: "Позвонить", text: "Звонок с любого телефона." }, { title: "Ввести код", text: "Короткий код подключает к игре." }, { title: "Слушать и отвечать", text: "Ответы клавишами 1–4." }] },
    faq: { badge: "Важно знать", title: "Вопросы и ответы", description: "Подключение, AI, безопасность и масштабирование.", items: [{ q: "Как подключиться?", a: "По коду, ссылке, QR или телефону." }, { q: "Есть телефонный доступ?", a: "Да, ответы принимаются через клавиши телефона." }, { q: "Что создает AI?", a: "Вопросы, ответы, варианты и объяснения." }, { q: "Есть живые результаты?", a: "Да, графики и рейтинги обновляются сразу." }] },
    footer: "Все права защищены MegaClick",
  },
  fr: {
    dir: "ltr", locale: "fr", languageName: "Français",
    nav: { product: "Fonctionnalités", ai: "Studio IA", phone: "Téléphone", faq: "FAQ" },
    actions: { join: "Rejoindre", create: "Créer", demo: "Voir la démo", start: "Commencer gratuitement" },
    hero: { badge: "La nouvelle plateforme d’engagement est arrivée", title: "Transformez chaque public", gradient: "en expérience inoubliable.", description: "Quiz, sondages, jeux et contenu en direct sur smartphone, ordinateur et téléphone, avec données temps réel et IA.", live: "Participants actifs", questions: "Réponses reçues", uptime: "Disponibilité" },
    demo: { badge: "En direct", title: "Sondage en temps réel", question: "Quelle fonction transformera votre prochain événement ?", options: ["Questions par IA", "Participation par téléphone", "Graphiques en direct", "Certificats automatiques"], responses: "Réponses reçues", responseTime: "Temps de réponse moyen" },
    features: { badge: "Une plateforme. Des possibilités infinies.", title: "Tout pour engager votre public", description: "Contenu, participation, mesure et rapports au même endroit.", cards: [{ title: "Quiz compétitifs", text: "Scores rapides et classements." }, { title: "Sondages en direct", text: "Résultats et graphiques instantanés." }, { title: "Accès téléphone", text: "Réponses avec les touches du téléphone." }, { title: "Certificats", text: "Certificats et rapports personnalisés." }, { title: "Six langues", text: "Support multilingue complet." }, { title: "Sécurité", text: "Surveillance, sauvegardes et permissions." }] },
    ai: { badge: "MegaClick AI Studio", title: "Un quiz complet en quelques secondes", description: "Saisissez un sujet et un niveau. L’IA génère questions, réponses et explications.", placeholder: "Exemple : quiz d’histoire niveau collège...", button: "Générer", ready: "Prêt pour votre sujet", loading: "Création du quiz...", result: "Un exemple de 12 questions a été créé." },
    phone: { badge: "Accès sans compromis", title: "Chaque téléphone devient une manette", description: "Les participants appellent et répondent avec les touches.", steps: [{ title: "Appeler", text: "Depuis n’importe quel téléphone." }, { title: "Saisir le code", text: "Un code court connecte à l’activité." }, { title: "Écouter et répondre", text: "Réponses avec les touches 1–4." }] },
    faq: { badge: "À savoir", title: "Questions fréquentes", description: "Accès, IA, sécurité et certificats.", items: [{ q: "Comment rejoindre ?", a: "Avec un code, un lien, un QR ou un appel." }, { q: "Le téléphone est-il pris en charge ?", a: "Oui, via les touches du téléphone." }, { q: "Que génère l’IA ?", a: "Questions, réponses et explications." }, { q: "Les résultats sont-ils en direct ?", a: "Oui, avec graphiques et classements." }] },
    footer: "Tous droits réservés à MegaClick",
  },
  es: {
    dir: "ltr", locale: "es", languageName: "Español",
    nav: { product: "Funciones", ai: "Estudio IA", phone: "Teléfono", faq: "Preguntas" },
    actions: { join: "Unirse", create: "Crear actividad", demo: "Ver demo", start: "Empezar gratis" },
    hero: { badge: "La nueva plataforma de participación ya está aquí", title: "Convierte cualquier público", gradient: "en una experiencia inolvidable.", description: "Cuestionarios, encuestas, juegos y contenido en vivo para móviles, ordenadores y llamadas telefónicas, con datos en tiempo real e IA.", live: "Participantes activos", questions: "Respuestas recibidas", uptime: "Disponibilidad" },
    demo: { badge: "En vivo", title: "Encuesta en tiempo real", question: "¿Qué función transformará tu próximo evento?", options: ["Preguntas con IA", "Participación telefónica", "Gráficos en vivo", "Certificados automáticos"], responses: "Respuestas recibidas", responseTime: "Tiempo medio de respuesta" },
    features: { badge: "Una plataforma. Posibilidades infinitas.", title: "Todo para conectar con tu público", description: "Contenido, participación, análisis e informes en un solo lugar.", cards: [{ title: "Cuestionarios competitivos", text: "Puntuación por velocidad y rankings." }, { title: "Encuestas en vivo", text: "Resultados y gráficos instantáneos." }, { title: "Acceso telefónico", text: "Respuestas con las teclas del teléfono." }, { title: "Certificados", text: "Certificados e informes personalizados." }, { title: "Seis idiomas", text: "Soporte multilingüe completo." }, { title: "Seguridad", text: "Monitorización, copias y permisos." }] },
    ai: { badge: "MegaClick AI Studio", title: "Un cuestionario completo en segundos", description: "Escribe un tema y nivel. La IA crea preguntas, respuestas y explicaciones.", placeholder: "Ejemplo: historia para 8.º curso...", button: "Generar", ready: "Listo para tu tema", loading: "Creando el cuestionario...", result: "Se creó un ejemplo de 12 preguntas con explicaciones." },
    phone: { badge: "Acceso sin límites", title: "Cada teléfono se convierte en un mando", description: "Los participantes llaman y responden con las teclas.", steps: [{ title: "Llamar", text: "Desde cualquier teléfono." }, { title: "Introducir código", text: "Un código corto conecta con la actividad." }, { title: "Escuchar y responder", text: "Respuestas con las teclas 1–4." }] },
    faq: { badge: "Todo lo importante", title: "Preguntas frecuentes", description: "Acceso, IA, seguridad y certificados.", items: [{ q: "¿Cómo se participa?", a: "Con código, enlace, QR o llamada." }, { q: "¿Admite acceso telefónico?", a: "Sí, mediante las teclas del teléfono." }, { q: "¿Qué genera la IA?", a: "Preguntas, respuestas y explicaciones." }, { q: "¿Hay resultados en vivo?", a: "Sí, con gráficos y rankings." }] },
    footer: "Todos los derechos reservados a MegaClick",
  },
};

const languageLabels: Record<Language, string> = {
  he: "🇮🇱 עברית", en: "🇺🇸 English", ar: "🇸🇦 العربية", ru: "🇷🇺 Русский", fr: "🇫🇷 Français", es: "🇪🇸 Español",
};

const featureIcons = [Trophy, BarChart3, PhoneCall, Award, Languages, ShieldCheck];

export default function MegaClickPage() {
  const [lang, setLang] = useState<Language>("he");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiState, setAiState] = useState<"idle" | "loading" | "ready">("idle");
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  const percentages = useMemo(() => [21, 43, 26, 10], []);

  const generateQuiz = () => {
    if (!aiPrompt.trim() || aiState === "loading") return;
    setAiState("loading");
    window.setTimeout(() => setAiState("ready"), 1400);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05050d]" dir={t.dir}>
      <div className="pointer-events-none fixed inset-0 -z-10 grid-background opacity-70" />
      <div className="pointer-events-none fixed -right-40 -top-40 -z-10 h-[620px] w-[620px] rounded-full bg-violet-600/20 blur-[150px]" />
      <div className="pointer-events-none fixed -left-48 top-1/3 -z-10 h-[560px] w-[560px] rounded-full bg-cyan-500/15 blur-[150px]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05050d]/72 backdrop-blur-2xl">
        <div className="container-shell flex h-20 items-center justify-between gap-4">
          <a href="#top" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-600 to-pink-500 shadow-[0_0_35px_rgba(139,92,246,.38)] transition group-hover:rotate-6 group-hover:scale-105">
              <Zap className="h-5 w-5 fill-white" />
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight">MegaClick<span className="text-pink-400">.</span></span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-cyan-300">Live Experience Platform</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-300 lg:flex">
            <a href="#features" className="transition hover:text-white">{t.nav.product}</a>
            <a href="#ai" className="transition hover:text-white">{t.nav.ai}</a>
            <a href="#phone" className="transition hover:text-white">{t.nav.phone}</a>
            <a href="#faq" className="transition hover:text-white">{t.nav.faq}</a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select value={lang} onChange={(e) => setLang(e.target.value as Language)} className="h-11 appearance-none rounded-xl border border-white/10 bg-white/5 px-10 text-xs font-bold text-white outline-none transition hover:bg-white/10" dir="ltr">
                {Object.entries(languageLabels).map(([key, value]) => <option key={key} value={key} className="bg-[#0b0b18]">{value}</option>)}
              </select>
            </div>
            <button className="primary-button hidden px-5 py-3 text-sm md:inline-flex"><Rocket className="h-4 w-4" />{t.actions.create}</button>
            <button onClick={() => setMenuOpen((v) => !v)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 lg:hidden" aria-label="menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="border-t border-white/10 bg-[#080812]/95 p-4 lg:hidden">
              <div className="container-shell flex flex-col gap-3">
                {[ ["#features", t.nav.product], ["#ai", t.nav.ai], ["#phone", t.nav.phone], ["#faq", t.nav.faq] ].map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-bold">{label}</a>)}
                <select value={lang} onChange={(e) => setLang(e.target.value as Language)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-bold">
                  {Object.entries(languageLabels).map(([key, value]) => <option key={key} value={key} className="bg-[#0b0b18]">{value}</option>)}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="top" className="relative pt-36 sm:pt-44">
        <div className="container-shell grid items-center gap-14 pb-24 lg:grid-cols-[1.08fr_.92fr] lg:pb-32">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="section-kicker"><span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" /></span>{t.hero.badge}</div>
            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[82px]">
              {t.hero.title}<br /><span className="gradient-title text-glow">{t.hero.gradient}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{t.hero.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#ai" className="primary-button"><WandSparkles className="h-5 w-5" />{t.actions.start}</a>
              <a href="#demo" className="secondary-button"><CirclePlay className="h-5 w-5 text-cyan-300" />{t.actions.demo}</a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-3 sm:max-w-2xl sm:gap-5">
              {[ ["18,280+", t.hero.live], ["2.4M+", t.hero.questions], ["99.99%", t.hero.uptime] ].map(([value, label]) => (
                <div key={label} className="glass-card rounded-2xl p-4 sm:p-5"><div className="text-2xl font-black text-white sm:text-3xl">{value}</div><div className="mt-1 text-[11px] font-semibold text-slate-400 sm:text-sm">{label}</div></div>
              ))}
            </div>
          </motion.div>

          <motion.div id="demo" initial={{ opacity: 0, scale: .94, y: 25 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .8, delay: .15 }} className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-violet-600/30 via-cyan-400/10 to-pink-500/25 blur-3xl" />
            <div className="glass-card overflow-hidden rounded-[32px]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
                <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15"><Activity className="h-5 w-5 text-violet-300" /></span><div><div className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-300">{t.demo.badge}</div><div className="font-black">{t.demo.title}</div></div></div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />LIVE</div>
              </div>
              <div className="p-5 sm:p-7">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5"><div className="mb-2 text-xs font-bold text-slate-500">04 / 10</div><h2 className="text-xl font-black leading-8 sm:text-2xl">{t.demo.question}</h2></div>
                <div className="mt-5 space-y-4">
                  {t.demo.options.map((option, index) => (
                    <div key={option}>
                      <div className="mb-2 flex items-center justify-between gap-4 text-sm"><span className="font-bold">{index + 1}. {option}</span><span className="font-black text-slate-300">{percentages[index]}%</span></div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/5"><motion.div initial={{ width: 0 }} whileInView={{ width: `${percentages[index]}%` }} viewport={{ once: true }} transition={{ duration: .9, delay: index * .08 }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" /></div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><Users className="mb-3 h-5 w-5 text-cyan-300" /><div className="text-2xl font-black">1,284</div><div className="text-xs text-slate-400">{t.demo.responses}</div></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><Zap className="mb-3 h-5 w-5 text-amber-300" /><div className="text-2xl font-black">41ms</div><div className="text-xs text-slate-400">{t.demo.responseTime}</div></div></div>
              </div>
            </div>
            <div className="glass-card animate-float absolute -bottom-8 -left-4 hidden rounded-2xl p-4 sm:block"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10"><PhoneCall className="h-5 w-5 text-emerald-300" /></div><div><div className="text-xs text-slate-400">טלפון מחובר</div><div className="font-black">DTMF פעיל</div></div></div></div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="border-y border-white/10 bg-white/[0.018] py-24 sm:py-32">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center"><div className="section-kicker"><Sparkles className="h-4 w-4" />{t.features.badge}</div><h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">{t.features.title}</h2><p className="mt-5 text-lg leading-8 text-slate-400">{t.features.description}</p></div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {t.features.cards.map((card, index) => { const Icon = featureIcons[index]; return <motion.article key={card.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .06 }} className="glass-card group rounded-[28px] p-6 transition duration-300 hover:-translate-y-2 hover:border-violet-400/30"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/15 via-violet-500/15 to-pink-500/15 p-3"><Icon className="h-6 w-6 text-cyan-200" /></div><h3 className="mt-6 text-xl font-black">{card.title}</h3><p className="mt-3 leading-7 text-slate-400">{card.text}</p><div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></motion.article> })}
          </div>
        </div>
      </section>

      <section id="ai" className="py-24 sm:py-32">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <div><div className="section-kicker"><BrainCircuit className="h-4 w-4" />{t.ai.badge}</div><h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">{t.ai.title}</h2><p className="mt-5 text-lg leading-8 text-slate-400">{t.ai.description}</p><div className="mt-8 space-y-3">{t.features.cards.slice(0, 3).map((item) => <div key={item} className="flex items-center gap-3 font-bold text-slate-200"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10"><Check className="h-4 w-4 text-emerald-300" /></span>{item.title}</div>)}</div></div>
          <div className="glass-card rounded-[32px] p-5 sm:p-7"><div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15"><Cpu className="h-5 w-5 text-violet-300" /></span><div><div className="font-black">AI Quiz Builder</div><div className="text-xs text-slate-500">Neural generation workspace</div></div></div><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">ONLINE</span></div>
            <textarea value={aiPrompt} onChange={(e) => { setAiPrompt(e.target.value); if (aiState === "ready") setAiState("idle"); }} placeholder={t.ai.placeholder} className="min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/40" />
            <button onClick={generateQuiz} disabled={!aiPrompt.trim() || aiState === "loading"} className="primary-button mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"><WandSparkles className="h-5 w-5" />{t.ai.button}</button>
            <div className="mt-5 min-h-36 rounded-2xl border border-white/10 bg-black/25 p-5">
              {aiState === "idle" && <div className="flex min-h-24 flex-col items-center justify-center text-center text-sm text-slate-500"><MessageSquareMore className="mb-3 h-8 w-8 text-slate-600" />{t.ai.ready}</div>}
              {aiState === "loading" && <div className="flex min-h-24 flex-col items-center justify-center text-center text-sm font-bold text-violet-300"><Cpu className="mb-4 h-8 w-8 animate-spin" />{t.ai.loading}</div>}
              {aiState === "ready" && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><div className="mb-3 flex items-center gap-2 font-black text-emerald-300"><Check className="h-5 w-5" />{t.ai.result}</div><div className="grid gap-2 sm:grid-cols-2">{["12", "4", "AI", "✓"].map((x) => <div key={x} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold">{x}</div>)}</div></motion.div>}
            </div>
          </div>
        </div>
      </section>

      <section id="phone" className="border-y border-white/10 bg-[#080812] py-24 sm:py-32">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-md"><div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl" /><div className="glass-card relative mx-auto w-[300px] rounded-[42px] border-2 border-white/10 p-5 shadow-[0_30px_100px_rgba(0,0,0,.55)]"><div className="rounded-[28px] border border-white/10 bg-black/40 p-5"><div className="flex items-center justify-between text-xs text-slate-500"><span>00:41</span><Radio className="h-4 w-4 text-emerald-300" /></div><div className="mt-7 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10"><Headphones className="h-8 w-8 text-emerald-300" /></div><div className="mt-4 text-sm text-slate-400">MegaClick Voice</div><div className="mt-1 text-xl font-black">{t.phone.badge}</div><div className="mt-3 text-xs text-cyan-300">{t.phone.steps[2].title}</div></div><div className="mt-7 grid grid-cols-3 gap-3">{[1,2,3,4,5,6,7,8,9,"*",0,"#"].map((key) => <button key={key} className="aspect-square rounded-2xl border border-white/10 bg-white/5 text-lg font-black transition hover:bg-violet-500/20">{key}</button>)}</div></div></div><div className="glass-card animate-float-delayed absolute -right-2 top-16 rounded-2xl p-3"><QrCode className="h-7 w-7 text-cyan-300" /></div></div>
          <div><div className="section-kicker"><PhoneCall className="h-4 w-4" />{t.phone.badge}</div><h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">{t.phone.title}</h2><p className="mt-5 text-lg leading-8 text-slate-400">{t.phone.description}</p><div className="mt-9 space-y-4">{t.phone.steps.map((step, index) => <div key={step.title} className="glass-card flex gap-4 rounded-2xl p-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 font-black text-emerald-300">{index + 1}</span><div><h3 className="font-black">{step.title}</h3><p className="mt-1 leading-7 text-slate-400">{step.text}</p></div></div>)}</div></div>
        </div>
      </section>

      <section id="faq" className="py-24 sm:py-32">
        <div className="container-shell"><div className="mx-auto max-w-3xl text-center"><div className="section-kicker"><MessageSquareMore className="h-4 w-4" />{t.faq.badge}</div><h2 className="mt-6 text-4xl font-black sm:text-5xl">{t.faq.title}</h2><p className="mt-5 text-lg leading-8 text-slate-400">{t.faq.description}</p></div><div className="mx-auto mt-12 max-w-4xl space-y-3">{t.faq.items.map((item, index) => { const isOpen = openFaq === index; return <div key={item.q} className="glass-card overflow-hidden rounded-2xl"><button onClick={() => setOpenFaq(isOpen ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-start sm:p-6"><span className="font-black sm:text-lg">{item.q}</span><ChevronDown className={`h-5 w-5 shrink-0 text-cyan-300 transition ${isOpen ? "rotate-180" : ""}`} /></button><AnimatePresence initial={false}>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className="border-t border-white/10 px-5 py-5 leading-8 text-slate-400 sm:px-6">{item.a}</p></motion.div>}</AnimatePresence></div> })}</div></div>
      </section>

      <section className="pb-24"><div className="container-shell"><div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-violet-600/25 via-[#0a0a18] to-cyan-500/15 p-8 text-center sm:p-14"><div className="absolute inset-0 grid-background opacity-25" /><div className="relative"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10"><Rocket className="h-8 w-8 text-cyan-200" /></div><h2 className="mt-6 text-3xl font-black sm:text-5xl">{t.hero.title} <span className="gradient-title">{t.hero.gradient}</span></h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">{t.hero.description}</p><a href="#top" className="primary-button mt-8"><Play className="h-5 w-5 fill-current" />{t.actions.create}</a></div></div></div></section>

      <footer className="border-t border-white/10 bg-black/20 py-10"><div className="container-shell flex flex-col items-center justify-between gap-5 text-center text-sm text-slate-500 md:flex-row md:text-start"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-violet-600 to-pink-500"><Zap className="h-5 w-5 fill-white" /></span><div><div className="font-black text-white">MegaClick</div><div>{t.footer} © {new Date().getFullYear()}</div></div></div><div className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-emerald-300" />MegaClick Cloud</div></div></footer>
    </main>
  );
}
