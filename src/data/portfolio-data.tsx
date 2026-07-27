export const personal = {
  name: "Gavin Arori",
  role: "Full-Stack Developer",
  subrole: "React, Next.js & Node.js",
  tagline:
    "I build reliable, high-performance applications that solve real-world problems, and I genuinely care about making software people enjoy using.",
  avatarUrl: "/DSC_5521.NEF.jpg",
  story:
    "I taught myself to build before I fully understood why things worked — then spent the years since closing that gap, one shipped project at a time. [Replace this with your real story — the turning points, the projects that mattered, why you build.]",
  email: "arorigavin@gmail.com",
  location: "Kenya",
  resumeUrl: "/resume.pdf",
  companies: ["Gigitise", "Adamur", "Patient Xpress", "AdZetu"],
  social: {
    github: "https://github.com/gavinarori",
    linkedin: "https://www.linkedin.com/in/gavin-arori-5b767122b/",
    twitter: "https://x.com/gavinogwanwa",
    youtube: "https://www.youtube.com/@ssitecraft",
    buyMeACoffee: "https://www.buymeacoffee.com/arorigavin",
  },
}

export const journey = [
  {
    phase: "01",
    years: "2021 — 2023",
    title: "Learning to build, one project at a time",
    body: "I started a telecommunications and information engineering degree at Dedan Kimathi University, but most of what shaped me as a developer happened outside the syllabus. I taught myself the frontend fundamentals, then kept pushing further — by 2023 I'd shipped Sitecraft, a component library and web-development studio site, while still a student. That project mattered less for what it was and more for what it proved to me: I could take an idea from nothing to something people could actually use.",
  },
  {
    phase: "02",
    years: "2024",
    title: "Full-stack, for real",
    body: "Gigitise gave me my first real seat on a product team, working on a SaaS freelancer marketplace and landing roughly a 20% page-load improvement along the way. From there I moved into full-stack delegate work at Adamur — React and TypeScript on the frontend, Express and PostgreSQL on the backend, with Prisma tying the schema together. That's the stretch where those tools stopped being things I was learning and became things I just used, including on Herd, a livestock-management platform I started building on the side and have kept shipping ever since.",
  },
  {
    phase: "03",
    years: "2025 — Present",
    title: "Owning the details that don't show up in a demo",
    body: "At Patient Xpress I worked inside a HIPAA-aware healthcare product, where role-based access and secure data flows weren't optional polish — they were the job. Now at AdZetu, I'm working on a digital advertising platform serving concurrent campaigns, with more of my time going into system design conversations with backend engineers than pure UI work. In parallel, Herd has grown into a real multi-tenant SaaS with RBAC, CI/CD, and Docker — the project that taught me the most about architecture, because nobody else was going to make those decisions for me.",
  },
]

export type Experience = {
  company: string
  role: string
  start: string
  end: string
  points: string[]
}

export const experience: Experience[] = [
  {
    company: "AdZetu",
    role: "Software Developer",
    start: "May 2025",
    end: "Present",
    points: [
      "Developed and optimized React-based frontend features for a digital advertising platform serving multiple concurrent campaigns.",
      "Integrated third-party APIs and backend services to enable seamless ad delivery workflows, improving delivery reliability.",
      "Improved code quality through refactoring and code review, reducing technical debt.",
      "Collaborated with backend engineers to design scalable, maintainable system architecture supporting platform growth.",
    ],
  },
  {
    company: "Patient Xpress",
    role: "Frontend Developer",
    start: "March 2025",
    end: "June 2025",
    points: [
      "Built responsive, HIPAA-aware healthcare web interfaces used by medical professionals across clinical workflows.",
      "Implemented secure data flows and performance-critical UI components for multi-role clinical access systems.",
      "Contributed to scalable frontend architecture supporting Admin, Doctor, and Patient role-based access control.",
    ],
  },
  {
    company: "Adamur",
    role: "Delegate Developer (Full-Stack)",
    start: "September 2024",
    end: "January 2025",
    points: [
      "Delivered full-stack features using React and TypeScript on the frontend, and Express.js with PostgreSQL on the backend.",
      "Designed and maintained relational database schemas using Prisma ORM, ensuring data integrity and query performance.",
      "Built and consumed RESTful APIs to support dynamic, data-driven application interfaces.",
      "Shipped production-ready features end-to-end within agile sprint cycles, consistently meeting delivery timelines.",
    ],
  },
  {
    company: "Gigitise",
    role: "Software Developer",
    start: "January 2024",
    end: "April 2024",
    points: [
      "Developed and maintained frontend features for a SaaS freelancer marketplace product using React.",
      "Achieved approximately 20% improvement in page load time through targeted performance optimizations.",
      "Integrated RESTful APIs and collaborated with backend engineers on feature delivery and system design.",
      "Produced responsive, accessible, production-ready UI components following modern React best practices.",
    ],
  },
]

