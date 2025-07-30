import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { summarizePrompt } from "@/app/api/ai/actions/ai-actions";
import { updateEditorContent } from "@/app/utils/updateEditor";

export default function AIButtons({
  handlePopoverContentChange,
  textEditor,
}: {
  handlePopoverContentChange: (content: string) => void;
  textEditor: Editor | null;
}) {
  async function summarizeTextContent() {
    try {
      if (!textEditor) {
        throw new Error("Text editor is not available");
      }
      handlePopoverContentChange("summarize");
      const content = textEditor.getText();
      const result = await summarizePrompt(content);
      if (!result) {
        throw new Error(
          `No result returned from summarization: ${result.error}`
        );
      }
      updateEditorContent(textEditor, result);
    } catch (error) {
      console.error("Error summarizing text content:", error);
    } finally {
      handlePopoverContentChange("accept");
    }
  }
  return (
    <div className="flex flex-col gap-2 p-1 w-fit">
      <Button
        className="text-left cursor-pointer"
        onClick={() => handlePopoverContentChange("generate")}
      >
        Generate
      </Button>
      <Button
        className="text-left cursor-pointer"
        onClick={summarizeTextContent}
      >
        Summarize
      </Button>
      <Button
        className="text-left cursor-pointer"
        onClick={() => handlePopoverContentChange("accept")}
      >
        Outline
      </Button>
    </div>
  );
}
