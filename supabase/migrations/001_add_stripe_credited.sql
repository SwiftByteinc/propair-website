-- Migration: Add stripe_credited flag to referral_events
-- Purpose: Prevent duplicate Stripe Customer Balance credits on repeated webhook events
-- Run this in Supabase SQL Editor BEFORE deploying the updated stripe-webhook function

ALTER TABLE referral_events
ADD COLUMN IF NOT EXISTS stripe_credited BOOLEAN DEFAULT false;

-- Index for fast lookup in the webhook (referee_id + status + stripe_credited)
CREATE INDEX IF NOT EXISTS idx_referral_events_credit_lookup
ON referral_events (referee_id, status, stripe_credited)
WHERE status = 'validated' AND stripe_credited = false;
