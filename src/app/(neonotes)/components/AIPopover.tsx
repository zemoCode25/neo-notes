"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";

// AI components
import AIButtons from "@/components/utils/AIContent/AIButtons";
import AIAccept from "@/components/utils/AIContent/AIAccept";
import AIGenerate from "@/components/utils/AIContent/AIGenerate";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function AIPopover() {
  const [popoverContent, setPopoverContent] = useState<string>("buttons");

  const componentsMap = new Map([
    ["buttons", <AIButtons key="buttons" />],
    ["accept", <AIAccept key="accept" />],
    ["generate", <AIGenerate key="generate" />],
  ]);
  return (
    <Popover>
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
