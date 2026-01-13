import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useData } from "../../context/DataContext";
import CenterLogoOverlay from "./CenterLogoOverlay";

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

  const logoText = navbar?.logoText || "GNSS Kirala";

  // ✅ BRAND NAVBAR: nerede duruyorsa yakala (farklı ihtimaller)
  const brandNavbar =
    navbar?.brandNavbar ||
    data?.brandNavbar ||
    data?.home?.brandNavbar ||
    [];

  // ✅ ÜRÜNLER: sende nerede duruyorsa yakala
  const productsRaw =
    data?.products?.items ||
    data?.products ||
    data?.productData?.items ||
    data?.productData ||
    data?.home?.products ||
    data?.urunler ||
    [];

  const products = Array.isArray(productsRaw) ? productsRaw : [];

  // ✅ Ürünlerden mevcut brand/category çıkar. Brand’ı ÜRÜNDEN garanti alıyoruz.
  // BrandNavbar varsa sadece isim güzelleştirme için kullanıyoruz.
  const { availableBrands, availableCategories } = useMemo(() => {
    const brandSet = new Set();
    const catSet = new Set();

    products.forEach((p) => {
      const b = normalize(p?.brand);
      const c = normalize(p?.category);
      if (b) brandSet.add(b);
      if (c) catSet.add(c);
    });

    // brandNavbar’dan: brandKey => displayName map
    const displayMap = new Map();
    (Array.isArray(brandNavbar) ? brandNavbar : []).forEach((b) => {
      const key = normalize(b?.name);
      if (key) displayMap.set(key, b?.name);
    });

    // ✅ solda gösterilecek markalar: ürünlerde var olanlar (brandNavbar olmasa bile çıkar)
    const availableBrands = Array.from(brandSet)
      .sort()
      .map((key) => ({
        brandKey: key, // query’ye gidecek olan: chcnav
        name: displayMap.get(key) || niceLabel(key), // CHCNAV gibi görünür
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

  // route değişince dropdown kapan
  useEffect(() => {
    setOpenBrands(false);
    setOpenCats(false);
  }, [location.pathname, location.search]);

  // dışarı tıklayınca kapat
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
    navigate(`/rent?brand=${encodeURIComponent(brandKey)}`);
  };

  const goCategory = (catKey) => {
    setOpenBrands(false);
    setOpenCats(false);
    navigate(`/rent?category=${encodeURIComponent(catKey)}`);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="w-[80%] mx-auto px-4 py-4 relative" ref={wrapRef}>
        {/* ✅ Logo: mobilde biraz yukarı */}
        <div className="translate-y-6 md:translate-y-10">
          <CenterLogoOverlay logoSrc="/logo.png" />
        </div>

        {/* ÜST SATIR */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="font-bold text-xl tracking-tight text-gray-900 hover:opacity-80 transition"
          >
            {logoText}
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={phoneHref}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="Telefon ile ara"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 16.5V20a2 2 0 0 1-2.2 2 19.9 19.9 0 0 1-8.7-3.1A19.5 19.5 0 0 1 3.1 12.9 19.9 19.9 0 0 1 0 4.2 2 2 0 0 1 2 2h3.5a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L6.2 9.8a16 16 0 0 0 8 8l1.4-1.4a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <button
              onClick={() => navigate("/rent")}
              className="bg-gradient-to-r from-black to-gray-700 text-white px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-sm"
            >
              Kirala
            </button>
          </div>
        </div>

        {/* ✅ BÜYÜK HAL (chip) */}
        <div className="hidden md:flex items-center justify-between gap-4 mt-10">
          {/* Sol: Markalar */}
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

          {/* Sağ: Kategoriler */}
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

        {/* ✅ MOBİL HAL: logo ile çakışmasın diye biraz daha aşağı */}
        <div className="md:hidden mt-14 flex items-center justify-between gap-3">
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
                  {availableBrands.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500">Şimdilik marka yok</div>
                  )}
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
                  {availableCategories.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500">Şimdilik kategori yok</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
