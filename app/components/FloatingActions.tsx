"use client";

import { useReferredByCode } from "@/lib/referral-storage";

export default function FloatingActions() {
  const referredByCode = useReferredByCode();

  const message =
    "Hello NoObjectionCertificate.com, I Need NOC Assistance" +
    (referredByCode ? `\nReferral Code: ${referredByCode}` : "");
  const whatsappHref = `https://wa.me/918800505050?text=${encodeURIComponent(message)}`;

  return (
    <>
      <a
        href="tel:+918800505050"
        aria-label="Call us"
        className="fixed bottom-6 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#1d9e49] text-white shadow-lg transition hover:scale-105"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3.5a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
        </svg>
      </a>
      <a
        href={whatsappHref}
        aria-label="WhatsApp us"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.08L2 22l5.05-1.32A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3 .79.8-2.93-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.59-6.15c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.12-.17.25-.64.81-.78.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.09-.17.05-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.12.17 1.81 2.77 4.39 3.88.61.27 1.09.42 1.47.54.61.2 1.17.17 1.61.1.5-.07 1.48-.6 1.69-1.19.2-.58.2-1.08.14-1.19-.06-.1-.23-.16-.48-.29Z" />
        </svg>
      </a>
    </>
  );
}
