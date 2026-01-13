import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useData } from "../../context/DataContext";

function HamburgerIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const normalize = (v) => String(v || "").trim().toLowerCase();
const niceLabel = (s) => String(s || "").trim().toUpperCase();

export default function Header() {
  const { data } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const navbar = data?.home?.navbar;

  const centerText =
    navbar?.centerText || "İkinci El Satış & Kiralamanın Yeni Adresi";

  const brandNavbar =
    navbar?.brandNavbar || data?.brandNavbar || data?.home?.brandNavbar || [];

  const productsRaw =
    data?.products?.items ||
    data?.products ||
    data?.productData?.items ||
    data?.productData ||
    data?.home?.products ||
    data?.urunler ||
    [];

  const products = Array.isArray(productsRaw) ? productsRaw : [];

  const { availableBrands, availableCategories } = useMemo(() => {
    const brandSet = new Set();
    const catSet = new Set();

    products.forEach((p) => {
      const b = normalize(p?.brand);
      const c = normalize(p?.category);
      if (b) brandSet.add(b);
      if (c) catSet.add(c);
    });

    const displayMap = new Map();
    (Array.isArray(brandNavbar) ? brandNavbar : []).forEach((b) => {
      const key = normalize(b?.name);
      if (key) displayMap.set(key, b?.name);
    });

    const availableBrands = Array.from(brandSet)
      .sort()
      .map((key) => ({
        brandKey: key,
        name: displayMap.get(key) || niceLabel(key),
      }));

    const availableCategories = Array.from(catSet)
      .sort()
      .map((key) => ({
        key,
        label: niceLabel(key),
      }));

    return { availableBrands, availableCategories };
  }, [products, brandNavbar]);

  const phoneHref = data?.site?.phoneHref || "tel:+903122851420";

  const [openBrands, setOpenBrands] = useState(false);
  const [openCats, setOpenCats] = useState(false);

  useEffect(() => {
    setOpenBrands(false);
    setOpenCats(false);
  }, [location.pathname, location.search]);

  const wrapRef = useRef(null);
  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) {
        setOpenBrands(false);
        setOpenCats(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

const goBrand = (brandKey) => {
  setOpenBrands(false);
  setOpenCats(false);
  navigate(`/${encodeURIComponent(brandKey)}`);
};

const goCategory = (catKey) => {
  setOpenBrands(false);
  setOpenCats(false);
  navigate(`/${encodeURIComponent(catKey)}`);
};


  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="w-[80%] mx-auto px-4 py-4" ref={wrapRef}>
        {/* ✅ MOBİL: 3 SATIR / DESKTOP: tek blok */}
        <div className="flex flex-col gap-3 md:gap-4">
          {/* 1. SATIR (mobil): Logo sol + sağ aksiyonlar */}
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="GNSS"
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </Link>

            <div className="flex items-center gap-3">
              <a
  href={phoneHref} // tel:+903122851420
  className="flex items-center gap-3"
  aria-label="Telefon ile ara"
>
  {/* ✅ ORİJİNAL TELEFON İKONU (senin ilkindeki aynısı) */}
  <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
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

  {/* ✅ KİRALA görseli aynı kalsın ama artık tek linkin parçası */}
  <span
    className="
      bg-gradient-to-r from-black to-gray-700
      text-white px-5 py-2 rounded-xl
      text-sm font-medium
      hover:opacity-90 transition
      shadow-sm
      whitespace-nowrap
    "
  >
    Kirala
  </span>
</a>

            </div>
          </div>

          {/* 2. SATIR (mobil): Slogan tam ortada */}
          <div className="flex justify-center">
            <div
              className="
                font-script font-bold
                text-lg sm:text-xl
                tracking-wide
                text-gray-900
                text-center
                leading-tight
              "
            >
              {centerText}
            </div>
          </div>

          {/* 3. SATIR (mobil): Hamburger menüler */}
          <div className="md:hidden flex items-center justify-between gap-3">
            {/* Markalar */}
            <div className="relative w-1/2">
              <button
                type="button"
                onClick={() => {
                  setOpenBrands((v) => !v);
                  setOpenCats(false);
                }}
                className="w-full px-4 py-2 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition flex items-center justify-between"
              >
                <span>Markalar</span>
                <HamburgerIcon />
              </button>

              {openBrands && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-100 shadow-lg rounded-2xl overflow-hidden z-50">
                  <div className="max-h-80 overflow-auto">
                    {availableBrands.map((b) => (
                      <button
                        key={b.brandKey}
                        onClick={() => goBrand(b.brandKey)}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition"
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Kategoriler */}
            <div className="relative w-1/2">
              <button
                type="button"
                onClick={() => {
                  setOpenCats((v) => !v);
                  setOpenBrands(false);
                }}
                className="w-full px-4 py-2 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition flex items-center justify-between"
              >
                <span>Kategoriler</span>
                <HamburgerIcon />
              </button>

              {openCats && (
                <div className="absolute right-0 top-full mt-2 w-full bg-white border border-gray-100 shadow-lg rounded-2xl overflow-hidden z-50">
                  <div className="max-h-80 overflow-auto">
                    {availableCategories.map((c) => (
                      <button
                        key={c.key}
                        onClick={() => goCategory(c.key)}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ✅ DESKTOP (md+): chip navbarlar ayrı kalsın */}
          <div className="hidden md:flex items-center justify-between gap-4 mt-2">
            <div className="flex gap-2 overflow-x-auto pb-1 max-w-[50%]">
              {availableBrands.map((b) => (
                <button
                  key={b.brandKey}
                  onClick={() => goBrand(b.brandKey)}
                  className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition bg-gray-100 hover:bg-gray-200"
                >
                  {b.name}
                </button>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 max-w-[50%] justify-end">
              {availableCategories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => goCategory(c.key)}
                  className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition bg-gray-100 hover:bg-gray-200"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
