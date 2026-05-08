const { Pool } = require('pg')

let pool
let initialized = false

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  }
  return pool
}

async function query(text, params) {
  const client = await getPool().connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

async function initDb() {
  if (initialized) return
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS configs (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT DEFAULT '',
        image_url TEXT DEFAULT '',
        download_link TEXT NOT NULL,
        telegram_link TEXT DEFAULT '',
        downloads INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)
    await query(`ALTER TABLE configs DROP COLUMN IF EXISTS category`)
    await query(`ALTER TABLE configs ADD COLUMN IF NOT EXISTS telegram_link TEXT DEFAULT ''`)
    initialized = true
    console.log('✓ Database table ready')
  } catch (err) {
    console.error('✗ Database init error:', err.message)
  }
}

initDb()

module.exports = { query, getPool }
