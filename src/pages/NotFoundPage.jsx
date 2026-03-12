import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="section-block page-shell">
      <article className="panel not-found-panel">
        <p className="eyebrow">404 Error</p>
        <h1>Page Not Found</h1>
        <p>The requested page is unavailable. Use navigation to continue browsing the website.</p>
        <Link to="/" className="btn btn-primary">
          Return Home
        </Link>
      </article>
    </section>
  )
}
