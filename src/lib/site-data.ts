export type NavLink = { label: string; to: string; params?: Record<string, string>; desc?: string };

export const capabilities: {
  slug: string;
  name: string;
  desc: string;
  long: string;
  metric: string;
  metricLabel: string;
}[] = [
  {
    slug: "credential-monitoring",
    name: "Monitoreo de credenciales",
    desc: "Vigilancia 24/7 de credenciales de tu equipo expuestas en filtraciones y dark web.",
    long: "Monitoreamos continuamente más de 680 bases de filtraciones y fuentes de dark web. Cuando aparece una credencial comprometida de un empleado, el sistema clasifica la criticidad, alerta al administrador según severidad y actualiza el risk score individual.",
    metric: "+680",
    metricLabel: "bases de filtraciones monitoreadas",
  },
  {
    slug: "phishing-simulation",
    name: "Simulación de phishing adaptativa",
    desc: "Hasta 3 simulaciones personalizadas por empleado al mes, según rol y contexto.",
    long: "Cada simulación se adapta al rol, departamento y contexto individual. El sistema escala la complejidad desde phishing básico hasta Business Email Compromise, identificando exactamente qué pretexto engaña a cada persona.",
    metric: "3/mes",
    metricLabel: "simulaciones por empleado",
  },
  {
    slug: "security-awareness",
    name: "Capacitación contextual",
    desc: "Microlearning de 3 a 5 minutos en el instante exacto del error.",
    long: "Cuando alguien falla una simulación, recibe de inmediato una lección corta que le muestra las señales que pasó por alto en ese correo: urgencia artificial, dominios similares, solicitudes sin contexto previo.",
    metric: "3-5 min",
    metricLabel: "de microlearning inmediato",
  },
  {
    slug: "human-risk-score",
    name: "Risk score individual",
    desc: "Una puntuación por persona que refleja su vulnerabilidad real ante ataques dirigidos.",
    long: "El risk score combina comportamiento real en simulaciones, exposición de credenciales y posición en la organización, para que sepas exactamente quién necesita atención y por qué.",
    metric: "1 score",
    metricLabel: "por persona, siempre actualizado",
  },
  {
    slug: "executive-reports",
    name: "Reportes ejecutivos",
    desc: "Primer reporte con risk scores individuales listo en 48 horas.",
    long: "Reportes claros para dirección y comités, generados automáticamente desde los mismos datos que usa el equipo de seguridad, sin configuración manual ni intervención técnica.",
    metric: "48 h",
    metricLabel: "para el primer reporte ejecutivo",
  },
  {
    slug: "integrations",
    name: "Integraciones",
    desc: "Conexión OAuth con Google Workspace o Microsoft 365 en minutos.",
    long: "Sin instalaciones, sin agentes y sin cambios de infraestructura. La plataforma queda operativa en un día. Integraciones con Slack, Teams, SIEM y SSO en desarrollo.",
    metric: "1 día",
    metricLabel: "para quedar operativo",
  },
];

export const useCases: NavLink[] = [
  { label: "Monitoreo de credenciales", to: "/solutions/$slug", params: { slug: "credential-monitoring" } },
  { label: "Simulación de phishing", to: "/solutions/$slug", params: { slug: "phishing-simulation" } },
  { label: "Capacitación contextual", to: "/solutions/$slug", params: { slug: "security-awareness" } },
  { label: "Risk score individual", to: "/solutions/$slug", params: { slug: "human-risk-score" } },
  { label: "Reportes ejecutivos", to: "/solutions/$slug", params: { slug: "executive-reports" } },
  { label: "Integraciones", to: "/solutions/$slug", params: { slug: "integrations" } },
];

export const industries: NavLink[] = [
  { label: "Financial Services", to: "/solutions/$slug", params: { slug: "financial-services" } },
  { label: "Healthcare", to: "/solutions/$slug", params: { slug: "healthcare" } },
  { label: "Technology & SaaS", to: "/solutions/$slug", params: { slug: "technology-saas" } },
  { label: "Retail & E-commerce", to: "/solutions/$slug", params: { slug: "retail-ecommerce" } },
  { label: "Manufacturing", to: "/solutions/$slug", params: { slug: "manufacturing" } },
  { label: "Professional Services", to: "/solutions/$slug", params: { slug: "professional-services" } },
];

