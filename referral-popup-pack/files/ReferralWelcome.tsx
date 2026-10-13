'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Copy, Check } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { getDb } from '@/lib/firebase';
import { normalizeRefCode, setReferredBy, refCodeDocIdCandidates } from '@/lib/referral-storage';

const PERKS = [
  'The Final Authority for L&DO, DDA & Municipal clearances',
  '3rd generation trust with flawless execution',
  'End-to-end liaison — from audit to NOC in hand',
];

const DISCOUNT_TEXT =
  'Use Your Code And Get 5% Instant Discount On All NoObjectionCertificate.com Services';

export function ReferralWelcome() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = searchParams.get('ref');
    if (!raw) return;
    const parsed = normalizeRefCode(raw);
    if (!parsed) return;
    setReferredBy(parsed);
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem('pb_ref_welcomed') === '1';
    } catch {
      // storage unavailable: show the popup
    }
    if (dismissed) return;
    let cancelled = false;
    (async () => {
      try {
        const db = getDb();
        for (const docId of refCodeDocIdCandidates(parsed)) {
          if (cancelled) return;
          const snap = await getDoc(doc(db, 'referral_codes', docId));
          if (cancelled) return;
          if (snap.exists()) {
            const n = (snap.data() as { name?: string }).name;
            if (n) setName(n);
            break;
          }
        }
      } catch {
        // code-only fallback below
      }
      if (!cancelled) setCode(parsed);
    })();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  if (!code) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem('pb_ref_welcomed', '1');
    } catch {
      // ignore
    }
    setCode(null);
  };

  const copyCode = async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(code);
      } else {
        throw new Error('clipboard unavailable');
      }
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        // ignore
      }
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="ref-pop-in w-full max-w-md overflow-hidden rounded-2xl border border-[#550000]/20 bg-white shadow-[0_0_60px_rgba(85,0,0,0.12)]">
        <div className="border-b border-[#550000]/10 px-6 pt-6 pb-5 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#550000]">You&apos;re invited</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-[#1f1f1f]">
            Welcome to NoObjectionCertificate
          </h2>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-center gap-4 rounded-xl border border-[#550000]/20 bg-[#faf7f5] p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#550000] text-lg font-black text-white">
              {(name ?? 'N').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f4f4b]/70">You Are Referred by</p>
              <p className="truncate text-[15px] font-bold text-[#1f1f1f]">{name ?? 'A NoObjectionCertificate partner'}</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <p className="inline-block rounded-md bg-[#550000]/10 px-2 py-0.5 text-[12px] font-black tracking-[0.15em] text-[#550000]">{code}</p>
                <button
                  type="button"
                  onClick={copyCode}
                  title={copied ? 'Copied' : 'Copy code'}
                  aria-label="Copy referral code"
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-[#550000]/20 bg-white/70 text-[#550000] hover:bg-[#550000] hover:text-white transition-colors"
                >
                  {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} strokeWidth={2.5} />}
                </button>
                {copied && <span className="text-[11px] font-semibold text-[#550000]">Copied</span>}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[#550000]/20 bg-[#550000]/5 px-4 py-3 text-center">
            <p className="text-[14px] md:text-[15px] font-bold leading-snug text-[#550000]">{DISCOUNT_TEXT}</p>
          </div>

          <ul className="mt-5 space-y-2.5">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-[13px] md:text-[14px] text-[#3f3f3f] font-light">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#550000]" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={dismiss}
            className="mt-6 w-full rounded-xl bg-[#550000] px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest text-white hover:bg-[#3d0000] transition-colors"
          >
            Explore Site
          </button>
          <p className="mt-3 text-center text-[11px] text-[#5f4f4b]/60">Your referral details are used to process your request.</p>
        </div>
      </div>
    </div>
  );
}
