export const personal = {
  name: "Gavin Arori",
  role: "Full-Stack Developer",
  subrole: "React, Next.js & Node.js",
  tagline:
    "I build reliable, high-performance applications that solve real-world problems, and I genuinely care about making software people enjoy using.",
  email: "arorigavin@gmail.com",
  location: "Kenya",
  resumeUrl: "/resume.pdf",
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
    years: "2020 — 2023",
    title: "Learning to build, one project at a time",
    body: "I started a telecommunications and information engineering degree at Dedan Kimathi University, but most of what shaped me as a developer happened outside the syllabus. I taught myself the frontend fundamentals, then kept pushing further — by 2023 I'd shipped Sitecraft, a component library and web-development studio site, while still a student. That project mattered less for what it was and more for what it proved to me: I could take an idea from nothing to something people could actually use.",
  },
  {
    phase: "02",
    years: "2024",
    title: "Full-stack, for real",
    body: "Gigitise gave me my first real seat on a product team, working on the Freelancer, Client, and Landing Page products and improving page load times by 20%. From there I moved into delegate developer work through Adamur — building for AdZetu, Patient Xpress, and BusinessHub in parallel, often juggling several codebases in the same week. That stretch is where React, Prisma, Express, and PostgreSQL stopped being things I was learning and became things I just used, including inside a healthcare product where getting the details right actually mattered.",
  },
  {
    phase: "03",
    years: "2025 — Present",
    title: "Owning delivery end-to-end",
    body: "Building Capek Builders' company site solo — design through deployment, domain setup through production optimization — taught me what it means to own a project with no one else to hand pieces off to. In parallel, I've kept pushing on personal work like Pictora and a BMW-inspired concept site, both built to test how far motion-heavy, video-first frontend work can go. The common thread across all of it: I'd rather ship something real and imperfect than talk about something theoretical and perfect.",
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
    company: "Capek Builders Ltd",
    role: "Frontend Developer (Contract)",
    start: "2025",
    end: "Present",
    points: [
      "Designed and developed a modern, responsive company website end-to-end, from design through deployment.",
      "Built a clean, high-performance UI with optimized images and fast load times to improve user engagement.",
      "Handled the full deployment process — domain configuration, hosting setup, and production optimization.",
      "Improved accessibility, structure, and mobile responsiveness to reach a wider audience.",
    ],
  },
  {
    company: "BusinessHub",
    role: "Delegate Developer",
    start: "September 2024",
    end: "Present",
    points: [
      "Built responsive, scalable front-end interfaces with React for business-process applications.",
      "Developed and deployed features using React, Prisma, Express, and PostgreSQL.",
      "Worked on database design and API development to support business-specific workflows and third-party integrations.",
      "Supported user training and technical documentation alongside feature delivery.",
    ],
  },
  {
    company: "Patient Xpress",
    role: "Delegate Developer",
    start: "September 2024",
    end: "Present",
    points: [
      "Built responsive front-end interfaces for a healthcare application used by medical professionals.",
      "Developed features using React, Prisma, Express, and PostgreSQL, with a focus on reliability.",
      "Worked with data-security and compliance requirements specific to healthcare workflows.",
      "Optimized performance for interfaces used in time-sensitive clinical workflows.",
    ],
  },
  {
    company: "AdZetu",
    role: "Delegate Developer",
    start: "September 2024",
    end: "Present",
    points: [
      "Built and optimized React-based frontend interfaces for real-world product features.",
      "Integrated and managed databases with Prisma across full-stack features.",
      "Developed server-side logic and APIs with Express for backend integration.",
      "Worked on performance optimization and code-quality improvements across the codebase.",
    ],
  },
  {
    company: "Adamur",
    role: "Delegate Developer",
    start: "September 2024",
    end: "Present",
    points: [
      "Built responsive, scalable front-end interfaces with React across multiple client engagements.",
      "Developed and deployed real-world projects using JavaScript, React, Prisma, Express, and PostgreSQL.",
      "Integrated and managed databases efficiently with Prisma.",
      "Implemented server-side logic and APIs with Express for seamless functionality.",
    ],
  },
  {
    company: "Gigitise",
    role: "Software Developer",
    start: "January 2024",
    end: "April 2024",
    points: [
      "Developed and maintained the frontend for the Freelancer product, improving UX and interface responsiveness.",
      "Contributed to the Client and Landing Page products, ensuring high performance and consistency.",
      "Implemented performance-optimization techniques, improving page load times by 20%.",
      "Collaborated with backend developers to integrate RESTful APIs and extend application functionality.",
    ],
  },
]

export type ProjectCategory = "frontend" | "fullstack" | "staff"

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

export const projects: Project[] = [
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
]

export type SkillGroup = {
  group: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    group: "Frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Redux",
      "Redux Toolkit",
      "TanStack Query",
      "Next.js",
      "TailwindCSS",
      "Material UI",
      "Framer",
      "HTML",
      "CSS",
    ],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "SpringBoot", "Java"],
  },
  {
    group: "Databases & ORMs",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma"],
  },
  {
    group: "Tools & Workflow",
    items: ["Git", "Vite"],
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