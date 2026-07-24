import { Nav } from "../components/nav"
import { ScrollProgress } from "../components/scroll-progress"
import { Hero } from "../components/hero"
import { About } from "../components/about"
import { Experience } from "../components/experience"
import { Projects } from "../components/projects"
import { Skills } from "../components/skills"
import { BlogTeaser } from "../components/blog-teaser"
import { Testimonials } from "../components/testimonials"
import { Contact } from "../components/contact"
import { Footer } from "../components/footer"

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <BlogTeaser />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}