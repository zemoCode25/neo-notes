"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useContext } from "react";

import { ButtonIcon } from "@/components/utils/ButtonIcon";
import { EllipsisVertical } from "lucide-react";
import { X } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input";
import AlertDelete from "./AlertDelete";

// types
import { TLabel } from "@/app/types/label/label";
// actions
import { deleteLabelToDB } from "@/app/api/label/actions/label-actions";
import { updateLabelToDB } from "@/app/api/label/actions/label-actions";
import { Button } from "@/components/ui/button";
// context
import { LabelContext } from "@/contexts/LabelContextProvider";

type LabelActionPopoverProps = {
  selectedLabel?: TLabel | null;
};

export default function LabelActionPopover({
  selectedLabel,
}: LabelActionPopoverProps) {
  const [isInputRendered, setIsInputRendered] = useState(false);
  const [actionPopoverOpen, setActionPopoverOpen] = useState(false);
  const { setLabels } = useContext(LabelContext);

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

  async function updateLabel(updateDetails: TLabel) {
    try {
      const result = await updateLabelToDB(updateDetails);
      console.log(result?.error);
      if (!result.success) {
        throw new Error("Failed to update label");
      }
      setLabels((prevLabels) =>
        prevLabels?.map((label) =>
          label?.id === selectedLabel?.id ? updateDetails : label
        )
      );
      setActionPopoverOpen(false);
    } catch (error) {
      console.error("Error updating label:", error);
    }
  }

  function handleUpdateLabelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation(); // Prevent default form submission behavior

    const form = e.currentTarget;
    const formData = new FormData(form);

    const labelDetails: TLabel = {
      id: selectedLabel?.id || 0,
      label_name: formData.get("labelName") as string,
    };

    updateLabel(labelDetails);
  }

  return (
    <Popover open={actionPopoverOpen} onOpenChange={setActionPopoverOpen}>
      <PopoverTrigger asChild>
        <ButtonIcon className={`cursor-pointer flex items-center gap-2`}>
          <EllipsisVertical className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </ButtonIcon>
      </PopoverTrigger>
      <PopoverContent className="w-fit text-main-foreground flex flex-col gap-2 items-center bg-blue-200">
        <div className="flex flex-col gap-2">
          {isInputRendered ? (
            <div className="flex items-center gap-2 bg-blue-200 w-full">
              <form
                onSubmit={handleUpdateLabelSubmit}
                className="w-full flex items-center gap-2"
              >
                <Input
                  className="w-full"
                  placeholder="Enter new label name"
                  name="labelName"
                />
                <Button type="submit" className="cursor-pointer">
                  <SquarePen />
                </Button>
              </form>
              <ButtonIcon
                className="bg-transparent cursor-pointer"
                onClick={() => setIsInputRendered(false)}
              >
                <X />
              </ButtonIcon>
            </div>
          ) : (
            <ButtonIcon
              onClick={() => setIsInputRendered(true)}
              className="cursor-pointer"
            >
              <SquarePen />
              <p>Update</p>
            </ButtonIcon>
          )}
          <AlertDelete
            deleteLabel={() => deleteLabel(selectedLabel?.id || 0)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