export const roles: NavLink[] = [
  { label: "CISO", to: "/solutions/$slug", params: { slug: "ciso" } },
  { label: "Security Teams", to: "/solutions/$slug", params: { slug: "security-teams" } },
  { label: "Developers", to: "/solutions/$slug", params: { slug: "developers" } },
  { label: "IT Teams", to: "/solutions/$slug", params: { slug: "it-teams" } },
  { label: "SOC Teams", to: "/solutions/$slug", params: { slug: "soc-teams" } },
  { label: "Business Leaders", to: "/solutions/$slug", params: { slug: "business-leaders" } },
];

export const solutionCopy: Record<string, { title: string; kicker: string; intro: string; bullets: string[] }> = {
  "credential-monitoring": {
    title: "Monitoreo de credenciales",
    kicker: "Por caso de uso",
    intro:
      "Vigilancia continua de más de 680 bases de filtraciones y dark web para detectar credenciales comprometidas de tu equipo en horas, no en meses.",
    bullets: [
      "Monitoreo 24/7 de dark web y filtraciones",
      "Clasificación automática de criticidad",
      "Alerta al administrador según severidad",
      "Actualización del risk score individual",
    ],
  },
  "phishing-simulation": {
    title: "Simulación de phishing adaptativa",
    kicker: "Por caso de uso",
    intro:
      "Hasta tres simulaciones personalizadas por empleado al mes, adaptadas a su rol, su contexto y su desempeño previo.",
    bullets: [
      "Pretextos personalizados por rol y departamento",
      "Escalado de phishing básico a BEC financiero",
      "Detección del pretexto que engaña a cada persona",
      "Revalidación semanas después del entrenamiento",
    ],
  },
  "security-awareness": {
    title: "Capacitación contextual",
    kicker: "Por caso de uso",
    intro:
      "Microlearning de 3 a 5 minutos en el momento exacto del error, cuando el contexto sigue fresco y el aprendizaje se retiene.",
    bullets: [
      "Lección inmediata tras fallar una simulación",
      "Señales concretas que el empleado pasó por alto",
      "Aprendizaje por refuerzo, no cursos genéricos",
      "Perfil de riesgo actualizado tras cada lección",
    ],
  },
  "human-risk-score": {
    title: "Risk score individual",
    kicker: "Por caso de uso",
    intro:
      "Una puntuación por persona que mide qué tan vulnerable es ante un ataque dirigido, basada en comportamiento real.",
    bullets: [
      "Comportamiento real bajo ataque simulado",
      "Exposición de credenciales del empleado",
      "Posición y criticidad dentro de la organización",
      "Planes de acción por persona, no por departamento",
    ],
  },
  "executive-reports": {
    title: "Reportes ejecutivos",
    kicker: "Por caso de uso",
    intro:
      "Primer reporte ejecutivo con risk scores individuales listo en 48 horas, sin configuración manual.",
    bullets: [
      "Reportes automáticos y fáciles de leer",
      "Evolución del riesgo humano en el tiempo",
      "Comparativas por área y por persona",
      "Diseñado para equipos de seguridad pequeños",
    ],
  },
  integrations: {
    title: "Integraciones",
    kicker: "Por caso de uso",
    intro:
      "Conexión OAuth con Google Workspace o Microsoft 365 en minutos: sin agentes, sin instalaciones, sin cambios de infraestructura.",
    bullets: [
      "OAuth con Google Workspace y Microsoft 365",
      "Operativo en un día",
      "Sin agentes ni despliegues técnicos",
      "Slack, Teams, SIEM y SSO en desarrollo",
    ],
  },
  "vulnerability-management": {
    title: "Vulnerability Management",
    kicker: "Por caso de uso",
    intro:
      "Consolida hallazgos de todas tus fuentes, elimina duplicados y prioriza por explotabilidad real en lugar de severidad teórica.",
    bullets: [
      "Deduplicación y correlación automática",
      "Priorización por explotabilidad y exposición",
      "Asignación y seguimiento de remediación",
      "SLA y métricas de tiempo medio de cierre",
    ],
  },
  "attack-surface": {
    title: "Attack Surface Management",
    kicker: "Por caso de uso",
    intro:
      "Descubre continuamente dominios, APIs, servicios y activos expuestos que ningún inventario manual mantiene actualizado.",
    bullets: [
      "Descubrimiento externo continuo",
      "Detección de shadow IT y entornos olvidados",
      "Mapa de exposición a Internet",
      "Alertas ante nuevos servicios publicados",
    ],
  },
  "threat-detection": {
    title: "Threat Detection",
    kicker: "Por caso de uso",
    intro:
      "Detección basada en comportamiento sobre cloud, identidad y endpoints, con contexto suficiente para actuar en minutos.",
    bullets: [
      "Correlación de telemetría en streaming",
      "Detección de movimiento lateral y abuso de credenciales",
      "Playbooks de contención sugeridos",
      "Línea de tiempo completa de cada investigación",
    ],
  },
  "risk-management": {
    title: "Risk Management",
    kicker: "Por caso de uso",
    intro:
      "Un modelo de riesgo único que traduce hallazgos técnicos en impacto de negocio comprensible para el comité.",
    bullets: [
      "Risk score por unidad de negocio",
      "Tendencias históricas y proyecciones",
      "Aceptación de riesgo documentada",
      "Reportes ejecutivos automáticos",
    ],
  },
  "security-monitoring": {
    title: "Security Monitoring",
    kicker: "Por caso de uso",
    intro:
      "Verificación continua de controles: sabes en cualquier momento qué está protegido, qué se degradó y desde cuándo.",
    bullets: [
      "Monitoreo 24/7 de controles críticos",
      "Alertas por desviación de configuración",
      "Cobertura por tipo de activo",
      "Evidencia continua y trazable",
    ],
  },
  "security-analytics": {
    title: "Security Analytics",
    kicker: "Por caso de uso",
    intro:
      "Analítica sobre todo el grafo de seguridad para responder preguntas del negocio sin exportar datos a otra herramienta.",
    bullets: [
      "Consultas sobre activos, hallazgos y eventos",
      "Tableros configurables por audiencia",
      "Comparativas trimestrales",
      "Exportación a BI y API abierta",
    ],
  },

  "cloud-security": {
    title: "Cloud Security",
    kicker: "Por caso de uso",
    intro:
      "Visibilidad continua de cuentas cloud, configuraciones y cargas de trabajo, con priorización basada en exposición real.",
    bullets: [
      "Inventario multi-cloud unificado",
      "Detección de configuraciones inseguras",
      "Rutas de ataque hacia datos sensibles",
      "Evidencia lista para auditoría",
    ],
  },
  "financial-services": {
    title: "Financial Services",
    kicker: "Por industria",
    intro:
      "Controles verificables, trazabilidad de riesgo y reportes regulatorios para entidades financieras y fintech.",
    bullets: [
      "Riesgo por línea de negocio",
      "Monitoreo de proveedores críticos",
      "Evidencia continua para auditoría",
      "Reportes para comité de riesgos",
    ],
  },
  healthcare: {
    title: "Healthcare",
    kicker: "Por industria",
    intro: "Protección de sistemas clínicos y datos de pacientes sin frenar la operación asistencial.",
    bullets: [
      "Inventario de dispositivos conectados",
      "Priorización sin interrumpir servicio",
      "Segmentación y exposición",
      "Reportes de cumplimiento",
    ],
  },
  "technology-saas": {
    title: "Technology & SaaS",
    kicker: "Por industria",
    intro: "Seguridad que acompaña el ritmo de despliegue de producto y las exigencias de tus clientes enterprise.",
    bullets: ["Cobertura de superficie de APIs", "Seguridad en CI/CD", "Evidencia para due diligence", "Métricas por equipo"],
  },
  "retail-ecommerce": {
    title: "Retail & E-commerce",
    kicker: "Por industria",
    intro: "Protege canales digitales y pagos en temporadas de alta demanda.",
    bullets: ["Monitoreo de tiendas y APIs", "Detección de fraude técnico", "Exposición de terceros", "Alertas en picos de tráfico"],
  },
  manufacturing: {
    title: "Manufacturing",
    kicker: "Por industria",
    intro: "Convergencia IT/OT con visibilidad sobre activos industriales y continuidad operativa.",
    bullets: ["Inventario IT/OT", "Riesgo por planta", "Monitoreo de accesos remotos", "Reducción de paradas"],
  },
  "professional-services": {
    title: "Professional Services",
    kicker: "Por industria",
    intro: "Protege información confidencial de clientes con una postura demostrable.",
    bullets: ["Clasificación de exposición", "Riesgo por cliente", "Evidencia comercial", "Monitoreo continuo"],
  },
  ciso: {
    title: "CISO",
    kicker: "Por rol",
    intro: "Una narrativa de riesgo defendible ante el comité, respaldada por datos verificables.",
    bullets: ["Riesgo agregado y por dominio", "Tendencias trimestrales", "Justificación de inversión", "Cobertura de controles"],
  },
  "security-teams": {
    title: "Security Teams",
    kicker: "Por rol",
    intro: "Menos ruido, más contexto: prioriza lo explotable y cierra el ciclo de remediación.",
    bullets: ["Cola priorizada por riesgo", "Contexto de activo y dueño", "Flujos de remediación", "SLA visibles"],
  },
  developers: {
    title: "Developers",
    kicker: "Por rol",
    intro: "Hallazgos accionables en el lenguaje del equipo de ingeniería, sin fricción.",
    bullets: ["Integración con tickets", "Guías de remediación", "Alertas por servicio", "Sin falsos positivos masivos"],
  },
  "it-teams": {
    title: "IT Teams",
    kicker: "Por rol",
    intro: "Inventario confiable y parcheo ordenado sobre toda la infraestructura.",
    bullets: ["Inventario continuo", "Ventanas de mantenimiento", "Cobertura de agentes", "Reportes operativos"],
  },
  "soc-teams": {
    title: "SOC Teams",
    kicker: "Por rol",
    intro: "Investigación más rápida con telemetría correlacionada y contexto de negocio.",
    bullets: ["Línea de tiempo unificada", "Enriquecimiento automático", "Playbooks", "Métricas MTTD/MTTR"],
  },
  "business-leaders": {
    title: "Business Leaders",
    kicker: "Por rol",
    intro: "Entiende el riesgo digital en términos de impacto de negocio, no de jerga técnica.",
    bullets: ["Riesgo por unidad de negocio", "Impacto estimado", "Comparativas trimestrales", "Resumen ejecutivo"],
  },
};

