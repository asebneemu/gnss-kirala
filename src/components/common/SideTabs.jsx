import React from "react";
import { Globe, ShoppingCart } from "lucide-react";

function Tab({ label, href, bgClass, capClass, icon: Icon }) {
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
        {/* Kenardaki KARE kapak + ikon */}
        <div
          className={`
            h-[52px] w-[52px]
            flex items-center justify-center
            ${capClass}
          `}
        >
          {Icon ? <Icon size={22} className="text-white" /> : null}
        </div>

        {/* Açılan pankart */}
        <div
          className={`
            flex-1 h-[52px]
            flex items-center
            ${bgClass}
          `}
        >
          {/* soldan biraz padding veriyoruz */}
          <span className="pl-6 pr-4 text-white font-semibold text-sm whitespace-nowrap">
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
        icon={Globe}
      />
      <Tab
        label="Market Sitesi"
        href="https://www.gnssmarketim.com"
        capClass="bg-orange-600"
        bgClass="bg-gradient-to-r from-orange-500 to-amber-400"
        icon={ShoppingCart}
      />
    </div>
  );
}
