import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateForm from "./CreateForm";
import { Button } from "@/components/ui/button";
import React from "react";
import { TCreateNote } from "@/app/types/create-note";

type SearchCreateProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchNotes: () => Promise<void>;
  createNote: (noteDetails: TCreateNote) => Promise<void>;
};

export default function SearchCreate({
  openModal,
  setOpenModal,
  fetchNotes,
  createNote,
}: SearchCreateProps) {
  return (
    <div className="w-full flex items-center justify-center gap-5">
      <form action="" className="w-[60%] max-w-[400px]">
        <Input placeholder="Search..."></Input>
      </form>
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
  );
}
