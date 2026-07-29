import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const contact = {
  email: "2781647622@qq.com",
  phone: "+86 187-9511-2595",
  portfolio: "https://github.com/y2781647622-rgb/Portfolio",
  linkedin: "https://www.linkedin.com/in/shenghua-yang",
};

const shared = {
  en: {
    name: "Yang Shenghua",
    location: "Singapore",
    education: [
      {
        school: "Singapore University of Technology and Design",
        degree: "Master of Science, Human-Centered Design",
        date: "2025–Present",
        location: "Singapore",
        detail: "Relevant coursework: Design Thinking, UX Design, Data Visualization Design, Design Science, Ethical Design, Human Behavior, and Service Operations.",
      },
      {
        school: "Tianjin Chengjian University",
        degree: "Bachelor of Engineering, Civil Engineering",
        date: "2020–2024",
        location: "Tianjin, China",
        detail: "Foundation in engineering systems, field measurement, construction workflows, quality control, and structured problem solving.",
      },
    ],
    kkh: {
      company: "KK Women's and Children's Hospital (KKH)",
      role: "Service Design Project Contributor | PREMs Toolkits",
      date: "May 2026–Present",
      location: "Singapore | Expected Aug 2026",
      bullets: [
        "Contributing to the service design of PREMs Toolkits in a Singapore women's and children's hospital context, applying human-centered design to patient-experience feedback.",
      ],
    },
    otherExperience: [
      {
        company: "China Construction Third Engineering Bureau Group Co., Ltd.",
        role: "Site Engineering Intern",
        date: "Jul 2023–Sep 2023",
        location: "China",
        bullets: ["Supported on-site safety training and collected spatial data through foundation measurement and formwork inspection for quality-control activities."],
      },
      {
        company: "Ningxia Tongyi Construction Company",
        role: "Technical Assistant",
        date: "Jul 2022–Sep 2022",
        location: "China",
        bullets: ["Organized drawings, technical records, and construction documents into a structured archive to improve retrieval and documentation clarity."],
      },
    ],
    language: "Mandarin Chinese (native); English (English-taught MSc program)",
  },
  zh: {
    name: "杨生华",
    englishName: "Shenghua Yang",
    location: "新加坡",
    education: [
      {
        school: "新加坡科技设计大学",
        degree: "理学硕士，Human-Centered Design",
        date: "2025–至今",
        location: "新加坡",
        detail: "相关课程：设计思维、用户体验设计、数据可视化设计、设计科学、伦理设计、人类行为与服务运营。",
      },
      {
        school: "天津城建大学",
        degree: "工学学士，土木工程",
        date: "2020–2024",
        location: "中国天津",
        detail: "具备工程系统、现场测量、施工流程、质量控制与结构化问题分析基础。",
      },
    ],
    kkh: {
      company: "新加坡 KK 妇女与儿童医院（KKH）",
      role: "服务设计项目成员｜PREMs Toolkits",
      date: "2026.05–至今",
      location: "新加坡｜预计至 2026.08",
      bullets: ["参与 KKH 的 PREMs Toolkits 服务设计，在妇幼医疗场景中关注患者体验反馈的服务设计应用。"],
    },
    otherExperience: [
      {
        company: "中建三局集团有限公司",
        role: "现场施工员实习生",
        date: "2023.07–2023.09",
        location: "中国",
        bullets: ["协助开展现场安全教育培训，并参与地基测量与模板工程检查，采集空间数据以支持施工质量控制。"],
      },
      {
        company: "宁夏同益建筑公司",
        role: "技术助理",
        date: "2022.07–2022.09",
        location: "中国",
        bullets: ["负责工程资料、图纸、技术记录与规范文件的分类整理、信息录入和归档，提升资料检索与文档清晰度。"],
      },
    ],
    language: "普通话母语；英语可适应英文授课与跨文化沟通场景",
  },
};

