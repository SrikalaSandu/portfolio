
import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: "Smart Glasses Form-Filling Assistant",
    desc: "ACM ASSETS 2025 — Assistive tech for blind users using CV + NLP on Vuzix smart glasses with AWS backend. 63.2% field-localization accuracy across 14 participants.",
    tags: ["Android", "CV", "NLP", "AWS", "R"],
    badge: "Published",
    badgeColor: "#2e6b8b",
    links: [{ label: "View Paper ↗", url: "https://dl.acm.org/doi/full/10.1145/3663547.3759722" }],
  },
  {
    title: "MindMate — AI Therapy App",
    desc: "Built at Stevens QuacksHacks 2026. LLM-powered backend on Firebase generating adaptive daily action plans with ElevenLabs voice coaching.",
    tags: ["LLMs", "ElevenLabs", "Firebase", "Python"],
    badge: "Hackathon",
    badgeColor: "#7b4a8b",
    links: [{ label: "GitHub ↗", url: "https://github.com/SrikalaSandu/QuacksHacks-2026" }],
  },
  {
    title: "Sprout — Adaptive Learning App",
    desc: "AI-powered child development app. Built at Build with TRAE.ai & MiniMax @ NYC. React Native/Expo frontend with onboarding quiz and Supabase personalization backend.",
    tags: ["React Native", "Expo", "Supabase", "AI"],
    badge: "Hackathon",
    badgeColor: "#7b4a8b",
    links: [],
  },
  {
    title: "Six Degrees of Separation",
    desc: "Freelance project (Dec 2024 – Feb 2025) for a startup. Implemented graph-based social distance algorithm.",
    tags: ["Python", "Graph Theory", "Algorithms"],
    badge: "Freelance",
    badgeColor: "#4a7b5a",
    links: [{ label: "GitHub ↗", url: "https://github.com/SrikalaSandu/six-degrees-of-separation-" }],
  },
  {
    title: "WYR Chatbot",
    desc: "Would You Rather chatbot built as a freelance project and also adapted for a therapy research assistant.",
    tags: ["NLP", "Chatbot", "Python"],
    badge: "Freelance",
    badgeColor: "#4a7b5a",
    links: [
      { label: "Chatbot ↗", url: "https://github.com/SrikalaSandu/WYR-chatbot" },
      { label: "Alt ↗", url: "https://github.com/SrikalaSandu/would-you-rather-chatbot" },
    ],
  },
  {
    title: "Stock Trend Forecasting",
    desc: "End-to-end ML pipeline with 85% prediction accuracy. Ensemble methods (XGBoost, Random Forests) with time-series cross-validation. Collaborated with a team of 4.",
    tags: ["Python", "XGBoost", "scikit-learn", "Time Series"],
    links: [{ label: "GitHub ↗", url: "https://github.com/SrikalaSandu/Stock-Trend-Forecasting" }],
  },
  {
    title: "AI College Admission Chatbot",
    desc: "95% accuracy answering student queries. Increased admission process efficiency by 40% using NLP algorithms to automate student inquiry responses.",
    tags: ["NLP", "Python", "Chatbot"],
    links: [{ label: "GitHub ↗", url: "https://github.com/SrikalaSandu/__AI-chatbot__" }],
  },
  {
    title: "Tic Tac Toe App",
    desc: "First semester project with teammates. User-friendly interface with cool graphics — increased interest for 5/7 users.",
    tags: ["Java"],
    links: [{ label: "GitHub ↗", url: "https://github.com/SrikalaSandu/Tic-Tac-Toe" }],
  },
  {
    title: "Intelligent Timetable",
    desc: "Automated timetable scheduler built in first semester. Solves constraint-based scheduling problems intelligently.",
    tags: ["Java", "Algorithms"],
    links: [{ label: "GitHub ↗", url: "https://github.com/SrikalaSandu/Intelligent-Timetable" }],
  },
  {
    title: "Urban Clap Clone",
    desc: "Full-stack clone of the Urban Clap service marketplace app, built during undergrad.",
    tags: ["PHP", "MySQL", "Web"],
    links: [{ label: "GitHub ↗", url: "https://github.com/SrikalaSandu/Urban-clap" }],
  },
  {
    title: "LCD Linux Driver",
    desc: "Low-level LCD driver developed during internship at Certes Networks.",
    tags: ["C", "Linux", "Embedded"],
    links: [{ label: "GitHub ↗", url: "https://github.com/SrikalaSandu/lcd-linux" }],
  },
  {
    title: "Meeting Brief Generator",
    desc: "Built in 1 hour at Manus Hackathon — AI tool to auto-generate concise meeting briefs from transcripts.",
    tags: ["AI", "Python"],
    badge: "Hackathon",
    badgeColor: "#7b4a8b",
    links: [{ label: "GitHub ↗", url: "https://github.com/SrikalaSandu/Meeting-brief-generator-" }],
  },
  {
    title: "Silly Hacks 2026",
    desc: "Creative hackathon build showcasing rapid prototyping and web skills.",
    tags: ["Web"],
    badge: "Hackathon",
    badgeColor: "#7b4a8b",
    links: [
      { label: "Website ↗", url: "https://github.com/SrikalaSandu/Silly-Hacks-2026-Website" },
      { label: "GitHub ↗", url: "https://github.com/SrikalaSandu/Silly-Hacks-2026" },
    ],
  },
  {
    title: "OpenAI Parameter Golf",
    desc: "Participating in OpenAI Model Craft Challenge — optimizing model outputs with minimal parameters.",
    tags: ["OpenAI", "Prompt Engineering"],
    links: [{ label: "GitHub ↗", url: "https://github.com/SrikalaSandu/parameter-golf" }],
  },
];

