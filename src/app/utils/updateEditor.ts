import { Editor } from "@tiptap/react";
import { marked } from "marked";

export const updateEditorContent = (
  editor: Editor | null,
  newContent: string,
  previousContent: string = ""
) => {
  const textContent = previousContent + newContent;
  const htmlContent = marked.parse(textContent);
  if (editor && editor.commands) {
    editor.commands.setContent(htmlContent);
  }
};
