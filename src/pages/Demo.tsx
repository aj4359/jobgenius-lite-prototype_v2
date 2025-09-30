
import Layout from '@/components/Layout'
export default function Demo() {
  return (
    <Layout>
      <div className="card space-y-4">
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
          <video className="w-full h-full" autoPlay muted loop playsInline controls>
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex gap-3">
          <a href={import.meta.env.VITE_PAYHIP_URL || '#'} className="cta" target="_blank">Preorder Now</a>
          <a href="/onboarding" className="btn">Start Onboarding</a>
        </div>
      </div>
    </Layout>
  )
}
