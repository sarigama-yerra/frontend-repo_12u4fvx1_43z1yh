import { useEffect, useState } from 'react'

function Testimonials() {
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/testimonials`)
      .then(r => r.json())
      .then(data => setItems(data))
      .catch(() => setItems([]))
  }, [baseUrl])

  return (
    <section className="py-20 bg-[#0a0a0a] text-white/90">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-semibold">What clients say</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(t => (
            <blockquote key={t.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-lg leading-relaxed">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-white/60">{t.name} • {t.role || ''} {t.company ? `@ ${t.company}` : ''}</footer>
            </blockquote>
          ))}
          {!items.length && (
            <div className="md:col-span-3 text-white/60">Add testimonials via the API to see them here.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
