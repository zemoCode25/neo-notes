"use client";

// UI
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// React
import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
// Actions
import {
  // retriveNote,
  updateNoteToDB,
  createNoteToDB,
} from "@/app/api/note/actions/note-actions";
// Utils component
import UpdateForm from "../../components/UpdateForm";
import SearchCreate from "../../components/SearchCreate";
// type
import { TNote } from "@/app/types/note";
import { TCreateNote } from "@/app/types/create-note";
import { TUpdateNote } from "@/app/types/update-note";
// context
import { NoteContext } from "@/contexts/NoteContextProvider";
import { LabelContext } from "@/contexts/LabelContextProvider";
import DOMPurify from "dompurify";
import { TLabel } from "@/app/types/label/label";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      const response = await fetch(`${API_URL}/api/note`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`${response} TANGINA AAA`);
      }
      setNotes(result);
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

  // Update the UI upon note update
  async function updateNote(noteDetails: TUpdateNote) {
    try {
      const result = await updateNoteToDB(noteDetails);
      if (result) {
        toast.success("Note successfully updated!");
      }
      setOpenModal(false);
      updateNoteState(noteDetails);
      fetchNotes();
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
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
            <Dialog key={noteItem?.id}>
              <DialogTrigger className="cursor-pointer w-full">
                <Card
                  className={`w-full rounded-md p-4 mb-4 break-inside-avoid text-left ${
                    noteItem?.colortheme || "bg-violet-100"
                  }`}
                >
                  <div>
                    <h1 className="text-lg font-semibold">{noteItem?.title}</h1>
                    {noteItem?.label_name && (
                      <p className="text-sm border border-black px-2 py-1 rounded-md mb-2 w-fit">
                        {noteItem?.label_name}
                      </p>
                    )}
                    <p
                      className="whitespace-pre-wrap text-sm"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          (noteItem?.note?.length || 0) > 400
                            ? (noteItem?.note?.slice(0, 400) ?? "") + "..."
                            : noteItem?.note ?? ""
                        ),
                      }}
                    />
                  </div>
                </Card>
              </DialogTrigger>
              <UpdateForm
                noteItem={noteItem}
                updateNote={updateNote}
                fetchNotes={fetchNotes}
                closeModal={() => setOpenModal(false)}
                createNote={createNote}
              />
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
}
