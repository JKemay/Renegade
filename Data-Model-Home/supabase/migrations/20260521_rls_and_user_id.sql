-- Migration: Add user_id + Row Level Security to games and seen_questions
-- Run this in: Supabase Dashboard → SQL Editor → New Query
--
-- Safe to re-run (all statements are idempotent via IF NOT EXISTS / IF EXISTS guards).
-- Existing rows will have user_id = NULL and will be inaccessible after RLS is enabled.
-- That is intentional — pre-RLS history is a clean break.

-- ============================================================
-- GAMES TABLE
-- ============================================================

-- Add user_id, defaulting to the authenticated user's UUID from their JWT.
-- The app does NOT need to send user_id in inserts — Postgres fills it in automatically.
ALTER TABLE games
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid();

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Drop first so this file is safe to re-run
DROP POLICY IF EXISTS "Users can insert their own games" ON games;
DROP POLICY IF EXISTS "Users can read their own games"   ON games;

-- Users can only insert rows that belong to themselves
CREATE POLICY "Users can insert their own games"
  ON games
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Users can only read their own game history
CREATE POLICY "Users can read their own games"
  ON games
  FOR SELECT
  USING (user_id = auth.uid());

-- ============================================================
-- SEEN_QUESTIONS TABLE
-- ============================================================

ALTER TABLE seen_questions
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid();

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
