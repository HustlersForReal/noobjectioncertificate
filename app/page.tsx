import Image from "next/image";
import AuditForm from "./components/AuditForm";
import FooterFinal from "../footerFinal";

const gold = "#d6b33c";

const icons: React.ReactNode[] = [
  /* 1 — twin buildings (L&DO) */
  <svg key="i1" width="52" height="52" viewBox="0 0 48 48" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="8" width="19" height="28" />
    <rect x="26" y="18" width="17" height="18" />
    <path d="M9 13h3M14 13h3M19 13h1M9 18h3M14 18h3M19 18h1M9 23h3M14 23h3M19 23h1M9 28h3M14 28h3M19 28h1" />
    <path d="M30 23h3M35 23h3M30 28h3M35 28h3M30 33h3M35 33h3" />
  </svg>,
  /* 2 — single building (DDA) */
  <svg key="i2" width="52" height="52" viewBox="0 0 48 48" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="13" y="8" width="22" height="28" />
    <path d="M11 8h26" />
    <path d="M17 13h3M22 13h3M27 13h3M17 18h3M22 18h3M27 18h3M17 23h3M22 23h3M27 23h3" />
    <path d="M20 36v-6h8v6" />
  </svg>,
  /* 3 — tag / seal (Municipal) */
  <svg key="i3" width="52" height="52" viewBox="0 0 48 48" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="14" width="26" height="16" rx="2" transform="rotate(-30 8 14)" />
    <circle cx="33" cy="12" r="6" />
    <path d="M14 26l3 3M19 23l3 3M24 20l3 3" strokeDasharray="1 3" />
  </svg>,
  /* 4 — tree (Safety & Environmental) */
  <svg key="i4" width="52" height="52" viewBox="0 0 48 48" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6c-6 0-11 4-12 10-4 1-6 4-6 7 0 4 3 6 7 6h3v-7" />
    <path d="M24 6c6 0 11 4 12 10 4 1 6 4 6 7 0 4-3 6-7 6h-3v-7" />
    <path d="M24 29v11M24 34c-3 0-6 2-7 5M24 34c3 0 6 2 7 5" />
  </svg>,
  /* 5 — tower (Institutional & Heritage) */
  <svg key="i5" width="52" height="52" viewBox="0 0 48 48" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 8h8l2 28H18l2-28Z" />
    <path d="M19 16h10M18.5 24h11M18 32h12" />
    <path d="M21 8V5h6v3" />
    <path d="M12 40h24" />
  </svg>,
  /* 6 — utility building (Infrastructure) */
  <svg key="i6" width="52" height="52" viewBox="0 0 48 48" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="14" width="16" height="22" />
    <rect x="28" y="22" width="12" height="14" />
    <path d="M18 14V6M18 6h5" />
    <path d="M13 19h3M18 19h3M13 24h3M18 24h3M13 29h3M18 29h3" />
    <path d="M6 40h36" />
  </svg>,
];

const serviceIds = ["ldo", "dda", "mcd", "safety", "institutional", "utility"];

