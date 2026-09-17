import { Nav } from "../components/nav"
import { ScrollProgress } from "../components/scroll-progress"
import { Hero } from "../components/hero"
import { About } from "../components/about"

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
      
      </main>
    </>
  )
}