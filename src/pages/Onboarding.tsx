
import { useState } from 'react'
import Layout from '@/components/Layout'
import { supabase } from '@/lib/supabase'

export default function Onboarding() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setMsg(null)
    try {
      const { error: pErr } = await supabase
        .from('profiles')
        .upsert({ email })
      if (pErr) throw pErr
      const { error: jErr } = await supabase.from('job_prefs').upsert({
        email, desired_role: role, preferred_location: location
      })
      if (jErr) throw jErr
      setMsg('Saved! You can go to the Tracker.')
    } catch (e:any) {
      setMsg(e.message || 'Error saving. Check Supabase tables & RLS.')
    } finally { setLoading(false) }
  }

  return (
    <Layout>
      <form onSubmit={submit} className="card space-y-4 max-w-xl mx-auto">
        <h2 className="text-xl font-bold">Onboarding</h2>
        <label className="block">
          <span className="text-sm text-white/60">Email</span>
          <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none" />
        </label>
        <label className="block">
          <span className="text-sm text-white/60">Desired role</span>
          <input value={role} onChange={e=>setRole(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none" />
        </label>
        <label className="block">
          <span className="text-sm text-white/60">Preferred location</span>
          <input value={location} onChange={e=>setLocation(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none" />
        </label>
        <div className="flex gap-3">
          <button className="cta" disabled={loading}>{loading? 'Saving...' : 'Save'}</button>
          <a href="/app" className="btn">Open Tracker</a>
        </div>
        {msg && <p className="text-sm text-white/70">{msg}</p>}
      </form>
    </Layout>
  )
}
