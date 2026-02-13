/*
  # Create Valentine Responses Table

  1. New Tables
    - `valentine_responses`
      - `id` (uuid, primary key)
      - `recipient_name` (text)
      - `response` (text) - Yes or No
      - `timestamp` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `valentine_responses` table
    - Add policy to allow public inserts
    - Add policy to allow public reads
*/

CREATE TABLE IF NOT EXISTS valentine_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_name text NOT NULL,
  response text NOT NULL CHECK (response IN ('yes', 'no')),
  timestamp timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE valentine_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts"
  ON valentine_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public reads"
  ON valentine_responses
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX idx_valentine_responses_timestamp 
  ON valentine_responses(timestamp DESC);
