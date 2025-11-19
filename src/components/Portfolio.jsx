import { useEffect, useMemo, useState } from 'react'

const CATEGORIES = ['Branding', 'Animation', 'Motion', '3D']

function Card({ card }) {
  return (
    <a href={`/project/${card.id}`} className="group block relative overflow-hidden rounded-xl bg-white/5 border border-white/10">
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
    </a>
  )
}

function Portfolio() {
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/projects`)
      .then(r => r.json())
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
  }, [baseUrl])

  const featured = useMemo(() => items.filter(i => i.featured), [items])
  const byCategory = useMemo(() => {
    const groups = {}
    for (const cat of CATEGORIES) groups[cat] = []
    for (const i of items) {
      if (CATEGORIES.includes(i.category)) groups[i.category].push(i)
    }
    return groups
  }, [items])

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
              <a key={cat} href={`#cat-${cat}`} className="px-4 py-2 rounded-full border border-white/20 text-white/80 hover:bg-white/10">
                {cat}
              </a>
            ))}
          </div>
        </div>

        {/* Featured Grid */}
        {featured.length > 0 && (
          <>
            <h3 className="text-xl font-medium mb-4">Featured</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featured.sort((a,b) => (a.order||0)-(b.order||0)).map(card => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          </>
        )}

        {/* Category Sections */}
        <div className="space-y-12">
          {CATEGORIES.map(cat => (
            <div key={cat} id={`cat-${cat}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">{cat}</h3>
                <a href="#work" className="text-sm text-white/60 hover:text-white">Back to top</a>
              </div>
              {byCategory[cat]?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {byCategory[cat].sort((a,b) => (a.order||0)-(b.order||0)).map(card => (
                    <Card key={card.id} card={card} />
                  ))}
                </div>
              ) : (
                <div className="text-white/50">No {cat} items yet.</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
