"use client";

// UI
import { Skeleton } from "@/components/ui/skeleton";
import NoteDialog from "../../components/NoteDialog";
// React
import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
// Actions
import {
  retriveNote,
  createNoteToDB,
} from "@/app/api/note/actions/note-actions";
// Utils component
import SearchCreate from "../../components/SearchCreate";
// type
import { TNote } from "@/app/types/note";
import { TCreateNote } from "@/app/types/create-note";
// context
import { NoteContext } from "@/contexts/NoteContextProvider";
import { LabelContext } from "@/contexts/LabelContextProvider";
import { TLabel } from "@/app/types/label/label";

export default function NoteClient({ notesList }: { notesList: TNote[] }) {
  const { notes, setNotes } = useContext(NoteContext);
  const { setLabels } = useContext(LabelContext);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNotes(notesList);
    setLoading(false);
  }, [notesList, setNotes]);

  console.log(notes, "notes AFTER setNotes?");

  function updateNoteState(noteDetails: TNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteDetails.id ? { ...note, ...noteDetails } : note
      )
    );
    setLabels((prevLabels: TLabel[]) =>
      prevLabels.map((label: TLabel) =>
        label.id === noteDetails.label_id
          ? { id: label.id, label_name: label.label_name }
          : label
      )
    );
  }

  async function fetchNotes() {
    try {
      const result = await retriveNote();
      if (!result) {
        throw new Error("Failed to fetch notes");
      }

      console.log(result, "Fetched notes from API");
      setNotes(result);
    } catch (error) {
      throw Error(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  console.log(notes, "Notes in NoteClient");

  async function createNote(noteDetails: TCreateNote) {
    try {
      const result = await createNoteToDB(noteDetails);
      if (!result) {
        throw new Error("Failed to create note");
      }
      toast.success("Note created successfully!");
      setOpenModal(false);
      fetchNotes();
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note.");
    }
  }
  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <SearchCreate
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchNotes={fetchNotes}
        createNote={createNote}
      />

      {loading ? (
        <div className="columns-1 sm:columns-2 md:columns-5 gap-4 my-5 w-full">
          {[...Array(5)].map((_, idx) => (
            <Skeleton key={idx} className="h-90 rounded-xl" />
          ))}
        </div>
      ) : (
        <div
          className={`columns-1 sm:columns-2 md:columns-5 w-full gap-4 my-5 ${
            notes.length === 0 ? "flex items-center justify-center w-full" : ""
          }`}
        >
          {notes.length === 0 && (
            <div className="text-center text-gray-500">No notes available.</div>
          )}
          {notes.map((noteItem) => (
            <NoteDialog
              key={noteItem.id}
              updateNoteState={updateNoteState}
              noteItem={noteItem}
              fetchNotes={fetchNotes}
              createNote={createNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}
