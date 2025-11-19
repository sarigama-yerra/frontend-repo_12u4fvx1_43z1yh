import { useEffect, useState } from 'react'

function Clients() {
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/clients`)
      .then(r => r.json())
      .then(data => setItems(data))
      .catch(() => setItems([]))
  }, [baseUrl])

  return (
    <section className="py-16 bg-[#0a0a0a] text-white/80">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <h2 className="text-2xl font-semibold">Trusted by teams like</h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
          {items.map(c => (
            <a key={c.id} href={c.website || '#'} className="group opacity-80 hover:opacity-100 transition-opacity">
              {c.logo_url ? (
                <img src={c.logo_url} alt={c.name} className="h-10 w-auto mx-auto object-contain" />
              ) : (
                <div className="h-10 w-full bg-white/10 rounded" />
              )}
            </a>
          ))}
          {!items.length && (
            <div className="col-span-full text-white/50">Upload client logos via the API to display them here.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Clients
