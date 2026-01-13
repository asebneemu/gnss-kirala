import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { data } = useData();

  const navbarData = data?.home?.navbar;

  const logoText = navbarData?.logoText || "GNSS Kirala";

  const menu =
    navbarData?.menu || [
      { label: "Anasayfa", path: "/" },
      { label: "Kiralama", path: "/rent" },
      { label: "Markalar", path: "/brands" },
      { label: "Hakkımızda", path: "/about" },
      { label: "İletişim", path: "/contact" },
    ];

  const brands =
    navbarData?.brands || ["DJI", "Sony", "Canon", "GoPro", "Apple", "Samsung"];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <nav className="w-[80%] mx-auto px-4 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="font-bold text-xl tracking-tight">
            {logoText}
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="hover:text-black transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => navigate("/rent")}
              className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:opacity-90 transition"
            >
              Kiralama
            </button>
          </div>
        </div>

        {!!brands.length && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => navigate(`/brand/${encodeURIComponent(brand)}`)}
                className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition bg-gray-100 hover:bg-gray-200"
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
