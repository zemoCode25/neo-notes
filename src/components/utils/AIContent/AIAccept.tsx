import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { updateEditorContent } from "@/app/utils/updateEditor";

export default function AIAccept({
  closePopover,
  previousContent,
  textEditor,
}: {
  closePopover: () => void;
  previousContent: string;
  textEditor: Editor | null;
}) {
  function handleDecline() {
    if (textEditor) {
      updateEditorContent(textEditor, previousContent);
    }
    closePopover();
  }

  return (
    <div className="flex flex-col gap-2 p-1 w-fit">
      <Button onClick={closePopover} className="text-left cursor-pointer">
        Accept
      </Button>
      <Button onClick={handleDecline} className="text-left cursor-pointer">
        Decline
      </Button>
    </div>
  );
}
