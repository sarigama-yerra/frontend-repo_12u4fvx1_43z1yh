import { useEffect, useState } from 'react'

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-white/60">{label}</span>
      {children}
    </label>
  )
}

export default function AdminPanel({ open, onClose }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [passcode, setPasscode] = useState('')
  const [authed, setAuthed] = useState(false)
  const [status, setStatus] = useState('')

  const [project, setProject] = useState({
    title: '',
    category: 'Branding',
    description: '',
    image_url: '',
    video_url: '',
    tags: '',
    featured: false,
    order: 1,
  })
  const [testimonial, setTestimonial] = useState({ name: '', role: '', company: '', quote: '', avatar_url: '' })
  const [client, setClient] = useState({ name: '', website: '', logo_url: '' })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('studio_admin_token')
      if (saved) {
        setPasscode(saved)
        setAuthed(true)
      }
    } catch {}
  }, [open])

  const unlock = () => {
    const ok = !!passcode
    setAuthed(ok)
    if (ok) {
      try {
        localStorage.setItem('studio_admin_token', passcode)
        localStorage.setItem('studio_admin_authed', '1')
        window.dispatchEvent(new Event('storage'))
      } catch {}
    }
  }

  const lock = () => {
    setAuthed(false)
    try {
      localStorage.removeItem('studio_admin_authed')
      window.dispatchEvent(new Event('storage'))
    } catch {}
  }

  const seed = async () => {
    setStatus('Seeding content...')
    try {
      const res = await fetch(`${baseUrl}/api/seed`, {
        method: 'POST',
        headers: { 'X-Admin-Token': passcode || '' },
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('Sample content added. Refresh sections to see updates.')
    } catch (e) {
      setStatus('Unauthorized or error while seeding.')
    }
  }

  const submitProject = async (e) => {
    e.preventDefault()
    setStatus('Saving project...')
    try {
      const payload = { ...project, tags: project.tags ? project.tags.split(',').map(t => t.trim()).filter(Boolean) : [] }
      const res = await fetch(`${baseUrl}/api/projects`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('Project saved.')
      setProject({ title: '', category: 'Branding', description: '', image_url: '', video_url: '', tags: '', featured: false, order: 1 })
    } catch (e) { setStatus('Error saving project.') }
  }

  const submitTestimonial = async (e) => {
    e.preventDefault()
    setStatus('Saving testimonial...')
    try {
      const res = await fetch(`${baseUrl}/api/testimonials`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(testimonial)
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('Testimonial saved.')
      setTestimonial({ name: '', role: '', company: '', quote: '', avatar_url: '' })
    } catch (e) { setStatus('Error saving testimonial.') }
  }

  const submitClient = async (e) => {
    e.preventDefault()
    setStatus('Saving client...')
    try {
      const res = await fetch(`${baseUrl}/api/clients`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(client)
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('Client saved.')
      setClient({ name: '', website: '', logo_url: '' })
    } catch (e) { setStatus('Error saving client.') }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-3xl rounded-2xl bg-[#111] border border-white/10" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="font-medium">Admin</h3>
          <div className="flex items-center gap-3">
            {authed && <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">Unlocked</span>}
            <button onClick={onClose} className="text-white/60 hover:text-white">Close</button>
          </div>
        </div>
        <div className="p-4">
          {!authed ? (
            <div className="space-y-3">
              <p className="text-white/70 text-sm">Enter your passcode to unlock editing. It stays in your browser.</p>
              <div className="flex gap-2">
                <input value={passcode} onChange={e => setPasscode(e.target.value)} placeholder="Passcode"
                  className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none" />
                <button onClick={unlock} className="rounded-lg bg-white text-black px-4 py-2">Unlock</button>
              </div>
              {status && <p className="text-xs text-white/50">{status}</p>}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <button onClick={seed} className="rounded-full bg-white text-black px-4 py-2">Add sample content</button>
                <span className="text-white/60 text-sm">Uses your passcode for authorization.</span>
                <button onClick={lock} className="ml-auto text-sm text-white/70 hover:text-white">Lock</button>
              </div>

              <form onSubmit={submitProject} className="space-y-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <h4 className="font-medium">Add Project</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Title"><input value={project.title} onChange={e=>setProject(p=>({...p, title:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" required/></Field>
                  <Field label="Category">
                    <select value={project.category} onChange={e=>setProject(p=>({...p, category:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">
                      <option>Branding</option>
                      <option>Animation</option>
                      <option>Motion</option>
                      <option>3D</option>
                    </select>
                  </Field>
                  <Field label="Image URL"><input value={project.image_url} onChange={e=>setProject(p=>({...p, image_url:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"/></Field>
                  <Field label="Video URL (optional)"><input value={project.video_url} onChange={e=>setProject(p=>({...p, video_url:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"/></Field>
                  <Field label="Tags (comma separated)"><input value={project.tags} onChange={e=>setProject(p=>({...p, tags:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"/></Field>
                  <Field label="Order"><input type="number" value={project.order} onChange={e=>setProject(p=>({...p, order:Number(e.target.value)}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"/></Field>
                  <Field label="Featured">
                    <div className="h-full flex items-center">
                      <input type="checkbox" checked={project.featured} onChange={e=>setProject(p=>({...p, featured:e.target.checked}))} className="rounded"/>
                    </div>
                  </Field>
                </div>
                <Field label="Description"><textarea value={project.description} onChange={e=>setProject(p=>({...p, description:e.target.value}))} rows={3} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"/></Field>
                <button type="submit" className="rounded-full bg-white text-black px-4 py-2">Save Project</button>
              </form>

              <form onSubmit={submitTestimonial} className="space-y-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <h4 className="font-medium">Add Testimonial</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Name"><input value={testimonial.name} onChange={e=>setTestimonial(t=>({...t, name:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" required/></Field>
                  <Field label="Role"><input value={testimonial.role} onChange={e=>setTestimonial(t=>({...t, role:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"/></Field>
                  <Field label="Company"><input value={testimonial.company} onChange={e=>setTestimonial(t=>({...t, company:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"/></Field>
                  <Field label="Avatar URL (optional)"><input value={testimonial.avatar_url} onChange={e=>setTestimonial(t=>({...t, avatar_url:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"/></Field>
                </div>
                <Field label="Quote"><textarea value={testimonial.quote} onChange={e=>setTestimonial(t=>({...t, quote:e.target.value}))} rows={3} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" required/></Field>
                <button type="submit" className="rounded-full bg-white text-black px-4 py-2">Save Testimonial</button>
              </form>

              <form onSubmit={submitClient} className="space-y-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <h4 className="font-medium">Add Client</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Name"><input value={client.name} onChange={e=>setClient(c=>({...c, name:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" required/></Field>
                  <Field label="Website"><input value={client.website} onChange={e=>setClient(c=>({...c, website:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"/></Field>
                  <Field label="Logo URL"><input value={client.logo_url} onChange={e=>setClient(c=>({...c, logo_url:e.target.value}))} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"/></Field>
                </div>
                <button type="submit" className="rounded-full bg-white text-black px-4 py-2">Save Client</button>
              </form>

              {status && <p className="text-sm text-white/60">{status}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
