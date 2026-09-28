-- Migration: store the question bank in Supabase instead of the client bundle.
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- Safe to re-run (idempotent).

-- ============================================================
-- CATEGORIES
-- ============================================================

CREATE TABLE IF NOT EXISTS categories (
  id          text PRIMARY KEY,
  "group"     text,
  name        text        NOT NULL,
  culture     text        NOT NULL,
  description text        NOT NULL,
  image_url   text
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "categories_public_read" ON categories;
CREATE POLICY "categories_public_read" ON categories
  FOR SELECT USING (true);

-- ============================================================
-- QUESTIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS questions (
  id                 text    PRIMARY KEY,
  category_id        text    NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  tier               integer NOT NULL CHECK (tier IN (200, 400, 600)),
  prompt             text    NOT NULL,
  answer             text    NOT NULL,
  acceptable_answers text[],
  explanation        text,
  image_uri          text,
  source             text
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "questions_public_read" ON questions;
CREATE POLICY "questions_public_read" ON questions
  FOR SELECT USING (true);
