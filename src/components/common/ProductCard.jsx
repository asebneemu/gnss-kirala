import React from "react";
import { Link } from "react-router-dom";
import { publicAsset } from "../../utils/publicAsset";

export default function ProductCard({ item }) {
  const id = item?.id;

  const name = item?.name ?? "Ürün";
  const desc = (item?.description ?? "").trim();
  const brand = (item?.brand ?? "").trim();

  const firstImage = item?.images?.[0] ?? "";
  const imgSrc = firstImage
    ? publicAsset(firstImage)
    : publicAsset("/fallback.webp");

  const buyUrl = (item?.buyUrl || item?.byUrl || item?.BuyUrl || "").trim();

  const brochureUrl = (
    item?.brochureUrl ||
    item?.brosurUrl ||
    item?.brochure ||
    ""
  ).trim();
  const hasBrochure = Boolean(brochureUrl);

  const detailTo = id != null ? `/urun/${id}` : "#";

  const shortDesc = desc.length > 120 ? `${desc.slice(0, 120).trim()}…` : desc;

  return (
    <article className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col h-full">
      {/* Görsel */}
      <div className="w-full h-72 sm:h-80 md:h-96 bg-gray-50">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = publicAsset("/fallback.webp");
          }}
        />
      </div>

      {/* İçerik */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        {brand ? (
          <div className="text-[11px] sm:text-xs tracking-wide uppercase text-gray-400">
            {brand}
          </div>
        ) : null}

        <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
          {name}
        </h3>

        {shortDesc ? (
          <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
            {shortDesc}
          </p>
        ) : null}

        {/* Butonlar */}
        <div className="mt-auto pt-3 flex flex-col gap-2">
          <div className="flex gap-2">
            {/* DETAY (sadece bunda buzlu cam + gri arkaplan) */}
            <Link
  to={detailTo}
  className="
    group relative flex-1 overflow-hidden rounded-xl
    border-2 border-gray-900
    bg-white
    px-4 py-2.5 text-center text-sm sm:text-base font-semibold text-gray-900
    shadow-sm transition-all duration-300
    hover:bg-gray-900 hover:text-white hover:-translate-y-0.5
    active:translate-y-0
  "
>
  Detay
</Link>


            {/* SATIN AL (kan kırmızısı, gradient yok, cam yok, sadece bunda eğilme) */}
            {buyUrl ? (
              <a
                href={buyUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  flex-1 rounded-xl
                  bg-[#7A0000] text-white
                  px-4 py-2.5 text-center text-sm sm:text-base font-semibold
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
                className="
                  flex-1 rounded-xl bg-gray-200 text-gray-500
                  px-4 py-2.5 text-center text-sm sm:text-base font-semibold
                  cursor-not-allowed
                "
              >
                Satın Al
              </button>
            )}
          </div>

          {/* BROŞÜR (haki, cam yok, eğilme yok) */}
          {/* BROŞÜR (siyah buzlu cam, yazı beyaz) */}
{hasBrochure ? (
  <a
    href={brochureUrl}
    target="_blank"
    rel="noreferrer"
    className="
      group relative w-full overflow-hidden rounded-xl
      bg-black/90 backdrop-blur-md
      border border-white/15
      px-4 py-2.5 text-center text-sm sm:text-base font-semibold text-white
      shadow-[0_12px_30px_rgba(0,0,0,0.28)]
      transition-all duration-300 ease-out
      hover:bg-black/75 hover:-translate-y-0.5
      active:translate-y-0
    "
  >
    {/* hafif shine */}
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
    </article>
  );
}
