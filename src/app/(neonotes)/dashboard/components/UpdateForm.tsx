"use client";

import { useState } from "react";
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
import { Tag } from "lucide-react";
import toast from "react-hot-toast";

import { EllipsisVertical, CopyPlus, Trash } from "lucide-react";
import { ButtonIcon } from "@/components/utils/ButtonIcon";

import ColorPopover from "./ColorPopover";
// actions
import { deleteNote } from "@/app/api/note/actions/note-actions";
// types
import { TNote } from "@/app/types/note";
import { TUpdateNote } from "@/app/types/update-note";

type UpdateFormProps = {
  noteItem: TNote;
  updateNote: (noteDetails: TUpdateNote) => Promise<void>;
  fetchNotes: () => Promise<void>;
  closeModal: () => void;
};

export default function UpdateForm({
  noteItem,
  updateNote,
  fetchNotes,
  closeModal,
}: UpdateFormProps) {
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

  const [selectedColor, setSelectedColor] = useState<string>(
    `${noteItem?.colortheme || "bg-blue-100"}`
  );
  const [colorThemeDialogOpen, setColorThemeDialogOpen] = useState(false);

  function handleColorChange(colorClass: string) {
    setSelectedColor(colorClass);
    setColorThemeDialogOpen(false);
  }

  function handleUpdateNoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form) {
      console.error("Form is not defined");
      return;
    }
    const formData = new FormData(form);
    const title = formData.get("title");
    const note = formData.get("note");
    const noteDetails = {
      id: noteItem?.id,
      title: title ? String(title) : "",
      note: note ? String(note) : "",
      colortheme: selectedColor,
    };

    updateNote(noteDetails);
  }

  return (
    <DialogContent className={`sm:max-w-[700px] ${selectedColor}`}>
      <DialogTitle className="hidden" />
      <form onSubmit={handleUpdateNoteSubmit} data-id={`${noteItem?.id}`}>
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
            <ColorPopover
              selectedColor={selectedColor}
              handleColorChange={handleColorChange}
              colorThemeDialogOpen={colorThemeDialogOpen}
              setColorThemeDialogOpen={setColorThemeDialogOpen}
            />
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
