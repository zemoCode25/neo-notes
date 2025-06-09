"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useEffect } from "react";

// Icons
import { Sparkle } from "lucide-react";
import { LetterText } from "lucide-react";
import { Palette } from "lucide-react";
import { Tag } from "lucide-react";
// utils component
import { createNote, retriveNote } from "@/app/api/note/actions/create";
import toast, { Toaster } from "react-hot-toast";
// type
import { TContent } from "@/app/types/content";

export default function Dashboard() {
  const [notes, setNotes] = useState<TContent[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick(id: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", id.toString());
    router.push(`?${params.toString()}`);
  }

  async function fetchNotes() {
    const result = await retriveNote();
    console.log(result?.notes);
    setNotes(result?.notes);
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
          <DialogContent className="sm:max-w-[700px]">
            <DialogTitle className="hidden" />
            <form onSubmit={handleSubmit}>
              <Input
                className="h-10 mt-5 block !text-xl"
                placeholder="Title"
                name="title"
                id="title"
              ></Input>
              <textarea
                name="note"
                id="note"
                placeholder="Take your note"
                className="outline-none w-full min-h-80 p-3 whitespace-pre border-black border-1 rounded-md my-2"
              ></textarea>
              <DialogFooter className="flex !justify-between !w-full">
                <div className="flex gap-3">
                  <Button className="cursor-pointer bg-blue-200">
                    <LetterText />
                  </Button>
                  <Button className="cursor-pointer bg-blue-200">
                    <Palette />
                  </Button>
                  <Button className="cursor-pointer bg-blue-200">
                    <Tag />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={(e) => e.preventDefault()}
                    className="bg-cyan-100 cursor-pointer"
                  >
                    NeoNotes AI <Sparkle />
                  </Button>
                  <Button className="cursor-pointer" type="submit">
                    Save
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="columns-1 sm:columns-2 md:columns-5 gap-4 my-5">
        {notes.map((note) => (
          <Dialog key={note?.id}>
            <DialogTrigger
              className="cursor-pointer"
              onClick={() => handleClick(1)}
            >
              <Card className="bg-violet-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid text-left">
                <h1 className="text-lg">{note?.title}</h1>
                <p className="whitespace-pre-wrap">{note?.note}</p>
              </Card>
            </DialogTrigger>
            <DialogContent className="whitespace-pre">
              <DialogTitle>{note?.title}</DialogTitle>
              <p className="whitespace-pre-wrap">{note?.note}</p>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
