import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonIcon } from "@/components/utils/ButtonIcon";
import { colorThemes } from "@/lib/color-theme";
import { Palette } from "lucide-react";
type ColorPopoverProps = {
  selectedColor: string;
  handleColorChange: (colorClass: string) => void;
  colorThemeDialogOpen?: boolean;
  setColorThemeDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ColorPopover({
  selectedColor,
  handleColorChange,
  colorThemeDialogOpen,
  setColorThemeDialogOpen,
}: ColorPopoverProps) {
  return (
    <Popover open={colorThemeDialogOpen} onOpenChange={setColorThemeDialogOpen}>
      <PopoverTrigger asChild>
        <ButtonIcon className={`cursor-pointer ${selectedColor}`}>
          <Palette />
        </ButtonIcon>
      </PopoverTrigger>
      <PopoverContent className="w-fit text-main-foreground flex flex-col gap-2 items-center">
        <div className="grid grid-cols-3 gap-2">
          {colorThemes.map((theme) => (
            <ButtonIcon
              key={theme.colorName}
              className={`w-full justify-center text-sm hover:bg-opacity-80 cursor-pointer ${theme.colorClass}`}
              onClick={(e) => {
                e.preventDefault();
                handleColorChange(theme.colorClass);
              }}
            >
              <span className="text-xs">{theme.colorName}</span>
            </ButtonIcon>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
