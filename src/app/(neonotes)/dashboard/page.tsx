"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
// import Link from "next/link";
// import { useEffect } from "react";

// Icons
import { Sparkle } from "lucide-react";

type TContent = {
  readonly id: number;
  title?: string;
  text?: string;
};

export default function Dashboard() {
  const [content, setContent] = useState<TContent | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick(id: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", id.toString());
    router.push(`?${params.toString()}`);
    setContent(contentObj.find((obj) => obj?.id === 1) || null);
  }

  const contentObj: TContent[] = [
    {
      id: 1,
      title: "NeoNotes AI Notes Features 1",
      text: "Color theme customization - Assign labels to be arranged in the dashboard sidebar - Title seach for every note -Mobile-responsiveness - Pin priotization - Profile Customization AI-features",
    },
  ];

  return (
    <div>
      <div className="w-full flex items-center justify-center gap-5">
        <Input className="w-1/4" placeholder="Search..."></Input>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor">Take Note</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogTitle className="hidden" />
            <form action="">
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
                className="outline-none w-full min-h-40 p-3 whitespace-pre border-black border-1 rounded-md my-2"
              ></textarea>
              <DialogFooter>
                <Button
                  onClick={(e) => e.preventDefault()}
                  className="bg-cyan-100"
                >
                  NeoNotes AI <Sparkle />
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="columns-1 sm:columns-2 md:columns-5 gap-4 my-5">
        <Dialog>
          <DialogTrigger
            className="cursor-pointer"
            onClick={() => handleClick(1)}
          >
            <Card className="bg-violet-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid text-left">
              <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
              <p>
                Color theme customization - Assign labels to be arranged in the
                dashboard sidebar - Title seach for every note -
                Mobile-responsiveness - Pin priotization - Profile Customization
                AI-features
              </p>
            </Card>
          </DialogTrigger>
          <CardContent content={content} />
        </Dialog>
      </div>
    </div>
  );
}

export function CardContent({ content }: { content: TContent | null }) {
  return (
    <DialogContent>
      <DialogTitle>{content?.title}</DialogTitle>
      <p>{content?.text}</p>
    </DialogContent>
  );
}
