import React, { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../context/DataContext";

import ReferenceSlider from "../components/common/ReferenceSlider";
import FeaturedProducts from "../components/common/FeaturedProducts";
import Footer from "../components/common/Footer";
import Container from "../components/common/Container";
import Header from "../components/home/Header";
import SideTabs from "../components/common/SideTabs";

import confetti from "canvas-confetti";

const normalize = (v) => String(v || "").trim().toLowerCase();
const upTR = (v) => String(v || "").trim().toLocaleUpperCase("tr-TR");

export default function HomePage() {
  const { data } = useData();
  const { filterKey } = useParams(); // ✅ /stec gibi

  // ✅ Sayfaya girince 1 kere konfeti
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.2 },
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 95,
        origin: { y: 0.25 },
      });
    }, 250);
  }, []);

  const key = normalize(filterKey);

  const productsRaw =
    data?.products?.items ||
    data?.products ||
    data?.productData?.items ||
    data?.productData ||
    data?.home?.products ||
    data?.urunler ||
    [];

  const products = Array.isArray(productsRaw) ? productsRaw : [];

  // ✅ Bu key brand mi category mi? (ürünlerde var mı diye bakıyoruz)
  const isBrand = useMemo(() => {
    if (!key) return false;
    return products.some((p) => normalize(p?.brand) === key);
  }, [products, key]);

  const isCategory = useMemo(() => {
    if (!key) return false;
    return products.some((p) => normalize(p?.category) === key);
  }, [products, key]);

  const activeFilter = key
    ? isBrand
      ? { type: "brand", key, title: upTR(key) }
      : isCategory
      ? { type: "category", key, title: upTR(key) }
      : null
    : null;

  const filteredProducts = useMemo(() => {
    if (!activeFilter) return products; // / yoksa normal
    if (activeFilter.type === "brand") {
      return products.filter((p) => normalize(p?.brand) === activeFilter.key);
    }
    return products.filter((p) => normalize(p?.category) === activeFilter.key);
  }, [products, activeFilter]);

  const title = activeFilter ? activeFilter.title : "Öne Çıkarılanlar";

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />
      <SideTabs />

      <main className="w-full">
        <Container>
          <FeaturedProducts items={filteredProducts} title={title} />
        </Container>

        <div className="w-full bg-gray-100">
          <Container>
            <ReferenceSlider referencesData={data?.home?.references} />
          </Container>
        </div>

        {/* Eğer AccordionMenu'yu footer üstünde göstermek istersen:
            <AccordionMenu /> 
        */}
      </main>

      <Footer />
    </div>
  );
}
