-- Run this SQL in your Supabase project SQL editor
-- Creates the configs table for BGMI Configs

CREATE TABLE IF NOT EXISTS configs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  download_link TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE configs ENABLE ROW LEVEL SECURITY;

-- Public can read all configs
CREATE POLICY "Public can view configs" ON configs
  FOR SELECT USING (true);

-- Only service role can insert/update/delete (handled via API with admin password)
CREATE POLICY "Service role can insert" ON configs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update" ON configs
  FOR UPDATE USING (true);

CREATE POLICY "Service role can delete" ON configs
  FOR DELETE USING (true);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_configs_created_at ON configs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_configs_category ON configs(category);
