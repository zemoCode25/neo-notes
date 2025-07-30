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

  function handlePopoverContentChange(content: string) {
    setPopoverContent(content);
  }

  function closePopover() {
    setIsPopoverOpen(false);
  }

  useEffect(() => {
    if (isPopoverOpen) {
      setPopoverContent("buttons");
    }

    if (textEditor) {
      setPreviousContent(textEditor.getText());
    }
  }, [isPopoverOpen, textEditor]);

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
      />,
    ],
    [
      "generate",
      <AIGenerate
        key="generate"
        handlePopoverContentChange={handlePopoverContentChange}
        textEditor={textEditor}
      />,
    ],
    ["summarize", <GenerateLoading key="summarize" AIAction="Summarizing" />],
    ["outline", <GenerateLoading key="outline" AIAction="Creating Outline" />],
  ]);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-cyan-100 cursor-pointer">
          NeoNotes AI <Sparkle />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-cyan-100 w-fit">
        {componentsMap.get(popoverContent)}
      </PopoverContent>
    </Popover>
  );
}
