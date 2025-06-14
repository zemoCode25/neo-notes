import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TContent } from "@/app/types/note";

export function CardContent({ content }: { content: TContent | null }) {
  return (
    <DialogContent>
      <DialogTitle>{content?.title}</DialogTitle>
      <p>{content?.note}</p>
    </DialogContent>
  );
}
