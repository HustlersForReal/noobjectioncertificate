"use client";

import { useState } from "react";

export default function AuditForm() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  function handleContact() {
    if (!name.trim() || !department.trim() || !/^[1-9][0-9]{5}$/.test(pincode.trim())) {
      setError("Please fill Name, Department and a valid 6-digit Pincode.");
      return;
    }
    setError("");
    const message =
      `Hello NoObjectionCertificate.com, I want to request a Strategic VVIP Audit.\n` +
      `Name: ${name.trim()}\n` +
      `Department: ${department.trim()}\n` +
      `Pincode: ${pincode.trim()}`;
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
        Pincode
      </label>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={pincode}
        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
        placeholder="6-digit pincode"
        className={`${inputClass} mt-2`}
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.08L2 22l5.05-1.32A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3 .79.8-2.93-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.59-6.15c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.12-.17.25-.64.81-.78.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.09-.17.05-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.12.17 1.81 2.77 4.39 3.88.61.27 1.09.42 1.47.54.61.2 1.17.17 1.61.1.5-.07 1.48-.6 1.69-1.19.2-.58.2-1.08.14-1.19-.06-.1-.23-.16-.48-.29Z" />
        </svg>
        Contact
      </button>
      <p className="mt-3 text-center text-xs text-zinc-400">
        Clicking Contact opens WhatsApp with your details pre-filled.
      </p>
    </div>
  );
}
