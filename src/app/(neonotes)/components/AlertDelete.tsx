import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ButtonIcon } from "@/components/utils/ButtonIcon";
import { Delete } from "lucide-react";

export default function AlertDelete({
  deleteLabel,
}: {
  deleteLabel: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ButtonIcon className="cursor-pointer flex items-center gap-2 bg-red-400 hover:bg-red-500">
          <Delete />
          <span>Delete</span>
        </ButtonIcon>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            label.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-400 hover:bg-red-500 cursor-pointer"
            onClick={deleteLabel}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
