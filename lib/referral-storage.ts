import { useState, useEffect } from 'react';

const REF_KEY = 'pb_referred_by';
const REF_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// Save the attribution code. Call this as soon as a valid ?ref= is seen.
export function setReferredBy(code: string) {
  try {
    localStorage.setItem(REF_KEY, JSON.stringify({ code, ts: Date.now() }));
  } catch {
    // storage unavailable: attribution simply won't persist
  }
  try {
    window.dispatchEvent(new CustomEvent('pb-ref-updated'));
  } catch {
    // ignore
  }
}

// Read the stored code (null if missing/expired/corrupt). Expiry auto-cleans.
export function getReferredBy(): string | null {
  try {
    const raw = localStorage.getItem(REF_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { code?: unknown; ts?: unknown };
    if (typeof parsed.code !== 'string' || !parsed.code || typeof parsed.ts !== 'number') {
      localStorage.removeItem(REF_KEY);
      return null;
    }
    if (Date.now() - parsed.ts > REF_TTL_MS) {
      localStorage.removeItem(REF_KEY);
      return null;
    }
    return parsed.code;
  } catch {
    return null;
  }
}

// Validate + canonicalize a raw ?ref= value. Returns '#PB12345A' or null.
// CHANGE THIS if your codes look different — and keep firestore.rules in sync.
export function normalizeRefCode(raw: string): string | null {
  const cleaned = raw.trim().toUpperCase().replace(/^#/, '');
  if (!/^PB[0-9]{5}[A-Z]$/.test(cleaned)) return null;
  return `#${cleaned}`;
}

// Hydration-safe hook: reads storage only after mount, so SSR HTML always matches.
export function useReferredByCode(): string | null {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    setCode(getReferredBy());
    const onUpdate = () => setCode(getReferredBy());
    window.addEventListener('pb-ref-updated', onUpdate);
    return () => window.removeEventListener('pb-ref-updated', onUpdate);
  }, []);
  return code;
}

// Append ?ref=CODE to any outbound URL (keeps existing query params intact).
export function withReferral(url: string, code: string | null): string {
  if (!code) return url;
  const short = code.startsWith('#') ? code.slice(1) : code;
  try {
    const u = new URL(url);
    u.searchParams.set('ref', short);
    return u.toString();
  } catch {
    return url.includes('?') ? `${url}&ref=${short}` : `${url}?ref=${short}`;
  }
}
