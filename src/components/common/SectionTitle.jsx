import React from "react";

export default function SectionTitle({
  children,
  subtitle,
  align = "center",
  className = "",

  // ✅ yeni
  imageSrc, // "/marka-photos/....webp" gibi
  imageAlt = "",
  imageSize = 56, // px
}) {
  const alignMap = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const classes = alignMap[align] || alignMap.center;
  const hasSubtitle =
    typeof subtitle === "string" ? subtitle.trim().length > 0 : !!subtitle;

  return (
    <div className={`flex flex-col gap-2 ${classes} mb-6 ${className}`}>
      {/* ✅ Resim */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          width={imageSize}
          height={imageSize}
          className="object-contain"
          loading="lazy"
        />
      ) : null}

      <h2 className="text-sm sm:text-base font-semibold tracking-[0.20em] uppercase text-gray-700">
        {children}
      </h2>

      {hasSubtitle ? <p className="text-xs text-gray-400">{subtitle}</p> : null}
    </div>
  );
}
