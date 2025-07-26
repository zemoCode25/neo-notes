import { Button } from "@/components/ui/button";

export default function AIAccept() {
  return (
    <div className="flex flex-col gap-2 p-1 w-fit">
      <Button className="text-left cursor-pointer">Accept</Button>
      <Button className="text-left cursor-pointer">Decline</Button>
    </div>
  );
}
