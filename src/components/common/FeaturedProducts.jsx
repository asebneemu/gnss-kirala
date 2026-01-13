import React from "react";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";

export default function FeaturedProducts({ items = [], title = "Öne Çıkarılanlar" }) {
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
            <ProductCard key={`${item?.id ?? "x"}-${i}`} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
