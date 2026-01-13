import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Autoplay } from "swiper/modules";
import { useData } from "../../context/DataContext";
import SectionTitle from "./SectionTitle";

export default function ReferenceSlider() {
  const { data } = useData();
  const title = data?.home?.references?.title || "Referanslarımız";
  const items = data?.home?.references?.items || [];

  const swiperRef = useRef(null);

  if (!items.length) return null;

  return (
    <section className="w-full py-10 relative">
      {/* ✅ Başlık ortada */}
      <SectionTitle align="center" subtitle="Kaydırarak inceleyin">
        {title}
      </SectionTitle>

      {/* ✅ Fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-gray-50 to-transparent z-10" />

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[FreeMode, Autoplay]}
          freeMode={true}
          grabCursor={true}
          speed={900}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={18}
          breakpoints={{
            0: { slidesPerView: 2.1 },
            480: { slidesPerView: 3.1 },
            768: { slidesPerView: 4.3 },
            1024: { slidesPerView: 6.3 },
          }}
        >
          {items.map((ref, index) => (
            <SwiperSlide key={index}>
              <div
                className="
                  group
                  bg-white
                  border border-gray-200
                  rounded-2xl
                  px-4 py-4
                  flex flex-col items-center justify-center
                  shadow-sm
                  hover:shadow-md
                  hover:-translate-y-1
                  transition
                  h-[160px]
                "
              >
                {/* ✅ LOGO ALANI (KARE VE GENİŞ) */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-3">
                  <img
                    src={ref.logo}
                    alt={ref.name}
                    className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition"
                  />
                </div>

                <p
                  className="
                    text-[11px] sm:text-xs
                    text-gray-600
                    font-medium
                    tracking-wide
                    text-center
                    line-clamp-2
                  "
                >
                  {ref.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