const EXPERIENCE = [
  {
    date: "Mar 2026 – Present",
    title: "Generative AI Engineer Intern",
    company: "G5 Infotech (Remote)",
    bullets: [
      "Benchmarked 3+ chunking strategies (fixed-size, semantic, recursive) using LangChain & Hugging Face — driving ~30% reduction in retrieval latency.",
      "Investigated vector DB configurations and context window management to optimize LLM inference throughput for agentic applications.",
    ],
  },
  {
    date: "Jan 2025 – Present",
    title: "Graduate Research Assistant — Multi-Modal AI",
    company: "Stevens Institute of Technology",
    bullets: [
      "Built & deployed Android app on Vuzix smart glasses integrating CV + NLP with AWS — 63.2% field-localization accuracy; published at ACM SIGACCESS ASSETS 2025.",
      "Engineered end-to-end Python ML pipelines; statistical analysis in R — 68% efficiency gain in experimental iteration speed.",
    ],
  },
  {
    date: "Dec 2024 – Feb 2025",
    title: "Data Scientist Intern / Freelance",
    company: "CircleZapp (Remote)",
    bullets: [
      "Prototyped collaborative filtering and dense embedding models; A/B tested 3 algorithm variants, influencing 2 product feature releases.",
      "Queried millions of user interaction records in SQL to surface behavioral patterns.",
    ],
  },
  {
    date: "Apr 2023 – Aug 2024",
    title: "Community Developer",
    company: "Reddit Inc. — Bangalore, India",
    bullets: [
      "Reduced manual moderation workload by 40% by engineering custom Python & Reddit API bots to detect spam, hate speech, and policy violations.",
      "Achieved 92% accuracy in real-time harmful content identification; reduced toxic behavior reports by 35%.",
      "Accelerated volunteer moderator onboarding efficiency by 50% through technical documentation and training.",
    ],
  },
  {
    date: "Apr 2022 – Apr 2023",
    title: "Cybersecurity Engineer / Backend Developer",
    company: "Certes Networks",
    bullets: [
      "Optimized encryption algorithms — 20% efficiency improvement, 99.8% backend uptime.",
      "Refactored 5+ high-throughput backend modules reducing latency while ensuring security compliance.",
    ],
  },
  {
    date: "Sep 2021 – Dec 2021",
    title: "Software Engineering Intern",
    company: "Inv Technologies — Bangalore, India",
    bullets: [
      "Developed a LAN chat application in Java, enhancing real-time communication via RESTful API.",
      "Optimized memory management by 15% and elevated authentication/authorization protocols.",
    ],
  },
];

const SKILLS_ICONS = [
  { icon: "🐍", label: "Python" }, { icon: "🤖", label: "LLM Fine-Tuning" },
  { icon: "🔗", label: "LangChain" }, { icon: "🤗", label: "Hugging Face" },
  { icon: "🔥", label: "PyTorch" }, { icon: "🧠", label: "TensorFlow" },
  { icon: "☁️", label: "AWS" }, { icon: "🐳", label: "Docker" },
  { icon: "📊", label: "Spark" }, { icon: "💾", label: "SQL" },
  { icon: "⚛️", label: "React Native" }, { icon: "☕", label: "Java" },
  { icon: "📈", label: "XGBoost" }, { icon: "🗺️", label: "RAG Pipelines" },
  { icon: "📱", label: "Android" }, { icon: "🌐", label: "JavaScript" },
  { icon: "📉", label: "scikit-learn" }, { icon: "🔬", label: "R / Statistics" },
  { icon: "🏗️", label: "System Design" }, { icon: "🎯", label: "Prompt Eng." },
  { icon: "🐧", label: "Linux" }, { icon: "🔑", label: "Kubernetes" },
  { icon: "🌿", label: "Node.js" }, { icon: "🎨", label: "Django" },
  { icon: "💎", label: "Ruby" }, { icon: "🔴", label: "C/C++" },
];

const SKILL_CATS = [
  { title: "GenAI & LLMs", items: ["LLMs", "Multi-Modal AI", "Gemini API", "Prompt Engineering", "NLP", "RAG", "Computer Vision", "LangChain", "Hugging Face"] },
  { title: "ML Infrastructure", items: ["Model Deployment", "Model Evaluation", "Data Processing Pipelines", "MLOps", "k-Means", "Logistic Regression", "XGBoost", "Random Forests"] },
  { title: "Languages", items: ["Python", "Java", "C", "C++", "C#", "JavaScript", "SQL", "Ruby", "PHP", "HTML/CSS", "R"] },
  { title: "Frameworks & Tools", items: ["PyTorch", "TensorFlow", "pandas", "NumPy", "Jupyter Notebook", "LangChain", "React.js", "React Native", "Node.js", "Django", "OpenGL"] },
  { title: "Cloud & Infra", items: ["AWS", "Firebase", "Docker", "Kubernetes", "Twilio", "Linux/Unix", "REST APIs", "Distributed Systems", "MongoDB"] },
];

