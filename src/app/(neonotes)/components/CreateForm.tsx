"use client";
import { useState } from "react";
import {
  DialogFooter,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LetterText } from "lucide-react";
import Spinner from "@/components/utils/Spinner";
import AIPopover from "./AIPopover";

// Utils
import { ButtonIcon } from "@/components/utils/ButtonIcon";
import { Button } from "@/components/ui/button";
import ColorPopover from "./ColorPopover";
import LabelPopover from "./LabelPopover";
// Types
import { TCreateNote } from "@/app/types/create-note";
import { TLabel } from "@/app/types/label/label";
// tiptap
import { Editor, useEditor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import TextEditorButtons from "./TextEditorButtons";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

type CreateFormProp = {
  closeModal: () => void;
  fetchNotes: () => Promise<void>;
  createNote: (noteDetails: TCreateNote) => Promise<void>;
};

export default function CreateForm({ createNote }: CreateFormProp) {
  const [selectedColor, setSelectedColor] = useState<string>("bg-blue-100");
  const [colorThemeDialogOpen, setColorThemeDialogOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<TLabel | null>(null);
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [editorDialogOpen, setEditorDialogOpen] = useState(false);

  const editor: Editor | null = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Italic,
      Bold,
      Underline,
      Heading.configure({
        levels: [1, 2],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-2",
        },
      }),
      ListItem,
    ],
    content: `
          <p></p>
        `,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  function handleEditorDialogOpen() {
    setEditorDialogOpen(!editorDialogOpen);
  }

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
    console.log(title, note, "title and note from formData");

    const noteDetails = {
      title: title ? String(title) : "",
      note: note ? String(note) : "",
      colorTheme: selectedColor,
      label_id: selectedLabel ? selectedLabel.id : null,
    };

    createNote(noteDetails);
  }

  return (
    <DialogContent className={`sm:max-w-[700px] ${selectedColor}`}>
      <DialogTitle className="hidden" />
      <form onSubmit={handleCreateNoteSubmit}>
        <Input
          className="h-10 mt-5 block !text-xl"
          placeholder="Title"
          name="title"
          id="title"
        ></Input>
        <EditorContent
          id="note"
          placeholder="Take your note"
          className="outline-none w-full h-150 p-3 border-black border-1 rounded-md my-2"
          editor={editor}
        />
        <input type="hidden" name="note" value={editor?.getHTML() || ""} />
        <DialogFooter className="flex !justify-between !w-full">
          <div className="flex gap-3">
            <ButtonIcon
              onClick={handleEditorDialogOpen}
              className="cursor-pointer bg-blue-200"
            >
              <LetterText />
            </ButtonIcon>
            {editorDialogOpen && (
              <TextEditorButtons
                className="absolute bottom-12 left-0 z-50"
                editor={editor}
              />
            )}
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
            <AIPopover />
            <Button className="cursor-pointer" type="submit">
              <Spinner />
              Save
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
