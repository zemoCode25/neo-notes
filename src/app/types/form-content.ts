import { TNote } from "@/app/types/note";

export type TFormContentProp = {
  noteItem?: TNote;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  fetchNotes: () => Promise<void>;
  closeModal: () => void;
};
