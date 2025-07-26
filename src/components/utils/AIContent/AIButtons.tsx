import { Button } from "@/components/ui/button";
export default function AIButtons() {
  return (
    <div className="flex flex-col gap-2 p-1 w-fit">
      <Button className="text-left cursor-pointer">Generate</Button>
      <Button className="text-left cursor-pointer">Summarize</Button>
      <Button className="text-left cursor-pointer">Outline</Button>
    </div>
  );
}
