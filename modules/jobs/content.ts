export const APPLICATION_EMAIL = "harcopops@gmail.com"
export const APPLICATION_SUBJECT = "Application for Harcorp Industries"

export function buildRoleMailto(role: string) {
  const subject = encodeURIComponent(
    `Application for ${role} — Harcorp Industries`,
  )
  return `mailto:${APPLICATION_EMAIL}?subject=${subject}`
}

export const JOBS_HERO = {
  eyebrow: "Careers",
  title: "Build the Future With Harcorp",
  subheading:
    "Join a multidisciplinary deep-tech company working across AI, software, communication systems, material science, and advanced R&D.",
  description:
    "Harcorp Industries is building frontier technologies from India with global ambition. We are looking for focused, disciplined, and capable people who want to contribute to ambitious technology, research, content, and operational initiatives from our physical office in Gurugram.",
} as const

export const WHY_JOIN = {
  title: "Why Join Harcorp",
  intro: [
    "Harcorp Industries is not being built as a conventional company. We are creating a long-term innovation platform focused on deep technology, original research, practical product development, and strong execution.",
    "People who join Harcorp should be excited by serious work, first-principles thinking, technical depth, communication, and the opportunity to help build a future-facing company from the ground up.",
  ],
  cards: [
    {
      id: "frontier",
      title: "Frontier Technology",
      description:
        "Work around projects across AI, advanced software, communication technologies, material science, and product systems.",
    },
    {
      id: "research",
      title: "Research-Driven Culture",
      description:
        "Be part of a company that values deep thinking, experimentation, documentation, and long-term technical capability.",
    },
    {
      id: "gurugram",
      title: "Build From Gurugram",
      description:
        "Contribute to building a future-facing Indian deep-tech company from our physical office in Gurugram.",
    },
    {
      id: "ownership",
      title: "High-Ownership Environment",
      description:
        "Work in a focused environment where individuals are expected to take ownership, learn fast, communicate clearly, and execute seriously.",
    },
  ],
} as const

export const WHO_WE_LOOK_FOR = {
  title: "Who We Are Looking For",
  intro:
    "We are looking for people who are curious, disciplined, professional, and willing to work in a focused startup environment.",
  traitsLabel: "Ideal team members should have:",
  traits: [
    "Strong willingness to learn",
    "Clear communication",
    "Professional work ethic",
    "Execution mindset",
    "Comfort with fast-moving work",
    "Ability to take ownership",
    "Interest in technology, research, content, operations, or company building",
    "Willingness to work from the Gurugram office",
  ],
} as const

