import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function PageTopBar({ current = "Hakkımızda" }) {
  const { data } = useData();

  const phone = data?.site?.phoneText || "0312 285 14 20";
  const phoneHref = data?.site?.phoneHref || "tel:+903122851420";

  return (
    <div className="w-full bg-white border-b">
      <div className="w-[80%] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <Link to="/" className="hover:text-black transition">
            Anasayfa
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-900">{current}</span>
        </div>

        <a
          href={phoneHref}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition"
          aria-label="Telefon ile ara"
        >
          <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 16.5V20a2 2 0 0 1-2.2 2 19.9 19.9 0 0 1-8.7-3.1A19.5 19.5 0 0 1 3.1 12.9 19.9 19.9 0 0 1 0 4.2 2 2 0 0 1 2 2h3.5a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L6.2 9.8a16 16 0 0 0 8 8l1.4-1.4a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"
                fill="currentColor"
              />
            </svg>
          </span>

          <span className="hidden sm:block">{phone}</span>
        </a>
      </div>
    </div>
  );
}
