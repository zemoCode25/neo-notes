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
import { Palette } from "lucide-react";
import { Tag } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Utils
import { ButtonIcon } from "@/components/utils/ButtonIcon";
import { Button } from "@/components/ui/button";
import { TColorTheme } from "@/app/types/color-theme";
import toast, { Toaster } from "react-hot-toast";

import { createNote } from "@/app/api/note/actions/note-actions";

type CreateFormProp = {
  closeModal: () => void;
  fetchNotes: () => Promise<void>;
};

export default function CreateForm({ closeModal, fetchNotes }: CreateFormProp) {
  const [selectedColor, setSelectedColor] = useState<string>("bg-red-100");
  const [colorThemeDialogOpen, setColorThemeDialogOpen] = useState(false);
  const colorThemes: TColorTheme[] = [
    {
      colorName: "red",
      colorClass: "bg-red-100",
    },
    {
      colorName: "green",
      colorClass: "bg-green-100",
    },
    {
      colorName: "blue",
      colorClass: "bg-blue-100",
    },
    {
      colorName: "yellow",
      colorClass: "bg-yellow-100",
    },
    {
      colorName: "purple",
      colorClass: "bg-purple-100",
    },
    {
      colorName: "orange",
      colorClass: "bg-orange-100",
    },
    {
      colorName: "pink",
      colorClass: "bg-pink-100",
    },
    {
      colorName: "cyan",
      colorClass: "bg-cyan-100",
    },
    {
      colorName: "white",
      colorClass: "bg-white",
    },
  ];

  function handleColorChange(colorClass: string) {
    setSelectedColor(colorClass);
    setColorThemeDialogOpen(false);
  }

  async function handleCreateNoteSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    try {
      const result = await createNote(noteDetails);
      form.reset();
      if (result) toast.success("Note successfully recorded!");
      closeModal();
      fetchNotes();
    } catch (err) {
      console.error("Submit error:", err);
    }
  }

  return (
    <DialogContent className="sm:max-w-[700px]">
      <Toaster position="bottom-right" />
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
            <Popover
              open={colorThemeDialogOpen}
              onOpenChange={setColorThemeDialogOpen}
            >
              <PopoverTrigger asChild>
                <ButtonIcon className={`cursor-pointer ${selectedColor}`}>
                  <Palette />
                </ButtonIcon>
              </PopoverTrigger>
              <PopoverContent className="w-fit text-main-foreground flex flex-col gap-2 items-center">
                <div className="grid grid-cols-3 gap-2">
                  {colorThemes.map((theme) => (
                    <ButtonIcon
                      key={theme.colorName}
                      className={`w-full justify-center text-sm hover:bg-opacity-80 cursor-pointer ${theme.colorClass}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleColorChange(theme.colorClass);
                      }}
                    >
                      <span className="text-xs">{theme.colorName}</span>
                    </ButtonIcon>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <ButtonIcon className="cursor-pointer bg-blue-200">
              <Tag />
            </ButtonIcon>
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
