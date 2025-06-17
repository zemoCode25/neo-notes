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
import { TLabel } from "@/app/types/label/label";
import { Button } from "@/components/ui/button";

type LabelPopoverProps = {
  selectedLabel?: number | null;
  setSelectedLabel: React.Dispatch<React.SetStateAction<number | null>>;
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
    <Popover open={labelDialogOpen} onOpenChange={setLabelDialogOpen}>
      <PopoverTrigger asChild>
        <ButtonIcon className={`cursor-pointer flex items-center gap-2`}>
          <Tag />
          <span
            className={`${
              findLabelById(selectedLabel || null)?.label_name
                ? "flex"
                : "hidden"
            } text-sm`}
          >
            {findLabelById(selectedLabel || null)?.label_name}
          </span>
        </ButtonIcon>
      </PopoverTrigger>
      <PopoverContent className="w-fit text-main-foreground flex flex-col gap-2 items-center">
        <div className="flex flex-col gap-2">
          {labels?.map((label) => (
            <ButtonIcon
              key={label.id}
              onClick={() => setSelectedLabel(label.id || null)}
              className={`w-full justify-start text-left text-sm hover:bg-opacity-80 cursor-pointer bg-cyan-50 hover:bg-cyan-100 ${
                selectedLabel === label.id ? "bg-cyan-200" : ""
              }`}
            >
              <span>{label.label_name}</span>
            </ButtonIcon>
          ))}
          <div key={Date.now()} className="flex items-center gap-2">
            <form
              onSubmit={handleLabelCreateSubmit}
              className="flex items-center w-full"
            >
              <Input
                placeholder="Add new label"
                name="labelName"
                id="labelName"
              />
              <Button type="submit" className="ml-2">
                <Plus />
              </Button>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
