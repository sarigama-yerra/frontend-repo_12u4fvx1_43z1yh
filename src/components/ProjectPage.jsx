import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    fetch(`${baseUrl}/api/projects/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then(data => { if (active) setProject(data) })
      .catch(() => { if (active) setProject(null) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [id, baseUrl])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-white/70">Loading…</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-xl">Project not found</div>
          <button onClick={() => navigate('/')} className="rounded-full bg-white text-black px-5 py-2">Back home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/10">
        <div className="container mx-auto px-6 md:px-10 lg:px-16 h-14 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">← Back</button>
          <a href="/" className="text-white/80 hover:text-white">Home</a>
        </div>
      </header>

      <main className="pb-16">
        <section className="relative w-full">
          {project.image_url ? (
            <img src={project.image_url} alt={project.title} className="w-full h-[40vh] md:h-[60vh] object-cover" />
          ) : (
            <div className="w-full h-[40vh] md:h-[60vh] bg-gradient-to-br from-white/10 to-white/5" />
          )}
          <div className="container mx-auto px-6 md:px-10 lg:px-16 -mt-10">
            <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/80">{project.category}</span>
                {Array.isArray(project.tags) && project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5">{tag}</span>
                ))}
              </div>
              <h1 className="mt-4 text-3xl md:text-5xl font-semibold">{project.title}</h1>
              {project.description && (
                <p className="mt-4 text-white/80 max-w-3xl">{project.description}</p>
              )}
            </div>
          </div>
        </section>

        {project.video_url && (
          <section className="container mx-auto px-6 md:px-10 lg:px-16 mt-10">
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
              <iframe src={project.video_url} title="Project video" className="w-full h-full" allowFullScreen></iframe>
            </div>
          </section>
        )}

        <section className="container mx-auto px-6 md:px-10 lg:px-16 mt-10">
          <div className="prose prose-invert max-w-none">
            <p className="text-white/70">More case-study content can go here — process notes, before/after, motion clips, and key outcomes.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
