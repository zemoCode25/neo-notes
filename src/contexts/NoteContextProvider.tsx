import { createContext } from "react";
import { TNote } from "@/app/types/note";

type TNoteContext = {
  notes: TNote[];
  setNotes: (notes: TNote[]) => void;
};

export const NoteContext = createContext<TNoteContext>({
  notes: [],
  setNotes: () => {},
});

export default function NoteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NoteContext.Provider value={{ notes: [], setNotes: () => {} }}>
      {children}
    </NoteContext.Provider>
  );
}
