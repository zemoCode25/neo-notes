"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import SearchCreate from "@/app/(neonotes)/components/SearchCreate";
import {
  retriveNote,
  createNoteToDB,
} from "@/app/api/note/actions/note-actions";
import { TCreateNote } from "@/app/types/create-note";

export function LabelPageClient({ labelID }: { labelID: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  async function fetchNotes() {
    try {
      const result = await retriveNote();
      setNotes(result?.notes);
    } catch (error) {
      throw Error(`${error}`);
    } finally {
      setLoading(false);
    }
  }

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
      <SearchCreate
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchNotes={fetchNotes}
        createNote={createNote}
      />
    </div>
  );
}
