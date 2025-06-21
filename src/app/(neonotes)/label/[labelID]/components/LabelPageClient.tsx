"use client";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import SearchCreate from "@/app/(neonotes)/components/SearchCreate";
import {
  createNoteToDB,
  updateNoteToDB,
} from "@/app/api/note/actions/note-actions";
import { TCreateNote } from "@/app/types/create-note";
import { TNote } from "@/app/types/note";
import { TUpdateNote } from "@/app/types/update-note";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import UpdateForm from "@/app/(neonotes)/components/UpdateForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Toaster } from "react-hot-toast";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

//actions
import { retriveNoteByLabel } from "@/app/api/note/actions/note-actions";

export function LabelPageClient({ labelID }: { labelID: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [labelNotes, setLabelNotes] = useState<TNote[]>([]);

  function updateNoteState(noteDetails: TNote) {
    setLabelNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteDetails.id ? { ...note, ...noteDetails } : note
      )
    );
  }

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold],
    content: `
        <p>This isn’t bold.</p>
        <p><strong>This is bold.</strong></p>
        <p><b>And this.</b></p>
        <p style="font-weight: bold">This as well.</p>
        <p style="font-weight: bolder">Oh, and this!</p>
        <p style="font-weight: 500">Cool, isn’t it!?</p>
        <p style="font-weight: 999">Up to font weight 999!!!</p>
      `,
  });

  const fetchNotes = useCallback(async () => {
    try {
      const result = await retriveNoteByLabel(Number(labelID));
      console.log(result, "result from label page");
      setLabelNotes(result?.notes);
    } catch (error) {
      throw Error(`${error}`);
    } finally {
      setLoading(false);
    }
  }, [labelID]);

  useEffect(() => {
    setLoading(true);
    fetchNotes();
  }, [fetchNotes]);

  async function createNote(noteDetails: TCreateNote) {
    try {
      const result = await createNoteToDB(noteDetails);
      if (!result) {
        throw new Error("Failed to create note");
      }
      toast.success("Note created successfully!");
      setOpenModal(false);
      fetchNotes();
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note.");
    }
  }

  async function updateNote(noteDetails: TUpdateNote) {
    try {
      const result = await updateNoteToDB(noteDetails);
      if (result) toast.success("Note successfully updated!");
      setOpenModal(false);
      updateNoteState(noteDetails);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <SearchCreate
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchNotes={fetchNotes}
        createNote={createNote}
      />
      {loading ? (
        <div className="columns-1 sm:columns-2 md:columns-5 gap-4 my-5 w-full h-full">
          {[...Array(5)].map((_, idx) => (
            <Skeleton key={idx} className="h-90 rounded-xl" />
          ))}
        </div>
      ) : (
        <div
          className={`columns-1 sm:columns-2 md:columns-5 w-full gap-4 my-5 ${
            labelNotes.length === 0
              ? "flex items-center justify-center w-full"
              : ""
          }`}
        >
          {labelNotes.length === 0 && (
            <div className="text-center text-gray-500">No notes available.</div>
          )}
          {labelNotes.map((noteItem) => (
            <Dialog key={noteItem?.id}>
              <DialogTrigger className="cursor-pointer w-full">
                <Card
                  className={`w-full rounded-md p-4 mb-4 break-inside-avoid text-left ${
                    noteItem?.colortheme || "bg-violet-100"
                  }`}
                >
                  <div>
                    <h1 className="text-lg font-semibold">{noteItem?.title}</h1>
                    {noteItem?.label_name && (
                      <p className="text-sm border border-black px-2 py-1 rounded-md mb-2 w-fit">
                        {noteItem?.label_name}
                      </p>
                    )}
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
                updateNote={updateNote}
                fetchNotes={fetchNotes}
                closeModal={() => setOpenModal(false)}
                createNote={createNote}
              />
            </Dialog>
          ))}
        </div>
      )}
      <div className="control-group">
        <div className="button-group">
          <button
            onClick={() => {
              editor?.chain().focus().toggleBold().run();
              console.log("TANGINA PLSS");
            }}
            className={editor?.isActive("bold") ? "is-active" : ""}
          >
            Toggle bold
          </button>
          <button
            onClick={() => editor?.chain().focus().setBold().run()}
            disabled={editor?.isActive("bold")}
          >
            Set bold
          </button>
          <button
            onClick={() => editor?.chain().focus().unsetBold().run()}
            disabled={!editor?.isActive("bold")}
          >
            Unset bold
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
