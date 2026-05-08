import crypto from 'crypto'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password } = req.body

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' })
  }

  const token = crypto.randomBytes(32).toString('hex')
  res.status(200).json({ success: true, token })
}