export const customers = [
  {
    slug: "nexa-technologies",
    name: "Nexa Technologies",
    industry: "Technology & SaaS",
    challenge: "Visibilidad limitada sobre una infraestructura cloud en expansión constante.",
    solution: "Fensivo 360 unificó el descubrimiento de activos y el monitoreo continuo en una sola vista.",
    result: "42%",
    resultLabel: "más rápido en identificar riesgo crítico",
    quote:
      "Fensivo le dio a nuestro equipo de seguridad la visibilidad que necesitábamos para priorizar los riesgos que realmente importan.",
    person: "Laura Martínez",
    role: "Chief Information Security Officer",
    stats: [
      { k: "1.240", v: "activos descubiertos" },
      { k: "-58%", v: "hallazgos duplicados" },
      { k: "9 días", v: "para cobertura total" },
    ],
  },
  {
    slug: "andes-financial",
    name: "Andes Financial",
    industry: "Financial Services",
    challenge: "Reportes de riesgo manuales que llegaban tarde al comité y sin evidencia trazable.",
    solution: "Modelo de riesgo unificado con evidencia continua y reportes ejecutivos automáticos.",
    result: "-71%",
    resultLabel: "en tiempo de preparación de auditoría",
    quote:
      "Pasamos de discutir si los datos eran correctos a discutir qué hacer con ellos. Ese cambio lo transformó todo.",
    person: "Daniel Restrepo",
    role: "VP of Risk & Compliance",
    stats: [
      { k: "4 h", v: "por reporte trimestral" },
      { k: "100%", v: "controles con evidencia" },
      { k: "3", v: "auditorías sin hallazgos" },
    ],
  },
  {
    slug: "cloudcore",
    name: "CloudCore",
    industry: "Cloud Infrastructure",
    challenge: "Herramientas fragmentadas generaban alertas duplicadas y fatiga en el SOC.",
    solution: "Correlación de telemetría y priorización por explotabilidad dentro de Fensivo 360.",
    result: "-66%",
    resultLabel: "de reducción en ruido de alertas",
    quote: "El SOC recuperó su capacidad de investigar en profundidad en lugar de cerrar tickets en serie.",
    person: "Sofía Delgado",
    role: "Head of Security Operations",
    stats: [
      { k: "18k", v: "eventos correlacionados/día" },
      { k: "<5 min", v: "de triage inicial" },
      { k: "+27%", v: "de casos investigados a fondo" },
    ],
  },
];

