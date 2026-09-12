"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const groups = [
  {
    title: "NOC Clearances",
    items: [
      { label: "All Services", href: "#services" },
      { label: "L&DO — Nirman Bhawan", href: "#ldo" },
      { label: "DDA — Vikas Sadan", href: "#dda" },
      { label: "MCD & Construction", href: "#mcd" },
      { label: "Safety & Environment", href: "#safety" },
      { label: "Heritage & Institutional", href: "#institutional" },
      { label: "Utility & Infrastructure", href: "#utility" },
    ],
  },
  {
    title: "Get Started",
    items: [
      { label: "Request Audit", href: "#audit" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Ecosystem",
    items: [
      { label: "Property Baap", href: "#property-baap" },
      { label: "Brand Story", href: "#brand-story" },
      { label: "Professional Network", href: "#partner-section" },
      { label: "Referral Network", href: "#referral-section" },
    ],
  },
];

const links = groups.flatMap((g) => g.items);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{ backgroundColor: open ? "#fafafa" : "transparent" }}
      className={`relative z-50 ${open ? "border-b border-black/10" : "border-b border-black/50"}`}
    >
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="NOC logo"
            width={88}
            height={88}
            className="h-12 w-12 rounded-full object-contain"
          />
          <span className="whitespace-nowrap text-[13px] font-extrabold text-black sm:text-lg">
            NoObjectionCertificate
          </span>
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-[#e0b93c] lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Desktop nav removed */}

      {/* Simple mobile dropdown — full width, light, animated */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          />
          <nav className="nav-drop absolute left-0 right-0 top-full z-50 border-b border-black/10 bg-[#fafafa] shadow-xl lg:hidden">
            <ul className="max-h-[65vh] overflow-y-auto px-4 py-3">
              {groups.map((g) => (
                <li key={g.title} className="mb-3">
                  <p className="px-1 pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#a8822a]">
                    {g.title}
                  </p>
                  <ul className="divide-y divide-black/5 border-y border-black/5">
                    {g.items.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-center justify-between px-1 py-2.5 text-[15px] font-bold text-black transition hover:text-[#a8822a]"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="h-5 w-[3px] bg-black/10 transition group-hover:bg-[#d6b33c]" />
                            {l.label}
                          </span>
                          <span className="text-[#cfa93c] transition group-hover:translate-x-0.5">
                            →
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="pb-2 pt-1">
                <a
                  href="#audit"
                  onClick={() => setOpen(false)}
                  className="block bg-[#d6b33c] py-3.5 text-center text-sm font-black uppercase tracking-wider text-white"
                >
                  Start Audit
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
