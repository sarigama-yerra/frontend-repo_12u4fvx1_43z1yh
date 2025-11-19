import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-md">
              Minimal brands. Maximum motion.
            </h1>
            <p className="mt-4 md:mt-6 text-white/80 max-w-xl">
              We craft modern identities and motion systems that move people and products. Clean, intentional, and effective.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a href="#work" className="inline-flex items-center rounded-full bg-white/90 hover:bg-white text-gray-900 px-6 py-3 font-medium transition-colors">View Work</a>
              <a href="#contact" className="inline-flex items-center rounded-full bg-transparent border border-white/60 hover:bg-white/10 text-white px-6 py-3 font-medium transition-colors">Start a Project</a>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
    </section>
  )
}

export default Hero
