import { NextRequest, NextResponse } from 'next/server';

const CURRENT_CODE_RE = /^BAAP[0-9]{5}[A-Z]$/;
const LEGACY_CODE_RE = /^PB[0-9]{5}[A-Z]$/;
const MAX_AGE_SECONDS = 400 * 24 * 60 * 60; // browser cap 400 days

function normalizeRefCode(raw: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().toUpperCase().replace(/^#/, '');
  if (!CURRENT_CODE_RE.test(cleaned) && !LEGACY_CODE_RE.test(cleaned)) return null;
  return `#${cleaned}`;
}

export async function GET(req: NextRequest) {
  const codeParam = req.nextUrl.searchParams.get('code');
  const parsedParam = normalizeRefCode(codeParam);

  // Setting path: caller supplies a valid code via ?code=
  if (codeParam && parsedParam) {
    const res = NextResponse.json({ code: parsedParam });
    res.cookies.set('pb_ref', parsedParam, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: MAX_AGE_SECONDS,
    });
    return res;
  }

  // Reading path: return whatever the cookie currently holds.
  const cookie = req.cookies.get('pb_ref')?.value ?? null;
  const normalized = normalizeRefCode(cookie);
  if (normalized) return NextResponse.json({ code: normalized });
  return NextResponse.json({ code: null });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('pb_ref');
  return res;
}
