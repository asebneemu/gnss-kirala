import { useData } from "../../context/DataContext";

export default function Footer() {
  const { data } = useData();

  return (
    <footer
      style={{ backgroundColor: "rgb(22, 74, 94)" }}
      className="mt-6 mb-4 py-2 w-full"
    >
      <div className="w-[80%] mx-auto flex items-center justify-between gap-2 flex-nowrap">
        <p className="text-white whitespace-nowrap leading-none text-[13px] max-sm:text-[11px]">
          Copyright 2025 © Tüm Hakları Saklıdır.
        </p>

        <img
          src="/asu.png"
          alt="by Aleyna Şebnem Uçak"
          className="w-[70px] max-sm:w-[55px] h-auto object-contain"
        />
      </div>
    </footer>
  );
}
