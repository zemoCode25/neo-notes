"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

import { ButtonIcon } from "@/components/utils/ButtonIcon";
import { EllipsisVertical } from "lucide-react";
import { X } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Delete } from "lucide-react";
import { Input } from "@/components/ui/input";

// types
import { TLabel } from "@/app/types/label/label";
// actions
import { deleteLabelToDB } from "@/app/api/label/actions/label-actions";

type LabelActionPopoverProps = {
  setLabels: React.Dispatch<React.SetStateAction<TLabel[] | undefined>>;
  selectedLabel?: number | null;
};

export default function LabelActionPopover({
  selectedLabel,
  setLabels,
}: LabelActionPopoverProps) {
  const [isInputRendered, setIsInputRendered] = useState(false);

  async function deleteLabel(id: number) {
    try {
      const result = await deleteLabelToDB(id);
      if (!result.success) {
        throw new Error("Failed to delete label");
      }
      setLabels((prevLabels) =>
        prevLabels?.filter((label) => label?.id !== id)
      );
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  }

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
          {isInputRendered ? (
            <div className="flex items-center gap-2 bg-blue-200">
              <Input
                className="w-full"
                placeholder="Enter new label name"
                onBlur={() => setIsInputRendered(false)}
              />
              <ButtonIcon
                className="bg-blue-100 cursor-pointer"
                onClick={() => setIsInputRendered(false)}
              >
                <X />
              </ButtonIcon>
            </div>
          ) : (
            <ButtonIcon
              onClick={() => setIsInputRendered(true)}
              className="bg-blue-100 cursor-pointer"
            >
              <SquarePen />
              <p>Update</p>
            </ButtonIcon>
          )}
          <ButtonIcon className="bg-red-400 cursor-pointer">
            {" "}
            <Delete /> Delete
          </ButtonIcon>
        </div>
      </PopoverContent>
    </Popover>
  );
}