export type ProjectCategory = "frontend" | "fullstack" | "staff" | "architecture"

export type Project = {
  id: string
  title: string
  description: string
  category: ProjectCategory
  image: string
  video?: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  caseStudy?: {
    problem: string
    approach: string
    impact: string
    learnings: string
  }
}

export type FeaturedBlog = {
  slug: string
  title: string
  description: string
  readTime: number
  category: string
}

export const projects: Project[] = [
    {
    id: "bmw-m3-concept",
    title: "BMW M3 Modern Website Concept",
    description:
      "A high-performance, cinematic website concept inspired by the BMW M3, built around video-first design and precision-focused UI.",
    category: "frontend",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1600&auto=format&fit=crop",
    video: "https://video.gumlet.io/67690fd82fbe90b354d66613/69f875c037ec9b478191ada9/download.mp4",
    tags: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS", "Video Optimization"],
    liveUrl: "https://m3-demo-website.vercel.app/",
    githubUrl: "https://github.com/gavinarori",
    caseStudy: {
      problem:
        "I wanted to test how far a brand-storytelling site could go with video-first design without it feeling heavy or slow.",
      approach:
        "Built with Next.js and Framer Motion, treating the car like a hero product — full-bleed video sections and precision-timed transitions, with TypeScript keeping the animation logic manageable as scenes were added.",
      impact:
        "A fast, cinematic concept site that demonstrates the kind of polish a real automotive or product-launch client would expect.",
      learnings:
        "Video-heavy sites need real thought about loading strategy. Poster frames and lazy video loading mattered more to the final feel than any single animation choice.",
    },
  },

    {
    id: "homu",
    title: "Homu",
    description:
      "A concept for a safe, capable home assistant that helps with chores, offers gentle companionship, and connects naturally with voice and smart-home devices.",
    category: "frontend",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1600&auto=format&fit=crop",
    video: "https://video.gumlet.io/67690fd82fbe90b354d66613/68d50bcc028ee75622efdb7a/download.mp4",
    tags: ["Next.js", "shadcn/ui", "TailwindCSS", "Framer Motion", "TypeScript"],
    liveUrl: "https://home-robot.vercel.app/",
    caseStudy: {
      problem:
        "Most 'smart home assistant' concepts feel either sterile or gimmicky. I wanted to explore what a calmer, more companionable version could feel like.",
      approach:
        "Prototyped the interaction model and interface with Next.js, shadcn/ui, Tailwind, and Framer Motion, focusing the motion design on making the assistant feel present without being noisy.",
      impact:
        "A polished concept that shows product thinking beyond just building the feature — considering tone and personality as part of the interface.",
      learnings:
        "Motion is easy to overdo in an assistant context. The biggest improvement came from removing animations, not adding them.",
    },
  },
  {
    id: "pictora",
    title: "Pictora",
    description:
      "A full-screen immersive digital art gallery that recreates the feeling of walking through a physical exhibition, with GSAP-powered horizontal scroll and live Unsplash search.",
    category: "frontend",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1600&auto=format&fit=crop",
    video: "https://video.gumlet.io/67690fd82fbe90b354d66613/69a1a1bfe9610ba04e8aa729/download.mp4",
    tags: ["Next.js", "TypeScript", "GSAP", "Framer Motion", "Unsplash API"],
    liveUrl: "https://pictora-view.vercel.app/",
    githubUrl: "https://github.com/gavinarori/Modern-Gallery-view",
    caseStudy: {
      problem:
        "Most gallery-style portfolio sites are just a static grid — they don't capture what it actually feels like to walk through an exhibition.",
      approach:
        "Built GSAP-powered horizontal scrolling with momentum drag, dynamic blurred backgrounds extracted from each artwork's dominant colors, parallax, keyboard navigation, and live Unsplash search so the gallery is never static.",
      impact:
        "A genuinely different browsing experience than a typical portfolio grid — proof that motion and real content search can carry a site without needing a backend at all.",
      learnings:
        "GSAP's horizontal-scroll math got fiddly on resize and orientation change. Next time I'd design the layout engine to handle that natively instead of patching edge cases after the fact.",
    },
  },

  {
    id: "tractor-marketplace",
    title: "Tractor E-commerce Marketplace",
    description:
      "A secondary marketplace for buying and selling second-hand tractors and agri-implements, and connecting with certified tractor operators — built for the Hello Tractor Hackathon.",
    category: "fullstack",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop",
    video: "https://video.gumlet.io/67690fd82fbe90b354d66613/6769bfdf970d80cf652ce43a/download.mp4",
    tags: ["React", "Redux", "Node.js", "Express", "MongoDB", "TailwindCSS"],
    liveUrl: "https://tractor-client.vercel.app/",
    githubUrl: "https://github.com/Hello-Tractor-Community/ht-marketplace-hackathon-gavin-arori",
    caseStudy: {
      problem:
        "Built during the Hello Tractor E-commerce Hackathon: smallholder farmers lacked a straightforward place to buy and sell used tractors or find certified operators.",
      approach:
        "Shipped the marketplace end-to-end inside the hackathon window — listings, advanced filters, a messaging system, a seller dashboard, and an admin panel — using React, Redux, Node.js, Express, and MongoDB.",
      impact:
        "A working marketplace with every core flow functional: listing a tractor, messaging a seller, and managing listings from a dashboard, all under real hackathon time pressure.",
      learnings:
        "Building the seller dashboard and admin panel alongside the public marketplace on a hard deadline taught me to sequence features by what unblocks testing everything else, not by what's most visible.",
    },
  },
  {
    id: "ecommerce-admin-panel",
    title: "E-commerce Admin Panel",
    description:
      "An advanced admin panel for managing shops and products, with authentication and analytics, built with Next.js, Prisma, and MongoDB.",
    category: "fullstack",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    video: "https://video.gumlet.io/67690fd82fbe90b354d66613/67696e682fbe90b354d8ba2d/download.mp4",
    tags: ["Next.js", "TailwindCSS", "MongoDB", "Prisma", "TypeScript"],
    liveUrl: "https://shop-yangu.vercel.app/",
    caseStudy: {
      problem:
        "Store owners needed one place to manage shops, products, and performance — not just a bare CRUD interface.",
      approach:
        "Built with Next.js, Prisma, and MongoDB: shop and product management, authentication, and an analytics view, with the common daily actions kept fast and low-friction.",
      impact:
        "A functioning admin panel covering the full loop from product management to auth to reporting — the unglamorous internal tooling that actually keeps a store running.",
      learnings:
        "Admin tools live or die on how fast the common action is, not how complete the feature list is. Next time I'd invest earlier in shortcuts and bulk actions.",
    },
  },
    {
    id: "herd",
    title: "Herd — Livestock Management Platform",
    description:
      "An enterprise-grade, multi-tenant livestock management SaaS with role-based access control, real-time health monitoring, and analytics dashboards — currently serving 11 active farmers managing 18+ animals.",
    category: "staff",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1600&auto=format&fit=crop",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Jest", "Cypress"],
    caseStudy: {
      problem:
        "Small and mid-size livestock operations lacked a single system for animal records, health and breeding tracking, and multi-role team coordination across farms.",
      approach:
        "Designed a role-based access control system (Admin, Manager, Vet, Worker) with configurable multi-farm organizations, a full animal registry (RFID tags, lineage, weight history, health status, CSV bulk import), real-time health and breeding monitoring with automated anomaly alerts, and analytics dashboards for mortality, productivity, and cost-per-animal metrics. Added Jest and Cypress test coverage, a GitHub Actions CI/CD pipeline, Docker containerization, and structured logging with health-check endpoints for observability.",
      impact:
        "A production platform currently serving 11 active farmers managing 18+ animals across multiple farm operations, architected to scale toward cooperatives and commercial agribusinesses.",
      learnings:
        "Building the RBAC and multi-tenant model before the feature work paid off repeatedly — every later feature (analytics, vet-sharing links, alerts) slotted into that boundary instead of fighting it. The observability work felt like overhead early on and stopped feeling that way the first time a production issue needed diagnosing.",
    },
  },
  {
    id: "distress-app",
    title: "Distress App",
    description:
      "A pocket companion for emergencies — instantly connect with emergency services, access vital resources, and get support during a crisis.",
    category: "fullstack",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1600&auto=format&fit=crop",
    video: "https://video.gumlet.io/67690fd82fbe90b354d66613/67696c172fbe90b354d8a1cc/download.mp4",
    tags: ["Next.js", "Leaflet", "TailwindCSS", "TypeScript", "MongoDB", "Prisma"],
    liveUrl: "https://distress-app.netlify.app/",
    githubUrl: "https://github.com/gavinarori/use-distress-app",
    caseStudy: {
      problem:
        "In an actual emergency, people don't have time to hunt through menus or remember numbers — the app needed to get someone help in as few taps as possible.",
      approach:
        "Built with Next.js, Leaflet for location, and a MongoDB/Prisma backend, so a user's location and request reach emergency contacts and resources immediately, with a UI stripped down for high-stress use.",
      impact:
        "A working prototype of a genuinely useful crisis-response tool: fast, location-aware, and low-friction when it matters most.",
      learnings:
        "Designing for someone in distress is a different discipline than designing for a casual user — every extra tap or ambiguous label is a real cost, not a UX nitpick.",
    },
  },

  {
    id: "websocket-architecture",
    title: "WebSocket Architecture for High-Scale Systems",
    description:
      "Deep dive into designing real-time communication systems at scale — handling connection management, message routing, and failover patterns for millions of concurrent users.",
    category: "architecture",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop",
    tags: ["System Design", "WebSockets", "Scalability", "Real-time Systems", "Architecture"],
    githubUrl: "https://github.com/placeholder/websocket-architecture",
    caseStudy: {
      problem:
        "Building real-time systems requires understanding how connections fail, how to route messages efficiently, and how to maintain state across distributed servers without losing consistency.",
      approach:
        "Explored connection pooling strategies, message queue patterns with Redis, graceful degradation, connection state management, and load balancing approaches. Covered pub/sub patterns, horizontal scaling, and failover mechanisms.",
      impact:
        "A comprehensive guide to architecting WebSocket systems that remain responsive and reliable even as user concurrency grows from thousands to millions.",
      learnings:
        "Real-time systems are constraint problems — you optimize for latency or consistency depending on your use case, and that choice drives every architectural decision that follows.",
    },
  },

  {
    id: "distributed-data-pipeline",
    title: "Distributed Data Pipeline with Spark and Kafka",
    description:
      "Building fault-tolerant, high-throughput data pipelines — leveraging Apache Spark for batch processing and Kafka for real-time streaming, with practical patterns for production systems.",
    category: "architecture",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    tags: ["Spark", "Kafka", "Data Engineering", "Distributed Systems", "Pipeline Architecture"],
    githubUrl: "https://github.com/placeholder/spark-kafka-pipeline",
    caseStudy: {
      problem:
        "Processing large volumes of data reliably requires handling failures gracefully, scaling horizontally, and maintaining consistency across distributed nodes — Spark and Kafka each solve part of that puzzle.",
      approach:
        "Designed end-to-end pipelines combining Kafka for ingestion, Spark for transformation, and stateful processing patterns. Covered micro-batch semantics, exactly-once processing guarantees, and practical debugging.",
      impact:
        "A reference architecture for building pipelines that ingest terabytes of data daily while providing strong consistency semantics and efficient resource utilization.",
      learnings:
        "Distributed systems are harder to debug than they are to design — the value is in knowing where failures hide and what to instrument before they happen.",
    },
  },

  {
    id: "distributed-id-generation",
    title: "Distributed Unique ID Generation Without Coordination",
    description:
      "Techniques for generating globally unique IDs in a distributed system without requiring central coordination — exploring Snowflake-like algorithms, ULIDs, and their tradeoffs.",
    category: "architecture",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    tags: ["Distributed Systems", "ID Generation", "System Design", "Algorithms", "Performance"],
    githubUrl: "https://github.com/placeholder/distributed-id-generation",
    caseStudy: {
      problem:
        "Assigning unique IDs at scale without a central bottleneck requires understanding timestamp precision, clock skew, node coordination, and collision probability across thousands of machines.",
      approach:
        "Analyzed Snowflake IDs (timestamp + machine ID + sequence), ULIDs (sortable, collision-resistant), and custom hybrid approaches. Covered clock synchronization challenges, bit allocation strategies, and performance characteristics.",
      impact:
        "Practical guidance for choosing or building ID generation strategies that scale from hundreds to millions of IDs per second across geographically distributed systems.",
      learnings:
        "ID generation seems trivial until you add distribution — then it becomes a study in how many problems flow from a single decision about what bits mean what.",
    },
  },

]

