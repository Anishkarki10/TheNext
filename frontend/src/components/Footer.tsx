import { Link } from 'react-router-dom'
import photo from "../../assets/next-protein-logo.jpeg"

function FooterLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div >
      <img src={photo} alt="logo" />
      </div>
      <div>
        <div className="font-display font-black text-sm leading-none tracking-wider uppercase text-[#F5EDE1]">
          The Next Protein
        </div>
        <div className="font-display font-bold text-[10px] tracking-[0.2em] uppercase text-[#A8C879]">
          Nepal
        </div>
      </div>
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#173A22] text-[#F5EDE1]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <FooterLogo />
            <p className="mt-4 font-display font-bold text-sm tracking-widest uppercase text-[#A8C879] mb-4">
              Feeding the Future
            </p>
            <p className="font-body text-sm text-[#F5EDE1]/70 leading-relaxed max-w-xs">
              Nepalese plant-based protein innovation. High-protein, meat-like texture — made for the meals Nepal loves.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/thenextproteinnepal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-[#F5EDE1]/20 text-[#F5EDE1]/60 hover:text-[#A8C879] hover:border-[#A8C879] transition-colors"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@thenextproteinnepal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-[#F5EDE1]/20 text-[#F5EDE1]/60 hover:text-[#A8C879] hover:border-[#A8C879] transition-colors"
                aria-label="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.18 8.18 0 004.77 1.53V7.14a4.85 4.85 0 01-1-.45z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-widest uppercase text-[#A8C879] mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'About Us', to: '/about' },
                { label: 'Protein Guide', to: '/protein-guide' },
                { label: 'Blog', to: '/blog' },
                { label: 'FAQs', to: '/faq' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-[#F5EDE1]/70 hover:text-[#A8C879] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs tracking-widest uppercase text-[#A8C879] mb-4">
              Business
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Wholesale Enquiry', to: '/wholesale' },
                { label: 'Partner With Us', to: '/wholesale' },
                { label: 'Terms & Conditions', to: '/terms' },
                { label: 'Privacy Notice', to: '/privacy' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-[#F5EDE1]/70 hover:text-[#A8C879] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-widest uppercase text-[#A8C879] mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:thenextproteinnepal@gmail.com"
                  className="flex items-start gap-2 font-body text-sm text-[#F5EDE1]/70 hover:text-[#A8C879] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  thenextproteinnepal@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+9779714504317"
                  className="flex items-center gap-2 font-body text-sm text-[#F5EDE1]/70 hover:text-[#A8C879] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.28-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +977 9714504317
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/9779714504317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-[#F5EDE1]/70 hover:text-[#A8C879] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp: +977 9714504317
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 font-body text-sm text-[#F5EDE1]/70">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Kusunti-14, Lalitpur, Nepal
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F5EDE1]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#F5EDE1]/40">
            © {new Date().getFullYear()} The Next Protein Nepal. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="font-body text-xs text-[#F5EDE1]/40 hover:text-[#A8C879] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="font-body text-xs text-[#F5EDE1]/40 hover:text-[#A8C879] transition-colors">
              Privacy Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
