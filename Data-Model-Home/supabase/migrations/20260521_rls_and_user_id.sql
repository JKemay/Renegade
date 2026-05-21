-- Migration: Create tables + Row Level Security for games and seen_questions
-- Run this in: Supabase Dashboard → SQL Editor → New Query
--
-- Safe to re-run (all statements are idempotent via IF NOT EXISTS / IF EXISTS guards).

-- ============================================================
-- GAMES TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS games (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id    uuid        REFERENCES auth.users(id) DEFAULT auth.uid(),
  team1_name text,
  team2_name text,
  team1_score int4,
  team2_score int4,
  winner     text,
  categories text[]
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own games" ON games;
DROP POLICY IF EXISTS "Users can read their own games"   ON games;

CREATE POLICY "Users can insert their own games"
  ON games
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read their own games"
  ON games
  FOR SELECT
  USING (user_id = auth.uid());

-- ============================================================
-- SEEN_QUESTIONS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS seen_questions (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        REFERENCES auth.users(id) DEFAULT auth.uid(),
  question_id text,
  played_at   timestamptz DEFAULT now()
);

ALTER TABLE seen_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own seen questions" ON seen_questions;
DROP POLICY IF EXISTS "Users can read their own seen questions"   ON seen_questions;
DROP POLICY IF EXISTS "Users can delete their own seen questions" ON seen_questions;

CREATE POLICY "Users can insert their own seen questions"
  ON seen_questions
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read their own seen questions"
  ON seen_questions
  FOR SELECT
  USING (user_id = auth.uid());

-- Required for "Reset Question History" in Settings screen
CREATE POLICY "Users can delete their own seen questions"
  ON seen_questions
  FOR DELETE
  USING (user_id = auth.uid());
