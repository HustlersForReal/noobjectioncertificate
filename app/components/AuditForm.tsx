"use client";

import { useEffect, useState } from "react";
import { normalizeRefCode, useReferredByCode } from "@/lib/referral-storage";

export default function AuditForm() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");

  const referredByCode = useReferredByCode();

  // Prefill referral code from URL (?ref=) or persisted attribution.
  // Deferred via setTimeout so state updates do not run synchronously in the
  // effect body (avoids react-hooks/set-state-in-effect).
  useEffect(() => {
    let urlCode: string | null = null;
    try {
      const params = new URLSearchParams(window.location.search);
      urlCode = normalizeRefCode(params.get("ref") ?? "");
    } catch {
      // ignore, fall back to storage
    }
    const timer = window.setTimeout(() => {
      if (urlCode) setReferralCode(urlCode);
      else if (referredByCode) setReferralCode(referredByCode);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [referredByCode]);

  function handleContact() {
    if (!name.trim() || !department.trim()) {
      setError("Please fill Name and Department.");
      return;
    }
    setError("");
    const message =
      `Hello NoObjectionCertificate.com, I want to request a Strategic VVIP Audit.\n` +
      `Name: ${name.trim()}\n` +
      `Department: ${department.trim()}` +
      (referralCode.trim() ? `\nReferral Code: ${referralCode.trim().toUpperCase()}` : "");
    window.open(
      `https://wa.me/918800505050?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  const inputClass =
    "w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-[#d6b33c]";

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-2xl bg-black p-7 shadow-lg md:p-9">
      <label className="block text-left text-sm font-bold text-[#d6b33c]">
        Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your full name"
        className={`${inputClass} mt-2`}
      />

      <label className="mt-5 block text-left text-sm font-bold text-[#d6b33c]">
        Department
      </label>
      <input
        type="text"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder="e.g. L&DO, DDA, MCD"
        className={`${inputClass} mt-2`}
      />

      <label className="mt-5 block text-left text-sm font-bold text-[#d6b33c]">
        Referral Code <span className="font-medium text-zinc-500">(optional)</span>
      </label>
      <input
        type="text"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
        placeholder="e.g. #BAAP48498A"
        className={`${inputClass} mt-2 uppercase placeholder:normal-case`}
      />

      {error && (
        <p className="mt-4 text-left text-[13px] font-medium text-red-400">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleContact}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-md bg-[#25d366] px-6 py-4 text-sm font-bold text-white shadow-md transition hover:bg-[#1eb857]"
      >
        Contact
      </button>
      <p className="mt-3 text-center text-xs text-zinc-400">
        By submitting this form, you agree to opt in to WhatsApp notifications
        and updates from NoObjectionCertificate.com regarding your request.      </p>
    </div>
  );
}
