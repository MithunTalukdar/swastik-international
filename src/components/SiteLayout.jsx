import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Clients', to: '/clients' },
  { label: 'Contact', to: '/contact' },
]

function SocialIcon({ kind }) {
  if (kind === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon">
        <path
          d="M7 9v11M7 5.5v.01M11 20v-6a3 3 0 1 1 6 0v6M11 12v8M11 12V9h4v2.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
      </svg>
    )
  }

  if (kind === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon">
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
        />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon">
      <path
        d="M14 8h2V4h-2a5 5 0 0 0-5 5v3H6v4h3v4h4v-4h3.1l.9-4H13V9a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  )
}

const socialLinks = [
  { label: 'LinkedIn', href: '#', kind: 'linkedin' },
  { label: 'Instagram', href: '#', kind: 'instagram' },
  { label: 'Facebook', href: '#', kind: 'facebook' },
]

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">SI</span>
            <span className="brand-text">
              <strong>Swastik International</strong>
              <small>Global Trade Collective</small>
            </span>
          </Link>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            Menu
          </button>

          <nav className={`site-nav ${menuOpen ? 'site-nav-open' : ''}`} aria-label="Main">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="nav-cta">
              Start Project
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-shell">
        <div key={location.pathname} className="route-stage">
          <Outlet />
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-grid">
            <section className="footer-card footer-card-primary">
              <h3>Swastik International</h3>
              <p>
                Trade-first company connecting medical, agro, industrial, and export operations
                through quality control, dependable fulfillment, and long-term partnerships.
              </p>
            </section>

            <section className="footer-card">
              <h4>Quick Links</h4>
              <ul className="footer-list">
                {navItems.map((item) => (
                  <li key={`footer-${item.to}`}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="footer-card">
              <h4>Contact</h4>
              <ul className="footer-list">
                <li>
                  <a href="tel:+919831161331">+91 9831161331</a>
                </li>
                <li>
                  <a href="mailto:info@swastikintl.com">info@swastikintl.com</a>
                </li>
                <li>Liluah, Howrah, West Bengal, India</li>
              </ul>
            </section>

            <section className="footer-card">
              <h4>Social</h4>
              <div className="footer-social">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="social-chip"
                  >
                    <SocialIcon kind={item.kind} />
                  </a>
                ))}
              </div>
            </section>
          </div>

          <div className="footer-bottom">
            <p>2026 Swastik International. All rights reserved.</p>
            <p>Designed for enterprise-ready client presentation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
