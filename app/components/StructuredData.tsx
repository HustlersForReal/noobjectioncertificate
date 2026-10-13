import type { ReactNode } from "react";

const siteUrl = "https://noobjectioncertificate.com";

const services = [
  "Sale Permission NOC",
  "Substitution of Title NOC",
  "Mortgage Permission NOC",
  "Gift/Relinquishment NOC",
  "Conversion (Leasehold to Freehold) NOC",
  "Re-entry Withdrawal NOC",
  "Parent Deed (Title Chain) NOC / Certified Copy Retrieval",
  "Leasehold to Freehold Conversion NOC",
  "Mutation NOC",
  "Mortgage/Lien NOC",
  "Conveyance Deed Execution NOC",
  "Extension of Time (EOT) NOC",
  "MCD Mutation NOC",
  "Building Plan Sanction NOC",
  "Structural Stability NOC",
  "De-sealing NOC",
  "Regularization NOC",
  "Property Tax 'Nil Dues' (UPIC) NOC",
  "Completion / Occupancy NOC",
  "Delhi Fire Service (DFS) NOC",
  "DPCC Pollution (CTE/CTO) NOC",
  "Tree Cutting/Pruning NOC",
  "Groundwater Extraction (CGWA) NOC",
  "ASI (Archaeological Survey) NOC",
  "NMA (National Monuments Authority) NOC",
  "Airport Authority (Height) NOC",
  "DUAC (Urban Art Commission) NOC",
  "DJB (Water/Sewer) Connection NOC",
  "Electricity (BSES/TPDDL) Load NOC",
  "National Highways (NHAI) Access NOC",
];

export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NoObjectionCertificate.com",
    url: siteUrl,
    telephone: "+91-8800505050",
    logo: `${siteUrl}/logo.png`,
    sameAs: ["https://propertybaap.com"],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NoObjectionCertificate.com",
    url: siteUrl,
    inLanguage: "en-IN",
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "NOC Services Delhi | L&DO, DDA Approvals — NOC Banwao",
    description:
      "NOC Banwao, Deal Aage Badhao — L&DO, DDA, MCD NOCs, freehold conversion, mutation & Delhi government approvals. 3rd-generation liaison experts.",
    url: siteUrl,
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", url: siteUrl },
  };

  const servicesLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "NOC & Government Approval Services in Delhi",
    serviceType: "No Objection Certificate and government approval liaison",
    provider: {
      "@type": "Organization",
      name: "NoObjectionCertificate.com",
      url: siteUrl,
      telephone: "+91-8800505050",
    },
    areaServed: { "@type": "City", name: "Delhi" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "NOC Services",
      itemListElement: services.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: s },
      })),
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    ],
  };

  const jsonLd: unknown[] = [organization, website, webPage, servicesLd, breadcrumb];

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  ) as ReactNode;
}
