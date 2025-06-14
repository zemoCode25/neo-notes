"use client";
import { DialogFooter, DialogTitle } from "@/components/ui/dialog";

import { DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sparkle } from "lucide-react";
import { LetterText } from "lucide-react";
import { Palette } from "lucide-react";
import { Tag } from "lucide-react";
import { EllipsisVertical } from "lucide-react";

// Utils
import { ButtonIcon } from "@/components/utils/ButtonIcon";

type CreateFormProp = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function CreateForm({ handleSubmit }: CreateFormProp) {
  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogTitle className="hidden" />
      <form onSubmit={handleSubmit}>
        <Input
          className="h-10 mt-5 block !text-xl"
          placeholder="Title"
          name="title"
          id="title"
        ></Input>
        <textarea
          name="note"
          id="note"
          placeholder="Take your note"
          className="outline-none w-full min-h-150 p-3 border-black border-1 rounded-md my-2"
        ></textarea>
        <DialogFooter className="flex !justify-between !w-full">
          <div className="flex gap-3">
            <ButtonIcon className="cursor-pointer bg-blue-200">
              <LetterText />
            </ButtonIcon>
            <ButtonIcon className="cursor-pointer bg-blue-200">
              <Palette />
            </ButtonIcon>
            <ButtonIcon className="cursor-pointer bg-blue-200">
              <Tag />
            </ButtonIcon>
            <ButtonIcon className="cursor-pointer bg-blue-200">
              <EllipsisVertical />
            </ButtonIcon>
          </div>
          <div className="flex items-center gap-3">
            <ButtonIcon
              onClick={(e) => e.preventDefault()}
              className="bg-cyan-100 cursor-pointer"
            >
              NeoNotes AI <Sparkle />
            </ButtonIcon>
            <ButtonIcon className="cursor-pointer" type="submit">
              Save
            </ButtonIcon>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
