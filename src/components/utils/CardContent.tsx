import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TContent } from "@/app/types/content";

export function CardContent({ content }: { content: TContent | null }) {
  return (
    <DialogContent>
      <DialogTitle>{content?.title}</DialogTitle>
      <p>{content?.note}</p>
    </DialogContent>
  );
}
