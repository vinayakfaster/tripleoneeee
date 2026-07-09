"use client";

import { useEffect, useState } from "react";
import ClientOnly from "./ClientOnly";
import FooterColumn from "@/components/FooterColumn";

function Footer() {
  const [country, setCountry] = useState("United States");
  const [openIndexes, setOpenIndexes] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const itemData = [
    [
      "About",
      "Newsroom",
      "Learn about new features",
      "Letter from our founders",
      "Careers",
      "Investors",
    ],
    [
      "Support",
      "Help Center",
      "Triplecover",
      "Cancellation options",
      "Safety information",
      "Report a neighborhood concern",
    ],
    [
      "Community",
      "Newsroom",
      "Learn about new features",
      "Letter from our founders",
      "Careers",
      "Investors",
    ],
    [
      "Hosting",
      "Try hosting",
      "Triplecover for Hosts",
      "Explore hosting resources",
      "Safety information",
      "How to host responsibly",
    ],
  ];

  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data) => setCountry(data.country))
      .catch((err) => console.error("IP lookup #00C4FF:", err));
  }, []);

  const toggleColumn = (index: number) => {
    setOpenIndexes((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
  };

  const footerColumns = itemData.map((item, index) => (
    <FooterColumn
      key={index}
      index={index}
      data={item}
      isOpen={openIndexes[index]}
      onToggle={toggleColumn}
    />
  ));

  return (
    <ClientOnly>
      <div className="bg-[#15150f] px-6 py-10 text-[#c9c4b6] sm:px-12 md:px-20 lg:px-32 lg:py-14">
        {/* wordmark + back to top */}
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c8a05a] font-serif text-xs font-bold text-[#15150f]">
              T1
            </span>
            <span className="font-serif text-lg tracking-wide text-[#f4f0e6]">
              TripleOne
            </span>
          </div>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              const topEl = document.getElementById("top");
              if (topEl) {
                topEl.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="cursor-pointer text-[11px] uppercase tracking-widest text-[#c9c4b6] hover:text-[#c8a05a]"
          >
            Back to top ↑
          </a>
        </div>

        {/* accordion columns */}
        <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-y-10 sm:gap-x-10 lg:grid-cols-4">
          {footerColumns}
        </div>

        {/* contact info */}
        <div className="col-span-full mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row">
          <p className="text-[#c9c4b6]">{country}</p>

          <div className="flex flex-col gap-2 text-center sm:flex-row sm:gap-6 sm:text-left">
            <a
              href="https://www.instagram.com/_tripleone__?igsh=MXhxNDFqaXB3anh3Nw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9c4b6] hover:text-[#c8a05a] hover:underline"
            >
              Instagram
            </a>
            <a
              href="tel:+918448811165"
              className="text-[#c9c4b6] hover:text-[#c8a05a] hover:underline"
            >
              📞 8448811165
            </a>
            <a
              href="https://wa.me/918448811165"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9c4b6] hover:text-[#c8a05a] hover:underline"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        <p className="col-span-full mt-6 text-[11px] leading-relaxed text-[#c9c4b6]/70">
          © 2026 TripleOne. All rights reserved.
        </p>
      </div>
    </ClientOnly>
  );
}

export default Footer;
