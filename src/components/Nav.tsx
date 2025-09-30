
import { Link, NavLink } from 'react-router-dom'
export default function Nav() {
  const link = (to: string, label: string) => (
    <NavLink to={to} className={({isActive}) =>
      `px-3 py-2 rounded-xl ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`
    }>{label}</NavLink>
  )
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-ink/70">
      <nav className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2">
        <Link to="/" className="font-black tracking-wide text-gold">JobGenius</Link>
        <div className="ml-auto flex items-center gap-1 text-sm">
          {link('/', 'Home')}
          {link('/demo', 'Demo')}
          {link('/onboarding', 'Onboarding')}
          {link('/app', 'Tracker')}
          {link('/status', 'Status')}
        </div>
      </nav>
    </header>
  )
}