export const logos = [
  "Nexa Technologies",
  "Andes Financial",
  "CloudCore",
  "Vertex Systems",
  "Finova",
  "NorthGrid",
  "SecureLabs",
  "Datacore",
];

export const testimonials = [
  {
    name: "Laura Martínez",
    role: "Chief Information Security Officer",
    company: "Nexa Technologies",
    quote:
      "Fensivo le dio a nuestro equipo la visibilidad que necesitábamos para priorizar los riesgos que realmente importan.",
    initials: "LM",
  },
  {
    name: "Daniel Restrepo",
    role: "VP of Risk & Compliance",
    company: "Andes Financial",
    quote:
      "Por primera vez presentamos riesgo al comité con evidencia continua en lugar de una foto trimestral.",
    initials: "DR",
  },
  {
    name: "Sofía Delgado",
    role: "Head of Security Operations",
    company: "CloudCore",
    quote: "Redujimos el ruido de alertas a la mitad en seis semanas y el equipo volvió a investigar de verdad.",
    initials: "SD",
  },
  {
    name: "Andrés Villamil",
    role: "Director of IT Infrastructure",
    company: "NorthGrid",
    quote: "El inventario continuo encontró servicios expuestos que ningún proceso manual había registrado.",
    initials: "AV",
  },
];

