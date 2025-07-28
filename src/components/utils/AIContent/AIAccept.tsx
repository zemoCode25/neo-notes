import { Button } from "@/components/ui/button";

export default function AIAccept({
  closePopover,
}: {
  closePopover: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 p-1 w-fit">
      <Button onClick={closePopover} className="text-left cursor-pointer">
        Accept
      </Button>
      <Button onClick={closePopover} className="text-left cursor-pointer">
        Decline
      </Button>
    </div>
  );
}
