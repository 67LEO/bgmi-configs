import { query } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { title, description, image_url, download_link, telegram_link } = req.body

  try {
    const result = await query(
      `INSERT INTO configs (title, description, image_url, download_link, telegram_link) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, image_url, download_link, telegram_link || '']
    )
    res.status(201).json({ config: result.rows[0] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
