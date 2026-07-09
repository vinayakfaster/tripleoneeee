"use client";

type Props = {
  index: number;
  data: Array<string>;
  isOpen: boolean;
  onToggle: (index: number) => void;
};

function FooterColumn({ index, data, isOpen, onToggle }: Props) {
  const [title, ...links] = data;

  return (
    <div className="border-b border-white/10 sm:border-none">
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="flex w-full items-center justify-between py-4 text-left sm:pointer-events-none sm:py-0 sm:mb-4"
        aria-expanded={isOpen}
      >
        <h5 className="text-sm font-semibold tracking-wide text-[#f4f0e6]">
          {title}
        </h5>

        {/* plus/cross toggle icon — mobile only */}
        <span className="relative h-4 w-4 shrink-0 sm:hidden">
          <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-[#c8a05a]" />
          <span
            className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-[#c8a05a] transition-transform duration-200 ${
              isOpen ? "rotate-90 opacity-0" : ""
            }`}
          />
        </span>
      </button>

      {/* collapsible on mobile, always expanded from sm breakpoint up */}
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        } sm:!grid-rows-[1fr] sm:!opacity-100`}
      >
        <div className="flex flex-col gap-3 overflow-hidden pb-4 text-xs text-[#c9c4b6] sm:pb-0">
          {links.map((item, idx) => (
            <p
              key={idx}
              className="cursor-pointer transition-colors hover:text-[#c8a05a]"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterColumn;
