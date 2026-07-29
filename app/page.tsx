'use client';

import React, { useState, useEffect } from 'react';
import {
  Zap,
  Globe,
  Phone,
  Award,
  Play,
  CheckCircle2,
  ChevronDown,
  BarChart3,
  FileText,
  Image as ImageIcon,
  Sparkles,
  BrainCircuit,
  Users,
  LogIn,
} from 'lucide-react';

// --- 1. מנוע שפות (i18n Dictionary) ---
const dict = {
  he: {
    dir: 'rtl',
    nav_slides: 'סוגי שקופיות',
    nav_ai: 'מחולל AI',
    nav_kosher: 'טלפון כשר',
    nav_smart: 'מחשב וחכם',
    nav_faq: 'שאלות ותשובות',
    btn_cert: 'אזור תעודות',
    btn_join: 'הצטרף למשחק',
    btn_create: 'צור חידון',
    hero_badge: 'הדור הבא של החידונים • מסונכרן בזמן אמת',
    hero_title: 'להפעיל את כולם.',
    hero_title_highlight: 'ללא גבולות.',
    hero_sub:
      'מגה קליק מגשרת על הפער הטכנולוגי: משתתפי אינטרנט מתחברים מהסמארטפון, ומשתתפי טלפון כשר מתחברים בחיוג קולי. הכל מסונכרן למסך אחד מרשים בזמן אמת.',
    sim_title: 'סימולטור מנוע חי (התנסות)',
    sim_web_mode: 'תצוגת אינטרנט',
    sim_phone_mode: 'תצוגת טלפון כשר (DTMF)',
    slides_title: 'ארבעה ממדים של אינטראקציה',
    slides_sub:
      'מעבר חלק בין סוגי תוכן שונים משאיר את הקהל מרותק לאורך כל האירוע.',
    slide1_title: 'זירת טריוויה',
    slide1_desc:
      'תחרות נושאת פרסים עם מדידת זמנים. ניקוד דינמי לפי מהירות התגובה וטבלת מובילים מתעדכנת.',
    slide2_title: 'סקרי עומק',
    slide2_desc:
      'קבלת החלטות משותפת ואיסוף נתונים ללא ניקוד. התוצאות מעוצבות כדיאגרמות תלת-ממדיות בלייב.',
    slide3_title: 'שקופיות תוכן',
    slide3_desc:
      'העברת מסרים, כללי משחק או טקסטים עיוניים. משתתפי הטלפון שומעים את התוכן בהקראה אוטומטית.',
    slide4_title: 'מולטימדיה',
    slide4_desc:
      'שילוב תמונות, קטעי וידאו ופסקולים להעצמת החוויה החושית של המשתתפים.',
    ai_title: 'המוח שמאחורי המשחק: AI מחולל שאלות',
    ai_sub:
      'אין לך זמן? הזן נושא, והמנוע שלנו ייצר עבורך חידון מלא הכולל שאלות מתוחכמות, מסיחים חכמים והסברים – בשניות.',
    ai_input_placeholder: "הקלד נושא (למשל: 'היסטוריה של מחשבים')",
    ai_btn: 'חולל חידון',
    kosher_title: 'חיבור קולי מושלם: טלפון כשר',
    kosher_sub:
      'אף אחד לא נשאר בחוץ. טכנולוגיית Web-to-Voice הייחודית שלנו מתרגמת את המשחק לשיחת טלפון אינטראקטיבית.',
    kosher_step1: '1. חיוג למערכת',
    kosher_step1_desc:
      'חיוג למספר הפרימיום שלנו והקשת קוד המשחק המוצג על המסך.',
    kosher_step2: '2. מענה מקשים',
    kosher_step2_desc:
      'האזנה לשאלות והקשת התשובה הנכונה (1-4) ישירות דרך מקלדת הטלפון.',
    kosher_step3: '3. קוד אישי',
    kosher_step3_desc:
      'קבלת קוד קולי בסיום המשחק להורדת תעודת השתתפות מעוצבת באתר.',
    footer_rights: 'כל הזכויות שמורות למגה קליק ©',
  },
  en: {
    dir: 'ltr',
    nav_slides: 'Slide Types',
    nav_ai: 'AI Generator',
    nav_kosher: 'Kosher Phone',
    nav_smart: 'Smart Devices',
    nav_faq: 'FAQ',
    btn_cert: 'Certificates',
    btn_join: 'Join Game',
    btn_create: 'Create Quiz',
    hero_badge: 'Next-Gen Polling • Real-Time Sync',
    hero_title: 'Engage Everyone.',
    hero_title_highlight: 'Without Limits.',
    hero_sub:
      'MegaClick bridges the gap: Web users connect via smartphone, while Kosher phone users connect via voice call. Everything syncs to one stunning live display.',
    sim_title: 'Live Engine Simulator',
    sim_web_mode: 'Web View',
    sim_phone_mode: 'Kosher Phone (DTMF) View',
    slides_title: 'Four Dimensions of Interaction',
    slides_sub:
      'Seamlessly transition between content types to keep your audience engaged.',
    slide1_title: 'Trivia Arena',
    slide1_desc:
      'Timed competitions with dynamic scoring based on response speed and live leaderboards.',
    slide2_title: 'Deep Polls',
    slide2_desc:
      'Gather opinions and data without scoring. Results are rendered as stunning live charts.',
    slide3_title: 'Content Slides',
    slide3_desc:
      'Share rules or reading materials. Phone participants receive automated voice dictation.',
    slide4_title: 'Multimedia',
    slide4_desc:
      'Integrate high-res images, video, and audio tracks to elevate the sensory experience.',
    ai_title: 'The Brain: AI Question Generator',
    ai_sub:
      'No time? Enter a topic, and our engine generates a complete quiz with smart distractors and explanations in seconds.',
    ai_input_placeholder: "Enter topic (e.g., 'History of Computers')",
    ai_btn: 'Generate Quiz',
    kosher_title: 'Flawless Voice Integration',
    kosher_sub:
      'No one is left behind. Our unique Web-to-Voice tech translates the game into an interactive phone call.',
    kosher_step1: '1. Dial In',
    kosher_step1_desc:
      'Call our premium number and enter the game pin shown on the screen.',
    kosher_step2: '2. Keypad Response',
    kosher_step2_desc:
      'Listen to questions and press the correct answer (1-4) on your phone keypad.',
    kosher_step3: '3. Personal Code',
    kosher_step3_desc:
      'Receive a voice code at the end to download your custom certificate online.',
    footer_rights: 'All rights reserved to MegaClick ©',
  },
};

