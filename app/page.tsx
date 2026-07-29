"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, Globe, Phone, Award, Play, CheckCircle2, 
  BarChart3, FileText, Image as ImageIcon, 
  Sparkles, BrainCircuit, Users, LogIn, ShieldCheck, Cpu, Radio, ChevronRight, Activity, Terminal
} from "lucide-react";

// --- מילון שפות מלא (6 שפות) ---
const dict = {
  he: {
    dir: "rtl",
    nav_features: "יכולות ליבה",
    nav_ai: "מנוע סינתזה AI",
    nav_kosher: "מערכת קולית IVR",
    nav_analytics: "אנליטיקה בזמן אמת",
    btn_cert: "פורטל תעודות",
    btn_join: "הצטרף למשחק חי",
    btn_create: "הקם מערך חדש",
    hero_eyebrow: "Apple-Grade Enterprise Ecosystem • 100% Free",
    hero_title_1: "שליטה מוחלטת בקהל.",
    hero_title_2: "באפס השהיה.",
    hero_sub: "מערכת מגה קליק ממזגת בין חוויית סמארטפון עתירת אנימציות לבין חיבור טלפוני קולי כשר, ומציגה מסך ראשי מרהיב שפותח ללא שום פשרות טכנולוגיות.",
    sim_title: "סימולטור אינטראקטיבי חי",
    sim_presenter: "מסך מנחה ראשי (לייב)",
    sim_keypad: "לוח מקשים טלפוני (DTMF)",
    metrics_title: "ביצועים בקנה מידה עולמי",
    metrics_sub: "נתונים חיים משרתי הענן של מגה קליק ברגע זה:",
    features_title: "ארכיטקטורה רב-ממדית",
    features_sub: "כל רכיב במערכת תוכנן בקפידה כדי לספק חוויית משתמש עוצרת נשימה למשתתפים ולמנהלים כאחד.",
    cards: [
      { id: 1, title: "זירת טריוויה מהירה", desc: "אלגוריתם חישוב ניקוד מבוסס אלפיות-שנייה עם טבלת מובילים דינמית שמעדכנת את האולם בזמן אמת." },
      { id: 2, title: "סקרי עומק תאגידיים", desc: "איסוף נתונים אנונימי והצגתם בדיאגרמות תלת-ממדיות מרהיבות לקבלת החלטות מיידית." },
      { id: 3, title: "הזרמת מדיה 4K", desc: "שילוב חלק של סרטוני וידאו, תמונות תקריב וקובצי שמע אקוסטיים היישר למסכי הענק באולם." },
      { id: 4, title: "אבטחת מידע צבאית", desc: "הצפנת קונטיינרים מלאה, בידוד נתונים מוחלט ועמידה בתקני הפרטיות המחמירים ביותר בעולם." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "הזן כל נושא מקצועי או לימודי. מערכת ה-AI שלנו מייצרת מערכי שאלות מדויקים הכוללים מסיחים פסיכולוגיים והסברים מעמיקים.",
    ai_placeholder: "הקלד נושא לבנייה אוטומטית (למשל: 'כלכלה התנהגותית וניהול סיכונים')...",
    ai_btn: "הפעל סינתזה נוירלית",
    kosher_title: "Web-to-Voice IVR Architecture",
    kosher_sub: "תשתית חיוג קולי מתקדמת המאפשרת לציבור הרחב ולמשתמשי טלפון כשר לקחת חלק מלא בכל אירוע בלחיצת כפתור.",
    steps: [
      { title: "חיוג מקוצר לשרת", desc: "חיוג חינם למספר המערכת והקשת קוד ה-PIN הייחודי המופיע על גבי מסך המנחה." },
      { title: "האזנה ומענה קולי", desc: "שמע השאלות בקול ברור והקשת מקשים 1 עד 4 במקלדת הטלפון לקליטת הנתונים בשרת הענן." },
      { title: "קבלת אישור השתתפות", desc: "הפקת קוד זיהוי אישי בסיום הפעילות לצורך קבלת תעודת הצטיינות דיגיטלית חתומה." }
    ],
    footer: "MegaClick Enterprise Core • פותח עבור קהלים הדורשים שלמות • כל הזכויות שמורות © 2026"
  },
  en: {
    dir: "ltr",
    nav_features: "Core Features",
    nav_ai: "Neural AI",
    nav_kosher: "Voice IVR",
    nav_analytics: "Live Analytics",
    btn_cert: "Certificates",
    btn_join: "Join Live Game",
    btn_create: "Create Suite",
    hero_eyebrow: "Apple-Grade Enterprise Ecosystem • 100% Free",
    hero_title_1: "Command The Audience.",
    hero_title_2: "Zero Latency.",
    hero_sub: "MegaClick seamlessly merges high-speed smartphone animations with kosher phone dial-in users, rendering a magnificent master display built without compromise.",
    sim_title: "Interactive Live Simulator",
    sim_presenter: "Master Presenter Screen (Live)",
    sim_keypad: "Phone Keypad (DTMF)",
    metrics_title: "Global Scale Performance",
    metrics_sub: "Live telemetry from MegaClick cloud infrastructure right now:",
    features_title: "Multi-Dimensional Architecture",
    features_sub: "Every component is meticulously crafted to deliver a breathtaking experience for participants and administrators alike.",
    cards: [
      { id: 1, title: "Speed Trivia Arena", desc: "Millisecond-based scoring engine with a dynamic leaderboard updating the entire hall instantly." },
      { id: 2, title: "Corporate Deep Polls", desc: "Anonymous data aggregation rendered as stunning 3D charts for instant executive decisions." },
      { id: 3, title: "4K Media Streaming", desc: "Seamless integration of high-def video, macro imagery, and acoustic sound directly to main displays." },
      { id: 4, title: "Military-Grade Security", desc: "Full container encryption, complete data isolation, and compliance with the strictest global privacy standards." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "Input any professional topic. Our AI system generates precise question matrices complete with psychological distractors and deep explanations.",
    ai_placeholder: "Enter prompt for auto-generation (e.g., 'Behavioral economics and risk management')...",
    ai_btn: "Initialize Neural Synthesis",
    kosher_title: "Web-to-Voice IVR Architecture",
    kosher_sub: "Advanced voice routing infrastructure allowing broad audiences and kosher phone users to fully participate in any event.",
    steps: [
      { title: "Fast Server Dial-In", desc: "Call the toll-free system number and enter the unique PIN code displayed on the master screen." },
      { title: "Audio & Keypad Response", desc: "Listen to questions clearly and press keys 1 through 4 on your phone keypad to submit data." },
      { title: "Participation Verification", desc: "Receive a personal verification code at the end to download your digitally signed certificate." }
    ],
    footer: "MegaClick Enterprise Core • Engineered for absolute perfection • All rights reserved © 2026"
  },
  es: {
    dir: "ltr",
    nav_features: "Características",
    nav_ai: "IA Neural",
    nav_kosher: "IVR de Voz",
    nav_analytics: "Analítica",
    btn_cert: "Certificados",
    btn_join: "Unirse al Juego",
    btn_create: "Crear Sistema",
    hero_eyebrow: "Ecosistema Empresarial Apple-Grade • 100% Gratis",
    hero_title_1: "Domina a la Multitud.",
    hero_title_2: "Cero Latencia.",
    hero_sub: "MegaClick fusiona animaciones de teléfonos inteligentes con usuarios telefónicos tradicionales en una pantalla maestra impresionante.",
    sim_title: "Simulador en Vivo",
    sim_presenter: "Pantalla del Presentador",
    sim_keypad: "Teclado Telefónico (DTMF)",
    metrics_title: "Rendimiento Global",
    metrics_sub: "Telemetría en vivo desde la nube de MegaClick:",
    features_title: "Arquitectura Multidimensional",
    features_sub: "Cada componente está meticulosamente diseñado para una experiencia impresionante.",
    cards: [
      { id: 1, title: "Arena de Trivia", desc: "Puntuación en milisegundos con tabla de clasificación dinámica." },
      { id: 2, title: "Encuestas Corporativas", desc: "Recopilación de datos anónimos con gráficos 3D impresionantes." },
      { id: 3, title: "Streaming Multimedia 4K", desc: "Integración fluida de video de alta definición y audio acústico." },
      { id: 4, title: "Seguridad de Grado Militar", desc: "Cifrado completo y aislamiento total de datos." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "Ingresa cualquier tema profesional. Nuestro sistema genera matrices de preguntas precisas.",
    ai_placeholder: "Ingrese tema...",
    ai_btn: "Iniciar Síntesis",
    kosher_title: "Arquitectura IVR Web-to-Voice",
    kosher_sub: "Infraestructura de enrutamiento de voz avanzada para máxima accesibilidad.",
    steps: [
      { title: "Llamada Rápida", desc: "Llame al número del sistema e introduzca el código PIN." },
      { title: "Respuesta de Audio", desc: "Escuche y presione las teclas del 1 al 4." },
      { title: "Verificación Personal", desc: "Reciba un código de verificación para su certificado." }
    ],
    footer: "MegaClick Enterprise Core • Todos los derechos reservados © 2026"
  },
  fr: {
    dir: "ltr",
    nav_features: "Fonctionnalités",
    nav_ai: "IA Neurale",
    nav_kosher: "Sve Vocal",
    nav_analytics: "Analytique",
    btn_cert: "Certificats",
    btn_join: "Rejoindre le Jeu",
    btn_create: "Créer un Système",
    hero_eyebrow: "Écosystème Entreprise Apple-Grade • 100% Gratuit",
    hero_title_1: "Maîtrisez la Foule.",
    hero_title_2: "Zéro Latence.",
    hero_sub: "MegaClick unit smartphones et utilisateurs téléphoniques sur un écran maître d'une clarté absolue.",
    sim_title: "Simulateur en Direct",
    sim_presenter: "Écran Principal du Présentateur",
    sim_keypad: "Clavier Téléphonique (DTMF)",
    metrics_title: "Performance Mondiale",
    metrics_sub: "Télémétrie en direct du cloud MegaClick:",
    features_title: "Architecture Multidimensionnelle",
    features_sub: "Chaque composant est conçu pour offrir une expérience à couper le souffle.",
    cards: [
      { id: 1, title: "Arène de Trivia", desc: "Score en millisecondes avec classement dynamique en direct." },
      { id: 2, title: "Sondages d'Entreprise", desc: "Agrégation de données anonymes en graphiques 3D." },
      { id: 3, title: "Streaming Multimédia 4K", desc: "Intégration fluide de vidéos HD et de sons acoustiques." },
      { id: 4, title: "Sécurité Militaire", desc: "Chiffrement complet des conteneurs et isolation des données." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "Entrez n'importe quel sujet professionnel. Notre IA génère des matrices de questions précises.",
    ai_placeholder: "Entrez le sujet...",
    ai_btn: "Lancer la Synthèse",
    kosher_title: "Architecture IVR Web-to-Voice",
    kosher_sub: "Infrastructure de routage vocal avancée pour une accessibilité maximale.",
    steps: [
      { title: "Appel Rapide", desc: "Appelez le numéro du système et entrez le code PIN." },
      { title: "Réponse Vocale", desc: "Écoutez et appuyez sur les touches 1 à 4." },
      { title: "Vérification Personnelle", desc: "Recevez un code pour télécharger votre certificat." }
    ],
    footer: "MegaClick Enterprise Core • Tous droits réservés © 2026"
  },
  ru: {
    dir: "ltr",
    nav_features: "Возможности",
    nav_ai: "Нейросеть ИИ",
    nav_kosher: "Голосовой IVR",
    nav_analytics: "Аналитика",
    btn_cert: "Сертификаты",
    btn_join: "Войти в игру",
    btn_create: "Создать систему",
    hero_eyebrow: "Корпоративная экосистема Apple-Grade • 100% Бесплатно",
    hero_title_1: "Управляйте залом.",
    hero_title_2: "Нулевая задержка.",
    hero_sub: "MegaClick объединяет быстрые анимации смартфонов и пользователей голосовых вызовов на великолепном общем экране.",
    sim_title: "Интерактивный симулятор в реальном времени",
    sim_presenter: "Главный экран ведущего (Лайв)",
    sim_keypad: "Телефонная клавиатура (DTMF)",
    metrics_title: "Глобальная производительность",
    metrics_sub: "Телеметрия в реальном времени из облака MegaClick:",
    features_title: "Многомерная архитектура",
    features_sub: "Каждый компонент тщательно создан для обеспечения захватывающего опыта.",
    cards: [
      { id: 1, title: "Арена викторин", desc: "Расчет очков на основе миллисекунд с динамической таблицей лидеров." },
      { id: 2, title: "Корпоративные опросы", desc: "Сбор анонимных данных с визуализацией в 3D графиках." },
      { id: 3, title: "Потоковое вещание 4K", desc: "Плавная интеграция HD-видео и студийного звука." },
      { id: 4, title: "Военная безопасность", desc: "Полное шифрование данных и строгая изоляция контейнеров." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "Введите любую тему. Наша система ИИ создает точные матрицы вопросов с психологическими отвлекающими факторами.",
    ai_placeholder: "Введите тему для генерации...",
    ai_btn: "Запустить синтез",
    kosher_title: "Web-to-Voice IVR Архитектура",
    kosher_sub: "Продвинутая инфраструктура голосовой маршрутизации для максимальной доступности участников.",
    steps: [
      { title: "Быстрый набор номера", desc: "Позвоните на номер системы и введите уникальный PIN-код с экрана." },
      { title: "Аудио и клавиатурный ответ", desc: "Прослушайте вопросы и нажмите клавиши от 1 до 4 на телефоне." },
      { title: "Проверка участия", desc: "Получите личный код подтверждения для скачивания сертификата." }
    ],
    footer: "MegaClick Enterprise Core • Разработано для безупречности • Все права защищены © 2026"
  },
  ar: {
    dir: "rtl",
    nav_features: "المميزات الرئيسية",
    nav_ai: "محرك الذكاء الاصطناعي",
    nav_kosher: "نظام الرد الصوتي IVR",
    nav_analytics: "التحليلات الحية",
    btn_cert: "בوابة الشهادات",
    btn_join: "انضم للعبة المباشرة",
    btn_create: "إنشاء نظام جديد",
    hero_eyebrow: "Apple-Grade Enterprise Ecosystem • مجاني 100%",
    hero_title_1: "تحكم مطلق بالجمهور.",
    hero_title_2: "بدون أي تأخير.",
    hero_sub: "تدمج منصة مגה קליק بسلاسة בין رسومات الهواتف الذكية السريعة وبين مستخدمي المكالمات الصوتية الكوشر، لتقدم شاشة رئيسية مذهلة تم تطويرها بدون تنازلات.",
    sim_title: "محاكي تفاعلي مباشر",
    sim_presenter: "شاشة المضيف الرئيسية (بث مباشر)",
    sim_keypad: "لوحة مفاتيح الهاتف (DTMF)",
    metrics_title: "أداء على نطاق عالمي",
    metrics_sub: "القياسات الحية من سحابة مגה קליק في هذه اللحظة:",
    features_title: "هندسة متعددة الأبعاد",
    features_sub: "تم تصميم كل مكون في النظام بدقة فائقة لتوفير تجربة استثنائية للمشاركين والمديرين.",
    cards: [
      { id: 1, title: "ساحة الترفيه السريع", desc: "محرك حساب نقاط يعتمد على أجزاء من الثانية مع لوحة صدارة ديناميكية تحدث القاعة فوراً." },
      { id: 2, title: "استطلاعات الرأي المؤسسية", desc: "جمع البيانات المجهولة وعرضها في مخططات ثلاثية الأبعاد مذهلة لاتخاذ قرارات فورية." },
      { id: 3, title: "بث الوسائط المتعددة 4K", desc: "دمج سلس لفيديو عالي الدقة والصوت الاقتصادي مباشرة إلى الشاشات الكبرى." },
      { id: 4, title: "أمان بمعايير عسكرية", desc: "تشفير كامل للحاويات، عزل تام للبيانات، والامتثال لأرقى معايير الخصوصية العالمية." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "أدخل أي موضوع مهني أو تعليمي. يقوم نظام الذكاء الاصطناعي لدينا بإنشاء مجموعات أسئلة دقيقة مع مشتتات نفسية وتفسيرات عميقة.",
    ai_placeholder: "أدخل الموضوع للتوليد التلقائي (مثلاً: 'الاقتصاد السلوكي وإدارة المخاطر')...",
    ai_btn: "تفعيل التوليد العصبوني",
    kosher_title: "Web-to-Voice IVR Architecture",
    kosher_sub: "بنية توجيه صوتي متقدمة تتيح لجمهور واسع ومستخدمي الهواتف الكوشر المشاركة الكاملة في أي حدث.",
    steps: [
      { title: "الاتصال السريع بالخادم", desc: "اتصل برقم النظام المجاني وأدخل رمز PIN الفريد الظاهر على شاشة المضيف." },
      { title: "الاستماع والرد الصوتي", desc: "استמע للأسئلة بوضوح واضغط على الأرقام من 1 إلى 4 في لوحة المفاتيح لإرسال البيانات." },
      { title: "التحقق من المشاركة", desc: "احصل على رمز تحقق شخصي في النهاية لتنزيل شهادة التميز الرقمية الموقعة." }
    ],
    footer: "MegaClick Enterprise Core • صُمم خصيصاً لتحقيق الكمال المطلق • جميع الحقوق محفوظة © 2026"
  }
};

export default function MegaClickAppleGradeStudio() {
  const [lang, setLang] = useState<"he" | "en" | "es" | "fr" | "ru" | "ar">("he");
  const t = dict[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  // Simulator Interactive States
  const [simTimer, setSimTimer] = useState(12);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const [simState, setSimState] = useState<"waiting" | "correct" | "wrong">("waiting");

  useEffect(() => {
    if (simTimer > 0 && simState === "waiting") {
      const timer = setTimeout(() => setSimTimer(simTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (simTimer === 0 && simState === "waiting") {
      setSimState("wrong");
    }
  }, [simTimer, simState]);

  const handleKeyPress = (keyNum: number) => {
    setSelectedKey(keyNum);
    if (keyNum === 2) {
      setSimState("correct");
    } else {
      setSimState("wrong");
    }
  };

  const resetSimulation = () => {
    setSimTimer(12);
    setSelectedKey(null);
    setSimState("waiting");
  };

  // AI Generator Simulator State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiStatus, setAiStatus] = useState<"idle" | "processing" | "ready">("idle");

  const triggerAI = () => {
    if (!aiPrompt) return;
    setAiStatus("processing");
    setTimeout(() => {
      setAiStatus("ready");
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-[#000000] text-[#f5f5f7] font-sans selection:bg-blue-500/30 overflow-x-hidden ${t.dir === "rtl" ? "text-right" : "text-left"}`} dir={t.dir}>
      
      {/* Subtle Apple-style Background Ambient Light */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px]"></div>
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px]"></div>
      </div>

      {/* --- Top Apple Navigation Bar --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/75 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Zap className="text-white w-4 h-4 fill-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              MegaClick<span className="text-blue-500">.</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">{t.nav_features}</a>
            <a href="#ai" className="hover:text-white transition-colors">{t.nav_ai}</a>
            <a href="#kosher" className="hover:text-white transition-colors">{t.nav_kosher}</a>
            <a href="#analytics" className="hover:text-white transition-colors">{t.nav_analytics}</a>
          </nav>

          {/* Controls: 6 Languages + Join */}
          <div className="flex items-center gap-3">
            
            {/* Language Selector */}
            <div className="relative">
              <Globe className="absolute top-1/2 -translate-y-1/2 left-2.5 w-3 h-3 text-slate-400 pointer-events-none" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as any)}
                className="appearance-none bg-white/5 border border-white/10 rounded-lg pl-7 pr-3 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer hover:bg-white/10 transition"
                style={{ direction: 'ltr' }}
              >
                <option value="he" className="bg-[#111]">🇮🇱 עברית</option>
                <option value="en" className="bg-[#111]">🇺🇸 English</option>
                <option value="es" className="bg-[#111]">🇪🇸 Español</option>
                <option value="fr" className="bg-[#111]">🇫🇷 Français</option>
                <option value="ru" className="bg-[#111]">🇷🇺 Русский</option>
                <option value="ar" className="bg-[#111]">🇸🇦 العربية</option>
              </select>
            </div>

            {/* Join Game Button */}
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-1.5 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all flex items-center gap-1.5">
              <Play className="w-3 h-3 fill-current" />
              {t.btn_join}
            </button>
          </div>

        </div>
      </header>

      {/* --- Hero Section & Dual Live Simulator --- */}
      <section className="relative pt-36 pb-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Hero Text */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:w-1/2 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {t.hero_eyebrow}
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              {t.hero_title_1} <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                {t.hero_title_2}
              </span>
            </h1>
            
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              {t.hero_sub}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-white text-black font-bold px-7 py-3.5 rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2 text-sm shadow-lg">
                <Play className="w-4 h-4 fill-current text-blue-600" />
                {t.btn_join}
              </button>
              <button className="bg-white/5 border border-white/10 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
                <LogIn className="w-4 h-4 text-purple-400" />
                {t.btn_create}
              </button>
            </div>
          </motion.div>

          {/* Right Side: Dual Live Simulator (Apple Precision Card) */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="lg:w-1/2 w-full max-w-md mx-auto">
            <div className="bg-[#0c0c0e] border border-white/15 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              
              {/* Simulator Bar */}
              <div className="bg-white/5 px-5 py-3.5 flex justify-between items-center border-b border-white/10">
                <span className="text-xs font-mono tracking-wider text-slate-400 uppercase flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  {t.sim_title}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              {/* 1. Presenter Screen Preview (Top Mini Screen) */}
              <div className="p-5 bg-gradient-to-b from-blue-950/20 to-transparent border-b border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase">
                    🖥️ {t.sim_presenter}
                  </span>
                  <span className="text-xs font-mono text-pink-400 font-bold">⏱️ {simTimer}s</span>
                </div>

                <div className="text-sm font-semibold text-white mb-3">
                  {lang === "he" ? "מהי מהירות סנכרון הנתונים במערכת?" : lang === "ar" ? "ما هي سرعة مزامنة البيانات في النظام؟" : "What is the system data sync speed?"}
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400"><span>1. 2.5 sec</span><span>14%</span></div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-slate-600 h-full w-[14%]"></div>
                  </div>
                  
                  <div className="flex justify-between text-slate-200 font-bold"><span>2. <span className="text-emerald-400">&lt;50ms Real-Time</span></span><span>81%</span></div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-400 h-full w-[81%] animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* 2. Phone Keypad Simulator (Bottom DTMF Section) */}
              <div className="p-5 bg-[#050507]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                    📞 {t.sim_keypad}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {lang === "he" ? "לחץ על מקש 2 לתשובה נכונה:" : "Tap key 2 for correct answer:"}
                  </span>
                </div>

                {simState === "waiting" ? (
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button 
                        key={num}
                        onClick={() => handleKeyPress(num)}
                        className="bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-500 py-2.5 rounded-xl font-mono text-base font-bold text-white transition-all transform active:scale-95 flex flex-col items-center justify-center shadow"
                      >
                        <span>{num}</span>
                        <span className="text-[7px] text-slate-500">DTMF</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className={`p-3.5 rounded-xl text-center flex flex-col items-center justify-center space-y-1.5 animate-in zoom-in duration-200 ${simState === 'correct' ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/15 border border-red-500/30 text-red-300'}`}>
                    <h3 className="font-semibold text-xs">
                      {simState === 'correct' 
                        ? (lang === 'he' ? "🎉 תשובה נקלטה בשרת בהצלחה!" : lang === 'ar' ? "🎉 تم تسجيل الإجابة بنجاح!" : "🎉 Answer recorded successfully!") 
                        : (lang === 'he' ? "❌ תשובה שגויה או שהזמן תם." : lang === 'ar' ? "❌ إجابة خاطئة أو انتهى الوقت." : "❌ Incorrect or time expired.")}
                    </h3>
                    <button onClick={resetSimulation} className="text-[11px] underline text-slate-400 hover:text-white">
                      {lang === 'he' ? "נסה שוב" : "Try Again"}
                    </button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* --- Global Metrics Telemetry Bar --- */}
      <section id="analytics" className="py-16 border-y border-white/10 bg-[#040406]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-xl font-bold mb-2">{t.metrics_title}</h2>
          <p className="text-xs text-slate-400 mb-10">{t.metrics_sub}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <span className="block text-3xl font-black text-white font-mono mb-1">0.02ms</span>
              <span className="text-xs text-slate-400">{lang === 'he' ? 'השהיית שרת (Latency)' : 'Server Latency'}</span>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <span className="block text-3xl font-black text-emerald-400 font-mono mb-1">99.99%</span>
              <span className="text-xs text-slate-400">{lang === 'he' ? 'זמינות מערכת (Uptime)' : 'System Uptime'}</span>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <span className="block text-3xl font-black text-blue-400 font-mono mb-1">100,000+</span>
              <span className="text-xs text-slate-400">{lang === 'he' ? 'משתתפים בו-זמנית' : 'Concurrent Users'}</span>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <span className="block text-3xl font-black text-purple-400 font-mono mb-1">6</span>
              <span className="text-xs text-slate-400">{lang === 'he' ? 'שפות מערכת מלאות' : 'Full System Languages'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Multi-Dimensional Architecture Features --- */}
      <section id="features" className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">{t.features_title}</h2>
          <p className="text-slate-400 text-sm leading-relaxed">{t.features_sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.cards.map((card) => (
            <div key={card.id} className="bg-[#08080a] border border-white/10 p-7 rounded-2xl hover:border-blue-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">{card.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Neural Engine AI Section --- */}
      <section id="ai" className="py-28 border-t border-white/10 bg-[#030305]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#09090c] border border-purple-500/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
            
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-4">
                <BrainCircuit className="w-3.5 h-3.5" />
                GPT-4 & Neural Core
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-4">{t.ai_title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{t.ai_sub}</p>
            </div>

            <div className="md:w-1/2 w-full">
              <div className="bg-[#000000] border border-white/10 rounded-2xl p-5">
                <div className="flex gap-2.5 mb-4">
                  <input 
                    type="text" 
                    placeholder={t.ai_placeholder}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  <button 
                    onClick={triggerAI}
                    disabled={aiStatus === "processing" || !aiPrompt}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition disabled:opacity-50 flex items-center justify-center min-w-[110px]"
                  >
                    {aiStatus === "processing" ? <Cpu className="w-4 h-4 animate-spin" /> : t.ai_btn}
                  </button>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-xl min-h-[140px] p-4 flex flex-col justify-center font-mono text-xs">
                  {aiStatus === "idle" && (
                    <p className="text-center text-slate-600">{lang === "he" ? "המערכת ממתינה להזנה..." : "System awaiting input..."}</p>
                  )}
                  {aiStatus === "processing" && (
                    <div className="text-center space-y-2 text-purple-400">
                      <div className="flex justify-center gap-1">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                      <span>{lang === "he" ? "מייצר מערך שאלות ומסיחים..." : "Synthesizing question matrix..."}</span>
                    </div>
                  )}
                  {aiStatus === "ready" && (
                    <div className="space-y-2.5 animate-in fade-in duration-300">
                      <p className="text-blue-300 font-bold">{lang === "he" ? "שאלת פרימיום נוצרה בהצלחה:" : "Generated Premium Question:"}</p>
                      <p className="text-white font-semibold">"{aiPrompt}"</p>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-2 rounded bg-white/5 border border-white/5 text-slate-400">1. מסיח פסיכולוגי</div>
                        <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">2. תשובה נכונה ✓</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Kosher IVR Architecture Section --- */}
      <section id="kosher" className="py-28 border-t border-white/10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">{t.kosher_title}</h2>
          <p className="text-slate-400 text-sm leading-relaxed">{t.kosher_sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.steps.map((step, idx) => (
            <div key={idx} className="bg-[#070709] border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-emerald-400 font-mono text-xl font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-white/10 bg-[#000000] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">MegaClick Enterprise Architecture</span>
          </div>
          <p>{t.footer}</p>
        </div>
      </footer>

    </div>
  );
}