const CERTS = [
  { icon: "🔬", title: "CITI Program — Human Subjects Research", src: "Stevens Institute of Technology · Jun 2025" },
  { icon: "🤖", title: "Hands-On AI: Automate Data Analytics with n8n", src: "LinkedIn" },
  { icon: "☕", title: "Functional Programming with Java", src: "LinkedIn" },
  { icon: "☕", title: "Java Object-Oriented Programming", src: "LinkedIn" },
  { icon: "🔄", title: "Agile Software Development", src: "LinkedIn" },
  { icon: "⚡", title: "Learn to Vibe Code in 10 Minutes", src: "LinkedIn" },
  { icon: "📊", title: "ML with Python: Association Rules", src: "LinkedIn" },
  { icon: "📊", title: "ML with Python: k-Means Clustering", src: "LinkedIn" },
  { icon: "📊", title: "ML with Python: Logistic Regression", src: "LinkedIn" },
  { icon: "📊", title: "ML with Python: Decision Trees", src: "LinkedIn" },
  { icon: "📊", title: "ML with Python: Foundations", src: "LinkedIn" },
  { icon: "🐍", title: "Advanced Python: OOP", src: "LinkedIn" },
  { icon: "☁️", title: "Learning AWS for Developers", src: "LinkedIn" },
  { icon: "🎓", title: "C & C++ Training", src: "Visvesvaraya Technological University · 2018" },
  { icon: "📦", title: "Introduction to JSON", src: "Udemy" },
  { icon: "🤖", title: "Machine Learning A-Z: AI, Python & R [2024]", src: "Udemy" },
  { icon: "📈", title: "The Data Science Course: Complete Bootcamp 2024", src: "Udemy" },
  { icon: "🐍", title: "100 Days of Code™: Complete Python Bootcamp", src: "Udemy" },
  { icon: "🐧", title: "Complete Linux Training Course 2026", src: "Udemy" },
  { icon: "🐳", title: "Docker & Kubernetes: The Practical Guide", src: "Udemy" },
  { icon: "📉", title: "Exploratory Data Analysis in R", src: "DataCamp" },
  { icon: "📉", title: "Inference for Linear Regression in R", src: "DataCamp" },
  { icon: "📉", title: "Introduction to the Tidyverse", src: "DataCamp" },
  { icon: "📉", title: "Inference for Numerical & Categorical Data in R", src: "DataCamp" },
];

const COURSES = [
  { code: "CS 545", name: "Human-Computer Interaction", grade: "A" },
  { code: "CS 570", name: "Intro to Programming, Data Structures & Algo.", grade: "A" },
  { code: "CS 555", name: "Agile Methods for Software Dev.", grade: "A" },
  { code: "CS 573", name: "Fundamentals of CyberSecurity", grade: "A-" },
  { code: "CS 600", name: "Adv. Algorithm Design & Implementation", grade: "A" },
  { code: "CS 800", name: "Special Problems in CS (MS)", grade: "A" },
  { code: "CS 556", name: "Mathematical Foundations of Machine Learning", grade: "C+" },
  { code: "CS 810", name: "Special Topics in CS", grade: "A" },
  { code: "MIS 637", name: "Data Analytics & Machine Learning", grade: "A" },
  { code: "CS 510", name: "Princ. of Programming Languages", grade: "F→retake" },
];

// ─── BOW SVG ────────────────────────────────────────────────────────────────
const BowSVG = ({ size = 44, color = "#c0514e", opacity = 1 }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
    <path d="M22 16 C15 9 2 4 4 13 C6 20 15 18 22 16Z" stroke={color} strokeWidth="2.2" fill={color + "22"} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 16 C29 9 42 4 40 13 C38 20 29 18 22 16Z" stroke={color} strokeWidth="2.2" fill={color + "22"} strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="22" cy="16" r="3" fill={color}/>
    <path d="M20 16 C17 20 15 25 13 30" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <path d="M24 16 C27 20 29 25 31 30" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  </svg>
);

const StarSVG = ({ size = 24, color = "#c0514e" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="1.2"/>
    <line x1="1" y1="12" x2="23" y2="12" stroke={color} strokeWidth="1.2"/>
    <line x1="4" y1="4" x2="20" y2="20" stroke={color} strokeWidth="0.7"/>
    <line x1="20" y1="4" x2="4" y2="20" stroke={color} strokeWidth="0.7"/>
  </svg>
);

// ─── DRAGGABLE ITEM ──────────────────────────────────────────────────────────
const DraggableItem = ({ initialX, initialY, children }) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  }, [pos]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPos({ x: clientX - offset.current.x, y: clientY - offset.current.y });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={(e) => {
        dragging.current = true;
        const t = e.touches[0];
        offset.current = { x: t.clientX - pos.x, y: t.clientY - pos.y };
      }}
      style={{
        position: "fixed", left: pos.x, top: pos.y,
        cursor: dragging.current ? "grabbing" : "grab",
        zIndex: 9999, userSelect: "none", touchAction: "none",
        filter: "drop-shadow(0 2px 6px rgba(192,81,78,0.3))",
        transition: dragging.current ? "none" : "filter 0.2s",
      }}
    >
      {children}
    </div>
  );
};

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
};

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
const SectionHeader = ({ title }) => (
  <Reveal>
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,2.8rem)", color: "#c0514e", margin: 0 }}>
        {title}
      </h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 8 }}>
        <div style={{ height: 1, width: 60, background: "#e8a0a0" }} />
        <BowSVG size={28} opacity={0.7} />
        <div style={{ height: 1, width: 60, background: "#e8a0a0" }} />
      </div>
    </div>
  </Reveal>
);

