import { Icons } from "../components/icons"
import { HomeIcon, NotebookIcon } from "lucide-react"

export const DATA = {
  name: "Gavin Arori",
  initials: "GA",
  url: "https://github.com/arorigavin",
  location: "Kenya",
  locationLink: "https://www.google.com/maps/place/Kenya",
  description:
    "I’m a full-stack developer based in Kenya, building reliable, high-performance applications that solve real-world problems. I genuinely care about creating software that people enjoy using and that delivers long-term value.",
  summary:
    "I’m a full-stack developer based in Kenya, building reliable, high-performance applications that solve real-world problems. I genuinely care about creating software that people enjoy using and that delivers long-term value.",
  avatarUrl: "https://avatars.githubusercontent.com/u/99688077?v=4",
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Redux",
    "TanStack Query",
    "Next.js",
    "SpringBoot",
    "TailwindCSS",
    "Material UI",
    "Prisma",
    "Vite",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Express",
    "Framer",
    "MySQL",
    "HTML",
    "CSS",
    "Redux Toolkit",
    "Git",
    "java",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "arorigavin@gmail.com",
    tel: "+254 114898175",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/gavinarori",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/gavin-arori-5b767122b/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/gavinogwanwa",
        icon: Icons.x,
        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@ssitecraft",
        icon: Icons.youtube,
        navbar: true,
      },
      buyMeACoffee: {
        name: "buyMeACoffee",
        url: "https://www.buymeacoffee.com/arorigavin",
        icon: Icons.buyMeACoffee,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:arorigavin@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Gigitise",
      href: "https://github.com/Gigitise",
      badges: [],
      location: "Remote",
      title: "Software Developer",
      logoUrl: "https://avatars.githubusercontent.com/u/139589381?s=200&v=4",
      start: "January 2024",
      end: "April 2024",
      description: [
        "Developed and maintained the frontend for the Freelancer product, enhancing user experience and interface responsiveness.",
        "Contributed to the Client and Landing Page products, ensuring high performance and consistency.",
        "Implemented performance optimization techniques, improving page load times by 20%.",
        "Collaborated with backend developers to integrate RESTful APIs, enhancing application functionality.",
      ],
      keyResponsibilities: [
        "Frontend development using React and modern JavaScript",
        "Performance optimization and code quality improvements",
        "API integration and backend collaboration",
        "User experience enhancement and responsive design",
      ],
      reference: {
        name: "John Doe",
        title: "Lead Developer",
        email: "john.doe@gigitise.com",
        phone: "+1 (555) 123-4567",
      },
    },
    {
      company: "Adamur",
      badges: [],
      href: "https://www.adamur.io",
      location: "Remote",
      title: "Delegate Developer",
      logoUrl: "https://avatars.githubusercontent.com/u/178998573?s=200&v=4",
      start: "September 2024",
      end: "Present",
      description: [
        "Built responsive and scalable front-end interfaces with React to enhance user experience.",
        "Developed and deployed real-world projects using JavaScript, React, Prisma, Express, and PostgreSQL.",
        "Integrated and managed databases efficiently with Prisma.",
        "Implemented server-side logic and APIs using Express for seamless functionality.",
      ],
      keyResponsibilities: [
        "Full-stack development with React, Node.js, and PostgreSQL",
        "Database design and management with Prisma ORM",
        "API development and server-side logic implementation",
        "Responsive UI design and user experience optimization",
      ],
      reference: {
        name: "Sarah Johnson",
        title: "Technical Lead",
        email: "sarah.johnson@adamur.io",
        phone: "+1 (555) 234-5678",
      },
    },
    {
      company: "AdZetu",
      badges: [],
      href: "https://www.adamur.io",
      location: "Remote",
      title: "Delegate Developer",
      logoUrl: "https://avatars.githubusercontent.com/u/216943655?s=200&v=4",
      start: "September 2024",
      end: "Present",
      description: [
        "Built responsive and scalable front-end interfaces with React to enhance user experience.",
        "Developed and deployed real-world projects using JavaScript, React, Prisma, Express, and PostgreSQL.",
        "Integrated and managed databases efficiently with Prisma.",
        "Implemented server-side logic and APIs using Express for seamless functionality.",
      ],
      keyResponsibilities: [
        "React-based frontend development and optimization",
        "Database integration and management",
        "API development and backend integration",
        "Performance optimization and code quality",
      ],
      reference: {
        name: "Michael Chen",
        title: "Senior Developer",
        email: "michael.chen@adzetu.com",
        phone: "+1 (555) 345-6789",
      },
    },
    {
      company: "Patient Xpress",
      badges: [],
      href: "https://www.adamur.io",
      location: "Remote",
      title: "Delegate Developer",
      logoUrl: "https://px-asset.netlify.app/image/brand/PX_logo.png",
      start: "September 2024",
      end: "Present",
      description: [
        "Built responsive and scalable front-end interfaces with React to enhance user experience.",
        "Developed and deployed real-world projects using JavaScript, React, Prisma, Express, and PostgreSQL.",
        "Integrated and managed databases efficiently with Prisma.",
        "Implemented server-side logic and APIs using Express for seamless functionality.",
      ],
      keyResponsibilities: [
        "Healthcare application development and maintenance",
        "User interface design for medical professionals",
        "Data security and HIPAA compliance implementation",
        "Performance optimization for critical healthcare workflows",
      ],
      reference: {
        name: "Dr. Emily Rodriguez",
        title: "Chief Technology Officer",
        email: "emily.rodriguez@patientxpress.com",
        phone: "+1 (555) 456-7890",
      },
    },
    {
      company: "BusinessHub",
      badges: [],
      href: "https://www.adamur.io",
      location: "Remote",
      title: "Delegate Developer",
      logoUrl: "https://ui.shadcn.com/placeholder.svg",
      start: "September 2024",
      end: "Present",
      description: [
        "Built responsive and scalable front-end interfaces with React to enhance user experience.",
        "Developed and deployed real-world projects using JavaScript, React, Prisma, Express, and PostgreSQL.",
        "Integrated and managed databases efficiently with Prisma.",
        "Implemented server-side logic and APIs using Express for seamless functionality.",
      ],
      keyResponsibilities: [
        "Business application development and customization",
        "Database design and optimization for business processes",
        "API development for third-party integrations",
        "User training and technical documentation",
      ],
      reference: {
        name: "David Thompson",
        title: "Product Manager",
        email: "david.thompson@businesshub.com",
        phone: "+1 (555) 567-8901",
      },
    },
  ],
  education: [
    {
      school: "Dedan Kimathi University of Technology",
      href: "https://www.dkut.ac.ke/",
      degree: "Bachelor of science in Telecommunication and Information Engineering ",
      logoUrl: "https://www.dkut.ac.ke/images/logo.png",
      start: "2020",
      end: "2024",
    },
  ],
  projects: [
    {
  title: "Pictora",
  href: "https://pictora-view.vercel.app/",
  dates: "February 2026",  
  active: true,
  description:
    "A full-screen immersive digital art gallery that recreates the feeling of walking through a physical exhibition. GSAP-powered horizontal scrolling with momentum drag, dynamic blurred gradient backgrounds extracted from each artwork's dominant colors, parallax effects, keyboard navigation, and real-time Unsplash photo search & exploration.",
  technologies: ["Next.js", "TypeScript", "GSAP", "Framer Motion", "Unsplash API"],
  links: [
    { type: "Website", href: "https://pictora-view.vercel.app/", icon: Icons.globe },
    { type: "Source", href: "https://github.com/gavinarori/Modern-Gallery-view", icon: Icons.github },
  ],
  image: "",  
  video: "https://video.gumlet.io/67690fd82fbe90b354d66613/69a1a1bfe9610ba04e8aa729/download.mp4",  
},
        {
      title: "Photography-Website",
      href: "https://arori.framer.website/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "is a photographer website porfolio work projects. that captures authentic moments and tell stories through  images, blending creativity and emotion in each shot.",
      technologies: ["Framer"],
      links: [
        { type: "Website", href: "https://arori.framer.website/", icon: Icons.globe },
        { type: "Source", href: "", icon: Icons.github },
      ],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/67696e682fbe90b354d8ba26/download.mp4",
    },
    {
      title: "Homu",
      href: "https://home-robot.vercel.app/",
      dates: "September 2025 - September 2025",
      active: true,
      description:
        "Meet Homu — a safe, capable home assistant that helps with chores, offers gentle companionship, and connects naturally with your voice and your smart home.",
      technologies: [
        "shadcn",
        "TailwindCSS",
        "Framer-motion",
        "Typescript",
        "Nextjs",
      ],
      links: [
        { type: "Website", href: "https://home-robot.vercel.app/", icon: Icons.globe },
        { type: "Source", href: "", icon: Icons.github },
      ],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/68d50bcc028ee75622efdb7a/download.mp4",
    },
    {
      title: "Sitecraft Components",
      href: "https://ssitecraft-components.vercel.app/",
      dates: "May 2023 - Sept 2023",
      active: true,
      description:
        "It is a web application that contains pre-built  most trending components & elements and use them in your websites without having to worry about starting from scratch.",
      technologies: ["CSS", "javascript", "Markdown", "HTML", "Next.js", "Node.js"],
      links: [
        { type: "Website", href: "https://ssitecraft-components.vercel.app/", icon: Icons.globe },
        { type: "Source", href: "https://github.com/gavinarori/ssitecraft-components", icon: Icons.github },
      ],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/676962a68f5e80dcc0b73f98/download.mp4",
    },
    {
      title: "sitecraft",
      href: "https://ssitecraft.vercel.app/",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "This innovative web application helps Transforming businesses with cutting-edge web development.",
      technologies: [
        "Prisma",
        "Octokit",
        "Rest API",
        "TailwindCSS",
        "Framer-motion",
        "Typescript",
        "Nextjs",
      ],
      links: [
        { type: "Website", href: "https://ssitecraft.vercel.app/", icon: Icons.globe },
        { type: "Source", href: "", icon: Icons.github },
      ],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/67696a3c2fbe90b354d88b3f/download.mp4",
    },
    {
      title: "E-commerce Admin Panel",
      href: "https://shop-yangu.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "This is an advanced e-commerce admin panel built with Next.js, featuring shop and product management, user authentication, and detailed analytics.",
      technologies: ["Next.js.", "TailwindCSS", "MongoDB", "Prisma", "Typescript", "CSS", "Git"],
      links: [{ type: "Website", href: "https://shop-yangu.vercel.app/", icon: Icons.globe }],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/67696e682fbe90b354d8ba2d/download.mp4",
    },
    {
      title: "Distress App",
      href: "https://distress-app.netlify.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "The Distress App: Your Pocket Companion in Crisis. Instantly connect with emergency services, access vital resources, and receive immediate support during challenging situations. Empowering you with safety at your fingertips.",
      technologies: ["Next.js", "Leaflet", "react-icons", "TailwindCSS", "Typescript", "MongoDB", "Prisma"],
      links: [
        { type: "Website", href: "https://distress-app.netlify.app/", icon: Icons.globe },
        { type: "Source", href: "https://github.com/gavinarori/use-distress-app", icon: Icons.github },
      ],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/67696c172fbe90b354d8a1cc/download.mp4",
    },
    {
      title: "Movie Hub",
      href: "https://enchanting-pothos-b10347.netlify.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "This is a movie web application with recently released movie and series their trailers and respective more details on their casts.",
      technologies: ["React.js", "SCSS", "tmdb API", "react-dom", "CSS3", "Javascript", "Git"],
      links: [
        { type: "Website", href: "https://enchanting-pothos-b10347.netlify.app/", icon: Icons.globe },
        { type: "Source", href: "https://github.com/gavinarori/movie-app", icon: Icons.github },
      ],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/6769a0c4a080a6ad160a1f5e/download.mp4",
    },
    {
      title: "Gallery Web",
      href: "https://gallery-web-five.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "Introducing our web application, featuring a Theme Provider for a seamless user experience. Share your favorite photos simply by clicking on them. We're also making progress on the music feature. To upload your own pictures, just sign in and follow our user-friendly guide. Our application is built with a modern stack, complete with a robust search.",
      technologies: ["Next.js", "Unsplash API", "TailWindCSS", "Axios", "CSS3", "Typescript", "Git"],
      links: [{ type: "Website", href: "https://gallery-web-five.vercel.app/", icon: Icons.globe }],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/67696c868f5e80dcc0b7a20c/download.mp4",
    },
    {
      title: "Yodara",
      href: "https://yodora-jade.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description: "This project is a Yodora - Landing Page",
      technologies: ["React.js", "TailwindCSS", "Typescript", "Figma", "CSS3", "Git"],
      links: [{ type: "Website", href: "https://yodora-jade.vercel.app/", icon: Icons.globe }],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/67696dbd2fbe90b354d8b240/download.mp4",
    },
    {
      title: "Food Catering",
      href: "https://food-catering-kappa.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "This project is a food catering service in your town. We are ready to serve your desire. The ultimate destination for all your healthy food delivery needs.",
      technologies: ["React.js", "TailwindCSS", "react-icons", "Next.js", "CSS3", "Javascript", "Git"],
      links: [{ type: "Website", href: "https://food-catering-kappa.vercel.app/", icon: Icons.globe }],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/67696fe58f5e80dcc0b7c498/download.mp4",
    },
    {
      title: "Shopping Cart Bag application",
      href: "https://my-shopping-cart-bag-application.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "This project is a visually stunning and interactive web application that enables customers to tract their products in the wishlist and the cart.",
      technologies: ["React.js", "Redux", "react-icons", "react-dom", "CSS3", "javascript", "Git"],
      links: [{ type: "Website", href: "https://my-shopping-cart-bag-application.vercel.app/", icon: Icons.globe }],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/6769710f2fbe90b354d8cf61/download.mp4",
    },
    {
      title: "modern website",
      href: "https://porfolio-nine-pi.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description: "This project is a visually stunning and interactive web application.",
      technologies: ["Next.js", "acerternity", "TailwindCSS", "Radix", "CSS3", "Typescript", "Git"],
      links: [
        { type: "Website", href: "https://porfolio-nine-pi.vercel.app/", icon: Icons.globe },
        { type: "Source", href: "https://github.com/gavinarori/porfolio", icon: Icons.github },
      ],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/67696aa18f5e80dcc0b78d4e/download.mp4",
    },
    {
      title: "Tractor E-commerce",
      href: "https://tractor-client.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "This project is  a secondary marketplace e-commerce platform for buying and selling second-hand tractors, agri-implements, and connecting with certified tractor operators.",
      technologies: ["React.js", "TailWindCSS", "Redux", "Node.JS", "CSS3", "MongoDB", "Express.js"],
      links: [
        { type: "Website", href: "https://tractor-client.vercel.app/", icon: Icons.globe },
        { type: "Source", href: "https://github.com/Hello-Tractor-Community/ht-marketplace-hackathon-gavin-arori", icon: Icons.github },
      ],
      image: "",
      video:
        "https://video.gumlet.io/67690fd82fbe90b354d66613/6769bfdf970d80cf652ce43a/download.mp4",
    },
  ],
  hackathons: [
    {
      title: "Hello Tractor E-commerce Hackathon 🌾",
      dates: "November 20th - 22nd, 2024",
      location: "Virtual - Africa Focus",
      description:
        "Participated in the Hello Tractor E-commerce Hackathon aimed at building a secondary marketplace platform for buying and selling second-hand tractors, agri-implements, and connecting with trained tractor operators. Implemented key features including user registration, tractor listings, advanced filters, messaging system, seller dashboard, and admin panel.",
      image: "https://media.licdn.com/dms/image/v2/D4D22AQFeQswEKCPBUA/feedshare-shrink_1280/B4DZQY6kXCHUAk-/0/1735584797498?e=1758153600&v=beta&t=dCdhva39HRr0sH9BDvtnN65YdEQ1RFUXrr2LM9lX608",
      mlh: "/1735584797498.jpeg",
      links: [],
    },
  ],
  certificates: [
    {
      title: "Programming with JavaScript",
      provider: "Coursera",
      logoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcLXiAUFRc5hMtcUuLk_bdIYZO3q_shTanAA&s",
      link: "/CERTIFICATE_LANDING_PAGE~87SER8RH6JGR.jpeg",
    },
    {
      title: "React Basics",
      provider: "Coursera",
      logoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcLXiAUFRc5hMtcUuLk_bdIYZO3q_shTanAA&s",
      link: "/CERTIFICATE_LANDING_PAGE~366U537L6PQS.jpeg",
    },
    {
      title: "Introduction to Front-End Developer",
      provider: "Coursera",
      logoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcLXiAUFRc5hMtcUuLk_bdIYZO3q_shTanAA&s",
      link: "/CERTIFICATE_LANDING_PAGE~N57Q84SHVJDW.jpeg",
    },
    {
      title: "learn javascript and jquery from scratch",
      provider: "EDUONIX",
      logoUrl: "https://cdn.eduonix.com/assets/images/logo_sprite.png",
      link: "/eduonix.jpeg",
    },
    {
      title: "Introduction to CSS",
      provider: "Simplilearn",
      logoUrl: "https://www.simplilearn.com/ice9/new_logo.svgz",
      link: "/thumb_3592905_1657458314.png",
    },
  ],
  
  // Mock data for proof of work page - EDIT THESE LATER
  testimonials: [
    {
      name: "Sarah Johnson",
      title: "Product Lead at Adamur",
      quote: "Gavin delivered quickly and communicated clearly. The final UI was fast, accessible, and matched requirements perfectly. Would definitely work with him again.",
      rating: 5,
      project: "E-commerce Dashboard",
    },
    {
      name: "Michael Chen",
      title: "Senior Developer at AdZetu",
      quote: "Strong problem-solver. Turned vague ideas into a polished product with sensible tradeoffs. Code quality was excellent and documentation was thorough.",
      rating: 5,
      project: "Admin Panel System",
    },
    {
      name: "Dr. Emily Rodriguez",
      title: "CTO at Patient Xpress",
      quote: "Gavin's attention to healthcare compliance and security was impressive. He built a robust system that our medical staff finds intuitive and reliable.",
      rating: 5,
      project: "Healthcare Management Platform",
    },
    {
      name: "David Thompson",
      title: "Product Manager at BusinessHub",
      quote: "Excellent communication and delivery. Gavin understood our business requirements and built a scalable solution that exceeded expectations.",
      rating: 5,
      project: "Business Process Automation",
    },
  ],
  
  caseStudies: [
    {
      title: "Performance Optimization Challenge",
      problem: "E-commerce site loading slowly, affecting conversion rates",
      solution: "Implemented code splitting, lazy loading, and optimized bundle size",
      outcome: "40% improvement in page load times, 15% increase in conversions",
      technologies: ["Next.js", "Webpack", "Lighthouse"],
    },
    {
      title: "Legacy System Migration",
      problem: "Outdated PHP system causing maintenance headaches",
      solution: "Built modern React frontend with Node.js backend, gradual migration",
      outcome: "Reduced maintenance time by 60%, improved user satisfaction",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
    },
    {
      title: "Mobile-First Redesign",
      problem: "Desktop-focused design hurting mobile user experience",
      solution: "Complete responsive redesign with mobile-first approach",
      outcome: "Mobile engagement increased by 35%, bounce rate decreased by 25%",
      technologies: ["React Native", "Tailwind CSS", "Framer Motion"],
    },
  ],
  
  openSourceContributions: [
    {
      repo: "react-hook-form",
      type: "Bug Fix",
      description: "Fixed form validation issue with nested fields",
      url: "https://github.com/react-hook-form/react-hook-form/pull/1234",
      status: "Merged",
    },
    {
      repo: "tailwindcss",
      type: "Feature",
      description: "Added new color palette for accessibility",
      url: "https://github.com/tailwindlabs/tailwindcss/pull/5678",
      status: "Merged",
    },
    {
      repo: "next.js",
      type: "Documentation",
      description: "Improved API route examples and error handling",
      url: "https://github.com/vercel/next.js/pull/9012",
      status: "Merged",
    },
  ],
  
  blogPosts: [
    {
      title: "Building Scalable Component Libraries",
      excerpt: "Lessons learned from creating reusable UI components that scale across multiple projects",
      url: "/blog/scalable-component-libraries",
      readTime: "8 min read",
      tags: ["React", "Design Systems", "Architecture"],
    },
    {
      title: "Performance Optimization in Next.js",
      excerpt: "Practical techniques for improving Core Web Vitals and user experience",
      url: "/blog/nextjs-performance",
      readTime: "12 min read",
      tags: ["Next.js", "Performance", "Web Vitals"],
    },
    {
      title: "From Monolith to Microservices",
      excerpt: "Our journey refactoring a legacy application into maintainable microservices",
      url: "/blog/monolith-to-microservices",
      readTime: "15 min read",
      tags: ["Architecture", "Node.js", "Docker"],
    },
  ],
} as const

export type SiteData = typeof DATA


