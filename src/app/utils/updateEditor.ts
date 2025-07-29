import { Editor } from "@tiptap/react";
import { marked } from "marked";

export const updateEditorContent = (
  editor: Editor | null,
  newContent: string
) => {
  const htmlContent = marked.parse(newContent);
  if (editor && editor.commands) {
    editor.commands.setContent(htmlContent);
  }
};
