import { Button } from "@/components/ui/button";
export default function AIButtons({
  handlePopoverContentChange,
}: {
  handlePopoverContentChange: (content: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 p-1 w-fit">
      <Button
        className="text-left cursor-pointer"
        onClick={() => handlePopoverContentChange("generate")}
      >
        Generate
      </Button>
      <Button
        className="text-left cursor-pointer"
        onClick={() => handlePopoverContentChange("accept")}
      >
        Summarize
      </Button>
      <Button
        className="text-left cursor-pointer"
        onClick={() => handlePopoverContentChange("accept")}
      >
        Outline
      </Button>
    </div>
  );
}
