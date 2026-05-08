import { query } from '../../../../lib/db'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'PUT') {
    const { title, description, image_url, download_link, category } = req.body
    try {
      const result = await query(
        `UPDATE configs SET title=$1, description=$2, image_url=$3, download_link=$4, category=$5, updated_at=NOW() WHERE id=$6 RETURNING *`,
        [title, description, image_url, download_link, category, id]
      )
      if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json({ config: result.rows[0] })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const result = await query('DELETE FROM configs WHERE id = $1 RETURNING id', [id])
      if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json({ success: true })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
