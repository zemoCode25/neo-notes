import { Card } from "@/components/ui/card";
// import Document from "@tiptap/extension-document";
// import Italic from "@tiptap/extension-italic";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import { useEditor } from "@tiptap/react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Italic } from "lucide-react";
import { Bold } from "lucide-react";
import { Underline } from "lucide-react";
import { Heading1 } from "lucide-react";
import { Heading2 } from "lucide-react";

type TextEditorButtonsProps = {
  editor: Editor | null;
  className?: string;
};

export default function TextEditorButtons({
  editor,
  className = "",
}: TextEditorButtonsProps) {
  //   setEditor(
  //     useEditor({
  //       extensions: [Document, Paragraph, Text, Italic],
  //       content: `
  //         <p>This isn’t italic.</p>
  //         <p><em>This is italic.</em></p>
  //         <p><i>And this.</i></p>
  //         <p style="font-style: italic">This as well.</p>
  //       `,
  //     })
  //   );

  if (!editor) {
    return null;
  }

  return (
    <Card className={`${className} p-2 bg-blue-200 !rounded-md`}>
      <div className="">
        <div className="flex gap-2 w-fit">
          <Button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={
              editor.isActive("heading", { level: 1 }) ? "bg-violet-500" : ""
            }
          >
            <Heading1 />
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-violet-500" : ""
            }
          >
            <Heading2 />
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
            className={editor.isActive("italic") ? "bg-violet-500" : ""}
          >
            <Italic />
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
            className={editor.isActive("bold") ? "bg-violet-500" : ""}
          >
            <Bold />
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleUnderline().run();
            }}
            className={`${editor.isActive("underline") ? "bg-violet-500" : ""}`}
          >
            <Underline />
          </Button>
        </div>
      </div>
    </Card>
  );
}
