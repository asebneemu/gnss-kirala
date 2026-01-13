import React, { useMemo } from "react";
import { useData } from "../../context/DataContext";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";

export default function FeaturedProducts() {
  const { data } = useData();

  const title = data?.home?.featured?.title ?? "Ürünler";

  const items = useMemo(() => {
    const products = Array.isArray(data?.products) ? data.products : [];
    return products; // ✅ filtre yok, hepsi
  }, [data]);

  return (
    <section className="w-full mt-6">
      <SectionTitle align="center" subtitle={`${items.length} ürün`}>
        {title}
      </SectionTitle>

      {!items.length ? (
        <div className="bg-white rounded-2xl p-6 text-gray-600 shadow-sm border">
          Henüz ürün yok.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ProductCard key={item.id ?? i} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