export const resourceCategories = [
  { slug: "blog", label: "Security Blog" },
  { slug: "research", label: "Research" },
  { slug: "guides", label: "Cybersecurity Guides" },
  { slug: "case-studies", label: "Case Studies" },
  { slug: "webinars", label: "Webinars" },
];

export const resourceTopics = [
  "Vulnerability Management",
  "Threat Detection",
  "Attack Surface",
  "Risk",
  "Cloud Security",
  "Compliance",
  "AI Security",
];

export const resources = [
  {
    slug: "future-of-continuous-cybersecurity",
    title: "The Future of Continuous Cybersecurity",
    category: "research",
    topic: "Risk",
    read: "12 min",
    date: "2026-07-14",
    featured: true,
    excerpt:
      "Por qué la verificación continua reemplazará a la evaluación periódica como estándar de facto en programas de seguridad enterprise.",
  },
  {
    slug: "priorizar-vulnerabilidades-explotables",
    title: "Cómo priorizar vulnerabilidades realmente explotables",
    category: "guides",
    topic: "Vulnerability Management",
    read: "9 min",
    date: "2026-06-28",
    excerpt: "Un marco práctico para pasar de 12.000 hallazgos a las 40 decisiones que reducen riesgo esta semana.",
  },
  {
    slug: "superficie-de-ataque-invisible",
    title: "La superficie de ataque invisible de tu organización",
    category: "blog",
    topic: "Attack Surface",
    read: "7 min",
    date: "2026-06-05",
    excerpt: "Subdominios olvidados, APIs de staging y buckets abiertos: el inventario que nadie mantiene.",
  },
  {
    slug: "deteccion-comportamiento-cloud",
    title: "Detección basada en comportamiento en entornos cloud",
    category: "research",
    topic: "Cloud Security",
    read: "14 min",
    date: "2026-05-22",
    excerpt: "Análisis de patrones de movimiento lateral observados en infraestructuras multi-cloud.",
  },
  {
    slug: "caso-nexa-technologies",
    title: "Caso Nexa Technologies: visibilidad total en 9 días",
    category: "case-studies",
    topic: "Attack Surface",
    read: "6 min",
    date: "2026-05-09",
    excerpt: "Cómo un equipo de siete personas logró cobertura completa sobre una infraestructura en crecimiento.",
  },
  {
    slug: "webinar-riesgo-para-junta-directiva",
    title: "Webinar: presentar riesgo digital a la junta directiva",
    category: "webinars",
    topic: "Compliance",
    read: "45 min",
    date: "2026-04-30",
    excerpt: "Sesión práctica sobre cómo traducir métricas técnicas en decisiones de inversión.",
  },
  {
    slug: "ia-en-operaciones-de-seguridad",
    title: "IA en operaciones de seguridad: dónde sí y dónde no",
    category: "blog",
    topic: "AI Security",
    read: "8 min",
    date: "2026-04-11",
    excerpt: "Automatización útil frente a automatización peligrosa en el ciclo de detección y respuesta.",
  },
  {
    slug: "guia-cumplimiento-continuo",
    title: "Guía de cumplimiento continuo para equipos pequeños",
    category: "guides",
    topic: "Compliance",
    read: "11 min",
    date: "2026-03-19",
    excerpt: "Controles, evidencia y cadencia mínima viable para sostener certificaciones sin equipo dedicado.",
  },
  {
    slug: "anatomia-de-una-deteccion",
    title: "Anatomía de una detección: de la señal al contexto",
    category: "blog",
    topic: "Threat Detection",
    read: "10 min",
    date: "2026-02-27",
    excerpt: "Recorrido completo por una investigación real reconstruida con datos sintéticos.",
  },
];

