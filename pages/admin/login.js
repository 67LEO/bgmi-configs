import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()

    if (data.success) {
      localStorage.setItem('admin_token', data.token)
      router.push('/admin/dashboard')
    } else {
      setError(data.error || 'Invalid credentials')
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Admin Login - BGMI Configs</title>
      </Head>
      <div className="bg-grid" />
      <div className="login-page">
        <div className="login-box">
          <h1>🔐 Admin Panel</h1>
          <p>Enter credentials to manage configs</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Doom"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Login'}
            </button>
            {error && <p className="login-error" style={{ display: 'block' }}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  )
}