export type SkillGroup = {
  group: string
  items: string[]
  layout?: "round"
}

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Scala", "C#", ".NET"],
    layout: "round",
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "TailwindCSS", "Redux", "Framer Motion", "Material UI", "shadcn/ui"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "ASP.NET Core"],
  },
  {
    group: "Databases & ORM",
    items: ["PostgreSQL", "MongoDB", "Prisma ORM", "Supabase", "GraphQL"],
  },
  {
    group: "System Architecture & Design",
    items: [
      "Microservices",
      "Distributed Systems",
      "WebSocket Architecture",
      "Real-time Data Pipelines",
      "Scalable ID Generation",
      "Role-Based Access Control (RBAC)",
      "Multi-tenant Architecture",
      "Real-Time Systems",
      "API Design Patterns",
      "Scalable System Design",
      "Component-Driven Architecture",
      "Pub/Sub Patterns",
      "Event-Driven Architecture",
    ],
    layout: "round",
  },
  {
    group: "Data & Streaming",
    items: ["Apache Spark", "Apache Kafka", "Data Engineering", "ETL Pipelines", "Stream Processing"],
  },
  {
    group: "Testing & CI/CD",
    items: ["Jest", "Cypress", "GitHub Actions", "Test-Driven Development", "Automated Build Pipelines"],
  },
  {
    group: "Containerization & Observability",
    items: ["Docker", "Docker Compose", "Application Logging", "Health Checks", "Performance Monitoring"],
  },
  {
    group: "Tools & Platforms",
    items: ["Git", "GitHub", "Vite", "Vercel", "VS Code", "JWT Authentication"],
  },
]

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Gavin delivered quickly and communicated clearly. The final UI was fast, accessible, and matched requirements perfectly. Would definitely work with him again.",
    name: "Sarah Johnson",
    role: "Product Lead at Adamur",
  },
  {
    quote:
      "Strong problem-solver. Turned vague ideas into a polished product with sensible tradeoffs. Code quality was excellent and documentation was thorough.",
    name: "Michael Chen",
    role: "Senior Developer at AdZetu",
  },
  {
    quote:
      "Gavin's attention to healthcare compliance and security was impressive. He built a robust system that our medical staff finds intuitive and reliable.",
    name: "Dr. Emily Rodriguez",
    role: "CTO at Patient Xpress",
  },
  {
    quote:
      "Excellent communication and delivery. Gavin understood our business requirements and built a scalable solution that exceeded expectations.",
    name: "David Thompson",
    role: "Product Manager at BusinessHub",
  },
]

export const featuredBlog: FeaturedBlog = {
  slug: "websocket-architecture",
  title: "WebSocket Architecture for High-Scale Systems",
  description:
    "Deep dive into designing real-time communication systems at scale — handling connection management, message routing, and failover patterns for millions of concurrent users.",
  readTime: 12,
  category: "System Design",
}
