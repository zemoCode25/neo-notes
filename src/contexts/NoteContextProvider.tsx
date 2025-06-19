"use client";
import { createContext, useState } from "react";
import { TNote } from "@/app/types/note";

type TNoteContext = {
  notes: TNote[];
  setNotes: React.Dispatch<React.SetStateAction<TNote[]>>;
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
  const [notes, setNotes] = useState<TNote[]>([]);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
}
