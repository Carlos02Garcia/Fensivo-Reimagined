import type { Lang } from "@/lib/i18n";

/**
 * Copy corto y escaneable de la landing rediseñada.
 * Solo dos variantes (es / en); el resto de idiomas cae a inglés.
 */
const es = {
  heroKicker: "Gestión de riesgo humano",
  heroA: "Phishing y amenazas",
  heroB: "bajo control",
  heroSub: "Fensivo ayuda a identificar, medir y reducir el riesgo humano.",
  ctaPrimary: "Explorar Fensivo 360",
  ctaSecondary: "Agenda un demo",
  demoData: "Datos de demostración",

  hrs: "Human Risk Score",
  hrsDelta: "18% este mes",
  highRisk: "Usuarios de alto riesgo",
  phishing: "Eventos de phishing",
  exposures: "Credenciales expuestas",
  trend: "Tendencia · 30 días",

  trustLabel: "Organizaciones que se toman la seguridad en serio.",

  problemTitle: "El riesgo humano no debería ser invisible.",
  flow: [
    { k: "500", v: "empleados" },
    { k: "12", v: "usuarios de alto riesgo" },
    { k: "7", v: "interacciones con phishing" },
    { k: "4", v: "credenciales expuestas" },
    { k: "→", v: "entrenamiento dirigido" },
    { k: "↺", v: "retest" },
    { k: "-41%", v: "riesgo" },
  ],

  methodTitle: "El método Fensivo",
  method: [
    { n: "01", t: "Detectar", d: "Credenciales expuestas y conducta de riesgo." },
    { n: "02", t: "Entender", d: "Por qué una persona está en riesgo." },
    { n: "03", t: "Actuar", d: "Entrenamiento contextual y dirigido." },
    { n: "04", t: "Medir", d: "Retest y verificación de la mejora." },
  ],

  meet: "Conoce Fensivo 360",
  meetSub: "Convierte el comportamiento humano en seguridad medible.",
  tabRisk: "Riesgo",
  tabSignals: "Señales",
  tabPeople: "Personas",
  tabOnboarding: "Onboarding",
  onboardingTitle: "Conecta tu directorio",
  onboardingSub: "Sin agentes, sin scripts. Fensivo lee tu directorio vía OAuth y detecta cada usuario automáticamente.",
  googleWorkspace: "Google Workspace",
  googleStatus: "Conectado",
  ms365: "Microsoft 365",
  msStatus: "Pendiente",
  usersSynced: "Usuarios sincronizados",

  companyRisk: "Company Risk Score",
  target: "Objetivo: < 40 (bueno)",
  systemTrends: "Tendencias del sistema",
  riskScore: "Risk Score",
  clickRate: "Click rate",
  autoResponse: "Auto-respuesta",
  insights: "Insights clave",
  ins1: "Riesgo mejorando −0.03 pts/día",
  ins2: "Click rate ↓ 33% (30% a 20%)",
  ins3: "Auto-respuesta ↑ a 40%",

  signalsTitle: "Cada señal afina el perfil de riesgo",
  sig1: "Credencial filtrada de a.morales@empresa.com, hallada en la dark web.",
  sig2: "Sarah Mitchell falló una simulación de phishing: clic y envío de credenciales.",
  sig2b: "Perfil actualizado · riesgo de phishing en alto",
  sig3: "Reporte semanal de riesgo listo para el equipo.",
  sig3b: "12 personas bajaron de nivel · score −7.5 pts",
  event: "Evento",
  detection: "Detección",
  riskUpdate: "Riesgo actualizado",
  action: "Acción",

  peopleTitle: "Riesgo por persona",
  peopleSub: "128 empleados monitoreados",
  seeProfile: "Ver perfil",

  journeyTitle: "Riesgo → Por qué → Acción → Resultado",
  journeySub: "Así se ve una persona pasando de alto riesgo a riesgo bajo.",
  why: "Por qué",
  recommended: "Acción recomendada",
  result: "Resultado",
  why1: "3 interacciones con phishing",
  why2: "1 credencial expuesta",
  why3: "Entrenamiento vencido",
  actionText: "Asignar entrenamiento contextual",
  runAction: "Aplicar acción",
  reset: "Reiniciar",
  riskReduced: "Riesgo reducido",
  training: "Entrenamiento",
  retest: "Retest",

  insightTitle: "De los datos a la decisión",
  insightMain: "El riesgo humano bajó 18% este mes.",
  insightSub: "La mayor parte de la mejora viene de menos interacciones con phishing.",
  insightAction: "4 personas siguen requiriendo atención.",

  rolesTitle: "Una lectura distinta para cada rol",
  roles: [
    { r: "CISO", s: "Dónde se concentra el riesgo humano." },
    { r: "CEO", s: "Si la postura de seguridad está mejorando." },
    { r: "RR. HH.", s: "Si el entrenamiento cambia el comportamiento." },
    { r: "TI", s: "Responder más rápido a las señales." },
  ],

  testimonialsTitle: "Lo que dicen los equipos de seguridad",
  integrationsTitle: "Conecta rápido. Empieza a medir el riesgo.",
  integrationsSub: "OAuth en minutos, sin agentes.",
  finalTitle: "Ve el riesgo. Entiéndelo. Actúa. Mide la mejora.",
  finalSub: "30 min · demo personalizada.",
};

