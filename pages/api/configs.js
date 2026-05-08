import { query } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const result = await query('SELECT * FROM configs ORDER BY created_at DESC')
    res.status(200).json({ configs: result.rows })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