export const OPEN_ROLES = {
  title: "Open Roles",
  intro:
    "We are currently building our core team. The following roles are open at Harcorp Industries.",
  locationNote:
    "All roles are based at our physical office location in Gurugram.",
  roles: [
    {
      id: "full-stack-developer",
      title: "Full Stack Developer",
      department: "Software Engineering / Product Development",
      location: "Gurugram, Haryana",
      workMode: "On-site",
      type: "Full-Time / Internship",
      description:
        "We are looking for a Full Stack Developer to help build web applications, product interfaces, internal tools, dashboards, and scalable software systems for Harcorp's technology ecosystem. The role will involve working on frontend, backend, APIs, databases, authentication systems, dashboards, and product workflows. The candidate should be comfortable learning quickly and working on real projects in a startup environment.",
      responsibilities: [
        "Build and maintain web applications",
        "Work on frontend and backend features",
        "Integrate APIs and databases",
        "Build dashboards, admin panels, and internal tools",
        "Collaborate with the team on product architecture",
        "Debug, test, and improve application performance",
        "Maintain clean and scalable code",
      ],
      preferredSkills: [
        "HTML, CSS, JavaScript, TypeScript",
        "React.js / Next.js",
        "Node.js / Express.js or similar backend framework",
        "REST APIs",
        "Database basics such as PostgreSQL, MongoDB, or Supabase",
        "Git and GitHub",
        "Basic understanding of deployment and hosting",
      ],
    },
    {
      id: "receptionist",
      title: "Receptionist",
      department: "Administration / Front Office",
      location: "Gurugram, Haryana",
      workMode: "On-site",
      type: "Full-Time",
      description:
        "We are looking for a professional and well-organized Receptionist to manage front-desk responsibilities, visitor communication, basic coordination, and office support at Harcorp Industries. The ideal candidate should be polite, punctual, organized, and comfortable handling calls, visitors, schedules, and basic administrative tasks.",
      responsibilities: [
        "Manage front desk and visitor reception",
        "Handle incoming calls and messages",
        "Maintain visitor records",
        "Coordinate basic office communication",
        "Support meeting scheduling and office coordination",
        "Assist with basic documentation and administrative tasks",
        "Maintain a professional and welcoming office environment",
      ],
      preferredSkills: [
        "Good communication skills",
        "Professional behavior and presentation",
        "Basic computer knowledge",
        "Ability to manage calls and visitors",
        "Basic documentation and coordination skills",
        "Punctuality and reliability",
      ],
    },
    {
      id: "content-creator",
      title: "Content Creator",
      department: "Content / Media / Brand Communication",
      location: "Gurugram, Haryana",
      workMode: "On-site",
      type: "Full-Time / Internship",
      description:
        "We are looking for a Content Creator to help create content for Harcorp Industries, Harcorp.AI, and related projects. The role will involve creating short-form content, social media posts, research-based content, scripts, visual ideas, and brand communication material. The candidate should be creative, consistent, and interested in technology, AI, innovation, startups, and futuristic ideas.",
      responsibilities: [
        "Create content ideas for social media and brand communication",
        "Write short-form video scripts, captions, posts, and content drafts",
        "Assist in creating reels, videos, carousels, and visual content",
        "Coordinate with designers, editors, and the internal team",
        "Research topics related to AI, technology, innovation, and startups",
        "Help maintain content consistency across platforms",
        "Support documentation and storytelling around Harcorp projects",
      ],
      preferredSkills: [
        "Good writing and communication skills",
        "Understanding of social media platforms",
        "Basic knowledge of AI, technology, or startups",
        "Ability to create engaging content ideas",
        "Basic video/content planning skills",
        "Familiarity with tools like Canva, CapCut, Adobe tools, or AI content tools is a plus",
        "Consistency and attention to detail",
      ],
    },
  ],
} as const

export const NO_SUITABLE_ROLE = {
  title: "Do Not See a Suitable Role?",
  content:
    "If you believe you can contribute to Harcorp Industries, we would still like to hear from you. Send us your profile, portfolio, GitHub, LinkedIn, resume, or a short note explaining what kind of work you want to contribute to.",
} as const

export const HIRING_PHILOSOPHY = {
  title: "Our Hiring Philosophy",
  intro:
    "We prefer people who are serious, curious, disciplined, and capable of learning.",
  valuesLabel: "We value:",
  values: [
    "Skill over credentials",
    "Ownership over instruction-following",
    "Depth over surface-level knowledge",
    "Execution over theory alone",
    "Professionalism over casual work attitude",
    "Long-term commitment over short-term excitement",
  ],
  closing:
    "Harcorp is suitable for people who want to build, learn, research, communicate, and contribute to ambitious company-building work.",
} as const

export const WORK_CULTURE = {
  title: "Work Culture",
  paragraphs: [
    "Harcorp Industries is being built with a focused, professional, research-oriented, and execution-driven culture.",
    "We encourage independent thinking, disciplined work, technical curiosity, clear communication, and ownership. Team members are expected to think deeply, communicate clearly, and take responsibility for their work.",
    "The company is still in its early stage, so the culture will suit people who are comfortable with ambiguity, fast learning, and building systems from the ground up.",
  ],
} as const

export const FINAL_CTA = {
  title: "Ready to Build With Us?",
  content:
    "If you are excited by frontier technology, deep research, creative communication, operations, and building ambitious systems from India, we would like to hear from you.",
} as const

export const APPLICATION_FORM = {
  title: "Send Your Profile",
  description:
    "Fill out the form below and we will open your email client with your application details. You can attach your resume before sending.",
  messagePlaceholder:
    "Tell us why you want to work with Harcorp and what kind of work you want to contribute to.",
  roleOptions: [
    "Full Stack Developer",
    "Receptionist",
    "Content Creator",
    "Other / General Application",
  ],
} as const
