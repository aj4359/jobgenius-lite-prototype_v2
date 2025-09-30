
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { supabase } from '@/lib/supabase'

export default function Status() {
  const [envOk, setEnvOk] = useState(false)
  const [dbOk, setDbOk] = useState<boolean | null>(null)
  const [netOk, setNetOk] = useState<boolean | null>(null)
  const [payhipOk, setPayhipOk] = useState<boolean | null>(null)

  useEffect(()=>{
    setEnvOk(!!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY)
    setNetOk(navigator.onLine)
    ;(async ()=>{
      try {
        const { error } = await supabase.from('profiles').select('email', { count:'exact', head: true }).limit(1)
        setDbOk(!error)
      } catch { setDbOk(false) }
    })()
    ;(async ()=>{
      try {
        const res = await fetch(import.meta.env.VITE_PAYHIP_URL, { method:'HEAD', mode:'no-cors' })
        setPayhipOk(true)
      } catch { setPayhipOk(false) }
    })()
  }, [])

  async function seed() {
    const email = `demo+${Math.floor(Math.random()*1e6)}@jobgenius.ai`;
    await supabase.from('profiles').upsert({ email });
    await supabase.from('job_prefs').upsert({ email, desired_role:'Product Manager', preferred_location:'Remote' });
    await supabase.from('applications').insert([
      { email, company:'Acme', title:'PM', url:'https://example.com', status:'applied' },
      { email, company:'Nova', title:'APM', status:'saved' },
    ]);
    alert('Seeded demo rows for: ' + email);
  }

  const Item = ({label, ok}:{label:string, ok:boolean|null}) => (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
      <span>{label}</span>
      <span className={`text-sm ${ok ? 'text-green-400' : 'text-red-400'}`}>{ok===null? '—' : ok? 'OK' : 'FAIL'}</span>
    </div>
  )

  return (
    <Layout>
      <div className="space-y-3">
        <h2 className="text-xl font-bold">System Status</h2>
        <Item label="Env vars present" ok={envOk} />
        <Item label="Internet (navigator.onLine)" ok={!!netOk} />
        <Item label="Supabase reachable" ok={dbOk} />
        <Item label="PayHip reachable" ok={payhipOk} />
        <button className="btn" onClick={seed}>Seed demo rows</button>
      </div>
    </Layout>
  )
}