const en: typeof es = {
  heroKicker: "Human risk management",
  heroA: "Phishing and threats",
  heroB: "under control",
  heroSub: "Fensivo helps organizations identify, measure and reduce human cyber risk.",
  ctaPrimary: "Explore Fensivo 360",
  ctaSecondary: "Book a demo",
  demoData: "Demo data",

  hrs: "Human Risk Score",
  hrsDelta: "18% this month",
  highRisk: "High-risk users",
  phishing: "Phishing events",
  exposures: "Credential exposures",
  trend: "Trend · 30 days",

  trustLabel: "Organizations that take security seriously.",

  problemTitle: "Human risk should not be invisible.",
  flow: [
    { k: "500", v: "employees" },
    { k: "12", v: "high-risk users" },
    { k: "7", v: "phishing interactions" },
    { k: "4", v: "credential exposures" },
    { k: "→", v: "targeted training" },
    { k: "↺", v: "retest" },
    { k: "-41%", v: "risk" },
  ],

  methodTitle: "The Fensivo method",
  method: [
    { n: "01", t: "Detect", d: "Credential exposure and risky behavior." },
    { n: "02", t: "Understand", d: "Why a person is at risk." },
    { n: "03", t: "Act", d: "Targeted contextual training." },
    { n: "04", t: "Measure", d: "Retest and verify improvement." },
  ],

  meet: "Meet Fensivo 360",
  meetSub: "Turn human behavior into measurable security insight.",
  tabRisk: "Risk",
  tabSignals: "Signals",
  tabPeople: "People",
  tabOnboarding: "Onboarding",
  onboardingTitle: "Connect your directory",
  onboardingSub: "No agents, no scripts. Fensivo reads your directory via OAuth and detects every user automatically.",
  googleWorkspace: "Google Workspace",
  googleStatus: "Connected",
  ms365: "Microsoft 365",
  msStatus: "Pending",
  usersSynced: "Users synced",
  

  companyRisk: "Company Risk Score",
  target: "Target: < 40 (good)",
  systemTrends: "System trends",
  riskScore: "Risk score",
  clickRate: "Click rate",
  autoResponse: "Auto-response",
  insights: "Key insights",
  ins1: "Risk improving −0.03 pts/day",
  ins2: "Click rate ↓ 33% (30% to 20%)",
  ins3: "Auto-response ↑ to 40%",

  signalsTitle: "Every signal sharpens the risk profile",
  sig1: "Credential leaked for a.morales@company.com, found on the dark web.",
  sig2: "Sarah Mitchell failed a phishing simulation, clicked and submitted credentials.",
  sig2b: "Profile updated · phishing risk raised to high",
  sig3: "Weekly risk report ready for your team.",
  sig3b: "12 people moved to lower risk · score −7.5 pts",
  event: "Event",
  detection: "Detection",
  riskUpdate: "Risk update",
  action: "Action",

  peopleTitle: "Risk by person",
  peopleSub: "128 employees monitored",
  seeProfile: "View profile",

  journeyTitle: "Risk → Why → Action → Result",
  journeySub: "This is one person moving from high risk to low risk.",
  why: "Why",
  recommended: "Recommended action",
  result: "Result",
  why1: "3 phishing interactions",
  why2: "1 credential exposure",
  why3: "Training overdue",
  actionText: "Assign contextual training",
  runAction: "Run action",
  reset: "Reset",
  riskReduced: "Risk reduced",
  training: "Training",
  retest: "Retest",

  insightTitle: "From data to decision",
  insightMain: "Human risk decreased 18% this month.",
  insightSub: "Most of the improvement came from fewer phishing interactions.",
  insightAction: "4 users still require attention.",

  rolesTitle: "A different read for every role",
  roles: [
    { r: "CISO", s: "Know where human risk is concentrated." },
    { r: "CEO", s: "Understand whether your posture is improving." },
    { r: "HR", s: "Measure whether training changes behavior." },
    { r: "IT", s: "Respond to security signals faster." },
  ],

  testimonialsTitle: "What security teams say",
  integrationsTitle: "Connect quickly. Start measuring risk.",
  integrationsSub: "OAuth in minutes, no agents.",
  finalTitle: "See the risk. Understand it. Act. Measure the improvement.",
  finalSub: "30 min · personalized demo.",
};

export type LandingCopy = typeof es;

export function landingCopy(lang: Lang): LandingCopy {
  return lang === "es" ? es : en;
}
