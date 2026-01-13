import React from "react";
import { useNavigate } from "react-router-dom";

export default function CenterLogoOverlay({
  logoSrc = "/logo.png",
  alt = "GNSS Kirala Logo",
}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="
        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        z-50
       
        px-4 py-2
        flex items-center justify-center
        hover:scale-[1.02] transition
      "
      aria-label="Anasayfaya git"
    >
      <img
        src={logoSrc}
        alt={alt}
        className="h-12 sm:h-14 md:h-16 w-auto object-contain"
      />
    </button>
  );
}