const services = [
  {
    title: "Land & Development Office, Nirman Bhawan",
    items: [
      "Sale Permission NOC",
      "Substitution of Title NOC",
      "Mortgage Permission NOC",
      "Gift/Relinquishment NOC",
      "Conversion (Leasehold to Freehold) NOC",
      "Re-entry Withdrawal NOC",
    ],
  },
  {
    title: "DDA (Delhi Development Authority, Vikas Sadan)",
    items: [
      "Leasehold to Freehold Conversion NOC",
      "Mutation NOC",
      "Mortgage/Lien NOC",
      "Conveyance Deed Execution NOC",
      "Extension of Time (EOT) NOC",
    ],
  },
  {
    title: "Municipal (MCD) & Construction Clearances",
    items: [
      "MCD Mutation NOC",
      "Building Plan Sanction NOC",
      "Structural Stability NOC",
      'De-sealing NOC (The "Red Stamp" Remover)',
      "Regularization NOC",
      "Property Tax 'Nil Dues' (UPIC) NOC",
      "Completion / Occupancy NOC",
    ],
  },
  {
    title: "Safety & Environmental Clearances",
    items: [
      "Delhi Fire Service (DFS) NOC",
      "DPCC Pollution (CTE/ CTO) NOC",
      "Tree Cutting/Pruning NOC",
      "Groundwater Extraction (CGWA) NOC",
    ],
  },
  {
    title: "Institutional & Heritage Clearances",
    items: [
      "ASI (Archaeological Survey) NOC",
      "NMA (National Monuments Authority) NOC",
      "Airport Authority (Height) NOC",
      "DUAC (Urban Art Commission) NOC",
    ],
  },
  {
    title: "Utility & Infrastructure Liaison",
    items: [
      "DJB (Water/Sewer) Connection NOC",
      "Electricity (BSES/ TPDDL) Load NOC",
      "National Highways (NHAI) Access NOC",
    ],
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans text-black">
      {/* ── Full page background image, no overlay ─────────────── */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/bg.webp"
          alt="Government building"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
        />
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative">
          {/* ── Top bar ── */}
          <header className="border-b border-black/50">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-7">
              <a href="#" className="flex items-center gap-2 sm:gap-3">
                <Image
                  src="/logo.png"
                  alt="NOC logo"
                  width={88}
                  height={88}
                  className="h-12 w-12 rounded-full object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
                />
                <span className="whitespace-nowrap text-[13px] font-extrabold tracking-tight text-black sm:text-lg md:text-xl">
                  NoObjectionCertificate
                  {/* <span className="text-[#cfa93c]">.com</span> */}
                </span>
              </a>
              <a
                href="tel:+918800505050"
                className="flex items-center gap-2 rounded-md border border-[#c9a227] bg-black px-3 py-2 text-xs font-medium tracking-wide text-[#e0b93c] sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="hidden sm:inline">+91 88005 05050</span>
              </a>
            </div>
          </header>

          {/* ── Hero copy ── */}
          <div className="mx-auto max-w-4xl px-6 pb-24 pt-24 text-center md:pb-28 md:pt-36">
            <h1 className="text-4xl font-extrabold tracking-wider text-black sm:text-5xl md:text-7xl">
              NOC BANWAO - DEAL AAGE BADHAO
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-bold leading-relaxed text-black md:text-lg">
              The Final Authority for L&DO, DDA, and Municipal Clearances.
              <br />
              3rd Generation Trust. Flawless Execution.
            </p>
            <a
              href="#audit"
              className="mt-8 inline-block rounded-md bg-[#d6b33c] px-9 py-4 text-sm font-bold text-white shadow-md transition hover:bg-[#c4a132]"
            >
              Start Your Audit
            </a>
          </div>
      </section>

      {/* ── Services ───────────────────────────────────────────── */}
      <section id="services" className="relative bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center md:px-8">
          <p className="text-base font-semibold text-[#d1a93c]">
            Our Services
          </p>
          <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-extrabold tracking-tight text-[#1c1c1c] md:text-[2.6rem] md:leading-tight">
            Complete NOC &amp; Government Approval Services
          </h2>
          <p className="mx-auto mt-4 max-w-5xl text-sm font-medium leading-relaxed text-black md:text-[15px]">
            Get end-to-end assistance for all types of NOCs and government
            approvals including L&DO, DDA, MCD, environmental, safety,
            institutional, and utility clearances—ensuring a smooth, fast, and
            hassle-free process from start to finish.
          </p>

          {/* ── 2x3 service cards ── */}
          <div className="mt-10 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            {services.map((group, gi) => (
              <a
                key={group.title}
                href={`#${serviceIds[gi]}`}
                className="flex flex-col rounded-2xl bg-black p-7 shadow-lg transition hover:-translate-y-1 hover:ring-2 hover:ring-[#d6b33c]"
              >
                <div className="mb-5">{icons[gi]}</div>
                <h3 className="text-[19px] font-extrabold leading-snug text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {group.items.map((item, ii) => (
                    <li
                      key={item}
                      className="text-[13px] font-medium leading-snug text-zinc-100"
                    >
                      {ii + 1}. {item}
                    </li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── L&DO detail: Land & Development Office, Nirman Bhawan ─ */}
      <section id="ldo" className="relative scroll-mt-6 bg-white">
        <div className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#cfa93c] md:text-4xl">
            Land &amp; Development Office, Nirman Bhawan
          </h2>

          {/* Row 1 — image left, text right */}
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-square w-full overflow-hidden bg-black">
              <Image
                src="/noc.png"
                alt="Sale Permission NOC certificate"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Sale Permission NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Formal consent from the Lessor, i.e., the President of India
                through L&DO, is required to transfer leasehold rights
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Owners of leasehold residential or commercial plots in
                South/Central Delhi (e.g., Golf Links, Jor Bagh, Defence
                Colony) before signing a Sale Deed.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Online application → Dues recovery (Ground Rent/Revisionary
                Interest) → Inspection → Issuance.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Standard firms struggle with &quot;Unearned Increase&quot;
                (UEI) calculations, which can run into crores. We audit the
                file before submission to ensure the calculation is fair and
                the file isn&apos;t &quot;marked&quot; for deviations.
              </p>
            </div>
          </div>

          {/* Row 2 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Substitution of Title NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Updating the L&DO record after the death of the original
                lessee.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Legal heirs looking to sell or mortgage an inherited property.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Submission of Will/Probate or Affidavit of NRC (No Relation
                Certificate) → Public Notice → Mutation in L&DO records.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                CAs often fail at the &quot;Heirship Affidavit&quot; stage. We
                know exactly how to draft the documentation to bypass the
                6-month &quot;Public Notice&quot; hurdles if the lineage is
                clear.
              </p>
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-black">
              <Image
                src="/susb-title-noc.jpg"
                alt="Substitution of Title NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Row 3 — image left, text right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-square w-full overflow-hidden bg-black">
              <Image
                src="/mortgage-permission.png"
                alt="Mortgage Permission NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Mortgage Permission NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Authorization to create a lien on a leasehold property.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Property owners seeking high-value business loans or home
                loans.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Bank&apos;s request letter → L&DO scrutiny → Formal NOC to the
                Bank.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Banks reject leasehold properties without this. We have the
                &quot;speed-lane&quot; at Nirman Bhawan to get this done in
                days, not months, preventing your loan deal from expiring.
              </p>
            </div>
          </div>

          {/* Row 4 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Gift/Relinquishment NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Clearance to transfer shares within the family.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Families restructuring assets or settling estates.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Application with registered Gift Deed draft → Verification of
                relationship → NOC.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Common men get stuck in &quot;Stamp Duty&quot; traps. We ensure
                the NOC is issued with minimal friction by aligning it with the
                Sub-Registrar&apos;s requirements.
              </p>
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-black">
              <Image
                src="/gift-rel-noc.png"
                alt="Gift/Relinquishment NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Row 5 — image left, text right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-square w-full overflow-hidden bg-black">
              <Image
                src="/conversion.png"
                alt="Conversion Leasehold to Freehold NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Conversion (Leasehold to Freehold) NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                The &quot;Holy Grail&quot; document that ends the
                government&apos;s leasehold control.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Any leasehold owner wanting full ownership and higher market
                value.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Payment of conversion charges → Rectification of breaches →
                Execution of Conveyance Deed.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Most applications are rejected due to &quot;Misuse
                Charges.&quot; We handle the &quot;Misuse&quot; settlement
                through 3rd-gen liaison, saving you lakhs in penalties.
              </p>
            </div>
          </div>

          {/* Row 6 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Re-entry Withdrawal NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Rescinding a government order that has &quot;re-entered&quot;
                (taken back) the property due to gross violations.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Owners of properties that have been &quot;cancelled&quot; in
                government records.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                High-level petition → Payment of heavy penalties → Inspection →
                Withdrawal order.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                This is nearly impossible for others. We use our legacy
                knowledge of the &quot;Corridors of Power&quot; to negotiate
                the withdrawal of re-entry.
              </p>
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-black">
              <Image
                src="/re-entry.png"
                alt="Re-entry Withdrawal NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── DDA detail (black bg): Delhi Development Authority ──── */}
      <section id="dda" className="relative scroll-mt-6 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#cfa93c] md:text-4xl">
            DDA (Delhi Development Authority, Vikas Sadan)
          </h2>

          {/* Row 1 — image left, text right */}
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/leasetofreehold.jpg"
                alt="Leasehold to Freehold Conversion NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                Leasehold to Freehold Conversion NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Transitioning DDA allotted flats/plots to freehold.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Owners of DDA flats (LIG/MIG/HIG) or plots in Rohini, Dwarka,
                etc.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Application via DDA portal → Document vetting → Payment →
                Execution.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                DDA portals are notorious for &quot;missing files.&quot; We
                have the physical presence at Vikas Sadan to track down
                original 1980s allotment letters that the DDA claims to have
                lost.
              </p>
            </div>
          </div>

          {/* Row 2 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                Mutation NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Recording the change of name in DDA records.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                New buyers or heirs of DDA properties.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Submission of Sale Deed/Succession → Verification → Mutation
                Letter.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                We ensure the &quot;Chain of Title&quot; is perfectly presented
                so the DDA doesn&apos;t raise &quot;Prior Owner&quot;
                objections.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/mutationNOC.jpg"
                alt="Mutation NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Row 3 — image left, text right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/morgage-lien.jpg"
                alt="Mortgage/Lien NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                Mortgage/Lien NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Permission to pledge DDA property.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Owners seeking financing.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Bank application → DDA verification → NOC.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                We streamline the bank-DDA communication, which usually takes
                months of back-and-forth.
              </p>
            </div>
          </div>

          {/* Row 4 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                Conveyance Deed Execution NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                The final step after freehold approval.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Owners ready to sign the final ownership paper.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Appointment at Vikas Sadan → Physical signing → Registration.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                We handle the &quot;Appointment Management,&quot; ensuring you
                don&apos;t spend 8 hours waiting in a hallway.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/conveyanceexicution.jpg"
                alt="Conveyance Deed Execution NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Row 5 — image left, text right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/eot.jpg"
                alt="Extension of Time EOT NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                Extension of Time (EOT) NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Permission for not building on a plot within the stipulated
                time.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Plot owners who haven&apos;t started construction.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Justification of delay → Payment of EOT charges → Issuance.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                We justify the delay using legal precedents, significantly
                reducing the &quot;EOT Penalties.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Municipal (MCD) detail (white bg) ───────────────────── */}
      <section id="mcd" className="relative scroll-mt-6 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#cfa93c] md:text-4xl">
            Municipal (MCD) &amp; Construction Clearances
          </h2>

          {/* Row 1 — image left, text right */}
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/mcdmut.jpg"
                alt="MCD Mutation NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                MCD Mutation NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Name change in the Property Tax records.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Every property owner in Delhi to ensure the tax bill comes in
                their name.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Online UPIC application → Document upload → Approval.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                We fix &quot;Data Mismatches&quot; between the Sale Deed and
                MCD records that stop 90% of online applications.
              </p>
            </div>
          </div>

          {/* Row 2 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Building Plan Sanction NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Approval to start construction.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Anyone building or renovating a property.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Architect submission → Multi-department vetting → Fee payment →
                Sanction.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                We handle the &quot;Simultaneous Liaison&quot; with Fire,
                Forest, and DUAC so the plan doesn&apos;t get stuck in a loop.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/builsanc.png"
                alt="Building Plan Sanction NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Row 3 — image left, text right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/structurestab.jpg"
                alt="Structural Stability NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Structural Stability NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Certification that the building won&apos;t collapse.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Builders of boutique floors or older property owners.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Inspection by empanelled engineer → Certification.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                We work with the most respected engineers whose certificates
                are never questioned by the MCD.
              </p>
            </div>
          </div>

          {/* Row 4 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                De-sealing NOC (The &quot;Red Stamp&quot; Remover)
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                A formal order from the Deputy Commissioner (MCD) to remove
                the physical locks and official seals from a property.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Property owners in Delhi whose premises have been sealed due
                to misuse (commercial activity in residential zones),
                unauthorized construction, or encroachment.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Filing of Rectification Plan → Payment of Misuse/Compounding
                Charges → Personal Hearing before the Monitoring
                Committee/MCD → Physical De-sealing by the Building
                Department.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Most consultants get stuck in the &quot;Hearing&quot; stage. We
                prepare a &quot;Technical Rectification Report&quot; that
                proves compliance on paper first, making it difficult for the
                department to deny the de-sealing order. We manage the
                &quot;Atmosphere&quot; of the hearing to ensure a swift,
                positive result.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/desealing.png"
                alt="De-sealing NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Row 5 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Regularization NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                &quot;Sanctifying&quot; unauthorized construction.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Owners with extra floors or balcony extensions.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Compounding fee payment → Submission of revised maps →
                Approval.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                We know the exact &quot;Compounding Limits&quot; to ensure you
                pay the minimum possible legal fee.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/regularisation.png"
                alt="Regularization NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Row 6 — image left, text right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/propertytaxnoc.jpg"
                alt="Property Tax Nil Dues UPIC NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Property Tax &apos;Nil Dues&apos; (UPIC) NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Confirmation that all taxes are paid.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Sellers before they reach the Sub-Registrar.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Audit of old records → Payment of arrears → Generation of NOC.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                We find lost payments from the &quot;Manual Receipt&quot; era
                (pre-2004) and get them credited to your online account.
              </p>
            </div>
          </div>

          {/* Row 7 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Completion / Occupancy NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Sign-off that the building is ready.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Builders before handing over keys.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Final inspection → Verification of &quot;As-Built&quot; vs
                &quot;Sanctioned&quot; → Issuance.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                We ensure minor &quot;site variations&quot; don&apos;t lead to
                a total rejection of the OC.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/completion-occupancy.jpg"
                alt="Completion Occupancy NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Safety & Environmental detail (black bg) ────────────── */}
      <section id="safety" className="relative scroll-mt-6 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#cfa93c] md:text-4xl">
            Safety &amp; Environmental Clearances
          </h2>

          {/* Row 1 — image left, text right */}
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/delhifireservice.jpg"
                alt="Delhi Fire Service DFS NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                Delhi Fire Service (DFS) NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Fire safety clearance.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Commercial buildings, schools, banquets, and residential
                floors above 15m.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Fire safety audit → Equipment installation → Inspection → NOC.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                We do a &quot;Pre-Inspection Audit&quot; to ensure you pass the
                real inspection on the first attempt.
              </p>
            </div>
          </div>

          {/* Row 2 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                DPCC Pollution (CTE/ CTO) NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Environmental clearance for emissions/waste.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Hotels, hospitals, and industries.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Application → Waste management plan → Site visit → Consent.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                We specialize in the &quot;Orange and Green&quot; categories,
                ensuring your business license isn&apos;t delayed.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/DPCC.jpg"
                alt="DPCC Pollution CTE CTO NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Row 3 — image left, text right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/treecutting.jpg"
                alt="Tree Cutting Pruning NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                Tree Cutting/Pruning NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Permission to touch a tree on your plot.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Anyone whose building plan is blocked by a tree.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Application → Forest Dept → Valuation of tree → Compensatory
                plantation NOC.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                A common man can wait 2 years for this. We expedite the
                &quot;Timber Valuation&quot; process to get you building in
                weeks.
              </p>
            </div>
          </div>

          {/* Row 4 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                Groundwater Extraction (CGWA) NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Permission for a borewell.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                All construction sites in Delhi.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Hydrogeological report → Rainwater harvesting plan → Approval.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                We ensure your Rainwater Harvesting is compliant so the NGT
                (Green Tribunal) doesn&apos;t fine your project.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/groundwater-1024x683.jpg"
                alt="Groundwater Extraction CGWA NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Institutional & Heritage detail (white bg) ──────────── */}
      <section id="institutional" className="relative scroll-mt-6 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#cfa93c] md:text-4xl">
            Institutional &amp; Heritage Clearances
          </h2>

          {/* Row 1 — image left, text right */}
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/asi.jpg"
                alt="ASI Archaeological Survey NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                ASI (Archaeological Survey) NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Clearance to build near monuments.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Owners in Mehrauli, Hauz Khas, Nizamuddin, etc.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Distance mapping impact → report → NMA recommendation → NOC.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                We use high-precision &quot;Heritage Impact Assessments&quot;
                that the department trusts.
              </p>
            </div>
          </div>

          {/* Row 2 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                NMA (National Monuments Authority) NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                A specialized clearance for &quot;Regulated&quot; (not just
                prohibited) areas.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                High-end South Delhi developers.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Final inspection → Verification of &quot;As-Built&quot; vs
                &quot;Sanctioned&quot; → Issuance.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                We bridge the gap between local ASI offices and the National
                Authority.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/nma.jpg"
                alt="NMA National Monuments Authority NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Row 3 — image left, text right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/airport-1024x683.jpg"
                alt="Airport Authority Height NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                Airport Authority (Height) NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Permission to build vertically.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Projects near IGI/Safdarjung.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                We use &quot;WGS-84&quot; site coordinates that are
                pre-verified to ensure height approvals.
              </p>
            </div>
          </div>

          {/* Row 4 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-black md:text-2xl">
                DUAC (Urban Art Commission) NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Aesthetic approval.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                Large residential/commercial projects.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black md:text-sm">
                We understand the &quot;Design Language&quot; the commission
                looks for, preventing &quot;Design Rejections.&quot;
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src="/duac.jpg"
                alt="DUAC Urban Art Commission NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Utility & Infrastructure detail (black bg) ──────────── */}
      <section id="utility" className="relative scroll-mt-6 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#cfa93c] md:text-4xl">
            Utility &amp; Infrastructure Liaison
          </h2>

          {/* Row 1 — image left, text right */}
          <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/djb.jpg"
                alt="DJB Water Sewer Connection NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                DJB (Water/Sewer) Connection NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Clearance for water infrastructure.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                We settle &quot;Bulk Connection&quot; disputes that standard
                plumbers/consultants can&apos;t handle.
              </p>
            </div>
          </div>

          {/* Row 2 — text left, image right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                Electricity (BSES/TPDDL) Load NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Approval for High Tension (HT) or heavy Commercial load
                installation, including transformer space allotment.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Builders of new apartment complexes, shopping malls,
                hospitals, or industries requiring more than 100kW of power.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Technical Load Feasibility Study → Space Audit for
                Transformer/Panel → Advanced Consumption Deposit (ACD) Payment
                → Installation &amp; Energization.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                We specialize in &quot;Transformer Space Negotiations.&quot; If
                the Discom is demanding too much space on your expensive South
                Delhi frontage, we liaise to find technical alternatives that
                save your high-value square footage.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/electricity-768x512.jpg"
                alt="Electricity BSES TPDDL Load NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Row 3 — image left, text right */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/ChatGPT-Image-Apr-2-2026-02_28_01-PM-1-768x512.jpg"
                alt="National Highways NHAI Access NOC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">
                National Highways (NHAI) Access NOC
              </h3>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                What it is:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Legal permission to create an entry/exit (access point) from a
                National Highway to a private property.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Who needs it:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Owners of petrol pumps, hotels, warehouses, or commercial
                complexes located directly on highways like NH-48
                (Delhi-Jaipur) or NH-44.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                Procedure:
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                Submission of Traffic Flow Study → Geometric Design Approval →
                License Fee Payment → Execution of Access Agreement.
              </p>
              <p className="mt-4 text-[15px] font-bold text-[#cfa93c]">
                The &quot;NoObjectionCertificate.com&quot; Advantage
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                &quot;NHAI is extremely strict about safety &quot;Buffer
                Zones.&quot;
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-zinc-200 md:text-sm">
                <li>
                  We use 3rd-generation technical liaison to ensure your
                  driveway design is approved without requiring massive, costly
                  land setbacks.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── VVIP Audit form ─────────────────────────────────────── */}
      <section id="audit" className="relative scroll-mt-6 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center md:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#cfa93c] md:text-4xl">
            REQUEST A STRATEGIC AUDIT
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-black md:text-[15px]">
            Fill in your details and tap Contact — your request lands directly
            on our WhatsApp.
          </p>
          <AuditForm />
        </div>
      </section>

      <FooterFinal />

      {/* ── Floating call / WhatsApp buttons ───────────────────── */}
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
        href="https://wa.me/918800505050"
        aria-label="WhatsApp us"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.08L2 22l5.05-1.32A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3 .79.8-2.93-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.59-6.15c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.12-.17.25-.64.81-.78.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.09-.17.05-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.12.17 1.81 2.77 4.39 3.88.61.27 1.09.42 1.47.54.61.2 1.17.17 1.61.1.5-.07 1.48-.6 1.69-1.19.2-.58.2-1.08.14-1.19-.06-.1-.23-.16-.48-.29Z" />
        </svg>
      </a>
    </div>
  );
}
