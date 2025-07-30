import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { updateEditorContent } from "@/app/utils/updateEditor";

export default function AIAccept({
  closePopover,
  previousContent,
  textEditor,
  handlePopoverContentChange,
}: {
  closePopover: () => void;
  previousContent: string;
  textEditor: Editor | null;
  handlePopoverContentChange: (content: string) => void;
}) {
  function handleDecline() {
    if (textEditor) {
      updateEditorContent(textEditor, previousContent);
    }
    closePopover();
    handlePopoverContentChange("buttons");
  }

  function handleAccept() {
    closePopover();
    handlePopoverContentChange("buttons");
  }

  return (
    <div className="flex flex-col gap-2 p-1 w-fit">
      <Button onClick={handleAccept} className="text-left cursor-pointer">
        Accept
      </Button>
      <Button onClick={handleDecline} className="text-left cursor-pointer">
        Decline
      </Button>
    </div>
  );
}
