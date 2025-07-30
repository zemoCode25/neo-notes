import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import DOMPurify from "dompurify";
import { TNote } from "@/app/types/note";
import UpdateForm from "./UpdateForm";
import { useState } from "react";
import { TUpdateNote } from "@/app/types/update-note";
import { updateNoteToDB } from "@/app/api/note/actions/note-actions";
import toast from "react-hot-toast";
import { TCreateNote } from "@/app/types/create-note";

export default function NoteDialog({
  updateNoteState,
  noteItem,
  fetchNotes,
  createNote,
}: {
  updateNoteState: (noteDetails: TNote) => void;
  noteItem: TNote;
  fetchNotes: () => Promise<void>;
  createNote: (noteDetails: TCreateNote) => Promise<void>;
}) {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  // Update the UI upon note update
  async function updateNote(noteDetails: TUpdateNote) {
    try {
      const result = await updateNoteToDB(noteDetails);
      if (result) {
        toast.success("Note successfully updated!");
      }
      setIsUpdateFormOpen(false);
      updateNoteState(noteDetails);
      fetchNotes();
    } catch (err) {
      console.error("Submit error:", err);
    }
  }

  return (
    <Dialog
      key={noteItem?.id}
      open={isUpdateFormOpen}
      onOpenChange={setIsUpdateFormOpen}
    >
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
            <p
              className="whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  (noteItem?.note?.length || 0) > 400
                    ? (noteItem?.note?.slice(0, 400) ?? "") + "..."
                    : noteItem?.note ?? ""
                ),
              }}
            />
          </div>
        </Card>
      </DialogTrigger>
      <UpdateForm
        noteItem={noteItem}
        updateNote={updateNote}
        fetchNotes={fetchNotes}
        closeModal={() => setIsUpdateFormOpen(false)}
        isUpdateFormOpen={isUpdateFormOpen}
        createNote={createNote}
      />
    </Dialog>
  );
}
