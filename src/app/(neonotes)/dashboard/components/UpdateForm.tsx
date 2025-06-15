"use client";

import {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sparkle } from "lucide-react";
import { LetterText } from "lucide-react";
import { Palette } from "lucide-react";
import { Tag } from "lucide-react";
import toast from "react-hot-toast";

import { EllipsisVertical, CopyPlus, Trash } from "lucide-react";
import { ButtonIcon } from "@/components/utils/ButtonIcon";

import { TFormContentProp } from "@/app/types/form-content";
// actions
import { deleteNote } from "@/app/api/note/actions/note-actions";

export default function UpdateForm({
  noteItem,
  handleSubmit,
  fetchNotes,
  closeModal,
}: TFormContentProp) {
  async function handleDeleteNote(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      if (!noteItem?.id) {
        toast.error("Note ID is missing");
        throw new Error("Note ID is missing");
      }
      const result = await deleteNote(noteItem?.id);
      if (result?.success) {
        fetchNotes();
        closeModal();
        toast.success("Note deleted successfully");
      } else {
        toast.error("Failed to delete note");
      }
    } catch (error) {
      toast.error(`Error deleting note: ${error}`);
    }
  }

  return (
    <DialogContent className={`sm:max-w-[700px] ${noteItem?.colortheme}`}>
      <DialogTitle className="hidden" />
      <form onSubmit={handleSubmit} data-id={`${noteItem?.id}`}>
        <Input
          className="h-10 mt-5 block !text-xl"
          placeholder="Title"
          name="title"
          id="title"
          defaultValue={noteItem?.title}
        ></Input>
        <textarea
          name="note"
          id="note"
          defaultValue={noteItem?.note}
          placeholder="Take your note"
          className="outline-none w-full min-h-150 p-3 border-black border-1 rounded-md my-2"
        ></textarea>
        <DialogFooter className="flex !justify-between !w-full">
          <div className="flex gap-3">
            <ButtonIcon className="cursor-pointer bg-blue-200">
              <LetterText />
            </ButtonIcon>
            <ButtonIcon className="cursor-pointer bg-blue-200">
              <Palette />
            </ButtonIcon>
            <ButtonIcon className="cursor-pointer bg-blue-200">
              <Tag />
            </ButtonIcon>
            <Popover>
              <PopoverTrigger asChild>
                <ButtonIcon className="cursor-pointer bg-blue-200">
                  <EllipsisVertical />
                </ButtonIcon>
              </PopoverTrigger>
              <PopoverContent className="w-fit text-main-foreground flex flex-col gap-2 items-center">
                <div className="flex flex-col gap-2">
                  <ButtonIcon
                    className="w-full justify-start text-left text-sm bg-blue-200 hover:bg-blue-300"
                    onClick={(e) => e.preventDefault()}
                  >
                    <CopyPlus />
                    Duplicate Note
                  </ButtonIcon>
                  <ButtonIcon
                    className="w-full justify-start text-left bg-red-400 hover:bg-red-500 text-sm"
                    onClick={handleDeleteNote}
                  >
                    <Trash />
                    Delete Note
                  </ButtonIcon>
                </div>
              </PopoverContent>
            </Popover>
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
  );
}
