"use client";
import { useState } from "react";
import {
  DialogFooter,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sparkle } from "lucide-react";
import { LetterText } from "lucide-react";

// Utils
import { ButtonIcon } from "@/components/utils/ButtonIcon";
import { Button } from "@/components/ui/button";
import ColorPopover from "./ColorPopover";
import LabelPopover from "./LabelPopover";
// Types
import { TCreateNote } from "@/app/types/create-note";

type CreateFormProp = {
  closeModal: () => void;
  fetchNotes: () => Promise<void>;
  createNote: (noteDetails: TCreateNote) => Promise<void>;
};

export default function CreateForm({ createNote }: CreateFormProp) {
  const [selectedColor, setSelectedColor] = useState<string>("bg-blue-100");
  const [colorThemeDialogOpen, setColorThemeDialogOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<number | null>(null);
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);

  function handleColorChange(colorClass: string) {
    setSelectedColor(colorClass);
    setColorThemeDialogOpen(false);
  }

  function handleCreateNoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form) {
      console.error("Form is not defined");
      return;
    }

    const formData = new FormData(form);
    const title = formData.get("title"); // Get data from form fields
    const note = formData.get("note");

    const noteDetails = {
      title: title ? String(title) : "",
      note: note ? String(note) : "",
      colorTheme: selectedColor,
    };

    createNote(noteDetails);
  }

  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogTitle className="hidden" />
      <form onSubmit={handleCreateNoteSubmit}>
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
            <LabelPopover
              selectedLabel={selectedLabel}
              setSelectedLabel={setSelectedLabel}
              labelDialogOpen={labelDialogOpen}
              setLabelDialogOpen={setLabelDialogOpen}
            />
          </div>
          <div className="flex items-center gap-3">
            <ButtonIcon
              onClick={(e) => e.preventDefault()}
              className="bg-cyan-100 cursor-pointer"
            >
              NeoNotes AI <Sparkle />
            </ButtonIcon>
            <Button className="cursor-pointer" type="submit">
              Save
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
