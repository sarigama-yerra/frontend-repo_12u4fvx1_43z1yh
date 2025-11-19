import { useState } from 'react'

function Contact() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState(null)

  const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch(`${baseUrl}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setStatus('Thanks — we’ll get back to you shortly.')
      setForm({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      setStatus('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-20 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Let’s build something minimal and memorable</h2>
            <p className="text-white/70 mt-4 max-w-md">Tell us about your timeline, goals, and any references. We typically reply within 24 hours.</p>
          </div>
          <form onSubmit={onSubmit} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/60">Name</label>
                <input name="name" value={form.name} onChange={onChange} required
                  className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30" />
              </div>
              <div>
                <label className="text-sm text-white/60">Email</label>
                <input type="email" name="email" value={form.email} onChange={onChange} required
                  className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/60">Company (optional)</label>
                <input name="company" value={form.company} onChange={onChange}
                  className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/60">Message</label>
                <textarea name="message" value={form.message} onChange={onChange} required rows="5"
                  className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-medium">Send</button>
              {status && <span className="text-white/70 text-sm">{status}</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
