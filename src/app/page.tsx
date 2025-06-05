"use client";

// import NeonotesLogo from "@/components/utils/neonotes-logo";
import { Button } from "@/components/ui/button";

console.log("ASKLASDJLKJAS");

export default function Home() {
  return (
    <div className="max-w-[1380px] m-auto my-5 flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center h-[40rem]">
        <h1 className="text-6xl font-bold">Smarter Notes. Less Chaos.</h1>
        <p className="mb-4">
          Let AI organize your thoughts to help you focus on what really
          matters.
        </p>
        <Button className="font-medium text-lg cursor-pointer">
          Start taking notes
        </Button>
      </div>
    </div>
  );
}