// ─── BOW BACKGROUND ──────────────────────────────────────────────────────────
const BowBackground = () => {
  const bows = [
    { x: 3, y: 5, size: 52, rot: -15, delay: 0, opacity: 0.18 },
    { x: 14, y: 12, size: 36, rot: 8, delay: 0.4, opacity: 0.14 },
    { x: 28, y: 3, size: 44, rot: -5, delay: 0.8, opacity: 0.16 },
    { x: 45, y: 8, size: 58, rot: 12, delay: 1.2, opacity: 0.13 },
    { x: 62, y: 2, size: 40, rot: -18, delay: 0.3, opacity: 0.17 },
    { x: 78, y: 10, size: 50, rot: 6, delay: 0.9, opacity: 0.15 },
    { x: 90, y: 4, size: 34, rot: -10, delay: 0.6, opacity: 0.19 },
    { x: 96, y: 18, size: 46, rot: 15, delay: 1.5, opacity: 0.12 },
    { x: 7, y: 28, size: 38, rot: 20, delay: 0.2, opacity: 0.14 },
    { x: 20, y: 35, size: 54, rot: -8, delay: 1.1, opacity: 0.16 },
    { x: 35, y: 25, size: 42, rot: 14, delay: 0.5, opacity: 0.13 },
    { x: 52, y: 30, size: 48, rot: -12, delay: 0.7, opacity: 0.18 },
    { x: 68, y: 22, size: 36, rot: 7, delay: 1.3, opacity: 0.15 },
    { x: 82, y: 32, size: 56, rot: -16, delay: 0.1, opacity: 0.12 },
    { x: 93, y: 42, size: 40, rot: 11, delay: 1.0, opacity: 0.17 },
    { x: 2, y: 50, size: 46, rot: -7, delay: 0.8, opacity: 0.14 },
    { x: 17, y: 58, size: 52, rot: 18, delay: 0.4, opacity: 0.16 },
    { x: 33, y: 48, size: 38, rot: -13, delay: 1.4, opacity: 0.13 },
    { x: 50, y: 55, size: 44, rot: 9, delay: 0.6, opacity: 0.18 },
    { x: 65, y: 45, size: 58, rot: -6, delay: 1.2, opacity: 0.15 },
    { x: 80, y: 52, size: 34, rot: 16, delay: 0.3, opacity: 0.19 },
    { x: 95, y: 60, size: 48, rot: -19, delay: 0.9, opacity: 0.12 },
    { x: 8, y: 68, size: 40, rot: 5, delay: 1.5, opacity: 0.16 },
    { x: 22, y: 75, size: 54, rot: -11, delay: 0.2, opacity: 0.14 },
    { x: 40, y: 65, size: 42, rot: 17, delay: 1.0, opacity: 0.17 },
    { x: 58, y: 72, size: 36, rot: -4, delay: 0.7, opacity: 0.13 },
    { x: 73, y: 62, size: 50, rot: 13, delay: 0.5, opacity: 0.18 },
    { x: 88, y: 70, size: 44, rot: -17, delay: 1.3, opacity: 0.15 },
    { x: 5, y: 82, size: 56, rot: 8, delay: 0.1, opacity: 0.12 },
    { x: 25, y: 88, size: 38, rot: -14, delay: 1.1, opacity: 0.17 },
    { x: 45, y: 80, size: 46, rot: 19, delay: 0.4, opacity: 0.14 },
    { x: 62, y: 85, size: 52, rot: -9, delay: 0.8, opacity: 0.16 },
    { x: 78, y: 78, size: 40, rot: 4, delay: 1.4, opacity: 0.13 },
    { x: 92, y: 85, size: 34, rot: -20, delay: 0.6, opacity: 0.18 },
    { x: 15, y: 92, size: 48, rot: 10, delay: 1.2, opacity: 0.15 },
    { x: 50, y: 93, size: 44, rot: -15, delay: 0.3, opacity: 0.19 },
    { x: 82, y: 93, size: 36, rot: 6, delay: 0.9, opacity: 0.12 },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {bows.map((b, i) => (
        <div key={i} style={{
          position: "absolute", left: `${b.x}%`, top: `${b.y}%`,
          transform: `rotate(${b.rot}deg)`,
          animation: `floatBow ${4 + (i % 4)}s ease-in-out ${b.delay}s infinite alternate`,
          opacity: b.opacity,
        }}>
          <BowSVG size={b.size} color="#c0514e" />
        </div>
      ))}
      <style>{`
        @keyframes floatBow {
          from { transform: translateY(0) rotate(var(--r, 0deg)); }
          to { transform: translateY(-14px) rotate(var(--r, 0deg)); }
        }
      `}</style>
    </div>
  );
};

// ─── TYPING EFFECT ───────────────────────────────────────────────────────────
const TypingText = ({ text, startDelay = 600 }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) { setDisplayed(text.slice(0, ++i)); }
        else { setDone(true); clearInterval(interval); }
      }, 80);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, startDelay]);
  return (
    <span>
      {displayed}
      {!done && <span style={{ display: "inline-block", width: 3, height: "0.85em", background: "#c0514e", marginLeft: 2, verticalAlign: "text-bottom", animation: "blink 0.8s infinite" }} />}
    </span>
  );
};

