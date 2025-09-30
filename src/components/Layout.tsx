
import Nav from './Nav'
import Palette from '@/components/Palette'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="frame">
      <Nav />
      <main className="max-w-3xl mx-auto px-4 py-6">
        {children}
      </main>
      <Palette />
      <div className="watermark">TA GuruLabs © • JobGenius AI</div>
    </div>
  )
}
