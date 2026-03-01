-- Migration: Client referral milestone trigger (6 validated clients = +3 pro months)
-- Purpose: Server-side accounting for client referral rewards
-- Previously this calculation only existed in the React frontend (useReferralStats.js)
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION check_client_referral_milestone()
RETURNS TRIGGER AS $$
DECLARE
  total_client_validated INTEGER;
  total_client_credited INTEGER;
  milestones_reached INTEGER;
  milestones_credited INTEGER;
  new_milestones INTEGER;
  months_to_add INTEGER;
BEGIN
  -- Only process inserts of validated client referrals
  IF NEW.referee_type != 'client' OR NEW.status != 'validated' THEN
    RETURN NEW;
  END IF;

  -- Count total validated client referrals for this referrer
  SELECT COUNT(*) INTO total_client_validated
  FROM referral_events
  WHERE referrer_id = NEW.referrer_id
    AND referee_type = 'client'
    AND status = 'validated';

  -- Count how many client milestones have already been credited
  -- (every 6th client that has stripe_credited = true represents a milestone)
  SELECT COUNT(*) INTO total_client_credited
  FROM referral_events
  WHERE referrer_id = NEW.referrer_id
    AND referee_type = 'client'
    AND status = 'validated'
    AND stripe_credited = true;

  -- Calculate milestones: total reached vs already credited
  milestones_reached := total_client_validated / 6;
  milestones_credited := total_client_credited / 6;
  new_milestones := milestones_reached - milestones_credited;

  IF new_milestones > 0 THEN
    months_to_add := new_milestones * 3;

    -- Credit the referrer's pro_months_balance
    UPDATE profiles
    SET pro_months_balance = COALESCE(pro_months_balance, 0) + months_to_add
    WHERE id = NEW.referrer_id;

    RAISE NOTICE 'Client referral milestone: +% months for referrer %', months_to_add, NEW.referrer_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists to allow re-running
DROP TRIGGER IF EXISTS trg_client_referral_milestone ON referral_events;

CREATE TRIGGER trg_client_referral_milestone
AFTER INSERT ON referral_events
FOR EACH ROW
EXECUTE FUNCTION check_client_referral_milestone();
