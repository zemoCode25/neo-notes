import { Button } from "@/components/ui/button";
import Spinner from "../Spinner";
import { submitPrompt } from "@/app/api/ai/actions/ai-actions";
import { useState } from "react";
import { Editor } from "@tiptap/react";
import { updateEditorContent } from "@/app/utils/updateEditor";

export default function AIGenerate({
  handlePopoverContentChange,
  textEditor,
}: {
  handlePopoverContentChange?: (content: string) => void;
  textEditor: Editor | null;
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    if (!form) {
      console.error("Form is not defined");
      return;
    }

    const formData = new FormData(form);
    const prompt = formData.get("prompt");

    try {
      if (!prompt) {
        console.error("Prompt is required");
        return;
      }

      setIsGenerating(true);
      const result = await submitPrompt(prompt ? String(prompt) : "");
      console.log("Generated content:", result);

      if (textEditor && result) {
        updateEditorContent(textEditor, result);
      }

      if (result && handlePopoverContentChange) {
        handlePopoverContentChange("accept");
      }
    } catch (error) {
      console.error("Error processing prompt:", error);
      return;
    } finally {
      setIsGenerating(false);
    }
  }

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center">
        <span>Generating</span>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          name="prompt"
          id="prompt"
          placeholder="Enter your prompt here..."
          required
        />
        <Button className="mt-2 bg-cyan-100 cursor-pointer">Generate</Button>
      </form>
    </div>
  );
}
