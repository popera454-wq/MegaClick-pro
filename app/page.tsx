"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Globe, Phone, Award, Play, CheckCircle2, 
  ChevronDown, BarChart3, FileText, Image as ImageIcon, 
  Sparkles, BrainCircuit, Users, LogIn, ArrowRight, ArrowLeft
} from "lucide-react";

// --- 1. מנוע שפות מלא (i18n Dictionary) ---
const dict = {
  he: {
    dir: "rtl",
    nav_slides: "ממדי תוכן",
    nav_ai: "מנוע AI",
    nav_kosher: "אינטגרציה קולית",
    btn_cert: "פורטל תעודות",
    btn_join: "התחבר למסך",
    btn_create: "פתח משחק חדש",
    hero_badge: "הדור החדש של מנועי הסנכרון הפעיל",
    hero_title_1: "לשלוט בקהל.",
    hero_title_2: "לפרוץ גבולות.",
    hero_sub: "מגה קליק היא פלטפורמת ה-Real-Time המתקדמת בעולם. סמארטפונים באולם וטלפונים כשרים בחיוג קולי – כולם מסונכרנים למסך תלת-ממדי אחד, באפס השהיה.",
    sim_title: "מנוע רינדור חי (Live State)",
    sim_web: "סמארטפון",
    sim_phone: "קו קולי (DTMF)",
    slides_title: "ארכיטקטורת תוכן מתקדמת",
    slides_sub: "אלגוריתם המעברים שלנו מבטיח מעורבות שיא של הקהל, עם תמיכה מלאה בהקראה קולית בזמן אמת.",
    cards: [
      { id: 1, icon: Zap, title: "זירת טריוויה", desc: "מנוע חישוב ניקוד דינמי מבוסס אלפיות-שנייה, כולל Leaderboard מונפש שמרטיט את הקהל." },
      { id: 2, icon: BarChart3, title: "דאטה וסקרים", desc: "רינדור נתונים תלת-ממדי בלייב. מושלם לקבלת החלטות הנהלה וסקרים אנונימיים מיידיים." },
      { id: 3, icon: FileText, title: "שקופיות תוכן", desc: "העברת מידע עיוני עם טקסט-לטקסט (TTS) עבור משתמשי הטלפון הכשר באופן אוטומטי." },
      { id: 4, icon: ImageIcon, title: "מולטימדיה עשירה", desc: "הזרמת וידאו, תמונות 4K וסאונד ברמת אולפן ישירות למסך המרכזי של האירוע." }
    ],
    ai_title: "Neural Quiz Engine",
    ai_sub: "שכח משעות של כתיבת שאלות. הזן טקסט חופשי, והרשת העצבית שלנו (AI) תבנה עבורך מערך שאלות קליני, כולל מסיחים פסיכולוגיים מורכבים.",
    ai_placeholder: "פקודה: 'בנה חידון על מלחמת העולם השנייה...'",
    ai_btn: "הפעל מנוע חישוב",
    kosher_title: "Web-to-Voice Architecture",
    kosher_sub: "מערכת ניתוב השיחות (IVR) המהירה בישראל. הקהל שלך לא צריך אינטרנט כדי להיות חלק ממשהו גדול.",
    steps: [
      { icon: Phone, title: "התחברות מאובטחת", desc: "חיוג מהיר לשרתים והזנת PIN Code המופיע על המסך המרכזי." },
      { icon: Users, title: "הזרמת נתונים חיה", desc: "האזנה לתשתית המשחק והקשת תשובות במקלדת הטלפון בפחות מ-50ms השהיה." },
      { icon: Award, title: "הנפקת תעודות", desc: "קבלת קוד אישי (Token) בסיום למשיכת תעודת השתתפות דיגיטלית חתומה." }
    ],
    footer: "כל הזכויות שמורות למערכת MegaClick ©"
  },
  en: {
    dir: "ltr",
    nav_slides: "Dimensions",
    nav_ai: "AI Engine",
    nav_kosher: "Voice Integration",
    btn_cert: "Certificates Portal",
    btn_join: "Join Screen",
    btn_create: "Initialize Game",
    hero_badge: "Next-Gen Active Sync Engine",
    hero_title_1: "Command The Audience.",
    hero_title_2: "Break Boundaries.",
    hero_sub: "MegaClick is the world's most advanced Real-Time platform. Smartphones in the hall and Kosher phones via voice call – all synced to one 3D screen, zero latency.",
    sim_title: "Live Render Engine (State)",
    sim_web: "Smartphone",
    sim_phone: "Voice Line (DTMF)",
    slides_title: "Advanced Content Architecture",
    slides_sub: "Our transition algorithm guarantees peak audience engagement, with full real-time text-to-speech support.",
    cards: [
      { id: 1, icon: Zap, title: "Trivia Arena", desc: "Millisecond-based dynamic scoring engine, featuring an animated Leaderboard that thrills the crowd." },
      { id: 2, icon: BarChart3, title: "Data & Polling", desc: "Live 3D data rendering. Perfect for management decisions and instant anonymous polls." },
      { id: 3, icon: FileText, title: "Content Slides", desc: "Deliver theoretical info with automatic Text-to-Speech (TTS) for Kosher phone users." },
      { id: 4, icon: ImageIcon, title: "Rich Multimedia", desc: "Stream video, 4K images, and studio-quality sound directly to the main event screen." }
    ],
    ai_title: "Neural Quiz Engine",
    ai_sub: "Forget hours of writing. Enter a prompt, and our neural network generates a clinical quiz structure with complex psychological distractors.",
    ai_placeholder: "Prompt: 'Generate a quiz about WW2...'",
    ai_btn: "Initialize Engine",
    kosher_title: "Web-to-Voice Architecture",
    kosher_sub: "The fastest IVR routing system available. Your audience doesn't need the internet to be part of something huge.",
    steps: [
      { icon: Phone, title: "Secure Handshake", desc: "Fast dial-in to servers and entering the PIN Code shown on the main screen." },
      { icon: Users, title: "Live Data Stream", desc: "Listening to game infrastructure and pressing answers on the keypad with <50ms latency." },
      { icon: Award, title: "Certificate Issuance", desc: "Receive a personal Token at the end to pull a digitally signed participation certificate." }
    ],
    footer: "All rights reserved to MegaClick Systems ©"
  }
};

