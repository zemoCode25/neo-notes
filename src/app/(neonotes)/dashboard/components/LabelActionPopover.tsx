import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonIcon } from "@/components/utils/ButtonIcon";
import { EllipsisVertical } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Delete } from "lucide-react";

type LabelActionPopoverProps = {
  selectedLabel?: number | null;
};

export default function LabelActionPopover({
  selectedLabel,
}: LabelActionPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonIcon className={`cursor-pointer flex items-center gap-2`}>
          <EllipsisVertical className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </ButtonIcon>
      </PopoverTrigger>
      <PopoverContent className="w-fit text-main-foreground flex flex-col gap-2 items-center bg-blue-200">
        <div className="flex flex-col gap-2">
          <ButtonIcon className="bg-blue-100 cursor-pointer">
            <SquarePen />
            Update
          </ButtonIcon>
          <ButtonIcon className="bg-red-400 cursor-pointer">
            {" "}
            <Delete /> Delete
          </ButtonIcon>
        </div>
      </PopoverContent>
    </Popover>
  );
}
