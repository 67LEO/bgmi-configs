import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import AdBanner from '../components/AdBanner'
import AdPopunder from '../components/AdPopunder'

export default function Home() {
  const [configs, setConfigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/configs')
      .then(r => r.json())
      .then(d => { if (d.configs) setConfigs(d.configs) })
      .finally(() => setLoading(false))
  }, [])

  const filtered = search
    ? configs.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(search.toLowerCase())) ||
        (c.telegram_link && c.telegram_link.toLowerCase().includes(search.toLowerCase()))
      )
    : configs

  return (
    <>
      <Head>
        <title>BGMI Configs - Best Sensitivity & Settings 2026</title>
        <meta name="description" content="Download latest BGMI 4.4 configs, sensitivity settings, pro player configs. Zero recoil, claw, gyro and more." />
        <meta property="og:title" content="BGMI Configs - Best Settings" />
        <meta property="og:description" content="Download latest BGMI configs and dominate the battleground." />
      </Head>

      <AdPopunder />

      {/* Hero Section with Video Background */}
      <section className="hero-video-section">
        <div className="hero-video-wrap">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="https://res.cloudinary.com/dm2hjn5wp/video/upload/q_auto/f_auto/v1778224187/ezgif-1618569234cc187f_qjeivj.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        <div className="hero-video-content">
          <div className="hero-video-badge">
            <span className="badge-dot" />
            Pro Configs
          </div>
          <h1 className="hero-video-title">
            Dominate the<br />
            <span className="text-gradient">Battleground</span>
          </h1>
          <p className="hero-video-desc">
            Hand-picked BGMI 4.4 sensitivity settings, zero recoil configs, and pro player setups.
            Download and elevate your gameplay.
          </p>
          <div className="hero-video-actions">
            <a href="#configs" className="btn btn-primary btn-lg">
              Browse Configs ↓
            </a>
            <a href="/admin/login" className="btn btn-outline btn-lg">
              Admin → 
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">{configs.length}+</div>
              <div className="hero-stat-label">Configs</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">100%</div>
              <div className="hero-stat-label">Free</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">4.4</div>
              <div className="hero-stat-label">Latest Version</div>
            </div>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px' }} id="configs">
        <AdBanner />

        <div className="section-header" style={{ marginTop: 40 }}>
          <h2>All Configs</h2>
          <p>Find the perfect config for your playstyle</p>
        </div>

        <div style={{ maxWidth: 400, margin: '0 auto 32px', position: 'relative', zIndex: 1 }}>
          <input
            type="text"
            placeholder="Search configs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              color: '#e0e0e0',
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {loading ? (
          <div className="config-grid">
            {[1,2,3].map(i => (
              <div key={i} className="skeleton skeleton-card" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No configs found</h3>
            <p>Check back later for new configs</p>
          </div>
        ) : (
          <div className="config-grid">
            {filtered.map((config, i) => (
              <Link href={`/config/${config.id}`} key={config.id} style={{ textDecoration: 'none' }}>
                <div className="config-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="config-card-img">
                    {config.image_url ? (
                      <img src={config.image_url} alt={config.title} />
                    ) : (
                      '🎮'
                    )}
                  </div>
                  <div className="config-card-body">
                    <h3>{config.title}</h3>
                    {config.description && <p>{config.description}</p>}
                    <div className="config-card-footer">
                      {config.telegram_link && <span className="config-card-category">📢 Telegram</span>}
                      <span className="config-card-downloads">⬇ {config.downloads || 0}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <AdBanner />
      </main>

      <footer className="footer">
        <p>BGMI Configs &copy; 2026 | Not affiliated with Krafton Inc.</p>
      </footer>
    </>
  )
}
