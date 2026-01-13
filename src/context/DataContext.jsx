import React, { createContext, useContext, useMemo, useState } from "react";
import initialData from "../data/data.json";
console.log("DATA CONTEXT INITIAL:", initialData);

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(initialData);

  const value = useMemo(() => ({ data, setData }), [data]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
