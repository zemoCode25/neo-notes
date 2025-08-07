"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";

import { Editor } from "@tiptap/react";

// AI components
import AIButtons from "@/components/utils/AIContent/AIButtons";
import AIAccept from "@/components/utils/AIContent/AIAccept";
import AIGenerate from "@/components/utils/AIContent/AIGenerate";
import GenerateLoading from "@/components/utils/AIContent/GenerateLoading";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { updateEditorContent } from "@/app/utils/updateEditor";
export default function AIPopover({
  textEditor,
}: {
  textEditor: Editor | null;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverContent, setPopoverContent] = useState<string>("buttons");
  const [previousContent, setPreviousContent] = useState<string>("");

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      console.log("Popover closed");
      // ✅ Add your custom logic here
    }
    setIsPopoverOpen(isOpen);
  };

  function handlePopoverContentChange(content: string) {
    setPopoverContent(content);
  }

  function closePopover() {
    setIsPopoverOpen(false);
  }

  useEffect(() => {
    if (!isPopoverOpen && popoverContent === "generate") {
      setPopoverContent("buttons");
    }

    if (textEditor) {
      setPreviousContent(textEditor.getText());
    }
  }, [isPopoverOpen, textEditor, popoverContent]);

  const componentsMap = new Map([
    [
      "buttons",
      <AIButtons
        key="buttons"
        handlePopoverContentChange={handlePopoverContentChange}
        textEditor={textEditor}
      />,
    ],
    [
      "accept",
      <AIAccept
        key="accept"
        closePopover={closePopover}
        previousContent={previousContent}
        textEditor={textEditor}
        handlePopoverContentChange={handlePopoverContentChange}
      />,
    ],
    [
      "generate",
      <AIGenerate
        key="generate"
        handlePopoverContentChange={handlePopoverContentChange}
        textEditor={textEditor}
        previousContent={previousContent}
      />,
    ],
    ["summarize", <GenerateLoading key="summarize" AIAction="Summarizing" />],
    ["outline", <GenerateLoading key="outline" AIAction="Creating Outline" />],
  ]);

  return (
    <Popover open={isPopoverOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button className="bg-cyan-100 cursor-pointer w-full lg:w-fit">
          NeoNotes AI <Sparkle />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-cyan-100 w-fit">
        {componentsMap.get(popoverContent)}
      </PopoverContent>
    </Popover>
  );
}
