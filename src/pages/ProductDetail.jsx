import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { publicAsset } from "../utils/publicAsset";
import ProductCard from "../components/common/ProductCard"; // yolunu kendi projene göre ayarla

function isVideo(url = "") {
  return /\.(webm|mp4|mov|m4v)$/i.test(url);
}

function normalizeMediaList(images) {
  const arr = Array.isArray(images) ? images : [];
  return arr
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter(Boolean)
    .slice(0, 3); // ✅ sadece ilk 3
}

// specs içinden "akılda kalıcı" kısa 6 madde seçelim
function pickHighlights(specs, max = 6) {
  const list = Array.isArray(specs) ? specs : [];
  // çok uzun maddeleri biraz kısalt
  const cleaned = list
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter(Boolean)
    .map((s) => (s.length > 110 ? s.slice(0, 110).trim() + "…" : s));

  return cleaned.slice(0, max);
}

// basit mini ikon (emoji yerine küçük şekil)
function DotIcon() {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-white text-gray-900 shadow-sm">
      ✦
    </span>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const { data } = useData();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  const product = useMemo(() => {
    const products = Array.isArray(data?.products) ? data.products : [];
    const numericId = Number(id);
    return products.find((p) => Number(p?.id) === numericId);
  }, [data, id]);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-2xl border bg-white p-6">
          <h1 className="text-lg font-semibold text-gray-900">Ürün bulunamadı</h1>
          <p className="text-gray-600 mt-2">ID yanlış olabilir.</p>
          <Link
            to="/"
            className="inline-flex mt-4 rounded-xl bg-gray-900 text-white px-4 py-2 font-semibold"
          >
            Ürünlere dön
          </Link>
        </div>
      </div>
    );
  }

  const name = product?.name ?? "Ürün";
  const brand = (product?.brand ?? "").trim();
  const description = (product?.description ?? "").trim();
  const typeTitle = (product?.typeTitle ?? "").trim();
  const category = (product?.category ?? "").trim();

  const buyUrl = (product?.buyUrl || product?.byUrl || product?.BuyUrl || "").trim();
  const brochureUrl = (product?.brochureUrl || product?.brosurUrl || product?.brochure || "").trim();
  const hasBrochure = Boolean(brochureUrl);

  const specs = Array.isArray(product?.specs) ? product.specs : [];
  const highlights = useMemo(() => pickHighlights(specs, 6), [specs]);

  const mediaList = useMemo(() => normalizeMediaList(product?.images), [product]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeRaw = mediaList[activeIndex] || "";
  const activeSrc = activeRaw ? publicAsset(activeRaw) : publicAsset("/fallback.webp");
  const activeIsVideo = isVideo(activeRaw);

  const related = useMemo(() => {
    const products = Array.isArray(data?.products) ? data.products : [];
    return products
      .filter((p) => p?.id !== product?.id)
      .filter((p) => (brand && p?.brand === brand) || (category && p?.category === category))
      .slice(0, 6);
  }, [data, product?.id, brand, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link className="hover:text-gray-800" to="/">
          Anasayfa
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{name}</span>
      </div>

      {/* HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Media */}
        <div className="rounded-2xl border bg-white overflow-hidden">
          <div className="w-full bg-gray-50">
            <div className="relative w-full h-[420px] sm:h-[520px]">
              {activeIsVideo ? (
                <video
                  key={activeSrc}
                  src={activeSrc}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                />
              ) : (
                <img
                  src={activeSrc}
                  alt={name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = publicAsset("/fallback.webp");
                  }}
                />
              )}
            </div>
          </div>

          {/* ✅ sadece 3 thumbnail, ok yok, kaydırma yok */}
          {mediaList.length > 1 ? (
            <div className="border-t bg-white p-3">
              <div className="grid grid-cols-3 gap-2">
                {mediaList.map((raw, i) => {
                  const src = publicAsset(raw);
                  const video = isVideo(raw);

                  return (
                    <button
                      key={`${raw}-${i}`}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`
                        relative overflow-hidden rounded-xl border bg-gray-50
                        h-20 sm:h-24
                        transition
                        ${i === activeIndex ? "border-gray-900 ring-2 ring-gray-900/10" : "border-gray-200 hover:border-gray-900"}
                      `}
                      title={video ? "Video" : "Fotoğraf"}
                    >
                      {video ? (
                        <div className="w-full h-full">
                          <video
                            src={src}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />
                          <span className="absolute left-2 bottom-2 text-[10px] px-2 py-0.5 rounded-full bg-black/70 text-white">
                            video
                          </span>
                        </div>
                      ) : (
                        <img
                          src={src}
                          alt={`${name} ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => (e.currentTarget.src = publicAsset("/fallback.webp"))}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Info */}
        <div className="rounded-2xl border bg-white p-5 sm:p-6">
          {brand ? (
            <div className="text-xs tracking-wide uppercase text-gray-400">{brand}</div>
          ) : null}

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-1">
            {name}
          </h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {typeTitle ? (
              <span className="text-xs rounded-full bg-gray-100 text-gray-700 px-3 py-1 border">
                {typeTitle}
              </span>
            ) : null}
            {category ? (
              <span className="text-xs rounded-full bg-gray-100 text-gray-700 px-3 py-1 border">
                {category}
              </span>
            ) : null}
          </div>

          {description ? (
            <p className="text-gray-700 leading-relaxed mt-4 text-sm sm:text-base">
              {description}
            </p>
          ) : null}

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex gap-2">
              {buyUrl ? (
                <a
                  href={buyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex-1 rounded-xl
                    bg-[#7A0000] text-white
                    px-4 py-3 text-center font-semibold
                    shadow-[0_14px_34px_rgba(122,0,0,0.35)]
                    transition-all duration-300 ease-out
                    hover:bg-[#8F0000]
                    hover:-rotate-1 hover:translate-x-0.5 hover:-translate-y-0.5
                    hover:shadow-[0_18px_44px_rgba(122,0,0,0.45)]
                    active:translate-y-0 active:rotate-0
                  "
                >
                  Satın Al
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex-1 rounded-xl bg-gray-200 text-gray-500 px-4 py-3 font-semibold cursor-not-allowed"
                >
                  Satın Al
                </button>
              )}

              <Link
                to="/"
                className="
                  flex-1 rounded-xl border-2 border-gray-900
                  bg-white px-4 py-3 text-center font-semibold text-gray-900
                  transition-all duration-300
                  hover:bg-gray-900 hover:text-white hover:-translate-y-0.5
                  active:translate-y-0
                "
              >
                Ürünlere dön
              </Link>
            </div>

            {hasBrochure ? (
              <a
                href={brochureUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  group relative w-full overflow-hidden rounded-xl
                  bg-black/90 backdrop-blur-md
                  border border-white/15
                  px-4 py-3 text-center font-semibold text-white
                  shadow-[0_12px_30px_rgba(0,0,0,0.28)]
                  transition-all duration-300 ease-out
                  hover:bg-black/75 hover:-translate-y-0.5
                  active:translate-y-0
                "
              >
                <span
                  className="
                    pointer-events-none absolute -left-1/2 top-0 h-full w-1/2
                    bg-gradient-to-r from-transparent via-white/25 to-transparent
                    opacity-0 blur-sm transition-all duration-500
                    group-hover:left-[120%] group-hover:opacity-100
                  "
                />
                <span className="relative">Broşür</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* ✅ Teknik özellikler (klas + akılda kalıcı) */}
      {specs.length ? (
        <section className="mt-8 rounded-2xl border bg-white p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Teknik Özellikler
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Sahada işine yarayanları öne çıkardık. Detaylar aşağıda.
              </p>
            </div>
            <div className="hidden sm:block text-xs text-gray-400">
              {/* ❌ madde sayısı yok */}
            </div>
          </div>

          {/* Highlights */}
          {highlights.length ? (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="
                    rounded-2xl border bg-gradient-to-b from-white to-gray-50
                    p-4 flex gap-3
                    shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]
                    transition
                  "
                >
                  <DotIcon />
                  <div className="text-sm sm:text-[15px] text-gray-800 leading-relaxed">
                    {h}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Full list */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900">
              Tüm teknik detaylar
            </h3>
            <div className="mt-3 rounded-2xl border bg-white">
              <ul className="divide-y">
                {specs.map((s, i) => (
                  <li
                    key={i}
                    className="px-4 sm:px-5 py-3 text-gray-700 text-sm sm:text-base leading-relaxed"
                  >
                    <span className="text-gray-900 font-semibold mr-2">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {/* Benzer ürünler (kalsın) */}
      {related.length ? (
        <section className="mt-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Benzer Ürünler</h2>
              <p className="text-sm text-gray-500">Aynı marka/kategori içinden</p>
            </div>
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              Tüm ürünler →
            </Link>
          </div>

          <div className="rounded-2xl border bg-gradient-to-b from-white to-gray-50 p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {related.map((p) => (
                <div
                  key={p.id}
                  className="transition hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)] rounded-2xl"
                >
                  <ProductCard item={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
