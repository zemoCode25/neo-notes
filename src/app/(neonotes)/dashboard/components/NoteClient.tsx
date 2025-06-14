"use client";

// UI
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// React
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// Actions
import {
  createNote,
  retriveNote,
  updateNote,
} from "@/app/api/note/actions/note-actions";
// Utils component
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
// type
import { TNote } from "@/app/types/content";

export default function NoteClient({ notesList }: { notesList: TNote[] }) {
  const [notes, setNotes] = useState<TNote[]>(notesList);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick(id: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", id.toString());
    router.push(`?${params.toString()}`);
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

  useEffect(() => {
    fetchNotes();
  }, []);

  async function handleCreateNoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      const result = await createNote(formData);
      form.reset();
      if (result) toast.success("Note successfully recorded!");
      setOpenModal(false);
      fetchNotes();
    } catch (err) {
      console.error("Submit error:", err);
    }
  }

  async function handleUpdateNoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const id = Number(form?.dataset.id);

    try {
      const formData = new FormData(form);
      const result = await updateNote(formData, id);
      form.reset();
      if (result) toast.success("Note successfully updated!");
      setOpenModal(false);
      setNotes((prevNotes) => {
        return prevNotes?.map((noteItem) =>
          noteItem?.id === id
            ? {
                ...noteItem,
                title: String(formData?.get("title")),
                note: String(formData?.get("note")),
              }
            : noteItem
        );
      });
    } catch (err) {
      console.error("Submit error:", err);
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
          <CreateForm handleSubmit={handleCreateNoteSubmit} />
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
                <Card className="w-full bg-violet-50 rounded-md p-4 mb-4 break-inside-avoid text-left">
                  <div>
                    <h1 className="text-lg font-semibold mb-2">
                      {noteItem?.title}
                    </h1>
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
                handleSubmit={handleUpdateNoteSubmit}
                fetchNotes={fetchNotes}
                closeModal={() => setOpenModal(false)}
              />
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
}
