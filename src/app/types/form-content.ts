import { TNote } from "@/app/types/content";

export type TFormContentProp = {
  noteItem?: TNote;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};
