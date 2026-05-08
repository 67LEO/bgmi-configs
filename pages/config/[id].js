import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import AdBanner from '../../components/AdBanner'
import AdPopunder from '../../components/AdPopunder'

export default function ConfigDetail() {
  const router = useRouter()
  const { id } = router.query
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/config/${id}`)
      .then(r => r.json())
      .then(d => { if (d.config) setConfig(d.config) })
      .finally(() => setLoading(false))
  }, [id])

  async function handleDownload() {
    if (!config) return
    await fetch(`/api/config/${config.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ downloads: (config.downloads || 0) + 1 })
    })
    window.open(config.download_link, '_blank')
  }

  return (
    <>
      <Head>
        <title>{config ? `${config.title} - BGMI Configs` : 'Loading...'}</title>
        <meta name="description" content={config?.description || 'BGMI config details'} />
      </Head>

      <AdPopunder />
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      <div className="detail-container">
        <Link href="/#configs" className="detail-back">
          ← Back to Configs
        </Link>

        {loading ? (
          <div>
            <div className="skeleton" style={{ height: 300, borderRadius: 16, marginBottom: 24 }} />
            <div className="skeleton" style={{ height: 40, width: '60%', borderRadius: 8, marginBottom: 16 }} />
            <div className="skeleton" style={{ height: 20, width: '40%', borderRadius: 8, marginBottom: 24 }} />
            <div className="skeleton" style={{ height: 120, borderRadius: 8 }} />
          </div>
        ) : !config ? (
          <div className="empty-state">
            <h3>Config not found</h3>
            <p>This config may have been removed</p>
            <Link href="/" className="btn btn-primary" style={{ marginTop: 20 }}>Go Home</Link>
          </div>
        ) : (
          <>
            {config.image_url && (
              <img src={config.image_url} alt={config.title} className="detail-image" />
            )}
            <h1 className="detail-title">{config.title}</h1>
            <div className="detail-meta">
              <span>📂 {config.category}</span>
              <span>⬇️ {config.downloads || 0} downloads</span>
            </div>
            {config.description && (
              <p className="detail-description">{config.description}</p>
            )}

            <AdBanner />

            <div className="detail-actions">
              <button className="btn btn-primary" onClick={handleDownload}>
                ⬇ Download Config
              </button>
              <button className="btn btn-secondary" onClick={() => navigator.clipboard.writeText(config.download_link)}>
                📋 Copy Link
              </button>
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        <p>BGMI Configs &copy; 2026 | Not affiliated with Krafton Inc.</p>
      </footer>
    </>
  )
}
