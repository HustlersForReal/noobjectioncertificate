"use client";

import { useEffect, useState } from "react";

export default function ReferEarn() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const next = 1 + Math.min(window.scrollY / 250, 0.8);
      setScale(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="mt-8">
      <a
        href="#referral-section"
        className="referral-glow inline-block text-lg font-bold text-[#d6b33c] underline underline-offset-4 transition-transform hover:scale-110"
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      >
        Refer &amp; Earn
      </a>
    </div>
  );
}
