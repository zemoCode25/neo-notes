"use client";
import { createContext, useEffect, useState } from "react";
import { TLabel } from "@/app/types/label/label";
import { retriveAllLabels } from "@/app/api/label/actions/label-actions";
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
  async function fetchLabels() {
    try {
      const labelData = await retriveAllLabels();
      setLabels(labelData.labels);
      console.log("Fetched labels:", labelData.labels);
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  }

  useEffect(() => {
    fetchLabels();
  }, []);

  return (
    <LabelContext.Provider value={{ labels, setLabels }}>
      {children}
    </LabelContext.Provider>
  );
}
