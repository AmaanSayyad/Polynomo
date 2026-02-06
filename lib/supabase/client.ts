/**
 * Supabase Client Configuration
 *
 * This module provides a configured Supabase client for interacting with the database.
 * Used by the house balance system to track user balances and audit logs.
 *
 * Required env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 * If missing, getSupabase() returns null and API routes return 503 (backend not configured).
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (_client) return _client;
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'Supabase not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
      );
    }
    return null;
  }
  _client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
  return _client;
}

/** Use this in API routes; if null, return 503 so the app shows a clear "not configured" error instead of 500. */
export function getSupabase(): SupabaseClient | null {
  return getClient();
}

/** @deprecated Prefer getSupabase() in API routes. May be null if env vars are missing. */
export const supabase: SupabaseClient | null = getClient();

// Type definitions for database tables
export interface UserBalance {
  user_address: string;
  balance: number;
  updated_at: string;
  created_at: string;
}

export interface BalanceAuditLog {
  id: number;
  user_address: string;
  operation_type: 'deposit' | 'withdrawal' | 'bet_placed' | 'bet_won' | 'bet_lost';
  amount: number;
  balance_before: number;
  balance_after: number;
  transaction_hash?: string;
  bet_id?: string;
  created_at: string;
}