// --- Animations Settings (Framer Motion) ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function MegaClickPro() {
  const [lang, setLang] = useState<"he" | "en">("he");
  const t = dict[lang];

  // Force direction on mount/change
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  // --- Simulator State ---
  const [simMode, setSimMode] = useState<"web" | "phone">("web");
  const [simTimer, setSimTimer] = useState(15);
  const [simFeedback, setSimFeedback] = useState<{show: boolean, correct: boolean, text: string}>({show: false, correct: false, text: ""});

  useEffect(() => {
    if (simTimer > 0 && !simFeedback.show) {
      const timerId = setTimeout(() => setSimTimer(simTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [simTimer, simFeedback.show]);

  const handleSimAnswer = (isCorrect: boolean) => {
    setSimFeedback({ 
      show: true, 
      correct: isCorrect, 
      text: isCorrect ? (lang === "he" ? "תשובה נכונה! +954 PTS" : "Correct! +954 PTS") : (lang === "he" ? "שגוי." : "Incorrect.") 
    });
  };

  // --- AI Engine State ---
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiState, setAiState] = useState<"idle" | "thinking" | "typing" | "done">("idle");
  const [aiTextObj, setAiTextObj] = useState<{q: string, a: string[]}>({q: "", a: []});
  const [typedQ, setTypedQ] = useState("");

  const runAI = () => {
    if (!aiPrompt) return;
    setAiState("thinking");
    setTypedQ("");
    
    // Fake API Latency
    setTimeout(() => {
      const generatedQ = lang === "he" 
        ? `שאלת רשת עצבית מבוססת על: "${aiPrompt}". מהו הנתון המדויק ביותר?`
        : `Neural network query based on: "${aiPrompt}". What is the most accurate data?`;
      
      setAiTextObj({
        q: generatedQ,
        a: lang === "he" 
          ? ["מסיח סטטיסטי", "התשובה הנכונה (ממוחשב)", "שגיאה לוגית", "נתון לא רלוונטי"]
          : ["Statistical Distractor", "Correct Answer (Computed)", "Logical Fallacy", "Irrelevant Data"]
      });
      setAiState("typing");
    }, 2000);
  };

  // Typewriter effect for AI
  useEffect(() => {
    if (aiState === "typing") {
      let i = 0;
      const interval = setInterval(() => {
        setTypedQ(aiTextObj.q.slice(0, i + 1));
        i++;
        if (i >= aiTextObj.q.length) {
          clearInterval(interval);
          setAiState("done");
        }
      }, 40); // Type speed
      return () => clearInterval(interval);
    }
  }, [aiState, aiTextObj]);

  return (
    <div className={`relative min-h-screen font-sans overflow-hidden ${t.dir === "rtl" ? "text-right" : "text-left"}`}>
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        {/* Cyberpunk Grid */}
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      {/* --- Header Navigation --- */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 w-full z-50 glass-panel border-b-0 border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)] group-hover:scale-110 transition-transform duration-300">
              <Zap className="text-white w-6 h-6 fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 uppercase">
                MegaClick<span className="text-pink-500">.</span>
              </h1>
              <p className="text-[9px] text-pink-400 tracking-[0.3em] font-mono uppercase -mt-1 font-bold">Enterprise</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-300">
            <a href="#slides" className="hover:text-pink-400 transition-colors">{t.nav_slides}</a>
            <a href="#ai" className="hover:text-cyan-400 transition-colors">{t.nav_ai}</a>
            <a href="#kosher" className="hover:text-purple-400 transition-colors">{t.nav_kosher}</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Globe className="absolute top-1/2 -translate-y-1/2 right-2 w-3 h-3 text-slate-400 pointer-events-none" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as "he" | "en")}
                className="appearance-none bg-white/5 border border-white/10 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-pink-500 cursor-pointer"
                style={{ direction: 'ltr' }} // keep select text LTR for flags
              >
                <option value="he" className="bg-[#03030a]">HE</option>
                <option value="en" className="bg-[#03030a]">EN</option>
              </select>
            </div>

            <button className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-yellow-500/30 text-yellow-500 text-xs font-bold hover:bg-yellow-500/10 transition-all">
              <Award className="w-4 h-4" /> {t.btn_cert}
            </button>

            <button className="relative group overflow-hidden rounded-xl p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
              <div className="relative bg-[#03030a] px-6 py-2 rounded-xl flex items-center gap-2 group-hover:bg-opacity-0 transition-all duration-300">
                <span className="text-sm font-bold text-white">{t.btn_create}</span>
                <LogIn className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* --- Hero Section & Simulator --- */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-16 z-10">
          
          {/* Text Left */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:w-1/2 flex flex-col items-start"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {t.hero_badge}
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6">
              {t.hero_title_1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 text-glow">
                {t.hero_title_2}
              </span>
            </motion.h2>
            
            <motion.p variants={fadeUp} className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg font-light">
              {t.hero_sub}
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 w-full">
              <button className="bg-white text-black font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <Play className="w-5 h-5 fill-current" />
                {t.btn_join}
              </button>
              <button className="glass-panel text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5 text-purple-400" />
                {t.nav_kosher}
              </button>
            </motion.div>
          </motion.div>

          {/* 3D Glass Simulator Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="lg:w-1/2 w-full max-w-lg perspective-1000"
          >
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu hover:rotate-y-[-5deg] transition-transform duration-500">
              
              {/* Simulator Header */}
              <div className="bg-black/40 p-4 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.sim_title}</span>
                </div>
                <div className="flex bg-black/50 rounded-lg p-1 border border-white/5">
                  <button onClick={() => setSimMode('web')} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${simMode === 'web' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>
                    {t.sim_web}
                  </button>
                  <button onClick={() => setSimMode('phone')} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${simMode === 'phone' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>
                    {t.sim_phone}
                  </button>
                </div>
              </div>

              {/* Simulator Body */}
              <div className="p-8 relative min-h-[380px] flex flex-col justify-center bg-gradient-to-b from-transparent to-black/20">
                <AnimatePresence mode="wait">
                  {!simFeedback.show ? (
                    <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="flex justify-between items-end mb-8">
                        <div className="w-14 h-14 rounded-full border-4 border-pink-500/30 flex items-center justify-center relative">
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="24" cy="24" r="24" fill="none" stroke="#ec4899" strokeWidth="4" strokeDasharray="150" strokeDashoffset={150 - (150 * simTimer) / 15} className="transition-all duration-1000 ease-linear"/>
                          </svg>
                          <span className="text-lg font-black font-mono">{simTimer}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-black mb-8 leading-tight">
                        {lang === "he" ? "באיזו מהירות נשלחים נתונים מהטלפון הכשר לשרתי מגה קליק?" : "How fast is data sent from the Kosher phone to MegaClick servers?"}
                      </h3>

                      <div className="grid grid-cols-1 gap-3">
                        {[
                          lang === "he" ? "1. כ-3 שניות" : "1. About 3 seconds",
                          lang === "he" ? "2. פחות מ-50 מילישניות" : "2. Under 50 milliseconds",
                          lang === "he" ? "3. חצי דקה" : "3. Half a minute"
                        ].map((text, i) => (
                          <button 
                            key={i}
                            onClick={() => handleSimAnswer(i === 1)}
                            className="group relative w-full text-start p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-pink-500/20 hover:border-pink-500/50 transition-all overflow-hidden"
                          >
                            <span className="relative z-10 font-bold text-sm md:text-base">{text}</span>
                            {/* DTMF Hint for phone mode */}
                            {simMode === 'phone' && (
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                                DTMF: [{i + 1}]
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="feedback" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center flex flex-col items-center">
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_currentColor] ${simFeedback.correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {simFeedback.correct ? <CheckCircle2 className="w-12 h-12" /> : <ChevronDown className="w-12 h-12" />}
                      </div>
                      <h2 className="text-3xl font-black mb-4">{simFeedback.text}</h2>
                      <button onClick={() => { setSimTimer(15); setSimFeedback({show: false, correct: false, text: ""}) }} className="text-sm font-bold text-slate-400 hover:text-white underline decoration-dashed underline-offset-4">
                        {lang === "he" ? "רענן מנוע" : "Reset Engine"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 4 Dimensions Section --- */}
      <section id="slides" className="py-32 relative border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">{t.slides_title}</h2>
            <p className="text-slate-400 text-lg">{t.slides_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.cards.map((card, i) => (
              <motion.div 
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-panel p-8 rounded-3xl group cursor-crosshair relative overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:to-purple-500/10 transition-colors duration-500"></div>
                
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 relative z-10 border border-white/10 group-hover:border-pink-500/50 transition-colors">
                  <card.icon className="w-7 h-7 text-white group-hover:text-pink-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4 relative z-10">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AI Engine Section --- */}
      <section id="ai" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-panel rounded-[3rem] p-8 md:p-16 border border-purple-500/20 relative overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.1)]">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                className="lg:w-1/2"
              >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-6">
                  <Sparkles className="w-4 h-4" /> GPT-4 Integration
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-6 leading-tight">{t.ai_title}</motion.h2>
                <motion.p variants={fadeUp} className="text-slate-400 text-lg mb-8 leading-relaxed">{t.ai_sub}</motion.p>
              </motion.div>

              {/* AI Interactive Panel */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="lg:w-1/2 w-full"
              >
                <div className="bg-[#03030a]/80 p-6 rounded-3xl border border-white/10 shadow-2xl">
                  <div className="flex gap-3 mb-6">
                    <input 
                      type="text" 
                      placeholder={t.ai_placeholder}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white"
                    />
                    <button 
                      onClick={runAI}
                      disabled={aiState === "thinking" || aiState === "typing" || !aiPrompt}
                      className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                    >
                      {aiState === "thinking" ? <BrainCircuit className="w-5 h-5 animate-spin" /> : t.ai_btn}
                    </button>
                  </div>

                  {/* AI Output Box */}
                  <div className="bg-black/50 rounded-2xl p-6 min-h-[220px] border border-white/5 relative overflow-hidden font-mono text-sm">
                    {aiState === "idle" && (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                        {lang === "he" ? "ממתין להזנת נתונים..." : "Waiting for input..."}
                      </div>
                    )}
                    
                    {aiState === "thinking" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                        <div className="flex space-x-2 space-x-reverse">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-purple-400 text-xs uppercase tracking-widest">{lang === "he" ? "מנתח מודלים פסיכולוגיים..." : "Analyzing models..."}</span>
                      </div>
                    )}

                    {(aiState === "typing" || aiState === "done") && (
                      <div className="space-y-6">
                        <div className="text-cyan-300 font-bold leading-relaxed border-l-2 border-cyan-500 pl-4 (rtl:pr-4 rtl:pl-0 rtl:border-r-2 rtl:border-l-0)">
                          {typedQ}
                          {aiState === "typing" && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse"></span>}
                        </div>
                        
                        {aiState === "done" && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-3">
                            {aiTextObj.a.map((ans, idx) => (
                              <div key={idx} className={`p-3 rounded-lg border ${idx === 1 ? 'bg-green-900/30 border-green-500/50 text-green-300' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                                {idx + 1}. {ans} {idx === 1 && "✓"}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Kosher Phone Architecture --- */}
      <section id="kosher" className="py-32 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6">{t.kosher_title}</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.kosher_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

            {t.steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="w-24 h-24 rounded-3xl bg-[#03030a] border border-purple-500/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(139,92,246,0.15)] relative group">
                  <div className="absolute inset-0 rounded-3xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <step.icon className="w-10 h-10 text-purple-400" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-black border-4 border-[#03030a]">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-white/10 bg-[#03030a] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-6 md:mb-0 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <Zap className="w-5 h-5 text-white" />
            <span className="font-bold text-sm tracking-widest uppercase">MegaClick V2.0</span>
          </div>
          <p className="text-xs text-slate-600 font-mono">{t.footer} {new Date().getFullYear()}</p>
        </div>
      </footer>

    </div>
  );
}