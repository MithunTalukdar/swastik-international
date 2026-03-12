export default function PageBanner({ title, subtitle, image, eyebrow = 'Section' }) {
  return (
    <header className="page-banner">
      <img
        src={image?.src}
        alt={image?.alt ?? title}
        className="page-banner-media"
        loading="eager"
        decoding="sync"
      />
      <div className="page-banner-overlay" />

      <div className="page-banner-content page-shell">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  )
}
