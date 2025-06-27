"use client";
import { createContext, useState } from "react";
import { TLabel } from "@/app/types/label/label";
type LabelContextType = {
  labels: TLabel[];
  setLabels: React.Dispatch<React.SetStateAction<TLabel[]>>;
};

export const LabelContext = createContext<LabelContextType>({
  labels: [],
  setLabels: () => {},
});

export default function LabelContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [labels, setLabels] = useState<TLabel[]>([]);
  return (
    <LabelContext.Provider value={{ labels, setLabels }}>
      {children}
    </LabelContext.Provider>
  );
}
