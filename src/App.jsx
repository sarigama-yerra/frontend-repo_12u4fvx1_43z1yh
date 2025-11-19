import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Clients from './components/Clients'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/10">
        <div className="container mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
          <a href="#" className="font-medium tracking-tight">Studio</a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <a href="#contact" className="hidden md:inline-flex items-center rounded-full bg-white text-black px-4 py-2 text-sm font-medium">Start a Project</a>
        </div>
      </header>

      <main className="pt-16">
        <Hero />
        <Clients />
        <Portfolio />
        <Testimonials />
        <Contact />

        {/* Footer */}
        <footer className="py-10 text-center text-white/50 text-sm">© {new Date().getFullYear()} Studio — Clean brands, thoughtful motion.</footer>
      </main>
    </div>
  )
}

export default App
