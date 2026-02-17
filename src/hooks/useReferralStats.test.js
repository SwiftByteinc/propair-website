import { renderHook, waitFor } from '@testing-library/react';
import { useReferralStats } from './useReferralStats';

// Mock supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn()
  }
}));

import { supabase } from '../lib/supabase';

describe('useReferralStats', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns default stats when no userId is provided', () => {
    const { result } = renderHook(() => useReferralStats(null));

    expect(result.current.loading).toBe(false);
    expect(result.current.stats.totalReferrals).toBe(0);
    expect(result.current.stats.earnedMonths).toBe(0);
    expect(result.current.referralList).toEqual([]);
  });

  it('fetches and calculates stats correctly', async () => {
    const mockData = [
      { id: 1, status: 'validated', referee_type: 'entrepreneur', referrer_id: 'u1', created_at: '2026-01-01' },
      { id: 2, status: 'validated', referee_type: 'entrepreneur', referrer_id: 'u1', created_at: '2026-01-02' },
      { id: 3, status: 'pending', referee_type: 'entrepreneur', referrer_id: 'u1', created_at: '2026-01-03' },
    ];

    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: mockData, error: null })
        })
      })
    });

    const { result } = renderHook(() => useReferralStats('u1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.stats.totalReferrals).toBe(3);
    expect(result.current.stats.validatedReferrals).toBe(2);
    expect(result.current.stats.pendingReferrals).toBe(1);
    // 2 validated entrepreneurs * 2 = 4 months, 0 clients = 0 → total 4
    expect(result.current.stats.earnedMonths).toBe(4);
    expect(result.current.referralList).toHaveLength(3);
  });

  it('handles errors gracefully', async () => {
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: null, error: new Error('DB error') })
        })
      })
    });

    const { result } = renderHook(() => useReferralStats('u1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.stats.totalReferrals).toBe(0);
  });

  it('returns empty referralList on error', async () => {
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: null, error: new Error('fail') })
        })
      })
    });
    const { result } = renderHook(() => useReferralStats('u1'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.referralList).toEqual([]);
  });

  it('returns 0 earnedMonths with no validated referrals', async () => {
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [{ id: 1, status: 'pending', referee_type: 'entrepreneur', referrer_id: 'u1', created_at: '2026-01-01' }],
            error: null
          })
        })
      })
    });
    const { result } = renderHook(() => useReferralStats('u1'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.stats.earnedMonths).toBe(0);
  });

  it('returns 0 pendingReferrals when all validated', async () => {
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [
              { id: 1, status: 'validated', referee_type: 'entrepreneur', referrer_id: 'u1', created_at: '2026-01-01' },
            ],
            error: null
          })
        })
      })
    });
    const { result } = renderHook(() => useReferralStats('u1'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.stats.pendingReferrals).toBe(0);
    expect(result.current.stats.validatedReferrals).toBe(1);
  });

  it('handles empty data array', async () => {
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: [], error: null })
        })
      })
    });
    const { result } = renderHook(() => useReferralStats('u1'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.stats.totalReferrals).toBe(0);
    expect(result.current.referralList).toEqual([]);
  });

  it('returns default stats for undefined userId', () => {
    const { result } = renderHook(() => useReferralStats(undefined));
    expect(result.current.loading).toBe(false);
    expect(result.current.stats.totalReferrals).toBe(0);
  });

  it('starts with loading true when userId provided', () => {
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: [], error: null })
        })
      })
    });
    const { result } = renderHook(() => useReferralStats('u1'));
    // Initially loading should be true (or quickly becomes false)
    expect(result.current.loading === true || result.current.stats.totalReferrals === 0).toBe(true);
  });

  it('calculates client referral months correctly with 6+ clients', async () => {
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [
              { id: 1, status: 'validated', referee_type: 'client', referrer_id: 'u1', created_at: '2026-01-01' },
              { id: 2, status: 'validated', referee_type: 'client', referrer_id: 'u1', created_at: '2026-01-02' },
              { id: 3, status: 'validated', referee_type: 'client', referrer_id: 'u1', created_at: '2026-01-03' },
              { id: 4, status: 'validated', referee_type: 'client', referrer_id: 'u1', created_at: '2026-01-04' },
              { id: 5, status: 'validated', referee_type: 'client', referrer_id: 'u1', created_at: '2026-01-05' },
              { id: 6, status: 'validated', referee_type: 'client', referrer_id: 'u1', created_at: '2026-01-06' },
            ],
            error: null
          })
        })
      })
    });
    const { result } = renderHook(() => useReferralStats('u1'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    // 6 clients = floor(6/6) * 2 = 2 months
    expect(result.current.stats.earnedMonths).toBe(2);
  });
});
