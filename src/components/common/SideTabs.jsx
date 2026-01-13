import React from "react";

function Tab({ label, href, bgClass, capClass }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="group block h-[52px] w-[220px] overflow-visible"
    >
      {/* ✅ Tek parça: kapak + pankart birlikte kayıyor */}
      <div
        className="
          relative flex items-center h-[52px] w-[220px]
          shadow-lg
          transition-transform duration-300 ease-out
          -translate-x-[168px]
          group-hover:translate-x-0
        "
      >
        {/* Kenardaki KARE kapak */}
        <div
          className={`
            h-[52px] w-[52px]
            ${capClass}
          `}
        />

        {/* Açılan pankart */}
        <div
          className={`
            flex-1 h-[52px]
            flex items-center
            ${bgClass}
          `}
        >
          <span className="px-4 text-white font-semibold text-sm whitespace-nowrap">
            {label}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function SideTabs() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      <Tab
        label="Web Sitesi"
        href="https://www.gnssteknik.com.tr"
        capClass="bg-blue-800"
        bgClass="bg-gradient-to-r from-blue-700 to-sky-500"
      />
      <Tab
        label="Market Sitesi"
        href="https://www.gnssmarketim.com"
        capClass="bg-orange-600"
        bgClass="bg-gradient-to-r from-orange-500 to-amber-400"
      />
    </div>
  );
}
