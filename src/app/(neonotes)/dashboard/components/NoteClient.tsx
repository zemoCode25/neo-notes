"use client";

// UI
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// React
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
// Actions
import {
  retriveNote,
  updateNoteToDB,
  createNoteToDB,
} from "@/app/api/note/actions/note-actions";
// Utils component
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
// type
import { TNote } from "@/app/types/note";
import { TCreateNote } from "@/app/types/create-note";
import { TUpdateNote } from "@/app/types/update-note";
// context
import { NoteContext } from "@/contexts/NoteContextProvider";

export default function NoteClient({ notesList }: { notesList: TNote[] }) {
  const { notes, setNotes } = useContext(NoteContext);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setNotes(notesList);
    setLoading(false);
  }, [notesList, setNotes]);

  console.log(notes, "notes AFTER setNotes?");

  function handleClick(id: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", id.toString());
    router.push(`?${params.toString()}`);
  }

  function updateNoteState(noteDetails: TNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteDetails.id ? { ...note, ...noteDetails } : note
      )
    );
  }

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

  // Update the UI upon note update
  async function updateNote(noteDetails: TUpdateNote) {
    try {
      const result = await updateNoteToDB(noteDetails);
      if (result) toast.success("Note successfully updated!");
      setOpenModal(false);
      updateNoteState(noteDetails);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="w-full flex items-center justify-center gap-5">
        <Toaster position="bottom-right" reverseOrder={false} />
        <Input className="w-1/4" placeholder="Search..."></Input>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="cursor">Take Note</Button>
          </DialogTrigger>
          <CreateForm
            closeModal={() => setOpenModal(false)}
            fetchNotes={fetchNotes}
            createNote={createNote}
          />
        </Dialog>
      </div>

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
              <DialogTrigger
                className="cursor-pointer w-full"
                onClick={() => handleClick(1)}
              >
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
                    <p className="whitespace-pre-wrap text-sm">
                      {`${
                        (noteItem?.note?.length || 0) > 400
                          ? noteItem?.note?.slice(0, 400) + "..."
                          : noteItem?.note
                      }`}
                    </p>
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
