import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function AIPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-cyan-100 cursor-pointer">
          NeoNotes AI <Sparkle />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-cyan-100 w-fit">
        <div className="flex flex-col gap-2 p-1 w-fit">
          <Button className="text-left cursor-pointer">Summarize</Button>
          <Button className="text-left cursor-pointer">Outline</Button>
          <Button className="text-left cursor-pointer">Generate</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
