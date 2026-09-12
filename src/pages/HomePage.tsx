import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Projects } from '../components/Projects'
import { Experience } from '../components/Experience'
import { Skills } from '../components/Skills'
import { Education } from '../components/Education'
import { BlogTeaser } from '../components/BlogTeaser'
import { Footer } from '../components/Footer'
import { SeoHead } from '../components/SeoHead'

export default function HomePage() {
  return (
    <>
      <SeoHead />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <BlogTeaser />
      </main>
      <Footer />
    </>
  )
}
