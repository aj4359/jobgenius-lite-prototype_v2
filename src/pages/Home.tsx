
import Layout from '@/components/Layout'
const payhip = import.meta.env.VITE_PAYHIP_URL
export default function Home() {
  return (
    <Layout>
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-black leading-tight">
          Looking for a job <span className="text-gold">sucks</span>.
        </h1>
        <p className="text-white/70 max-w-xl mx-auto">
          One application. Infinite opportunities. JobGenius auto-fills, tracks,
          and nudges — so you don’t lose momentum.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href={payhip || '#'} className="cta" target="_blank" rel="noreferrer">
            Get Early Access
          </a>
          <a href="/demo" className="btn">Watch Demo</a>
        </div>
        <p className="text-xs text-white/40">No free tier. Serious mode only.</p>
      </section>
    </Layout>
  )
}
