// Robust multi-layer referral attribution.
// - Code formats: BAAP#####X (current) + PB#####X (legacy), both valid.
// - 365-day TTL with sliding refresh.
// - 5 independent persistence layers with self-heal on read.
import { useState, useEffect } from 'react';

export const REF_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 365 days

export const CURRENT_CODE_RE = /^BAAP[0-9]{5}[A-Z]$/;
export const LEGACY_CODE_RE = /^PB[0-9]{5}[A-Z]$/;
const CODE_RES = [CURRENT_CODE_RE, LEGACY_CODE_RE];

const REF_KEY = 'pb_referred_by';
const IDB_NAME = 'pb-ref-db';
const IDB_STORE = 'ref';
const IDB_KEY = 'current';
const CACHE_NAME = 'pb-ref-cache-v1';
const CACHE_PATH = '/__pb_ref__';
const SERVER_COOKIE_CHECK = '/api/referral';

export type RefRecord = { code: string; ts: number };

function isValidRecord(r: unknown): r is RefRecord {
  if (!r || typeof r !== 'object') return false;
  const o = r as Record<string, unknown>;
  return typeof o.code === 'string' && typeof o.ts === 'number' && isSupportedRefCode(o.code);
}

export function normalizeRefCode(raw: string): string | null {
  const cleaned = raw.trim().toUpperCase().replace(/^#/, '');
  if (!CODE_RES.some((re) => re.test(cleaned))) return null;
  return `#${cleaned}`;
}

export function isSupportedRefCode(code?: string | null): boolean {
  if (!code) return false;
  return normalizeRefCode(code) !== null;
}

export function refCodeDocIdCandidates(code: string): string[] {
  const canonical = normalizeRefCode(code) ?? code.trim().toUpperCase();
  const bare = canonical.startsWith('#') ? canonical.slice(1) : canonical;
  return Array.from(new Set([canonical, bare]));
}

/* ---------------- sync (localStorage + sessionStorage) ---------------- */
function readStorageRecord(storage: Storage, key: string): RefRecord | null {
  try {
    const raw = storage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!isValidRecord(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function readSyncStorageRecord(): RefRecord | null {
  if (typeof window === 'undefined') return null;
  return readStorageRecord(localStorage, REF_KEY) ?? readStorageRecord(sessionStorage, REF_KEY);
}

function writeSyncStorage(record: RefRecord) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(REF_KEY, JSON.stringify(record)); } catch { /* ignore */ }
  try { sessionStorage.setItem(REF_KEY, JSON.stringify(record)); } catch { /* ignore */ }
}

function pruneSyncStorage() {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(REF_KEY); } catch { /* ignore */ }
  try { sessionStorage.removeItem(REF_KEY); } catch { /* ignore */ }
}

/* ---------------- IndexedDB ---------------- */
function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) { resolve(null); return; }
    try {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        try { req.result.createObjectStore(IDB_STORE); } catch { /* ignore */ }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
      req.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function readIndexedDb(): Promise<RefRecord | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get(IDB_KEY);
      req.onsuccess = () => {
        const v = req.result;
        resolve(isValidRecord(v) ? v : null);
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function writeIndexedDb(record: RefRecord): Promise<void> {
  const db = await openDb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(record, IDB_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    } catch {
      resolve();
    }
  });
}

async function deleteIndexedDb(): Promise<void> {
  const db = await openDb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(IDB_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    } catch {
      resolve();
    }
  });
}

/* ---------------- Cache Storage ---------------- */
async function readCacheStorage(): Promise<RefRecord | null> {
  if (typeof window === 'undefined' || !('caches' in window)) return null;
  try {
    const cache = await caches.open(CACHE_NAME);
    const resp = await cache.match(CACHE_PATH);
    if (!resp) return null;
    const data = (await resp.json()) as unknown;
    return isValidRecord(data) ? data : null;
  } catch {
    return null;
  }
}

async function writeCacheStorage(record: RefRecord): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) return;
  try {
    const cache = await caches.open(CACHE_NAME);
    const resp = new Response(JSON.stringify(record), {
      headers: { 'content-type': 'application/json' },
    });
    await cache.put(CACHE_PATH, resp);
  } catch {
    /* ignore */
  }
}

