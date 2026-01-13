import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";

import ReferenceSlider from "../components/common/ReferenceSlider";
import FeaturedProducts from "../components/common/FeaturedProducts";
import AccordionMenu from "../components/common/AccordionMenu";
import Footer from "../components/common/Footer";
import Container from "../components/common/Container";
import Header from "../components/home/Header";

const normalize = (v) => String(v || "").trim().toLowerCase();
const up = (v) => String(v || "").trim().toUpperCase();

export default function HomePage() {
  const location = useLocation();
  const { data } = useData();

  const params = new URLSearchParams(location.search);
  const selectedBrand = normalize(params.get("brand"));
  const selectedCategory = normalize(params.get("category"));

  const productsRaw =
    data?.products?.items ||
    data?.products ||
    data?.productData?.items ||
    data?.productData ||
    data?.home?.products ||
    data?.urunler ||
    [];

  const products = Array.isArray(productsRaw) ? productsRaw : [];

  const activeFilter = selectedBrand
    ? { type: "brand", key: selectedBrand, title: up(selectedBrand) } // sadece STEC
    : selectedCategory
    ? { type: "category", key: selectedCategory, title: up(selectedCategory) } // sadece LIDAR
    : null;

  const filteredProducts = useMemo(() => {
    if (!activeFilter) return products; // tıklanmadıysa normal liste (istersen featured listesi yaparız)
    if (activeFilter.type === "brand") {
      return products.filter((p) => normalize(p?.brand) === activeFilter.key);
    }
    return products.filter((p) => normalize(p?.category) === activeFilter.key);
  }, [products, activeFilter]);

  // ✅ Başlık: tıklanmadıysa "Öne Çıkarılanlar", tıkladıysa sadece "STEC"
  const title = activeFilter ? activeFilter.title : "Öne Çıkarılanlar";

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />

      <main className="w-full">
        <Container>
          <ReferenceSlider referencesData={data?.home?.references} />

          <FeaturedProducts items={filteredProducts} title={title} />
        </Container>

        <div className="w-full bg-gray-100">
          <Container>
            <AccordionMenu sections={data?.accordionSections || []} />
          </Container>
        </div>
      </main>

      <Footer />
    </div>
  );
}
