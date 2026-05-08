import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function EditConfig() {
  const router = useRouter()
  const { id } = router.query
  const [authenticated, setAuthenticated] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', image_url: '', download_link: '', category: 'General' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { router.push('/admin/login'); return }
    setAuthenticated(true)
    if (id) fetchConfig()
  }, [id])

  async function fetchConfig() {
    const res = await fetch(`/api/config/${id}`)
    const data = await res.json()
    if (data.config) {
      setForm({
        title: data.config.title || '',
        description: data.config.description || '',
        image_url: data.config.image_url || '',
        download_link: data.config.download_link || '',
        category: data.config.category || 'General'
      })
    }
    setLoading(false)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.download_link) return alert('Title and Download Link are required!')
    setSaving(true)

    const res = await fetch(`/api/admin/config/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      alert('Failed to update config')
    }
    setSaving(false)
  }

  if (!authenticated) return null

  return (
    <>
      <Head><title>Edit Config - BGMI Admin</title></Head>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2>⚙️ BGMI Admin</h2>
          <nav>
            <Link href="/admin/dashboard">📊 Dashboard</Link>
            <Link href="/admin/new">➕ New Config</Link>
            <a href="/" target="_blank">🌐 View Site</a>
          </nav>
        </aside>
        <main className="admin-main">
          <div className="admin-header">
            <h1>✏️ Edit Config</h1>
            <Link href="/admin/dashboard" className="btn btn-secondary btn-sm">← Back</Link>
          </div>

          {loading ? (
            <div><div className="skeleton" style={{ height: 60, borderRadius: 8, marginBottom: 16 }} /><div className="skeleton" style={{ height: 120, borderRadius: 8 }} /></div>
          ) : (
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input name="image_url" value={form.image_url} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Download Link *</label>
                <input name="download_link" value={form.download_link} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option>General</option>
                  <option>Claw</option>
                  <option>Classic</option>
                  <option>Gyro</option>
                  <option>Zero Recoil</option>
                  <option>Scrim</option>
                  <option>Updated</option>
                  <option>Popular</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? <span className="spinner" /> : 'Update Config ✅'}
              </button>
            </form>
          )}
        </main>
      </div>
    </>
  )
}