export default function MegaClickLanding() {
  // --- States ---
  const [lang, setLang] = useState<'he' | 'en'>('he');
  const t = dict[lang];

  // Simulator State
  const [simMode, setSimMode] = useState<'web' | 'phone'>('web');
  const [simTimer, setSimTimer] = useState(15);
  const [simFeedback, setSimFeedback] = useState<{
    show: boolean;
    correct: boolean;
    text: string;
  }>({ show: false, correct: false, text: '' });

  // AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<null | any>(null);

  // --- Effects ---
  useEffect(() => {
    // Simulator Timer Logic
    if (simTimer > 0 && !simFeedback.show) {
      const timerId = setTimeout(() => setSimTimer(simTimer - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (simTimer === 0 && !simFeedback.show) {
      setSimFeedback({
        show: true,
        correct: false,
        text: lang === 'he' ? 'הזמן נגמר!' : "Time's up!",
      });
    }
  }, [simTimer, simFeedback.show, lang]);

  // --- Handlers ---
  const handleSimAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setSimFeedback({
        show: true,
        correct: true,
        text:
          lang === 'he' ? 'תשובה נכונה! +954 נקודות' : 'Correct! +954 points',
      });
    } else {
      setSimFeedback({
        show: true,
        correct: false,
        text: lang === 'he' ? 'תשובה שגויה.' : 'Incorrect.',
      });
    }
  };

  const resetSim = () => {
    setSimTimer(15);
    setSimFeedback({ show: false, correct: false, text: '' });
  };

  const handleAIGenerate = () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiResult(null);

    // Fake API Call Delay
    setTimeout(() => {
      setIsAiLoading(false);
      setAiResult({
        q:
          lang === 'he'
            ? `שאלה בנושא: ${aiPrompt}`
            : `Question regarding: ${aiPrompt}`,
        options: [
          lang === 'he' ? "אפשרות הגיונית א'" : 'Logical Option A',
          lang === 'he'
            ? 'תשובה נכונה שנוצרה ע"י AI'
            : 'AI Generated Correct Answer',
          lang === 'he'
            ? 'מסיח מתוחכם במיוחד'
            : 'Highly Sophisticated Distractor',
          lang === 'he' ? 'אפשרות שגויה לחלוטין' : 'Completely Wrong Option',
        ],
      });
    }, 1800);
  };

  return (
    <div
      className={`min-h-screen bg-[#050511] text-slate-100 font-sans selection:bg-pink-500/30 ${
        t.dir === 'rtl' ? 'text-right' : 'text-left'
      }`}
      dir={t.dir}
    >
      {/* 1. Header Navigation (Glassmorphism) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <Zap className="text-white w-6 h-6 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                MegaClick
              </span>
              <span className="text-[10px] text-slate-400 tracking-[0.2em] uppercase -mt-1 font-bold">
                Pro Edition
              </span>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#slides" className="hover:text-white transition-colors">
              {t.nav_slides}
            </a>
            <a href="#ai" className="hover:text-white transition-colors">
              {t.nav_ai}
            </a>
            <a href="#kosher" className="hover:text-white transition-colors">
              {t.nav_kosher}
            </a>
          </nav>

          {/* Action Buttons & Language */}
          <div className="flex items-center gap-3 shrink-0">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as 'he' | 'en')}
              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-pink-500 cursor-pointer hover:bg-white/10 transition"
            >
              <option value="he" className="bg-[#0a0a1a]">
                🇮🇱 עברית
              </option>
              <option value="en" className="bg-[#0a0a1a]">
                🇺🇸 English
              </option>
            </select>

            {/* Note: The Certificate page will be a separate route in the real app, here it just acts as a link */}
            <button className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-yellow-500/20 text-yellow-500 text-xs font-bold hover:bg-yellow-500/10 transition">
              <Award className="w-4 h-4" />
              {t.btn_cert}
            </button>

            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm px-6 py-2 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              {t.btn_create}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section & Live Simulator */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Text Content */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {t.hero_badge}
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6">
              {t.hero_title} <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
                {t.hero_title_highlight}
              </span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              {t.hero_sub}
            </p>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none bg-white text-[#050511] font-black px-8 py-4 rounded-2xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-current" />
                {t.btn_join}
              </button>
              <button className="flex-1 sm:flex-none bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-5 h-5 text-green-400" />
                {t.nav_kosher}
              </button>
            </div>
          </div>

          {/* Live Engine Simulator Component */}
          <div className="lg:w-1/2 w-full max-w-md mx-auto">
            <div className="bg-[#0a0a1a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] relative group">
              {/* Sim Header */}
              <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-purple-400" />
                  {t.sim_title}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setSimMode('web')}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-colors flex items-center gap-1 ${
                      simMode === 'web'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Globe className="w-3 h-3" /> {t.sim_web_mode}
                  </button>
                  <button
                    onClick={() => setSimMode('phone')}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-colors flex items-center gap-1 ${
                      simMode === 'phone'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Phone className="w-3 h-3" /> {t.sim_phone_mode}
                  </button>
                </div>
              </div>

              {/* Sim Body */}
              <div className="p-6 relative min-h-[320px] flex flex-col justify-center">
                {!simFeedback.show ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-bold text-pink-400 bg-pink-400/10 px-2 py-1 rounded-md">
                        Q. 1/10
                      </span>
                      <div className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center text-sm font-mono font-bold text-white relative">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle
                            cx="18"
                            cy="18"
                            r="18"
                            fill="none"
                            stroke="#ec4899"
                            strokeWidth="2"
                            strokeDasharray="113"
                            strokeDashoffset={113 - (113 * simTimer) / 15}
                            className="transition-all duration-1000 ease-linear"
                          />
                        </svg>
                        {simTimer}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-6 text-white leading-tight">
                      {lang === 'he'
                        ? 'מהי המהירות הממוצעת בה פועל מנוע הסנכרון של מערכת מגה קליק?'
                        : 'What is the average speed of the MegaClick sync engine?'}
                    </h3>

                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleSimAnswer(num === 2)}
                          className={`w-full text-start p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all flex justify-between items-center group`}
                        >
                          <span className="font-semibold text-slate-200">
                            {lang === 'he'
                              ? num === 1
                                ? '1. כ-3 שניות'
                                : num === 2
                                ? '2. פחות מ-50 מילישניות (זמן אמת)'
                                : num === 3
                                ? '3. חצי דקה'
                                : '4. דקה שלמה'
                              : num === 1
                              ? '1. About 3 seconds'
                              : num === 2
                              ? '2. Under 50ms (Real-Time)'
                              : num === 3
                              ? '3. Half a minute'
                              : '4. One full minute'}
                          </span>
                          {/* Phone Hint (Only in Phone Mode) */}
                          <div
                            className={`transition-opacity duration-300 ${
                              simMode === 'phone' ? 'opacity-100' : 'opacity-0'
                            } bg-slate-900 text-slate-400 text-[10px] px-2 py-1 rounded border border-slate-700`}
                          >
                            {lang === 'he' ? `הקש ${num}` : `Press ${num}`} 📞
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Feedback View */
                  <div className="text-center flex flex-col items-center justify-center space-y-4 animate-in zoom-in duration-300">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center ${
                        simFeedback.correct
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {simFeedback.correct ? (
                        <CheckCircle2 className="w-10 h-10" />
                      ) : (
                        <ChevronDown className="w-10 h-10" />
                      )}
                    </div>
                    <h2 className="text-2xl font-bold">{simFeedback.text}</h2>
                    <button
                      onClick={resetSim}
                      className="text-sm text-slate-400 hover:text-white underline underline-offset-4 mt-4"
                    >
                      {lang === 'he' ? 'נסה שוב לחוויה מחודשת' : 'Try again'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 Slide Types Section */}
      <section
        id="slides"
        className="py-24 bg-[#0a0a1a] relative border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
              {t.slides_title}
            </h2>
            <p className="text-slate-400 text-lg">{t.slides_sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Slide 1 */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-pink-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.slide1_title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.slide1_desc}
              </p>
            </div>

            {/* Slide 2 */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.slide2_title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.slide2_desc}
              </p>
            </div>

            {/* Slide 3 */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.slide3_title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.slide3_desc}
              </p>
            </div>

            {/* Slide 4 */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-yellow-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-7 h-7 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.slide4_title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.slide4_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI Generator Section */}
      <section id="ai" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#0f0f2a] to-[#0a0a1a] border border-purple-500/20 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-[0_0_50px_rgba(168,85,247,0.1)] relative z-10">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-6">
                <Sparkles className="w-3 h-3" />
                MegaClick AI Engine
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
                {t.ai_title}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {t.ai_sub}
              </p>
            </div>

            {/* Interactive AI Demo */}
            <div className="md:w-1/2 w-full">
              <div className="bg-[#050511]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    placeholder={t.ai_input_placeholder}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/10 transition text-white placeholder-slate-500"
                  />
                  <button
                    onClick={handleAIGenerate}
                    disabled={isAiLoading || !aiPrompt.trim()}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition flex items-center justify-center disabled:opacity-50"
                  >
                    {isAiLoading ? (
                      <Sparkles className="w-5 h-5 animate-spin" />
                    ) : (
                      t.ai_btn
                    )}
                  </button>
                </div>

                {/* AI Output Area */}
                <div className="bg-black/30 border border-white/5 rounded-xl min-h-[160px] p-4 flex flex-col justify-center">
                  {!isAiLoading && !aiResult && (
                    <p className="text-center text-slate-600 text-sm">
                      {lang === 'he'
                        ? 'הכנס נושא ולחץ על הכפתור כדי לראות את הקסם...'
                        : 'Enter a topic and press the button to see magic...'}
                    </p>
                  )}
                  {isAiLoading && (
                    <div className="text-center space-y-3">
                      <div className="flex justify-center space-x-1 space-x-reverse">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      </div>
                      <p className="text-xs text-purple-400 font-mono uppercase tracking-widest">
                        {lang === 'he'
                          ? 'מנתח נתונים ומחבר שאלות...'
                          : 'Analyzing data...'}
                      </p>
                    </div>
                  )}
                  {aiResult && (
                    <div className="animate-in fade-in duration-500">
                      <p className="font-bold text-white mb-4 text-sm bg-purple-500/10 inline-block px-2 py-1 rounded border border-purple-500/20">
                        {aiResult.q}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold">
                        {aiResult.options.map((opt: string, i: number) => (
                          <div
                            key={i}
                            className={`p-2 rounded-lg border ${
                              i === 1
                                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                : 'bg-white/5 border-white/5 text-slate-300'
                            }`}
                          >
                            {i + 1}. {opt} {i === 1 && '✓'}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Kosher Phone IVR Section */}
      <section
        id="kosher"
        className="py-24 bg-[#0a0a1a] border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            {t.kosher_title}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16">
            {t.kosher_sub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative">
                <Phone className="w-8 h-8 text-white" />
                <div className="absolute inset-0 rounded-full border border-slate-500 animate-ping opacity-20"></div>
              </div>
              <h3 className="text-xl font-bold mb-3">{t.kosher_step1}</h3>
              <p className="text-slate-400 text-sm max-w-[250px] leading-relaxed">
                {t.kosher_step1_desc}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.kosher_step2}</h3>
              <p className="text-slate-400 text-sm max-w-[250px] leading-relaxed">
                {t.kosher_step2_desc}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.kosher_step3}</h3>
              <p className="text-slate-400 text-sm max-w-[250px] leading-relaxed">
                {t.kosher_step3_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050511] py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Zap className="w-4 h-4 text-slate-400" />
            <span className="font-bold uppercase tracking-wider">
              MegaClick Platform
            </span>
          </div>
          <p>
            {t.footer_rights} {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
