import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../context/DataContext";

import ReferenceSlider from "../components/common/ReferenceSlider";
import FeaturedProducts from "../components/common/FeaturedProducts";
import AccordionMenu from "../components/common/AccordionMenu";
import Footer from "../components/common/Footer";
import Container from "../components/common/Container";
import Header from "../components/home/Header";
import SideTabs from "../components/common/SideTabs";

const normalize = (v) => String(v || "").trim().toLowerCase();
const up = (v) => String(v || "").trim().toUpperCase();

export default function HomePage() {
  const { data } = useData();
  const { filterKey } = useParams(); // ✅ /stec gibi

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
      ? { type: "brand", key, title: up(key) }
      : isCategory
      ? { type: "category", key, title: up(key) }
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
