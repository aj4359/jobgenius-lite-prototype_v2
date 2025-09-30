
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { supabase } from '@/lib/supabase'

type Application = {
  id?: number
  email: string
  company: string
  title: string
  url?: string
  status?: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected'
  notes?: string
  created_at?: string
}

export default function AppShell() {
  const [email, setEmail] = useState('')
  const [apps, setApps] = useState<Application[]>([])
  const [draft, setDraft] = useState<Application>({ email:'', company:'', title:'' })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function load() {
    if (!email) return
    setLoading(true)
    const { data, error } = await supabase
      .from('applications').select('*').eq('email', email)
      .order('created_at', { ascending: false })
    if (error) setMsg(error.message)
    setApps(data || [])
    setLoading(false)
  }
  useEffect(()=>{ load() }, [email])

  async function add() {
    if (!email || !draft.company || !draft.title) return
    const payload = { ...draft, email, status: draft.status || 'saved' }
    const { error } = await supabase.from('applications').insert(payload)
    if (error) return setMsg(error.message)
    setDraft({ email:'', company:'', title:'' })
    load()
  }
  async function setStatus(id: number, status: Application['status']) {
    const { error } = await supabase.from('applications').update({ status }).eq('id', id)
    if (error) setMsg(error.message)
    load()
  }

  return (
    <Layout>
      <div className="space-y-4">
        <div className="card space-y-3">
          <h2 className="text-xl font-bold">Job Tracker</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <input placeholder="Your email (ties rows)" value={email} onChange={e=>setEmail(e.target.value)} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none" />
            <input placeholder="Company" value={draft.company} onChange={e=>setDraft(d=>({...d, company:e.target.value}))} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none" />
            <input placeholder="Title" value={draft.title} onChange={e=>setDraft(d=>({...d, title:e.target.value}))} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none" />
            <input placeholder="URL (optional)" value={draft.url||''} onChange={e=>setDraft(d=>({...d, url:e.target.value}))} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none sm:col-span-2" />
            <button onClick={add} className="cta">Add</button>
          </div>
          {msg && <p className="text-sm text-white/70">{msg}</p>}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Your Applications</h3>
            {loading && <span className="text-xs text-white/50">Loading...</span>}
          </div>
          <ul className="space-y-2">
            {apps.map(a => (
              <li key={a.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{a.company}</div>
                    <div className="text-sm text-white/70">{a.title}</div>
                    {a.url && <a className="text-xs underline text-gold" href={a.url} target="_blank">job link</a>}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {['saved','applied','interview','offer','rejected'].map(s=>(
                      <button key={s} onClick={()=>setStatus(a.id!, s as any)} className={`px-2 py-1 rounded-lg border ${a.status===s ? 'border-gold text-gold' : 'border-white/10'}`}>{s}</button>
                    ))}
                  </div>
                </div>
              </li>
            ))}
            {!apps.length && <p className="text-sm text-white/60">No rows yet. Add your first application.</p>}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