// ─── NOTEBOOK HERO ───────────────────────────────────────────────────────────
const Hero = () => {
  const linesBg = `repeating-linear-gradient(transparent, transparent 31px, rgba(232,160,160,0.22) 32px)`;
  const marginLine = `linear-gradient(90deg, transparent 50px, rgba(232,160,160,0.4) 51px, transparent 52px)`;

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "100px 24px 60px", position: "relative", zIndex: 1,
    }}>
      <div style={{
        display: "flex", width: "min(960px, 94vw)", minHeight: 520,
        borderRadius: 4,
        boxShadow: "0 28px 90px rgba(140,50,50,0.2), 0 4px 20px rgba(140,50,50,0.12)",
        overflow: "hidden", background: "white",
      }}>
        {/* Left page */}
        <div style={{
          flex: 1, background: "#fff9f8",
          backgroundImage: `${linesBg}, ${marginLine}`,
          padding: "52px 44px 52px 66px", position: "relative",
          borderRight: "2px solid rgba(200,100,100,0.12)",
        }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 50, background: "linear-gradient(to right, rgba(232,160,160,0.1), transparent)", pointerEvents: "none" }} />
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(2.4rem,4.5vw,3.6rem)", color: "#c0514e", lineHeight: 1.15, minHeight: "4rem", marginBottom: 6 }}>
            <TypingText text="Srikala Sandu" />
          </div>
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.05rem", color: "#e8a0a0", marginBottom: 28 }}>
            ✦ AI Engineer &amp; Researcher ✦
          </div>
          <div style={{ lineHeight: "32px", fontSize: "0.92rem", color: "#3a2020" }}>
            <p>Master's @ Stevens Institute of Technology</p>
            <p>Provost Scholarship Recipient ✨ · GPA 3.49</p>
            <p>Published at ACM ASSETS 2025</p>
            <p>Building AI that helps people</p>
            <p>New Jersey, USA 🌸</p>
          </div>
          {/* polaroid */}
          <div style={{
            position: "absolute", bottom: 28, right: 20,
            background: "white", padding: "8px 8px 28px",
            boxShadow: "3px 5px 14px rgba(140,50,50,0.22)",
            transform: "rotate(3deg)", width: 122, transition: "transform 0.3s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "rotate(0deg) scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "rotate(3deg)"}
          >
            <img src="/mnt/user-data/uploads/DSCF1874.jpg" alt="Srikala" style={{ width: "100%", height: 108, objectFit: "cover", objectPosition: "top" }} />
            <div style={{ textAlign: "center", marginTop: 6, fontFamily: "'Dancing Script', cursive", fontSize: "0.78rem", color: "#6b3a3a" }}>~ it's me! ~</div>
          </div>
        </div>

        {/* Spine */}
        <div style={{
          width: 22, background: "linear-gradient(to bottom, #d4706a, #c0514e, #d4706a)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 11, flexShrink: 0,
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.18)" }} />
          ))}
        </div>

        {/* Right page */}
        <div style={{
          flex: 1, background: "#fffbfb",
          backgroundImage: linesBg,
          padding: "52px 48px",
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#c0514e", marginBottom: 14, borderBottom: "1px dashed rgba(232,160,160,0.5)", paddingBottom: 8 }}>
            About Me ✦
          </h3>
          <div style={{ fontSize: "0.9rem", lineHeight: "32px", color: "#3a2020" }}>
            <p>Hi! I'm Srikala — a passionate AI/ML engineer and researcher who loves building technology that genuinely helps people. Currently pursuing my Master's in CS at Stevens on a Provost Scholarship.</p>
            <br />
            <p>My published research at ACM ASSETS 2025 focused on assistive tech for blind users — smart glasses + computer vision to help people fill forms independently. That's the kind of work I live for: impactful, human-centered AI.</p>
            <br />
            <p>When I'm not training models or building apps, you'll find me at hackathons, exploring NYC, or learning something new 🌟</p>
          </div>
        </div>
      </div>
      <style>{`@keyframes blink { 0%,50% { opacity:1; } 51%,100% { opacity:0; } }`}</style>
    </section>
  );
};

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
const ProjectCard = ({ project, delay }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          background: "rgba(255,249,248,0.95)", borderRadius: 14, padding: "26px 24px",
          border: "1px solid rgba(232,160,160,0.3)", position: "relative", overflow: "hidden",
          transform: hov ? "translateY(-6px)" : "none",
          boxShadow: hov ? "0 16px 40px rgba(192,81,78,0.16)" : "0 2px 12px rgba(192,81,78,0.07)",
          transition: "transform 0.3s, box-shadow 0.3s", backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #e8a0a0, #c0514e)" }} />
        {project.badge && (
          <div style={{
            position: "absolute", top: 14, right: 14, background: project.badgeColor || "#c0514e",
            color: "white", fontSize: "0.66rem", padding: "3px 9px", borderRadius: 12,
            letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif",
          }}>{project.badge}</div>
        )}
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#c0514e", marginBottom: 8, paddingRight: project.badge ? 70 : 0 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.83rem", color: "#8a5a5a", lineHeight: 1.65, marginBottom: 12 }}>{project.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: "0.7rem", padding: "3px 10px", background: "#fce8e8", color: "#6b3a3a", borderRadius: 20 }}>{t}</span>
          ))}
        </div>
        {project.links?.length > 0 && (
          <div style={{ display: "flex", gap: 12 }}>
            {project.links.map(l => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
                style={{ fontSize: "0.78rem", color: "#c0514e", textDecoration: "none", borderBottom: "1px solid #e8a0a0", paddingBottom: 1 }}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState("hero");
  const [skillsFilter, setSkillsFilter] = useState("All");
  const skillsScrollRef = useRef(null);
  const [certFilter, setCertFilter] = useState("All");

  // Drag scroll for skills
  useEffect(() => {
    const el = skillsScrollRef.current;
    if (!el) return;
    let isDown = false, startX, scrollLeft;
    const md = (e) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const ml = () => { isDown = false; };
    const mm = (e) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
    el.addEventListener("mousedown", md);
    el.addEventListener("mouseleave", ml);
    el.addEventListener("mouseup", ml);
    el.addEventListener("mousemove", mm);
    return () => { el.removeEventListener("mousedown", md); el.removeEventListener("mouseleave", ml); el.removeEventListener("mouseup", ml); el.removeEventListener("mousemove", mm); };
  }, []);

  // Track active section
  useEffect(() => {
    const sections = ["hero","projects","experience","skills","research","certificates","contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { threshold: 0.3 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const certSources = ["All", "LinkedIn", "Udemy", "DataCamp", "Stevens Institute of Technology · Jun 2025", "Visvesvaraya Technological University · 2018"];
  const filteredCerts = certFilter === "All" ? CERTS : CERTS.filter(c => c.src.includes(certFilter.split("·")[0].trim()));

  const navItems = ["projects","experience","skills","research","certificates","contact"];

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: "linear-gradient(135deg, #fce8e8 0%, #fdf6f0 40%, #fce8e8 70%, #fdf0f0 100%)", color: "#3a2020", minHeight: "100vh", cursor: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18'%3E%3Ccircle cx='9' cy='9' r='4' fill='%23e8a0a0' opacity='0.8'/%3E%3C/svg%3E\") 9 9, auto" }}>

      {/* Bow Background */}
      <BowBackground />

      {/* Draggable decorations */}
      <DraggableItem initialX={window.innerWidth * 0.9} initialY={120}><StarSVG size={38} /></DraggableItem>
      <DraggableItem initialX={40} initialY={220}><BowSVG size={52} opacity={0.85} /></DraggableItem>
      <DraggableItem initialX={window.innerWidth * 0.85} initialY={400}><StarSVG size={28} color="#e8a0a0" /></DraggableItem>
      <DraggableItem initialX={60} initialY={500}><StarSVG size={44} /></DraggableItem>
      <DraggableItem initialX={window.innerWidth * 0.92} initialY={650}><BowSVG size={44} opacity={0.9} /></DraggableItem>
      <DraggableItem initialX={30} initialY={800}><StarSVG size={32} color="#c0514e" /></DraggableItem>
      <DraggableItem initialX={window.innerWidth * 0.88} initialY={900}><BowSVG size={36} opacity={0.8} /></DraggableItem>
      <DraggableItem initialX={window.innerWidth * 0.5} initialY={80}><StarSVG size={22} color="#e8a0a0" /></DraggableItem>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 1000,
        background: "rgba(253,246,240,0.92)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(232,160,160,0.3)",
        padding: "14px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#hero" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.55rem", color: "#c0514e", textDecoration: "none" }}>
          Srikala ✦
        </a>
        <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }}>
          {navItems.map(id => (
            <li key={id}>
              <a href={`#${id}`} style={{
                fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "capitalize",
                color: activeNav === id ? "#c0514e" : "#6b3a3a", textDecoration: "none",
                fontWeight: activeNav === id ? 700 : 400,
                borderBottom: activeNav === id ? "2px solid #c0514e" : "2px solid transparent",
                paddingBottom: 2, transition: "all 0.2s",
              }}>
                {id === "certificates" ? "Certs" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <Hero />

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <SectionHeader title="Projects & Hackathons" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 22, maxWidth: 1200, margin: "0 auto" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} delay={(i % 3) * 0.1} />)}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 48px", background: "rgba(255,255,255,0.5)", position: "relative", zIndex: 1 }}>
        <SectionHeader title="Experience" />
        <div style={{ maxWidth: 800, margin: "0 auto", paddingLeft: 40, position: "relative" }}>
          <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #e8a0a0, #fce8e8)" }} />
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.title + exp.date} delay={i * 0.08}>
              <div style={{ position: "relative", marginBottom: 48 }}>
                <div style={{ position: "absolute", left: -32, top: 8, width: 14, height: 14, borderRadius: "50%", background: "#c0514e", border: "3px solid #fdf6f0", boxShadow: "0 0 0 2px #e8a0a0" }} />
                <div style={{ fontSize: "0.76rem", color: "#e8a0a0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{exp.date}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#3a2020", marginBottom: 2 }}>{exp.title}</div>
                <div style={{ fontSize: "0.87rem", color: "#c0514e", fontWeight: 700, marginBottom: 10 }}>{exp.company}</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: "0.86rem", color: "#8a5a5a", lineHeight: 1.65, paddingLeft: 14, position: "relative", marginBottom: 6 }}>
                      <span style={{ position: "absolute", left: 0, top: 5, color: "#e8a0a0", fontSize: "0.5rem" }}>✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <SectionHeader title="Skills" />
        <Reveal>
          <p style={{ textAlign: "center", color: "#8a5a5a", fontSize: "0.82rem", marginBottom: 24, marginTop: -32 }}>← drag to scroll the icons →</p>
        </Reveal>

        {/* Drag-scroll icon row */}
        <Reveal>
          <div ref={skillsScrollRef} style={{ overflowX: "auto", cursor: "grab", paddingBottom: 16, maxWidth: 1100, margin: "0 auto 48px" }}>
            <div style={{ display: "flex", gap: 14, width: "max-content", padding: "4px 0" }}>
              {SKILLS_ICONS.map(s => (
                <div key={s.label}
                  style={{
                    display: "flex", alignItems: "center", gap: 9,
                    background: "rgba(255,249,248,0.95)", borderRadius: 50, padding: "9px 18px",
                    border: "1px solid rgba(232,160,160,0.3)", whiteSpace: "nowrap",
                    boxShadow: "0 2px 8px rgba(192,81,78,0.07)", backdropFilter: "blur(6px)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(192,81,78,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(192,81,78,0.07)"; }}
                >
                  <span style={{ fontSize: "1.35rem" }}>{s.icon}</span>
                  <span style={{ fontSize: "0.83rem", color: "#6b3a3a", fontWeight: 600 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Skill categories */}
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {SKILL_CATS.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.07}>
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#c0514e" }}>{cat.title}</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(232,160,160,0.4)" }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cat.items.map(item => (
                    <span key={item}
                      style={{ fontSize: "0.8rem", padding: "5px 13px", borderRadius: 20, border: "1px solid rgba(232,160,160,0.5)", color: "#6b3a3a", background: "rgba(255,249,248,0.9)", backdropFilter: "blur(4px)", transition: "all 0.2s", cursor: "default" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#fce8e8"; e.currentTarget.style.borderColor = "#e8a0a0"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,249,248,0.9)"; e.currentTarget.style.borderColor = "rgba(232,160,160,0.5)"; }}
                    >{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Soft skills */}
        <div style={{ maxWidth: 1000, margin: "60px auto 0" }}>
          <Reveal>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", color: "#c0514e", textAlign: "center", marginBottom: 32 }}>Beyond the Code ✦</h3>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { icon: "🤝", title: "Team Player", desc: "Thrives in collaborative environments — from research labs to hackathon teams, I lift others up." },
              { icon: "💪", title: "Hard Worker", desc: "Provost Scholarship recipient balancing research, internships, and projects simultaneously." },
              { icon: "🔬", title: "Research Mindset", desc: "Published researcher who designs rigorous experiments and translates findings into real products." },
              { icon: "💡", title: "Fast Learner", desc: "Picks up new tools and domains at speed — evidenced by breadth spanning GenAI, CV, mobile, and security." },
              { icon: "❤️", title: "Human-Centered", desc: "Builds tech that helps real people — especially those who are underserved or have accessibility needs." },
              { icon: "🚀", title: "Initiative Taker", desc: "Independently designs benchmarks, leads user studies, and ships end-to-end systems." },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div style={{ background: "rgba(255,249,248,0.95)", borderRadius: 16, padding: 24, textAlign: "center", border: "1px solid rgba(232,160,160,0.2)", backdropFilter: "blur(6px)", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(192,81,78,0.13)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: "2rem", marginBottom: 10 }}>{s.icon}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", color: "#c0514e", marginBottom: 6 }}>{s.title}</h4>
                  <p style={{ fontSize: "0.78rem", color: "#8a5a5a", lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research" style={{ padding: "100px 48px", background: "rgba(255,255,255,0.55)", position: "relative", zIndex: 1 }}>
        <SectionHeader title="Research" />
        <Reveal>
          <div style={{ maxWidth: 900, margin: "0 auto", background: "rgba(255,249,248,0.97)", borderRadius: 18, padding: "48px 48px", border: "1px solid rgba(232,160,160,0.3)", boxShadow: "0 10px 40px rgba(192,81,78,0.1)", backdropFilter: "blur(10px)" }}>
            <div style={{ display: "inline-block", background: "#c0514e", color: "white", fontSize: "0.74rem", padding: "4px 14px", borderRadius: 20, letterSpacing: "0.1em", marginBottom: 16 }}>✦ ACM ASSETS 2025 — Published</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#3a2020", marginBottom: 14, lineHeight: 1.35 }}>
              Interactive Form Filling Assistant on Smart Glasses for Blind Users
            </h3>
            <p style={{ fontSize: "0.89rem", color: "#8a5a5a", lineHeight: 1.75, marginBottom: 28 }}>
              A novel assistive technology system leveraging smart glasses to guide blind users through filling out printed forms. By providing real-time audio and haptic feedback, the system enables users to accurately locate form fields and write within designated boundaries — significantly improving form completion efficiency and independence.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
              {[["87%","Mappable","Correct field association"],["74%","Started Correct","Writing at intended start"],["54%","Within Box","Writing inside boundaries"],["68%","Efficiency Gain","Across 14 blind participants"]].map(([num, label, sub]) => (
                <div key={label} style={{ background: "#fce8e8", borderRadius: 12, padding: "18px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", color: "#c0514e", fontWeight: 700 }}>{num}</div>
                  <div style={{ fontSize: "0.78rem", color: "#6b3a3a", fontWeight: 700, marginTop: 3 }}>{label}</div>
                  <div style={{ fontSize: "0.7rem", color: "#8a5a5a", marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="https://dl.acm.org/doi/full/10.1145/3663547.3759722" target="_blank" rel="noreferrer"
                style={{ display: "inline-block", padding: "10px 24px", background: "#c0514e", color: "white", borderRadius: 30, textDecoration: "none", fontSize: "0.84rem", letterSpacing: "0.05em" }}>
                View Paper ↗
              </a>
              <a href="https://interactivecomputinglab.github.io/lab_website/" target="_blank" rel="noreferrer"
                style={{ display: "inline-block", padding: "10px 24px", border: "2px solid #e8a0a0", color: "#c0514e", borderRadius: 30, textDecoration: "none", fontSize: "0.84rem", letterSpacing: "0.05em" }}>
                Research Lab ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* Education */}
        <div style={{ maxWidth: 900, margin: "60px auto 0" }}>
          <Reveal>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#c0514e", marginBottom: 24, textAlign: "center" }}>Education ✦</h3>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Reveal delay={0.1}>
              <div style={{ background: "rgba(255,249,248,0.97)", borderRadius: 14, padding: 28, border: "1px solid rgba(232,160,160,0.3)", backdropFilter: "blur(6px)" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#c0514e", marginBottom: 6 }}>Stevens Institute of Technology</div>
                <div style={{ fontSize: "0.88rem", color: "#3a2020", marginBottom: 4 }}>M.S. Computer Science · Sep 2024 – May 2026</div>
                <div style={{ fontSize: "0.82rem", color: "#8a5a5a", marginBottom: 8 }}>Provost Scholarship · GPA: 3.49</div>
                <div style={{ fontSize: "0.78rem", color: "#8a5a5a" }}>Foundations of ML · Data Analytics · Advanced Algorithms · HCI · Agile · CyberSecurity</div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ background: "rgba(255,249,248,0.97)", borderRadius: 14, padding: 28, border: "1px solid rgba(232,160,160,0.3)", backdropFilter: "blur(6px)" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#c0514e", marginBottom: 6 }}>Visvesvaraya Technological University</div>
                <div style={{ fontSize: "0.88rem", color: "#3a2020", marginBottom: 4 }}>B.E. Computer Science · Bangalore, India</div>
                <div style={{ fontSize: "0.82rem", color: "#8a5a5a", marginBottom: 8 }}>Sep 2017 – Aug 2021</div>
              </div>
            </Reveal>
          </div>

          {/* Courses */}
          <Reveal delay={0.15}>
            <div style={{ marginTop: 28, background: "rgba(255,249,248,0.97)", borderRadius: 14, padding: 28, border: "1px solid rgba(232,160,160,0.25)", backdropFilter: "blur(6px)" }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#c0514e", marginBottom: 16 }}>Coursework @ Stevens</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
                {COURSES.map(c => (
                  <div key={c.code} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.81rem", color: "#6b3a3a", padding: "5px 0", borderBottom: "1px dashed rgba(232,160,160,0.3)" }}>
                    <span><span style={{ color: "#8a5a5a", marginRight: 6 }}>{c.code}</span>{c.name}</span>
                    <span style={{ fontWeight: 700, color: c.grade === "A" ? "#4a7b5a" : c.grade === "A-" ? "#5a7b4a" : c.grade.startsWith("C") ? "#8b6e2e" : "#c0514e", marginLeft: 8 }}>{c.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <SectionHeader title="Certificates & Credentials" />
        {/* Filter pills */}
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 36 }}>
            {["All", "LinkedIn", "Udemy", "DataCamp", "Stevens", "VTU"].map(f => {
              const match = f === "Stevens" ? "Stevens" : f === "VTU" ? "Visvesvaraya" : f;
              const isActive = certFilter === "All" ? f === "All" : certFilter.includes(match);
              return (
                <button key={f} onClick={() => setCertFilter(f === "All" ? "All" : f === "Stevens" ? "Stevens Institute of Technology · Jun 2025" : f === "VTU" ? "Visvesvaraya Technological University · 2018" : f)}
                  style={{ fontSize: "0.78rem", padding: "6px 16px", borderRadius: 20, border: `1.5px solid ${isActive ? "#c0514e" : "rgba(232,160,160,0.5)"}`, background: isActive ? "#c0514e" : "transparent", color: isActive ? "white" : "#6b3a3a", cursor: "pointer", transition: "all 0.2s" }}>
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14, maxWidth: 1100, margin: "0 auto" }}>
          {filteredCerts.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.05}>
              <div style={{ background: "rgba(255,249,248,0.95)", borderRadius: 12, padding: "18px 20px", border: "1px solid rgba(232,160,160,0.22)", display: "flex", alignItems: "flex-start", gap: 12, backdropFilter: "blur(6px)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(192,81,78,0.13)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "#3a2020", fontWeight: 600, lineHeight: 1.35, marginBottom: 3 }}>{c.title}</div>
                  <div style={{ fontSize: "0.73rem", color: "#e8a0a0" }}>{c.src}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MOMENTS */}
      <section style={{ padding: "80px 48px", background: "rgba(255,255,255,0.5)", position: "relative", zIndex: 1 }}>
        <SectionHeader title="Moments ✦" />
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { src: "/mnt/user-data/uploads/1Q6A7618.jpg", caption: "Sprout! @ Build with TRAE.ai", rot: -2 },
            { src: "/mnt/user-data/uploads/WhatsApp_Image_2026-02-28_at_12_48_13.jpeg", caption: "Stevens QuacksHacks 2026 🦆", rot: 1.5 },
            { src: "/mnt/user-data/uploads/DSCF1874.jpg", caption: "NYC vibes 🌆", rot: -1 },
          ].map(({ src, caption, rot }) => (
            <Reveal key={caption}>
              <div style={{ background: "white", padding: "9px 9px 30px", boxShadow: "4px 6px 20px rgba(140,50,50,0.17)", transform: `rotate(${rot}deg)`, transition: "transform 0.3s", width: 230 }}
                onMouseEnter={e => { e.currentTarget.style.transform = "rotate(0deg) scale(1.04) translateY(-4px)"; e.currentTarget.style.zIndex = 10; }}
                onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${rot}deg)`; }}>
                <img src={src} alt={caption} style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "center top" }} />
                <div style={{ textAlign: "center", marginTop: 8, fontFamily: "'Dancing Script', cursive", fontSize: "0.82rem", color: "#6b3a3a" }}>{caption}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#c0514e", padding: "80px 48px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <BowSVG size={60} color="rgba(255,255,255,0.18)" />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "white", marginBottom: 8, marginTop: 16 }}>Let's Connect ✦</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 36, fontSize: "0.93rem" }}>Open to research collaborations, internships, and full-time roles in AI/ML</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "💼 LinkedIn", url: "https://www.linkedin.com/in/srikala-sandu/" },
            { label: "🐙 GitHub", url: "https://github.com/SrikalaSandu" },
            { label: "🎬 YouTube", url: "https://www.youtube.com/@frogcodes" },
            { label: "📄 Resume", url: "https://drive.google.com/drive/folders/11n6fkxwCtMlqzDjoltEsbtP2M2OMni61?usp=sharing" },
            { label: "✉️ Email", url: "mailto:sandusrikala@gmail.com" },
          ].map(s => (
            <a key={s.label} href={s.url} target={s.url.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 40, background: "rgba(255,255,255,0.15)", color: "white", textDecoration: "none", fontSize: "0.84rem", border: "1px solid rgba(255,255,255,0.3)", letterSpacing: "0.04em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.28)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "none"; }}>
              {s.label}
            </a>
          ))}
        </div>
        <div style={{ marginTop: 48, fontSize: "0.76rem", color: "rgba(255,255,255,0.45)" }}>
          Made with 🌸 by Srikala Sandu &nbsp;·&nbsp;
          <a href="https://github.com/SrikalaSandu" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>GitHub</a>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Dancing+Script:wght@500;700&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #fce8e8; }
        ::-webkit-scrollbar-thumb { background: #e8a0a0; border-radius: 3px; }
      `}</style>
    </div>
  );
}
