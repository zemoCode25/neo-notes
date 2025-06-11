"use client";

// UI
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// React
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// Actions
import { createNote, retriveNote } from "@/app/api/note/actions/create";
// Utils component
import FormContent from "./components/FormContent";
// type
import { TNote } from "@/app/types/content";

export default function Dashboard() {
  const [notes, setNotes] = useState<TNote[]>([]);
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

  return (
    <div>
      <div className="w-full flex items-center justify-center gap-5">
        <Toaster position="bottom-right" reverseOrder={false} />
        <Input className="w-1/4" placeholder="Search..."></Input>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="cursor">Take Note</Button>
          </DialogTrigger>
          <FormContent handleSubmit={handleSubmit} />
          <form action="" onSubmit={handleSubmit}></form>
        </Dialog>
      </div>

      {loading ? (
        <div className="columns-1 sm:columns-2 md:columns-5 gap-4 my-5 w-full">
          <Skeleton className="h-90 rounded-xl" />
          <Skeleton className="h-90 rounded-xl" />
          <Skeleton className="h-90 rounded-xl" />
          <Skeleton className="h-90 rounded-xl" />
          <Skeleton className="h-90 rounded-xl" />
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-5 w-full gap-4 my-5">
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
              <DialogContent className="p-6 max-h-170 overflow-y-scroll">
                <DialogTitle>{noteItem?.title}</DialogTitle>
                <p className="whitespace-pre-wrap">{noteItem?.note}</p>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
}
