import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function AccordionMenu() {
  const { data } = useData();
  const sections =
    data?.footer?.accordionSections ||
    data?.accordionSections ||
    [];

  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.external) {
      window.open(item.href, "_blank", "noopener noreferrer");
    } else {
      navigate(item.href);
    }
  };

  if (!sections.length) return null;

  return (
    <nav className="bg-gray-100 py-8 w-full mt-12">
      <div className="w-full px-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {sections.map((sec, idx) => {
            const isGNSSBlock =
              sec.title === "GNSS HARİTA TEKNİK DAN. SAN. VE TİC. A.Ş.";

            return (
              <div key={idx} className="space-y-3">
                <h3 className="text-md font-semibold text-gray-800 normal-case md:uppercase block break-words relative">
                  {sec.title}
                  {isGNSSBlock && (
                    <span
                      className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, white, gray, black, gray, white)",
                      }}
                    />
                  )}
                </h3>

                <ul className="space-y-1 text-md">
                  {(sec.items || []).map((item, j) => (
                    <li key={j}>
                      {isGNSSBlock ? (
                        <span className="text-gray-500 cursor-default">
                          {item.label}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleClick(item)}
                          className="text-left text-gray-600 hover:text-red-600 transition"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
