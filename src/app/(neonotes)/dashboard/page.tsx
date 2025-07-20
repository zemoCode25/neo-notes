import React from "react";

export const dynamic = "force-dynamic";

import { retriveNote } from "@/app/api/note/actions/note-actions";
import NoteClient from "./components/NoteClient";

export default async function Dashboard() {
  const notes = await retriveNote();
  return <NoteClient notesList={notes} />;
}
