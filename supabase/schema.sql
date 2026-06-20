-- ============================================
-- REPARARPINCHAZOCOCHE.COM — SUPABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- TABLE: pages
CREATE TABLE IF NOT EXISTS pages (
  id                BIGSERIAL PRIMARY KEY,
  slug              TEXT UNIQUE NOT NULL,
  service_type      TEXT NOT NULL DEFAULT 'neumaticos-camion',
  h1                TEXT,
  meta_title        TEXT,
  meta_description  TEXT,
  intro             TEXT,
  body_section      TEXT,
  deep_section      TEXT,
  address           TEXT,
  city              TEXT,
  district          TEXT,
  status            TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published','draft')),
  indexed_google    BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pages_slug   ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
CREATE INDEX IF NOT EXISTS idx_pages_type   ON pages(service_type);

-- TABLE: blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id            BIGSERIAL PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  excerpt       TEXT,
  content       TEXT,
  meta_title    TEXT,
  meta_desc     TEXT,
  category      TEXT DEFAULT 'consejos',
  read_time     INTEGER DEFAULT 5,
  district      TEXT,
  city          TEXT,
  published_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_slug     ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_date     ON blog_posts(published_at DESC);

-- TABLE: leads
CREATE TABLE IF NOT EXISTS leads (
  id               BIGSERIAL PRIMARY KEY,
  phone            TEXT,
  name             TEXT,
  email            TEXT,
  postcode         TEXT,
  message          TEXT,
  source_page_slug TEXT,
  service_type     TEXT DEFAULT 'neumaticos-camion',
  job_status       TEXT DEFAULT 'new' CHECK (job_status IN ('new','contacted','done')),
  job_value        NUMERIC,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status  ON leads(job_status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE pages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts  ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads       ENABLE ROW LEVEL SECURITY;

-- Public read access for pages and blog_posts
CREATE POLICY "Public read pages"
  ON pages FOR SELECT USING (status = 'published');

CREATE POLICY "Public read blog"
  ON blog_posts FOR SELECT USING (true);

-- Service role full access (used by API routes)
CREATE POLICY "Service full access pages"
  ON pages FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service full access blog"
  ON blog_posts FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service full access leads"
  ON leads FOR ALL USING (auth.role() = 'service_role');

-- Anon can insert leads (form submissions)
CREATE POLICY "Anon insert leads"
  ON leads FOR INSERT WITH CHECK (true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
