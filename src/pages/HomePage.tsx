import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Projects } from '../components/Projects'
import { Experience } from '../components/Experience'
import { BlogTeaser } from '../components/BlogTeaser'
import { Footer } from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <BlogTeaser />
      </main>
      <Footer />
    </>
  )
}