const tracks = [
  {
    id: "built-environment",
    level: "ready",
    en: {
      label: "Built Environment & Construction Technology",
      headline: "MSc Candidate in Human-Centered Design | Built Environment & Construction Technology",
      profile: "Civil-engineering graduate and Human-Centered Design MSc candidate with hands-on experience in site documentation, quality-control support, and construction workflow coordination. Brings a systems perspective to built-environment digitalization, construction information flow, and user-centered operational tools.",
      crRole: "Construction Technician | Construction Coordination & Digital Documentation",
      crBullets: [
        "Maintained standardized construction logs and daily progress reports, transforming site activities into structured records for coordination and management review.",
        "Supported box-girder inspection, reporting, and lifecycle-maintenance documentation across quality, safety, and compliance requirements.",
      ],
      skills: [
        ["Built environment", "Construction workflows, field measurement, technical documentation, quality and safety process support"],
        ["Digitalization", "Workflow analysis, information organization, progress tracking, process standardization"],
        ["Tools", "AutoCAD, BIM, Excel, PowerPoint, Figma, FigJam"],
      ],
      focus: ["Construction Technology Intern", "BIM / Digitalization Coordinator", "Built Environment Operations", "Project Controls Support"],
    },
    zh: {
      label: "建筑 / 建成环境与工程科技",
      headline: "SUTD Human-Centered Design 硕士在读｜建筑 / 建成环境与工程科技",
      profile: "土木工程背景、Human-Centered Design 硕士在读，具备现场资料管理、质量控制支持与施工流程协作经验。关注建成环境数字化、施工信息流与以人为本的现场运营工具，适合工程科技与建成环境协同类岗位。",
      crRole: "施工技术员｜施工协调与数字化资料管理",
      crBullets: [
        "负责标准化施工日志与每日进度数据填报，将现场活动转化为支持协同与管理复盘的结构化记录。",
        "参与箱梁报验、质量记录及全周期养护资料整理，支持关键工序的质量、安全与合规信息追溯。",
      ],
      skills: [
        ["建成环境", "施工流程、现场测量、技术文档、质量与安全流程支持"],
        ["数字化", "流程分析、信息组织、进度追踪、流程标准化"],
        ["工具", "AutoCAD、BIM、Excel、PowerPoint、Figma、FigJam"],
      ],
      focus: ["工程科技实习生", "BIM / 数字化协调", "建成环境运营", "项目控制支持"],
    },
  },
  {
    id: "uiux",
    level: "ready",
    en: {
      label: "UX Research & Interaction Design",
      headline: "MSc Candidate in Human-Centered Design | UX Research & Interaction Design",
      profile: "Human-Centered Design MSc candidate with a civil-engineering background and firsthand exposure to complex frontline workflows. Combines field observation, documentation, and workflow analysis to understand user needs in operational systems and shape clearer, safer digital experiences.",
      crRole: "Construction Technician | Workflow Research & Field Documentation",
      crBullets: [
        "Produced standardized construction logs and daily progress reports, translating complex activities into structured information for coordination and decision making.",
        "Collaborated with quality inspectors and construction crews during high-precision work, observing communication gaps and documentation friction in frontline workflows.",
      ],
      skills: [
        ["Research", "User research, field observation, journey mapping, workflow analysis, problem framing"],
        ["Design", "Wireframing, low-fidelity prototyping, information visualization, design thinking"],
        ["Tools", "Figma, FigJam, Excel, PowerPoint, AutoCAD, BIM"],
      ],
      focus: ["UX Research Intern", "Interaction Design Intern", "Enterprise UX", "Service Design"],
    },
    zh: {
      label: "UI/UX 研究与交互设计",
      headline: "SUTD Human-Centered Design 硕士在读｜UI/UX 研究与交互设计",
      profile: "具备土木工程背景与复杂现场一线经验的 Human-Centered Design 硕士在读候选人。能够结合现场观察、流程记录与信息分析理解用户需求，关注通过更清晰的交互、信息架构与流程设计提升复杂业务系统的可用性与安全性。",
      crRole: "施工技术员｜流程研究与现场资料管理",
      crBullets: [
        "负责标准化施工日志与每日进度数据填报，将复杂现场活动转化为支持协同与决策的结构化信息。",
        "在高精度工序中与质检团队及施工班组协作，观察一线沟通、确认与文档流转中的信息断点。",
      ],
      skills: [
        ["研究", "用户研究、现场观察、用户旅程梳理、流程分析、问题定义"],
        ["设计", "线框图、低保真原型、信息可视化、以人为本设计、设计思维"],
        ["工具", "Figma、FigJam、Excel、PowerPoint、AutoCAD、BIM"],
      ],
      focus: ["UX 研究实习生", "交互设计实习生", "企业服务 UX", "服务设计"],
    },
  },
  {
    id: "product-design",
    level: "ready",
    en: {
      label: "Product Design & Enterprise Systems",
      headline: "MSc Candidate in Human-Centered Design | Product Design & Enterprise Systems",
      profile: "Human-Centered Design MSc candidate with experience structuring operational data, documenting complex workflows, and collaborating across technical and frontline teams. Interested in product design for enterprise and service systems where clear information, trustworthy records, and practical user flows matter.",
      crRole: "Construction Technician | Operational Data & Product-Workflow Insight",
      crBullets: [
        "Organized daily construction activities into standardized logs and progress records, strengthening a product-design perspective on information hierarchy and workflow clarity.",
        "Identified friction in site reporting and document circulation, building practical insight into operational user needs and process improvement opportunities.",
      ],
      skills: [
        ["Product design", "Problem framing, workflow analysis, information architecture, wireframing, low-fidelity prototyping"],
        ["Enterprise context", "Operational data, technical documentation, quality and safety process understanding"],
        ["Tools", "Figma, FigJam, Excel, PowerPoint, AutoCAD, BIM"],
      ],
      focus: ["Product Design Intern", "Enterprise Product Intern", "Service / Platform Design", "Design Operations"],
    },
    zh: {
      label: "产品设计与企业系统",
      headline: "SUTD Human-Centered Design 硕士在读｜产品设计与企业系统",
      profile: "Human-Centered Design 硕士在读，具备将复杂现场活动结构化为数据、记录与协作机制的经验。关注企业与服务系统中的信息层级、流程清晰度和用户需求，适合产品设计、企业产品与设计运营类实习岗位。",
      crRole: "施工技术员｜运营数据与产品流程洞察",
      crBullets: [
        "将每日施工活动整理为标准化日志与进度记录，形成对信息层级、数据可读性与流程清晰度的产品设计视角。",
        "识别现场汇报与资料流转中的低效点，积累对运营型用户需求与流程改进机会的实践理解。",
      ],
      skills: [
        ["产品设计", "问题定义、流程分析、信息架构、线框图、低保真原型"],
        ["企业场景", "运营数据、技术文档、质量与安全流程理解"],
        ["工具", "Figma、FigJam、Excel、PowerPoint、AutoCAD、BIM"],
      ],
      focus: ["产品设计实习生", "企业产品实习生", "服务 / 平台设计", "设计运营"],
    },
  },
  {
    id: "embodied-intelligence",
    level: "transition",
    en: {
      label: "Embodied Intelligence & Human-Robot Interaction",
      headline: "MSc Candidate in Human-Centered Design | Embodied Intelligence & Human-Robot Interaction",
      profile: "Human-Centered Design MSc candidate with a civil-engineering background and experience in physical, safety-critical work environments. Brings a human-factors perspective to how people understand instructions, use tools, and coordinate in spatial workflows; seeking internship roles at the intersection of people, intelligent systems, and the physical world.",
      crRole: "Construction Technician | Physical Workflow & Human-Factors Observation",
      crBullets: [
        "Documented construction activities and progress data in a physical, safety-critical setting, building an understanding of task sequence, environmental constraints, and information handoffs.",
        "Worked alongside inspection teams and frontline crews during high-precision operations, observing how instructions and confirmation processes shape safe execution.",
      ],
      skills: [
        ["Human-centered systems", "Field observation, human factors, spatial workflows, task analysis, workflow requirements"],
        ["Design", "User research, problem framing, wireframing, low-fidelity prototyping, information visualization"],
        ["Tools", "Figma, FigJam, Excel, AutoCAD, BIM"],
      ],
      focus: ["HRI / Embodied AI Product Intern", "Human Factors Intern", "Robotics UX Research", "Intelligent Systems Design"],
    },
    zh: {
      label: "具身智能与人机交互",
      headline: "SUTD Human-Centered Design 硕士在读｜具身智能与人机交互",
      profile: "具备工程现场和安全关键物理环境经验的 Human-Centered Design 硕士在读候选人。关注人在空间工作流中如何理解指令、使用工具和协同执行任务，适合人机交互、具身智能产品体验与人因研究类实习岗位。",
      crRole: "施工技术员｜物理工作流与人因观察",
      crBullets: [
        "在安全关键的物理现场记录施工活动与进度数据，理解任务顺序、环境约束与信息交接。",
        "在高精度工序中与质检团队和一线班组协作，观察指令、确认机制如何影响安全执行。",
      ],
      skills: [
        ["人本系统", "现场观察、人因视角、空间工作流、任务分析、流程需求"],
        ["设计", "用户研究、问题定义、线框图、低保真原型、信息可视化"],
        ["工具", "Figma、FigJam、Excel、AutoCAD、BIM"],
      ],
      focus: ["具身智能 / HRI 产品实习生", "人因研究实习生", "机器人 UX 研究", "智能系统设计"],
    },
  },
  {
    id: "ai-product",
    level: "transition",
    en: {
      label: "AI Product & Human-Centered AI",
      headline: "MSc Candidate in Human-Centered Design | AI Product & Human-Centered AI",
      profile: "Human-Centered Design MSc candidate with experience turning complex field activities into structured records and workflow insight. Interested in AI product and AI UX roles that translate user needs, information quality, and operational constraints into clear product requirements and responsible experiences.",
      crRole: "Construction Technician | Structured Data & Operational Workflow Insight",
      crBullets: [
        "Maintained standardized logs and daily progress data, translating unstructured site activities into records that supported tracking and management review.",
        "Identified friction in field reporting and information circulation, building an understanding of data quality, workflow requirements, and user adoption in operational systems.",
      ],
      skills: [
        ["AI product foundation", "User research, workflow analysis, information architecture, data visualization, responsible-design awareness"],
        ["Product practice", "Problem framing, user journeys, low-fidelity prototyping, service operations"],
        ["Tools", "Figma, FigJam, Excel, PowerPoint"],
      ],
      focus: ["AI Product Intern", "AI UX Research", "Human-Centered AI", "AI Design Operations"],
    },
    zh: {
      label: "AI 产品与人本智能体验",
      headline: "SUTD Human-Centered Design 硕士在读｜AI 产品与人本智能体验",
      profile: "具备将复杂现场活动转化为结构化记录和流程洞察经验的 Human-Centered Design 硕士在读候选人。关注 AI 产品如何将用户需求、信息质量和运营约束转化为清晰的产品需求与负责任的智能体验，适合 AI 产品、AI UX 与设计运营类实习岗位。",
      crRole: "施工技术员｜结构化数据与运营流程洞察",
      crBullets: [
        "维护标准化施工日志与每日进度数据，将非结构化现场活动转化为支持追踪与管理复盘的记录。",
        "识别现场汇报和信息流转中的摩擦点，积累对数据质量、流程需求与运营系统用户采纳的理解。",
      ],
      skills: [
        ["AI 产品基础", "用户研究、流程分析、信息架构、数据可视化、负责任设计意识"],
        ["产品实践", "问题定义、用户旅程、低保真原型、服务运营"],
        ["工具", "Figma、FigJam、Excel、PowerPoint"],
      ],
      focus: ["AI 产品实习生", "AI UX 研究", "人本智能体验", "AI 设计运营"],
    },
  },
  {
    id: "healthcare-service",
    level: "ready",
    en: {
      label: "Healthcare Service Design & Patient Experience",
      headline: "MSc Candidate in Human-Centered Design | Healthcare Service Design & Patient Experience",
      profile: "Human-Centered Design MSc candidate with experience in safety-critical operations and an ongoing service-design project at KKH. Interested in improving healthcare and public-service experiences through patient feedback, workflow analysis, clear information, and coordinated service delivery.",
      crRole: "Construction Technician | Safety-Critical Workflow & Service-Process Insight",
      crBullets: [
        "Maintained standardized site records and collaborated across quality and frontline teams, building a practical understanding of traceability, information confirmation, and coordinated delivery in safety-critical work.",
        "Identified reporting and documentation friction in field workflows, informing a service-design perspective on clearer tools and support processes.",
      ],
      skills: [
        ["Service design", "Patient-experience feedback, workflow analysis, journey mapping, stakeholder awareness, process improvement"],
        ["Safety-critical context", "Information traceability, documentation, quality and safety process support"],
        ["Tools", "Figma, FigJam, Excel, PowerPoint"],
      ],
      focus: ["Healthcare Service Design Intern", "Patient Experience Intern", "Service Design Research", "Healthcare Innovation"],
    },
    zh: {
      label: "医疗服务设计与患者体验",
      headline: "SUTD Human-Centered Design 硕士在读｜医疗服务设计与患者体验",
      profile: "Human-Centered Design 硕士在读，具备安全关键场景中的流程记录、质量协同与现场观察经验，并正在参与 KKH 的服务设计项目。关注以患者体验反馈、流程分析、清晰信息与协同服务交付改善医疗和公共服务体验。",
      crRole: "施工技术员｜安全关键流程与服务过程洞察",
      crBullets: [
        "维护标准化现场记录，并与质检团队和一线班组协作，积累对信息可追溯、确认机制和安全关键场景协同交付的实践理解。",
        "识别现场汇报与资料流转中的摩擦点，形成对更清晰工具和服务支持流程的设计视角。",
      ],
      skills: [
        ["服务设计", "患者体验反馈、流程分析、用户旅程、利益相关方意识、流程改进"],
        ["安全关键场景", "信息可追溯、资料管理、质量与安全流程支持"],
        ["工具", "Figma、FigJam、Excel、PowerPoint"],
      ],
      focus: ["医疗服务设计实习生", "患者体验实习生", "服务设计研究", "医疗创新"],
    },
  },
  {
    id: "pm",
    level: "ready",
    en: {
      label: "Project Coordination & Operations",
      headline: "MSc Candidate in Human-Centered Design | Project Coordination & Operations",
      profile: "MSc candidate with hands-on construction project-coordination experience across site documentation, schedule tracking, quality-control support, and safety-process execution. Skilled at organizing complex workflow information, coordinating with technical and frontline teams, and maintaining traceable records that support reliable operations.",
      crRole: "Construction Technician | Project Coordination & Site Documentation",
      crBullets: [
        "Maintained standardized construction logs and daily progress reports, converting site activities into structured data for schedule tracking and management review.",
        "Supported box-girder inspection, reporting, and lifecycle-maintenance documentation to keep key work records traceable across quality, safety, and compliance requirements.",
        "Coordinated with quality inspection teams and construction crews during grouting and anchor-sealing operations, supporting clear task handoffs and information flow.",
      ],
      skills: [
        ["Project coordination", "Schedule tracking, task coordination, project documentation, quality-control support, safety-process support"],
        ["Operations", "Workflow analysis, process standardization, risk identification, cross-functional coordination, data reporting"],
        ["Tools", "Excel, PowerPoint, AutoCAD, BIM, Figma, FigJam"],
      ],
      focus: ["Project Coordination", "PMO Support", "Operations Analysis", "Construction Technology"],
    },
    zh: {
      label: "项目协调与运营分析",
      headline: "SUTD Human-Centered Design 硕士在读｜项目协调与运营分析",
      profile: "具备工程现场项目协调经验的 Human-Centered Design 硕士在读候选人。覆盖施工日志、进度追踪、质量资料、安全培训支持与现场协作，能够将复杂施工活动整理为清晰、可追溯的项目记录，并支持跨团队的信息传递与流程改进。",
      crRole: "施工技术员｜项目协调与现场资料管理",
      crBullets: [
        "负责标准化施工日志与每日进度数据填报，将现场施工活动转化为支持进度追踪与管理复盘的结构化项目数据。",
        "参与箱梁报验、质量记录及全周期养护资料整理，支持关键工序满足质量、安全与合规要求。",
        "在箱梁压浆、封锚等高精度工序中与质检团队及施工班组协作，支持现场任务衔接和信息传递。",
      ],
      skills: [
        ["项目协调", "进度追踪、任务协调、项目文档管理、质量控制支持、安全流程支持"],
        ["运营分析", "流程分析、流程标准化、风险识别、跨团队协作、数据汇报"],
        ["工具", "Excel、PowerPoint、AutoCAD、BIM、Figma、FigJam"],
      ],
      focus: ["项目协调", "PMO 支持", "运营分析", "工程科技"],
    },
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function list(items) {
  return `<ul class="compact-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function experience(entry) {
  return `<article class="job"><div class="entry-header"><div><h3 class="entry-title">${escapeHtml(entry.company)}</h3><p class="entry-subtitle">${escapeHtml(entry.role)}</p></div><p class="entry-meta">${escapeHtml(entry.date)}<span>${escapeHtml(entry.location)}</span></p></div>${list(entry.bullets)}</article>`;
}

function education(entry) {
  return `<article class="edu"><div class="entry-header"><div><h3 class="entry-title">${escapeHtml(entry.school)}</h3><p class="entry-subtitle">${escapeHtml(entry.degree)}</p></div><p class="entry-meta">${escapeHtml(entry.date)}<span>${escapeHtml(entry.location)}</span></p></div>${list([entry.detail])}</article>`;
}

function skillRows(skills) {
  return `<dl class="skill-list">${skills.map(([label, content]) => `<div><dt>${escapeHtml(label)}:</dt> <dd>${escapeHtml(content)}</dd></div>`).join("")}</dl>`;
}

function contactLine(lang, data) {
  if (lang === "en") {
    return `<div class="contact"><a href="mailto:${contact.email}">${contact.email}</a><a href="tel:${contact.phone}">${contact.phone}</a><span>${data.location}</span><a href="${contact.portfolio}">Portfolio</a><a href="${contact.linkedin}">LinkedIn: shenghua-yang</a></div>`;
  }
  return `<div class="contact"><a href="mailto:${contact.email}"><strong>邮箱：</strong>${contact.email}</a><a href="tel:${contact.phone}"><strong>电话：</strong>${contact.phone}</a><span><strong>地点：</strong>${data.location}</span><a href="${contact.portfolio}"><strong>作品集：</strong>Portfolio</a><a href="${contact.linkedin}"><strong>LinkedIn：</strong>shenghua-yang</a></div>`;
}

function resumePage(track, lang) {
  const data = shared[lang];
  const content = track[lang];
  const isEnglish = lang === "en";
  const cr16 = {
    company: isEnglish ? "China Railway 16th Bureau Group First Engineering Co., Ltd." : "中铁十六局集团第一工程有限公司",
    role: content.crRole,
    date: isEnglish ? "Jul 2024–Sep 2025" : "2024.07–2025.09",
    location: isEnglish ? "China" : "中国",
    bullets: content.crBullets,
  };
  const title = isEnglish ? `Yang Shenghua — ${content.label} Resume` : `杨生华｜${content.label}方向简历`;
  const educationTitle = isEnglish ? "Education" : "教育背景";
  const experienceTitle = isEnglish ? "Relevant Experience" : "相关经历";
  const profileTitle = isEnglish ? "Profile" : "个人概述";
  const strengthsTitle = isEnglish ? "Core Strengths" : "核心能力";
  const focusTitle = isEnglish ? "Application Focus" : "投递方向";
  const name = isEnglish ? data.name : `${data.name} <span class="english-name">${data.englishName}</span>`;
  const headerClass = isEnglish ? "resume-header no-photo" : "resume-header";
  const photo = isEnglish ? "" : '<img class="headshot" src="assets/headshot.jpg" alt="杨生华证件照">';
  const comment = "<!-- KKH 项目正在进行。项目结束后，请补入真实的研究方法、参与对象、交付物与结果；不要填入未验证数字。 -->";

  return `<!doctype html>
<html lang="${isEnglish ? "en" : "zh-CN"}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(title)}">
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="resume.css">
  </head>
  <body>
    <main>
      <article class="resume${isEnglish ? "" : " zh"}">
        <header class="${headerClass}">
          <div>
            <h1 class="name">${name}</h1>
            <p class="headline">${escapeHtml(content.headline)}</p>
            ${contactLine(lang, data)}
          </div>
          ${photo}
        </header>
        <section class="section">
          <h2 class="section-title">${profileTitle}</h2>
          <p class="summary">${escapeHtml(content.profile)}</p>
        </section>
        <section class="section">
          <h2 class="section-title">${educationTitle}</h2>
          <div class="two-column">${data.education.map(education).join("")}</div>
        </section>
        <section class="section">
          <h2 class="section-title">${experienceTitle}</h2>
          ${comment}
          ${experience(data.kkh)}
          ${experience(cr16)}
          ${data.otherExperience.map(experience).join("")}
        </section>
        <section class="section skills">
          <div>
            <h2 class="section-title">${strengthsTitle}</h2>
            ${skillRows([...content.skills, [isEnglish ? "Languages" : "语言", data.language]])}
          </div>
          <div>
            <h2 class="section-title">${focusTitle}</h2>
            <ul class="focus-list">${content.focus.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </div>
        </section>
      </article>
    </main>
  </body>
</html>`;
}

function indexPage() {
  const ready = tracks.filter((track) => track.level === "ready");
  const transition = tracks.filter((track) => track.level === "transition");
  const cards = (items) => items.map((track) => `<article class="card"><h3>${escapeHtml(track.zh.label)}</h3><p>${escapeHtml(track.en.label)}</p><div><a href="${track.id}-zh.html">中文简历</a><a href="${track.id}-en.html">English resume</a></div></article>`).join("");
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>杨生华｜定制简历目录</title>
    <style>
      :root { color: #1d2738; background: #e8edf3; font-family: Inter, "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif; }
      * { box-sizing: border-box; } body { margin: 0; } main { width: min(1040px, calc(100% - 40px)); margin: 48px auto; } h1 { margin: 0; font-size: 32px; } .intro { margin: 10px 0 28px; color: #475569; line-height: 1.65; } h2 { margin: 30px 0 12px; font-size: 18px; } .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; } .card { padding: 20px; background: #fff; border: 1px solid #cbd5e1; border-radius: 14px; box-shadow: 0 6px 18px rgba(15,23,42,.06); } .card h3 { margin: 0; font-size: 17px; } .card p { min-height: 40px; margin: 7px 0 16px; color: #64748b; font-size: 13px; } .card div { display: flex; gap: 8px; } .card a { padding: 8px 10px; color: #0f766e; border: 1px solid #99d6cd; border-radius: 7px; font-size: 13px; font-weight: 700; text-decoration: none; } .card a:hover { background: #f0fdfa; } .note { margin: 28px 0 0; padding: 16px; color: #475569; background: #fff; border-left: 4px solid #0f766e; line-height: 1.65; } @media (max-width: 760px) { main { width: min(100% - 28px, 560px); margin: 28px auto; } .grid { grid-template-columns: 1fr; } }
      /* Editorial directory treatment layered over the functional base styles above. */
      :root { color: #15243c; background: #eef0f2; }
      body { min-height: 100vh; background: radial-gradient(circle at 82% 10%, #ead7ce 0, transparent 27%), linear-gradient(135deg, #f6f4ef 0%, #e4e9ee 100%); }
      body::before { position: fixed; top: 0; left: 0; width: 100%; height: 5px; background: #b66d47; content: ""; }
      main { position: relative; width: min(1080px, calc(100% - 48px)); margin: 0 auto; padding: 68px 0; }
      main::after { position: absolute; top: 56px; right: 0; width: 160px; height: 1px; background: #b66d47; content: ""; }
      h1 { color: #15243c; font-family: Georgia, "Times New Roman", serif; font-size: clamp(32px, 5vw, 48px); font-weight: 700; letter-spacing: -.055em; line-height: .96; }
      .intro { max-width: 660px; margin: 18px 0 44px; color: #526176; font-size: 15px; line-height: 1.8; }
      h2 { display: flex; align-items: center; gap: 10px; margin: 36px 0 16px; color: #15243c; font-size: 13px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
      h2::before { width: 28px; height: 2px; background: #b66d47; content: ""; }
      .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
      .card { position: relative; min-height: 188px; padding: 24px 22px 20px; overflow: hidden; border: 0; border-radius: 0; background: rgba(255, 255, 255, .88); box-shadow: 0 12px 32px rgba(31, 46, 65, .10); transition: transform .18s ease, box-shadow .18s ease; }
      .card::before { position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: #15243c; content: ""; }
      .card:hover { transform: translateY(-4px); box-shadow: 0 18px 38px rgba(31, 46, 65, .16); }
      .card h3 { color: #15243c; font-size: 18px; line-height: 1.35; }
      .card p { min-height: 44px; margin: 8px 0 22px; color: #778398; font-family: Georgia, "Times New Roman", serif; font-size: 13px; line-height: 1.35; }
      .card div { gap: 7px; }
      .card a { padding: 8px 9px; color: #15243c; border: 1px solid #d5dbe3; border-radius: 0; background: #fff; font-size: 12px; font-weight: 760; }
      .card a:hover { color: #fff; border-color: #b66d47; background: #b66d47; }
      .note { margin-top: 38px; padding: 19px 22px; color: #e7ecf3; border: 0; border-left: 4px solid #b66d47; background: #15243c; box-shadow: 0 12px 30px rgba(21, 36, 60, .14); }
      .note strong { color: #fff; }
      @media (max-width: 760px) { main { width: min(100% - 28px, 560px); padding: 42px 0; } .grid { grid-template-columns: 1fr; } .card { min-height: 0; } }
    </style>
  </head>
  <body>
    <main>
      <h1>杨生华 / Shenghua Yang</h1>
      <p class="intro">每个方向均有中英文独立 HTML 页面，可直接打开后打印为 A4 PDF。内容已加入 KKH PREMs Toolkits 服务设计项目，并删除了校园领导力板块。</p>
      <h2>优先投递：已有直接经历支撑</h2>
      <section class="grid">${cards(ready)}</section>
      <h2>转型投递：建议聚焦产品、体验与研究岗位</h2>
      <section class="grid">${cards(transition)}</section>
      <p class="note"><strong>定位提醒：</strong>“建筑方向”已准确定位为建成环境、工程科技和数字化协同，不建议以建筑师岗位投递；“具身智能”和“AI”版本定位为 HRI / 人因、AI 产品和 AI UX，而非算法或模型训练工程师。KKH 项目仍在进行，结束后请补入真实的方法、参与对象、交付物和成果。</p>
    </main>
  </body>
</html>`;
}

await mkdir(here, { recursive: true });
for (const track of tracks) {
  for (const lang of ["en", "zh"]) {
    await writeFile(resolve(here, `${track.id}-${lang}.html`), resumePage(track, lang), "utf8");
  }
}
await writeFile(resolve(here, "index.html"), indexPage(), "utf8");

// Preserve the four original entry-point names while directing them to the updated versions.
await writeFile(resolve(here, "design-en.html"), resumePage(tracks.find((track) => track.id === "uiux"), "en"), "utf8");
await writeFile(resolve(here, "design-zh.html"), resumePage(tracks.find((track) => track.id === "uiux"), "zh"), "utf8");
await writeFile(resolve(here, "pm-en.html"), resumePage(tracks.find((track) => track.id === "pm"), "en"), "utf8");
await writeFile(resolve(here, "pm-zh.html"), resumePage(tracks.find((track) => track.id === "pm"), "zh"), "utf8");

console.log(`Generated ${tracks.length * 2 + 4} resume pages.`);
