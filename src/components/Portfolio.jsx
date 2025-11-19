import { useEffect, useState } from 'react'

const CATEGORIES = ['All', 'Branding', 'Animation', 'Motion', '3D']

function Portfolio() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState('All')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/projects`)
      .then(r => r.json())
      .then(data => setItems(data))
      .catch(() => setItems([]))
  }, [baseUrl])

  const filtered = active === 'All' ? items : items.filter(i => i.category === active)

  return (
    <section id="work" className="py-20 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Selected Work</h2>
            <p className="text-white/60 mt-2">A concise set of branding and motion case studies.</p>
          </div>
          <div className="hidden md:flex gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full border ${active === cat ? 'bg-white text-black' : 'border-white/20 text-white/80 hover:bg-white/10'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(card => (
            <article key={card.id} className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10">
              {card.image_url ? (
                <img src={card.image_url} alt={card.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="h-56 w-full bg-gradient-to-br from-white/10 to-white/5" />
              )}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{card.title}</h3>
                  <p className="text-xs text-white/60">{card.category}</p>
                </div>
                {card.tags?.length ? (
                  <div className="hidden md:flex gap-1">
                    {card.tags.slice(0,2).map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wide bg-white/10 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {/* Mobile filter */}
        <div className="mt-8 md:hidden flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full border ${active === cat ? 'bg-white text-black' : 'border-white/20 text-white/80 hover:bg-white/10'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
