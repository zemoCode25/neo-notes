"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";

// AI components
import AIButtons from "@/components/utils/AIContent/AIButtons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function AIPopover() {
  const [popoverContent, setPopoverContent] = useState<string>("buttons");

  const componentsMap = new Map([
    ["buttons", <AIButtons key="buttons" />],
    ["b", <ComponentB key="b" />],
    ["c", <ComponentC key="c" />],
  ]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-cyan-100 cursor-pointer">
          NeoNotes AI <Sparkle />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-cyan-100 w-fit">
        <div className="flex flex-col gap-2 p-1 w-fit">
          <Button className="text-left cursor-pointer">Generate</Button>
          <Button className="text-left cursor-pointer">Summarize</Button>
          <Button className="text-left cursor-pointer">Outline</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
