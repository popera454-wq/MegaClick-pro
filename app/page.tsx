"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Globe, Phone, Award, Play, CheckCircle2, 
  ChevronDown, BarChart3, FileText, Image as ImageIcon, 
  Sparkles, BrainCircuit, Users, LogIn, ShieldCheck, Cpu, Radio
} from "lucide-react";

// --- 1. מנוע 6 שפות מתקדם (i18n Dictionary) ---
const dict = {
  he: {
    dir: "rtl",
    nav_slides: "ממדי תוכן",
    nav_ai: "מנוע AI עצבני",
    nav_kosher: "מערכת טלפון כשר",
    nav_features: "יכולות מערכת",
    btn_cert: "פורטל תעודות",
    btn_join: "הצטרף למשחק",
    btn_create: "צור מערך חדש",
    hero_badge: "הדור הבא של סנכרון קהל עולמי",
    hero_title_1: "לשלוט בקהל.",
    hero_title_2: "ללא שום פשרות.",
    hero_sub: "מגה קליק ממזגת בין משתמשי סמארטפון מהירים לבין משתמשי טלפון כשר בחיוג קולי, ומציגה מסך ראשי תלת-ממדי מסונכרן בזמן אמת באפס השהיה.",
    sim_title: "סימולטור חי - מסך מנחה מול מקשי טלפון",
    sim_presenter: "מסך מרכזי (לייב)",
    sim_keypad: "מקלדת חיוג (DTMF)",
    slides_title: "ארכיטקטורת תוכן רב-ממדית",
    slides_sub: "מערכת המעברים החלקה ביותר בעולם הוקמה כדי למנוע נטישת משתתפים ולהבטיח מעורבות של 100% מהקהל.",
    cards: [
      { id: 1, icon: Zap, title: "זירת טריוויה מהירה", desc: "חישוב ניקוד מבוסס אלפיות-שנייה עם טבלת מובילים (Leaderboard) קופצנית שמרטיטה את האולם." },
      { id: 2, icon: BarChart3, title: "סקרי עומק חיים", desc: "איסוף נתונים אנונימי והצגתם בדיאגרמות 3D דינמיות בלייב להחלטות הנהלה מיידיות." },
      { id: 3, icon: FileText, title: "שקופיות תוכן חכמות", desc: "הצגת חומר עיוני המלווה בהקראה קולית אוטומטית (TTS) למשתמשי הקו הכשר." },
      { id: 4, icon: ImageIcon, title: "מולטימדיה בארבעהK", desc: "הזרמת וידאו חלקה, תמונות תקריב ופסקולים אקוסטיים היישר למסכי הענק." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "הזן כל נושא שעולה על דעתך. רשת ה-AI שלנו מייצרת מערכי שאלות קליניים הכוללים מסיחים פסיכולוגיים מדויקים והסברים עמוקים בשניות.",
    ai_placeholder: "הקלד הנחיה (למשל: 'היסטוריה של האימפריה הרומית והכלכלה שלה')...",
    ai_btn: "הפעל סינתזת שאלות",
    kosher_title: "Web-to-Voice IVR Architecture",
    kosher_sub: "תשתית חיוג קולי המותאמת למגזר החרדי ולציבור ללא אינטרנט. כל אחד יכול להשתתף מכל טלפון בעולם.",
    steps: [
      { icon: Phone, title: "חיוג מקוצר למערכת", desc: "חיוג חינם למספר השרת והקשת קוד ה-PIN המופיע על גבי המסך המרכזי באולם." },
      { icon: Radio, title: "האזנה ותגובה מיידית", desc: "שמע השאלות בקול רם והקשת מקש 1 עד 4 במקלדת הטלפון לקליטת הנתונים בשרת." },
      { icon: Award, title: "קבלת Token אישי", desc: "קבלת קוד אישי בסיום המשחק למשיכת תעודת הצטיינות חתומה באופן דיגיטלי." }
    ],
    footer: "כל הזכויות שמורות למערכת MegaClick Enterprise Edition ©"
  },
  en: {
    dir: "ltr",
    nav_slides: "Dimensions",
    nav_ai: "AI Engine",
    nav_kosher: "Kosher Phone",
    nav_features: "Features",
    btn_cert: "Certificates",
    btn_join: "Join Game",
    btn_create: "Create Quiz",
    hero_badge: "Next-Gen Global Audience Sync",
    hero_title_1: "Command The Crowd.",
    hero_title_2: "Without Compromise.",
    hero_sub: "MegaClick bridges fast smartphone users with Kosher phone dial-in users, rendering a unified 3D master screen in real-time with zero latency.",
    sim_title: "Live Simulator - Presenter Screen vs Keypad",
    sim_presenter: "Master Screen (Live)",
    sim_keypad: "DTMF Phone Keypad",
    slides_title: "Multi-Dimensional Content Architecture",
    slides_sub: "The smoothest transition engine built to eliminate audience drop-off and guarantee 100% engagement.",
    cards: [
      { id: 1, icon: Zap, title: "Speed Trivia Arena", desc: "Millisecond-based scoring with a bounding Leaderboard that electrifies the hall." },
      { id: 2, icon: BarChart3, title: "Deep Live Polls", desc: "Anonymous data collection rendered as dynamic 3D charts for instant executive decisions." },
      { id: 3, icon: FileText, title: "Smart Content Slides", desc: "Deliver theoretical material accompanied by automated Text-to-Speech (TTS) for dial-in users." },
      { id: 4, icon: ImageIcon, title: "4K Multimedia", desc: "Seamlessly stream high-def video, macro images, and acoustic sound directly to main displays." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "Input any topic. Our AI network generates clinical quiz sets complete with precise psychological distractors and deep explanations in seconds.",
    ai_placeholder: "Enter prompt (e.g., 'History of the Roman Empire and its economy')...",
    ai_btn: "Initialize Synthesis",
    kosher_title: "Web-to-Voice IVR Architecture",
    kosher_sub: "Voice routing infrastructure built for maximum accessibility. Anyone can participate from any telephone worldwide.",
    steps: [
      { icon: Phone, title: "Fast Dial-In", desc: "Call the server number and enter the PIN code displayed on the main hall screen." },
      { icon: Radio, title: "Instant Audio & Response", desc: "Listen to questions aloud and press keys 1 through 4 on your phone keypad to submit data." },
      { icon: Award, title: "Personal Token Issuance", desc: "Receive a personal verification code at the end to download your digitally signed certificate." }
    ],
    footer: "All rights reserved to MegaClick Enterprise Edition ©"
  },
  es: {
    dir: "ltr",
    nav_slides: "Dimensiones",
    nav_ai: "Motor IA",
    nav_kosher: "Teléfono Kosher",
    nav_features: "Características",
    btn_cert: "Certificados",
    btn_join: "Unirse al Juego",
    btn_create: "Crear Cuestionario",
    hero_badge: "Sincronización de Audiencia Global",
    hero_title_1: "Domina a la Multitud.",
    hero_title_2: "Sin Compromisos.",
    hero_sub: "MegaClick une a smartphones y usuarios telefónicos en una pantalla 3D unificada en tiempo real sin latencia.",
    sim_title: "Simulador en Vivo - Pantalla vs Teclado",
    sim_presenter: "Pantalla Principal",
    sim_keypad: "Teclado Telefónico",
    slides_title: "Arquitectura de Contenido Avanzada",
    slides_sub: "El motor de transición más fluido para garantizar una participación del 100%.",
    cards: [
      { id: 1, icon: Zap, title: "Arena de Trivia", desc: "Puntuación basada en milisegundos con tabla de clasificación animada." },
      { id: 2, icon: BarChart3, title: "Encuestas Profundas", desc: "Recopilación de datos anónimos con gráficos 3D dinámicos en vivo." },
      { id: 3, icon: FileText, title: "Diapositivas de Contenido", desc: "Texto a voz automatizado para usuarios telefónicos." },
      { id: 4, icon: ImageIcon, title: "Multimedia 4K", desc: "Transmisión fluida de video y audio de alta calidad." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "Genera cuestionarios clínicos con distractores psicológicos en segundos.",
    ai_placeholder: "Ingresa el tema...",
    ai_btn: "Sintetizar",
    kosher_title: "Arquitectura IVR Web-to-Voice",
    kosher_sub: "Infraestructura de llamadas para máxima accesibilidad global.",
    steps: [
      { icon: Phone, title: "Llamada Rápida", desc: "Marca el número del servidor e ingresa el PIN." },
      { icon: Radio, title: "Respuesta de Audio", desc: "Presiona las teclas 1-4 en tu teléfono." },
      { icon: Award, title: "Token Personal", desc: "Obtén un código para descargar tu certificado." }
    ],
    footer: "Todos los derechos reservados MegaClick Enterprise ©"
  },
  fr: {
    dir: "ltr",
    nav_slides: "Dimensions",
    nav_ai: "Moteur IA",
    nav_kosher: "Téléphone Kasher",
    nav_features: "Fonctionnalités",
    btn_cert: "Certificats",
    btn_join: "Rejoindre",
    btn_create: "Créer un Quiz",
    hero_badge: "Synchronisation Mondiale de l'Audience",
    hero_title_1: "Maîtrisez la Foule.",
    hero_title_2: "Sans Compromis.",
    hero_sub: "MegaClick unit smartphones et appels vocaux sur un écran 3D unifié en temps réel sans latence.",
    sim_title: "Simulateur en Direct - Écran vs Clavier",
    sim_presenter: "Écran Principal",
    sim_keypad: "Clavier Téléphonique",
    slides_title: "Architecture de Contenu Avancée",
    slides_sub: "Le moteur de transition le plus fluide pour garantir 100% d'engagement.",
    cards: [
      { id: 1, icon: Zap, title: "Arène Trivia", desc: "Scores basés sur les millisecondes avec classement animé." },
      { id: 2, icon: BarChart3, title: "Sondages en Direct", desc: "Collecte de données anonymes avec graphiques 3D." },
      { id: 3, icon: FileText, title: "Diapositives Intelligentes", desc: "Synthèse vocale automatique pour les utilisateurs téléphoniques." },
      { id: 4, icon: ImageIcon, title: "Multimédia 4K", desc: "Diffusion fluide de vidéos et de sons haute fidélité." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "Générez des questionnaires cliniques avec des distracteurs psychologiques en quelques secondes.",
    ai_placeholder: "Entrez un sujet...",
    ai_btn: "Lancer la Synthèse",
    kosher_title: "Architecture IVR Web-to-Voice",
    kosher_sub: "Infrastructure d'appels vocaux pour une accessibilité maximale.",
    steps: [
      { icon: Phone, title: "Appel Rapide", desc: "Appelez le numéro et entrez le code PIN." },
      { icon: Radio, title: "Réponse Audio", desc: "Appuyez sur les touches 1 à 4 de votre téléphone." },
      { icon: Award, title: "Jeton Personnel", desc: "Obtenez un code pour télécharger votre certificat." }
    ],
    footer: "Tous droits réservés MegaClick Enterprise ©"
  },
  ru: {
    dir: "ltr",
    nav_slides: "Разделы",
    nav_ai: "ИИ Движок",
    nav_kosher: "Телефонная связь",
    nav_features: "Возможности",
    btn_cert: "Сертификаты",
    btn_join: "Войти в игру",
    btn_create: "Создать опрос",
    hero_badge: "Новое поколение синхронизации аудитории",
    hero_title_1: "Управляйте залом.",
    hero_title_2: "Без компромиссов.",
    hero_sub: "MegaClick объединяет пользователей смартфонов и голосовых вызовов на едином 3D-экране в реальном времени.",
    sim_title: "Живой симулятор - Экран ведущего и клавиатура",
    sim_presenter: "Главный экран (Лайв)",
    sim_keypad: "Телефонная клавиатура (DTMF)",
    slides_title: "Продвинутая архитектура контента",
    slides_sub: "Самый плавный механизм переходов для обеспечения 100% вовлеченности аудитории.",
    cards: [
      { id: 1, icon: Zap, title: "Арена викторин", desc: "Динамический подсчет очков на основе миллисекунд с таблицей лидеров." },
      { id: 2, icon: BarChart3, title: "Глубокие опросы", desc: "Сбор данных в реальном времени с 3D-диаграммами." },
      { id: 3, icon: FileText, title: "Слайды контента", desc: "Автоматический синтез речи для пользователей телефонной связи." },
      { id: 4, icon: ImageIcon, title: "Мультимедиа 4K", desc: "Потоковая передача видео и аудио студийного качества." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "Введите любую тему. Наш ИИ создаст набор вопросов с психологическими отвлекающими факторами за секунды.",
    ai_placeholder: "Введите тему (например, 'История Древнего Рима')...",
    ai_btn: "Запустить синтез",
    kosher_title: "Web-to-Voice IVR Архитектура",
    kosher_sub: "Система голосовой маршрутизации для максимальной доступности с любого телефона.",
    steps: [
      { icon: Phone, title: "Быстрый набор", desc: "Позвоните на номер сервера и введите PIN-код с экрана." },
      { icon: Radio, title: "Голосовой ответ", desc: "Нажимайте клавиши от 1 до 4 на клавиатуре телефона." },
      { icon: Award, title: "Персональный токен", desc: "Получите код в конце для скачивания сертификата." }
    ],
    footer: "Все права защищены MegaClick Enterprise Edition ©"
  },
  ar: {
    dir: "rtl",
    nav_slides: "أبعاد المحتوى",
    nav_ai: "محرك الذكاء الاصطناعي",
    nav_kosher: "اتصال الهاتف الكوشر",
    nav_features: "المميزات",
    btn_cert: "بوابة الشهادات",
    btn_join: "انضم إلى اللعبة",
    btn_create: "إنشاء مسابقة جديدة",
    hero_badge: "الجيل القادم من مزامنة الجمهور الفورية",
    hero_title_1: "تحكم في الجمهور.",
    hero_title_2: "بدون أي تنازلات.",
    hero_sub: "تدمج MegaClick بين مستخدمي الهواتف الذكية ومستخدمي الهاتف عبر المكالمات الصوتية على شاشة رئيسية ثلاثية الأبعاد متزامنة في الوقت الفعلي.",
    sim_title: "محاكي مباشر - شاشة المضيف مقابل أزرار الهاتف",
    sim_presenter: "الشاشة الرئيسية (بث مباشر)",
    sim_keypad: "لوحة مفاتيح الاتصال (DTMF)",
    slides_title: "هندسة محتوى متقدمة متعددة الأبعاد",
    slides_sub: "أكثر محرك انتقال سلاسة في العالم مصمم لضمان تفاعل الجمهور بنسبة 100%.",
    cards: [
      { id: 1, icon: Zap, title: "ساحة الترفيه السريع", desc: "حساب النقاط بناءً على أجزاء من الثانية مع لوحة صدارة متحركة." },
      { id: 2, icon: BarChart3, title: "استطلاعات الرأي العميقة", desc: "جمع البيانات الفورية وعرضها في مخططات ثلاثية الأبعاد حية." },
      { id: 3, icon: FileText, title: "شرائح محتوى ذكية", desc: "عرض المواد النظرية مع تحويل النص إلى كلام تلقائي (TTS) للمتصلين." },
      { id: 4, icon: ImageIcon, title: "وسائط متعددة بدقة 4K", desc: "بث مقاطع الفيديو والصور عالية الدقة مباشرة إلى الشاشات الكبرى." }
    ],
    ai_title: "Neural Engine AI 5.0",
    ai_sub: "أدخل أي موضوع. يقوم نظام الذكاء الاصطناعي لدينا بإنشاء مجموعات أسئلة سريرية كاملة مع مشتتات نفسية دقيقة في ثوانٍ.",
    ai_placeholder: "أدخل الموضوع (مثلاً: 'تاريخ الإمبراطورية الرومانية')...",
    ai_btn: "تفعيل توليد الأسئلة",
    kosher_title: "هندسة الرد الآلي Web-to-Voice",
    kosher_sub: "بنية توجيه المكالمات الأسرع لضمان إمكانية المشاركة لأي شخص من أي هاتف في العالم.",
    steps: [
      { icon: Phone, title: "الاتصال السريع بالنظام", desc: "اتصل برقم الخادم وأدخل رمز PIN الظاهر على الشاشة الرئيسية." },
      { icon: Radio, title: "الاستماع والتفاعل المباشر", desc: "استمع للأسئلة واضغط على الأرقام من 1 إلى 4 عبر لوحة المفاتيح." },
      { icon: Award, title: "إصدار رمز شخصي", desc: "احصل على رمز سري في نهاية اللعبة لتحميل شهادة المشاركة الرقمية." }
    ],
    footer: "جميع الحقوق محفوظة لنظام MegaClick Enterprise Edition ©"
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function MegaClickMasterPro() {
  const [lang, setLang] = useState<"he" | "en" | "es" | "fr" | "ru" | "ar">("he");
  const t = dict[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  // Simulator Interactive States
  const [simTimer, setSimTimer] = useState(15);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const [simState, setSimState] = useState<"waiting" | "correct" | "wrong">("waiting");

  // Timer loop for simulator
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
    // Correct option in simulation is #2
    if (keyNum === 2) {
      setSimState("correct");
    } else {
      setSimState("wrong");
    }
  };

  const resetSimulation = () => {
    setSimTimer(15);
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
    }, 1800);
  };

  return (
    <div className={`relative min-h-screen bg-[#03030a] text-slate-100 font-sans selection:bg-pink-500/30 overflow-x-hidden ${t.dir === "rtl" ? "text-right" : "text-left"}`} dir={t.dir}>
      
      {/* Background Cyber Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[160px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      {/* --- Top Navbar --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#03030a]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.4)] group-hover:scale-105 transition-transform">
              <Zap className="text-white w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                MegaClick<span className="text-pink-500">.</span>
              </span>
              <span className="block text-[8px] tracking-[0.3em] font-mono uppercase text-pink-400 font-bold -mt-1">Enterprise Suite</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#slides" className="hover:text-pink-400 transition-colors">{t.nav_slides}</a>
            <a href="#ai" className="hover:text-cyan-400 transition-colors">{t.nav_ai}</a>
            <a href="#kosher" className="hover:text-purple-400 transition-colors">{t.nav_kosher}</a>
          </nav>

          {/* Controls: 6 Languages + Join + Create */}
          <div className="flex items-center gap-3">
            
            {/* 6 Languages Selector */}
            <div className="relative">
              <Globe className="absolute top-1/2 -translate-y-1/2 left-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as any)}
                className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-pink-500 cursor-pointer hover:bg-white/10 transition"
                style={{ direction: 'ltr' }}
              >
                <option value="he" className="bg-[#03030a]">🇮🇱 עברית</option>
                <option value="en" className="bg-[#03030a]">🇺🇸 English</option>
                <option value="es" className="bg-[#03030a]">🇪🇸 Español</option>
                <option value="fr" className="bg-[#03030a]">🇫🇷 Français</option>
                <option value="ru" className="bg-[#03030a]">🇷🇺 Русский</option>
                <option value="ar" className="bg-[#03030a]">🇸🇦 العربية</option>
              </select>
            </div>

            {/* Certificate Button */}
            <button className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-yellow-500/20 text-yellow-400 text-xs font-bold hover:bg-yellow-500/10 transition">
              <Award className="w-4 h-4" />
              {t.btn_cert}
            </button>

            {/* Join Game Button */}
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              {t.btn_join}
            </button>

            {/* Create Game Button */}
            <button className="hidden sm:flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              {t.btn_create}
            </button>
          </div>

        </div>
      </header>

      {/* --- Hero Section & Dual Live Simulator --- */}
      <section className="relative pt-40 pb-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:w-1/2 flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              {t.hero_badge}
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              {t.hero_title_1} <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
                {t.hero_title_2}
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              {t.hero_sub}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button className="bg-white text-black font-black px-8 py-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-xl">
                <Play className="w-5 h-5 fill-current text-pink-600" />
                {t.btn_join}
              </button>
              <button className="bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Phone className="w-5 h-5 text-green-400" />
                {t.nav_kosher}
              </button>
            </div>
          </motion.div>

          {/* Right Dual Simulator: Presenter Screen + Phone Keypad */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="lg:w-1/2 w-full max-w-lg mx-auto">
            <div className="bg-[#09091b]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)]">
              
              {/* Simulator Main Header */}
              <div className="bg-white/5 p-4 px-6 flex justify-between items-center border-b border-white/5">
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-purple-400" />
                  {t.sim_title}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              </div>

              {/* 1. Presenter Screen Preview (Top Mini Screen) */}
              <div className="p-6 bg-gradient-to-b from-purple-900/20 to-transparent border-b border-white/5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 uppercase tracking-wider">
                    🖥️ {t.sim_presenter}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-sm font-bold">
                    <span className="text-pink-400">⏱️ {simTimer}s</span>
                  </div>
                </div>

                <div className="text-base font-bold text-white mb-4">
                  {lang === "he" ? "מהו קצב העברת הנתונים במנוע מגה קליק?" : lang === "ar" ? "ما هي سرعة نقل البيانات في نظام MegaClick؟" : "What is MegaClick's data transmission rate?"}
                </div>

                {/* Live Answer Distribution Bars */}
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400"><span>1. 3s</span><span>12%</span></div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-slate-500 h-full w-[12%]"></div>
                  </div>
                  
                  <div className="flex justify-between text-slate-300 font-bold"><span>2. <span className="text-green-400">&lt;50ms (Real-Time)</span></span><span>78%</span></div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-cyan-400 h-full w-[78%] animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* 2. Phone Keypad Simulator (Bottom Interactive Section) */}
              <div className="p-6 bg-[#04040e]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-green-400 bg-green-500/10 px-2.5 py-1 rounded-md border border-green-500/20 uppercase tracking-wider">
                    📞 {t.sim_keypad}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lang === "he" ? "לחץ על המקשים:" : "Tap Keypad:"}
                  </span>
                </div>

                {simState === "waiting" ? (
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button 
                        key={num}
                        onClick={() => handleKeyPress(num)}
                        className="bg-white/5 hover:bg-purple-600/30 border border-white/10 hover:border-purple-500 py-3 rounded-xl font-mono text-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center shadow-lg"
                      >
                        <span>{num}</span>
                        <span className="text-[8px] text-slate-400">DTMF</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className={`p-4 rounded-2xl text-center flex flex-col items-center justify-center space-y-2 animate-in zoom-in duration-300 ${simState === 'correct' ? 'bg-green-500/20 border border-green-500/40 text-green-300' : 'bg-red-500/20 border border-red-500/40 text-red-300'}`}>
                    <h3 className="font-bold text-sm">
                      {simState === 'correct' 
                        ? (lang === 'he' ? "🎉 תשובה נכונה נקלטה בשרת!" : lang === 'ar' ? "🎉 تم تسجيل الإجابة الصحيحة بنجاح!" : "🎉 Correct answer recorded!") 
                        : (lang === 'he' ? "❌ תשובה שגויה או שהזמן נגמר." : lang === 'ar' ? "❌ إجابة خاطئة أو انتهى الوقت." : "❌ Incorrect or time's up.")}
                    </h3>
                    <button onClick={resetSimulation} className="text-xs underline text-slate-300 hover:text-white mt-1">
                      {lang === 'he' ? "נסה שוב" : lang === 'ar' ? "حاول مرة أخرى" : "Try Again"}
                    </button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* --- 4 Dimensions Section --- */}
      <section id="slides" className="py-32 bg-[#050514] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">{t.slides_title}</h2>
            <p className="text-slate-400 text-lg">{t.slides_sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.cards.map((card) => (
              <div key={card.id} className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] hover:border-pink-500/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <card.icon className="w-7 h-7 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AI Engine Section --- */}
      <section id="ai" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#0c0c24] to-[#060612] border border-purple-500/20 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-[0_0_60px_rgba(168,85,247,0.15)]">
            
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-6">
                <Sparkles className="w-4 h-4" />
                GPT-4 & Neural Core
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{t.ai_title}</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">{t.ai_sub}</p>
            </div>

            <div className="md:w-1/2 w-full">
              <div className="bg-[#03030a] border border-white/10 rounded-2xl p-6">
                <div className="flex gap-3 mb-6">
                  <input 
                    type="text" 
                    placeholder={t.ai_placeholder}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  <button 
                    onClick={triggerAI}
                    disabled={aiStatus === "processing" || !aiPrompt}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition disabled:opacity-50 flex items-center justify-center min-w-[130px]"
                  >
                    {aiStatus === "processing" ? <Cpu className="w-5 h-5 animate-spin" /> : t.ai_btn}
                  </button>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-xl min-h-[160px] p-4 flex flex-col justify-center font-mono text-xs">
                  {aiStatus === "idle" && (
                    <p className="text-center text-slate-600">{lang === "he" ? "המערכת מוכנה להזנה..." : "System ready for prompt..."}</p>
                  )}
                  {aiStatus === "processing" && (
                    <div className="text-center space-y-2 text-purple-400">
                      <div className="flex justify-center gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                      <span>{lang === "he" ? "מייצר שאלות ומסיחים פסיכולוגיים..." : "Generating quiz matrix..."}</span>
                    </div>
                  )}
                  {aiStatus === "ready" && (
                    <div className="space-y-3 animate-in fade-in duration-500">
                      <p className="text-cyan-300 font-bold">{lang === "he" ? "שאלת פרימיום שנוצרה:" : "Generated Question:"}</p>
                      <p className="text-white font-semibold">"{aiPrompt}"</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-white/5 border border-white/5">1. מסיח סטטיסטי</div>
                        <div className="p-2 rounded bg-green-500/10 border border-green-500/30 text-green-400 font-bold">2. תשובה נכונה (AI) ✓</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Kosher Phone Architecture Section --- */}
      <section id="kosher" className="py-32 bg-[#050514] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">{t.kosher_title}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-20">{t.kosher_sub}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative group">
                  <div className="absolute inset-0 rounded-3xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <step.icon className="w-8 h-8 text-white relative z-10" />
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-pink-500 text-white font-black text-xs flex items-center justify-center border-2 border-[#050514]">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm max-w-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-white/10 bg-[#03030a] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="font-bold uppercase tracking-wider text-white">MegaClick Enterprise Infrastructure</span>
          </div>
          <p>{t.footer}</p>
        </div>
      </footer>

    </div>
  );
}