async function deleteCacheStorage(): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) return;
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(CACHE_PATH);
  } catch {
    /* ignore */
  }
}

/* ---------------- Server cookie anchor ---------------- */
async function readServerCookie(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  try {
    const res = await fetch(SERVER_COOKIE_CHECK, {
      credentials: 'same-origin',
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { code?: unknown };
    if (typeof data.code !== 'string') return null;
    return normalizeRefCode(data.code);
  } catch {
    return null;
  }
}

async function writeServerCookie(code: string): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    await fetch(`${SERVER_COOKIE_CHECK}?code=${encodeURIComponent(code)}`, {
      credentials: 'same-origin',
    });
  } catch {
    /* ignore */
  }
}

async function deleteServerCookie(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    await fetch(SERVER_COOKIE_CHECK, { method: 'DELETE', credentials: 'same-origin' });
  } catch {
    /* ignore */
  }
}

/* ---------------- Public API ---------------- */
export function setReferredBy(code: string) {
  const parsed = normalizeRefCode(code);
  if (!parsed || typeof window === 'undefined') return;
  const record: RefRecord = { code: parsed, ts: Date.now() };
  writeSyncStorage(record);
  void writeIndexedDb(record);
  void writeCacheStorage(record);
  void writeServerCookie(parsed);
  try { window.dispatchEvent(new CustomEvent('pb-ref-updated')); } catch { /* ignore */ }
}

export function getReferredBy(): string | null {
  if (typeof window === 'undefined') return null;
  const rec = readSyncStorageRecord();
  if (!rec) return null;
  if (Date.now() - rec.ts > REF_TTL_MS) {
    pruneSyncStorage();
    return null;
  }
  if (Date.now() - rec.ts > REF_TTL_MS / 2) {
    writeSyncStorage({ code: rec.code, ts: Date.now() });
  }
  return rec.code;
}

export async function hydrateReferredBy(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const now = Date.now();
  const serverCode = await readServerCookie();

  const records: RefRecord[] = [];
  const syncRec = readSyncStorageRecord();
  if (syncRec) records.push(syncRec);
  const idbRec = await readIndexedDb();
  if (idbRec) records.push(idbRec);
  const cacheRec = await readCacheStorage();
  if (cacheRec) records.push(cacheRec);

  const valid = records.filter((r) => now - r.ts <= REF_TTL_MS);

  if (valid.length === 0) {
    if (!serverCode) {
      pruneSyncStorage();
      void deleteIndexedDb();
      void deleteCacheStorage();
      return null;
    }
    const recovered: RefRecord = { code: serverCode, ts: now };
    writeSyncStorage(recovered);
    void writeIndexedDb(recovered);
    void writeCacheStorage(recovered);
    try { window.dispatchEvent(new CustomEvent('pb-ref-updated')); } catch { /* ignore */ }
    return recovered.code;
  }

  const winner = valid.reduce((a, b) => (a.ts >= b.ts ? a : b));
  const refreshed = now - winner.ts > REF_TTL_MS / 2
    ? { code: winner.code, ts: now }
    : winner;

  writeSyncStorage(refreshed);
  void writeIndexedDb(refreshed);
  void writeCacheStorage(refreshed);
  void writeServerCookie(refreshed.code);
  try { window.dispatchEvent(new CustomEvent('pb-ref-updated')); } catch { /* ignore */ }
  return refreshed.code;
}

export async function clearReferredBy(): Promise<void> {
  if (typeof window === 'undefined') return;
  pruneSyncStorage();
  void deleteIndexedDb();
  void deleteCacheStorage();
  void deleteServerCookie();
  try { window.dispatchEvent(new CustomEvent('pb-ref-updated')); } catch { /* ignore */ }
}

export function useReferredByCode(): string | null {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    void hydrateReferredBy().then((c) => {
      if (!cancelled) setCode(c);
    });
    const onUpdate = () => setCode(getReferredBy());
    window.addEventListener('pb-ref-updated', onUpdate);
    return () => {
      cancelled = true;
      window.removeEventListener('pb-ref-updated', onUpdate);
    };
  }, []);
  return code;
}

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
