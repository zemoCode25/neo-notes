import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonIcon } from "@/components/utils/ButtonIcon";
import { Tag } from "lucide-react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

// actions
import { retriveAllLabels } from "@/app/api/label/actions/label-actions";
import { createLabelToDB } from "@/app/api/label/actions/label-actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// utils
import LabelActionPopover from "./LabelActionPopover";

//types
import { TLabel } from "@/app/types/label/label";

type LabelPopoverProps = {
  selectedLabel?: TLabel | null;
  setSelectedLabel: React.Dispatch<React.SetStateAction<TLabel | null>>;
  labelDialogOpen: boolean;
  setLabelDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LabelPopover({
  selectedLabel,
  setSelectedLabel,
  labelDialogOpen,
  setLabelDialogOpen,
}: LabelPopoverProps) {
  const [labels, setLabels] = useState<TLabel[] | undefined>(undefined);

  async function fetchLabels() {
    try {
      const result = await retriveAllLabels();
      setLabels(result.labels);
      console.log(result);
      console.log("Fetched labels:", result);
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  }

  async function createLabel(labelName: string) {
    try {
      const result = await createLabelToDB({ label_name: labelName });
      setLabels((prevLabels) => [...(prevLabels || []), result.label]);
    } catch (error) {
      console.error("Error creating label:", error);
    }
  }

  function handleLabelCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    // Prevent default form submission behavior

    const form = e.currentTarget;
    if (!form) {
      console.error("Form is not defined");
      return;
    }

    const formData = new FormData(form);
    const labelName = formData.get("labelName");

    if (
      !labelName ||
      typeof labelName !== "string" ||
      labelName.trim() === ""
    ) {
      console.error("Label name is required");
      return;
    }

    createLabel(labelName);
    form.reset(); // Reset the form after submission
  }

  // Fetch labels when the component mounts
  useEffect(() => {
    fetchLabels();
  }, []);

  function findLabelById(id: number | null) {
    return labels?.find((label) => label.id === id);
  }
  return (
    <Popover
      modal={true}
      open={labelDialogOpen}
      onOpenChange={setLabelDialogOpen}
    >
      <PopoverTrigger asChild>
        <ButtonIcon
          className={`cursor-pointer flex items-center gap-2 bg-blue-200`}
        >
          <Tag />
          <span
            className={`${
              findLabelById(selectedLabel?.id || null)?.label_name
                ? "flex"
                : "hidden"
            } text-sm`}
          >
            {findLabelById(selectedLabel?.id || null)?.label_name}
          </span>
        </ButtonIcon>
      </PopoverTrigger>
      <PopoverContent className="w-fit text-main-foreground flex flex-col gap-2 items-center bg-blue-200">
        <div className="flex flex-col gap-2">
          <ScrollArea className="h-[300px] flex flex-col gap-20 text-main-foreground border-2 border-border shadow-shadow py-4 px-3 bg-blue-200">
            {labels?.map((label) => (
              <div
                className="w-full flex items-center gap-2 pb-2 px-2"
                key={label?.id}
              >
                <ButtonIcon
                  key={label?.id}
                  onClick={() => setSelectedLabel(label || null)}
                  className={`w-full justify-start text-left text-sm hover:bg-opacity-80 cursor-pointer bg-blue-50 hover:bg-blue-100 ${
                    selectedLabel?.id === label.id ? "bg-blue-200" : ""
                  }`}
                >
                  <span>{label?.label_name}</span>
                </ButtonIcon>
                <LabelActionPopover
                  selectedLabel={label}
                  setLabels={setLabels}
                />
              </div>
            ))}
          </ScrollArea>
          <div key={Date.now()} className="flex items-center gap-2 bg-blue-200">
            <form
              onSubmit={handleLabelCreateSubmit}
              className="flex items-center w-full"
            >
              <Input
                placeholder="Add new label"
                name="labelName"
                id="labelName"
                required
              />
              <Button type="submit" className="ml-2 cursor-pointer">
                <Plus />
              </Button>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
