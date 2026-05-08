import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [configs, setConfigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setAuthenticated(true)
    fetchConfigs()
  }, [])

  async function fetchConfigs() {
    const res = await fetch('/api/configs')
    const data = await res.json()
    if (data.configs) setConfigs(data.configs)
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this config?')) return
    const res = await fetch(`/api/admin/config/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setConfigs(configs.filter(c => c.id !== id))
    }
  }

  function logout() {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (!authenticated) return null

  return (
    <>
      <Head><title>Dashboard - BGMI Admin</title></Head>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2>⚙️ BGMI Admin</h2>
          <nav>
            <Link href="/admin/dashboard" className="active">📊 Dashboard</Link>
            <Link href="/admin/new">➕ New Config</Link>
            <a href="/" target="_blank">🌐 View Site</a>
            <a onClick={logout} style={{ cursor: 'pointer' }}>🚪 Logout</a>
          </nav>
        </aside>
        <main className="admin-main">
          <div className="admin-header">
            <h1>📊 Configs</h1>
            <Link href="/admin/new" className="btn btn-primary btn-sm">+ New Config</Link>
          </div>

          {loading ? (
            <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 60, borderRadius: 8 }} />)}
            </div>
          ) : configs.length === 0 ? (
            <div className="empty-state">
              <h3>No configs yet</h3>
              <p>Create your first config to get started</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Downloads</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {configs.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.title}</td>
                    <td><span className="config-card-category">{c.category}</span></td>
                    <td>{c.downloads || 0}</td>
                    <td>{new Date(c.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="actions">
                        <Link href={`/admin/edit/${c.id}`} className="btn-edit" style={{ textDecoration: 'none', padding: '6px 14px', borderRadius: 6, fontSize: '0.82rem' }}>Edit</Link>
                        <button className="btn-delete" onClick={() => handleDelete(c.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </>
  )
}
