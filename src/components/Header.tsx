import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import main from '../../assets/next-protein-logo.jpeg'
function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div
      >   <img
      src={main}
      alt="The Next Protein Nepal"
      className="h-16 w-auto"
    />
      </div>
      <div>
        <div
          className={`font-display font-black text-sm leading-none tracking-wider uppercase transition-colors duration-300 ${
            light ? 'text-[#F5EDE1]' : 'text-[#264F24]'
          }`}
        >
          The Next Protein
        </div>
        <div
          className={`font-display font-bold text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
            light ? 'text-[#A8C879]' : 'text-[#557A35]'
          }`}
        >
          Nepal
        </div>
      </div>
    </Link>
  )
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Protein Guide', to: '/protein-guide' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const transparent = isHome && !scrolled
  const light = transparent

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          transparent
            ? 'bg-transparent'
            : 'bg-[#FCFAF6] border-b border-[#E8DDCD] shadow-sm'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
          <Logo light={light} />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link transition-colors duration-200 ${
                  light ? 'text-[#F5EDE1] hover:text-white' : 'text-[#22231F] hover:text-[#264F24]'
                } ${location.pathname === link.to ? (light ? 'text-[#A8C879]' : 'text-[#264F24]') : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp icon */}
            <a
              href="https://wa.me/9779714504317"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${light ? 'text-[#A8C879] hover:text-white' : 'text-[#557A35] hover:text-[#264F24]'}`}
              aria-label="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            <Link
              to="/wholesale"
              className={`px-4 py-2 rounded-full text-sm font-semibold font-body transition-all duration-200 ${
                light
                  ? 'bg-[#A8C879] text-[#173A22] hover:bg-white hover:text-[#264F24]'
                  : 'bg-[#264F24] text-[#F5EDE1] hover:bg-[#173A22]'
              }`}
            >
              Partner With Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 ${light ? 'text-[#F5EDE1]' : 'text-[#264F24]'}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#22231F]/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-[#FCFAF6] flex flex-col transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 border-b border-[#E8DDCD] flex items-center justify-between">
            <Logo />
            <button onClick={() => setMenuOpen(false)} className="text-[#676A61]" aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body font-semibold text-base py-2 border-b border-[#E8DDCD] transition-colors ${
                  location.pathname === link.to ? 'text-[#264F24]' : 'text-[#22231F] hover:text-[#264F24]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-6 flex flex-col gap-3">
            <a
              href="https://wa.me/9779714504317"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#A8C879] text-[#173A22] font-semibold text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            <Link
              to="/wholesale"
              className="flex items-center justify-center px-4 py-3 rounded-full bg-[#264F24] text-[#F5EDE1] font-semibold text-sm"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
