"use client";

import { useState, useEffect } from "react";
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
import { LetterText } from "lucide-react";
import toast from "react-hot-toast";

import { EllipsisVertical, CopyPlus, Trash } from "lucide-react";
import { ButtonIcon } from "@/components/utils/ButtonIcon";
import LabelPopover from "./LabelPopover";
import AIPopover from "./AIPopover";

import ColorPopover from "./ColorPopover";
// actions
import { deleteNote } from "@/app/api/note/actions/note-actions";
// types
import { TNote } from "@/app/types/note";
import { TUpdateNote } from "@/app/types/update-note";
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

type UpdateFormProps = {
  noteItem: TNote;
  updateNote: (noteDetails: TUpdateNote) => Promise<void>;
  fetchNotes: () => Promise<void>;
  closeModal: () => void;
  createNote: (noteDetails: TCreateNote) => Promise<void>;
  isUpdateFormOpen: boolean;
};

export default function UpdateForm({
  noteItem,
  updateNote,
  fetchNotes,
  closeModal,
  createNote,
  isUpdateFormOpen,
}: UpdateFormProps) {
  const [selectedLabel, setSelectedLabel] = useState<TLabel | null>({
    id: noteItem?.label_id || 0,
    label_name: noteItem?.label_name || "",
  });
  const [editorDialogOpen, setEditorDialogOpen] = useState(false);
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);

  const editor: Editor | null = useEditor(
    {
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
        <p>${noteItem?.note}</p>
      `,
      editorProps: {
        attributes: {
          class: "outline-none",
        },
      },
    },
    []
  );

  // const updateEditorContent = (newContent: string) => {
  //   if (editor && editor.commands) {
  //     editor.commands.setContent(newContent);
  //   }
  // };

  useEffect(() => {
    if (isUpdateFormOpen && editor) {
      editor.commands.setContent(noteItem?.note || "");
    }
  }, [noteItem, isUpdateFormOpen, editor]);

  function handleEditorDialogOpen() {
    setEditorDialogOpen(!editorDialogOpen);
  }

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
      label_id: selectedLabel?.id || null,
    };

    updateNote(noteDetails);
  }

  return (
    <DialogContent
      className={`sm:max-w-[700px] ${selectedColor} flex items-center flex-col justify-center h-[90%] lg:h-fit pt-15 lg:pt-5 rounded-lg`}
    >
      <DialogTitle className="hidden" />
      <form onSubmit={handleUpdateNoteSubmit} data-id={`${noteItem?.id}`}>
        <Input
          className="h-10 mt-5 block !text-xl"
          placeholder="Title"
          name="title"
          id="title"
          defaultValue={noteItem?.title}
        ></Input>
        <EditorContent
          name="note"
          id="note"
          value={noteItem?.note}
          placeholder="Take your note"
          className="outline-none w-full max-h-150 p-3 !border-black border-1 rounded-md my-2 overflow-y-scroll"
          editor={editor}
        />
        <input type="hidden" name="note" value={editor?.getHTML() || ""} />
        <DialogFooter className="flex justify-between !w-full">
          <div className="flex gap-3 relative">
            {/* text Editor Button */}
            <ButtonIcon
              className="cursor-pointer bg-blue-200"
              onClick={handleEditorDialogOpen}
            >
              <LetterText />
            </ButtonIcon>
            {editorDialogOpen && (
              <TextEditorButtons
                className="absolute bottom-12 left-0 z-50"
                editor={editor}
              />
            )}
            {/* Color and Label Popovers */}
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
                    onClick={(e) => {
                      e.preventDefault();
                      createNote({
                        title: noteItem?.title || "",
                        note: noteItem?.note || "",
                        colorTheme: noteItem?.colortheme || "bg-blue-100",
                        label_id: noteItem?.label_id || null,
                      });
                    }}
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
          <div className="flex items-center gap-3 w-full justify-end">
            <AIPopover textEditor={editor} />
            <Button className="cursor-pointer w-full lg:w-fit" type="submit">
              Save
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
