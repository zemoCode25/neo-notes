import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonIcon } from "@/components/utils/ButtonIcon";
import { Tag } from "lucide-react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

type LabelPopoverProps = {
  label: string;
  setLabel: (label: string) => void;
  labelDialogOpen: boolean;
  setLabelDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const sampleLabels = [
  {
    id: 1,
    label: "Work",
  },
  {
    id: 2,
    label: "Personal",
  },
  {
    id: 3,
    label: "Urgent",
  },
];

export default function LabelPopover({
  label,
  setLabel,
  labelDialogOpen,
  setLabelDialogOpen,
}: LabelPopoverProps) {
  return (
    <Popover open={labelDialogOpen} onOpenChange={setLabelDialogOpen}>
      <PopoverTrigger asChild>
        <ButtonIcon className={`cursor-pointer`}>
          <Tag />
        </ButtonIcon>
      </PopoverTrigger>
      <PopoverContent className="w-fit text-main-foreground flex flex-col gap-2 items-center">
        <div className="flex flex-col gap-2">
          {sampleLabels.map((sampleLabel) => (
            <ButtonIcon
              key={sampleLabel.id}
              onClick={() => setLabel(sampleLabel.label)}
              className={`w-full justify-start text-left text-sm hover:bg-opacity-80 cursor-pointer bg-cyan-50 hover:bg-cyan-100`}
            >
              <span>{sampleLabel.label}</span>
            </ButtonIcon>
          ))}
          <div className="flex items-center gap-2">
            <Input placeholder="Add new label" />
            <ButtonIcon>
              <Plus />
            </ButtonIcon>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
