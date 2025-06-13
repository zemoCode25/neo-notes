"use client";
import { DialogFooter, DialogTitle } from "@/components/ui/dialog";

import { DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";
import { LetterText } from "lucide-react";
import { Palette } from "lucide-react";
import { Tag } from "lucide-react";

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
            <Button className="cursor-pointer bg-blue-200">
              <LetterText />
            </Button>
            <Button className="cursor-pointer bg-blue-200">
              <Palette />
            </Button>
            <Button className="cursor-pointer bg-blue-200">
              <Tag />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={(e) => e.preventDefault()}
              className="bg-cyan-100 cursor-pointer"
            >
              NeoNotes AI <Sparkle />
            </Button>
            <Button className="cursor-pointer" type="submit">
              Save
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