/* ---------- Product tour mock data ---------- */

export const tourVulnerabilities = [
  {
    id: "FNS-4821",
    severity: "CRITICAL",
    asset: "api.production.fensivo.cloud",
    cve: "CVE-2026-1183",
    risk: 92,
    status: "Needs remediation",
    recommendation: "Aplicar parche de seguridad del proveedor y rotar credenciales de servicio expuestas.",
  },
  {
    id: "FNS-4790",
    severity: "HIGH",
    asset: "gateway-eu.fensivo.cloud",
    cve: "CVE-2026-0932",
    risk: 81,
    status: "In progress",
    recommendation: "Actualizar la librería TLS y desactivar cifrados heredados en el balanceador.",
  },
  {
    id: "FNS-4712",
    severity: "HIGH",
    asset: "storage-prod-01",
    cve: "CVE-2025-8841",
    risk: 74,
    status: "Needs remediation",
    recommendation: "Restringir política de acceso público y habilitar cifrado gestionado por cliente.",
  },
  {
    id: "FNS-4655",
    severity: "MEDIUM",
    asset: "internal-crm.corp",
    cve: "CVE-2025-7420",
    risk: 55,
    status: "Scheduled",
    recommendation: "Programar actualización en la próxima ventana de mantenimiento.",
  },
  {
    id: "FNS-4601",
    severity: "LOW",
    asset: "docs.fensivo.co",
    cve: "CVE-2025-6614",
    risk: 28,
    status: "Accepted risk",
    recommendation: "Riesgo aceptado con revisión trimestral documentada.",
  },
];

export const tourThreats = [
  {
    id: "THR-2291",
    threat: "Intento de movimiento lateral",
    severity: "CRITICAL",
    source: "10.42.8.19 · VPN corporativa",
    time: "hace 8 min",
    action: "Sesión aislada",
    recommendation: "Revisar credenciales del usuario y validar el origen del acceso remoto.",
  },
  {
    id: "THR-2288",
    threat: "Credencial filtrada detectada",
    severity: "HIGH",
    source: "Fuente externa · foro privado",
    time: "hace 41 min",
    action: "Rotación forzada",
    recommendation: "Forzar cambio de contraseña y revisar accesos de los últimos 30 días.",
  },
  {
    id: "THR-2280",
    threat: "Escaneo de puertos sostenido",
    severity: "MEDIUM",
    source: "203.0.113.44",
    time: "hace 2 h",
    action: "Bloqueo temporal",
    recommendation: "Mantener bloqueo y correlacionar con intentos previos del mismo ASN.",
  },
  {
    id: "THR-2274",
    threat: "Configuración cloud modificada",
    severity: "MEDIUM",
    source: "cuenta prod-eu-1",
    time: "hace 5 h",
    action: "Revertida",
    recommendation: "Validar el cambio con el equipo de plataforma y documentar excepción.",
  },
];

export const tourAssets = [
  { group: "Cloud", count: 428, coverage: 98, note: "3 cuentas · 6 regiones" },
  { group: "Servers", count: 316, coverage: 95, note: "142 productivos" },
  { group: "Endpoints", count: 1874, coverage: 91, note: "agente desplegado" },
  { group: "Applications", count: 212, coverage: 88, note: "47 expuestas a Internet" },
];

export const trendData = [
  { m: "Feb", riesgo: 74, hallazgos: 320 },
  { m: "Mar", riesgo: 69, hallazgos: 288 },
  { m: "Abr", riesgo: 63, hallazgos: 254 },
  { m: "May", riesgo: 58, hallazgos: 231 },
  { m: "Jun", riesgo: 49, hallazgos: 198 },
  { m: "Jul", riesgo: 42, hallazgos: 164 },
];
