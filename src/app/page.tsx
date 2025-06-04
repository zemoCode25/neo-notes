"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NeonotesLogo from "@/components/utils/neonotes-logo";

console.log("ASKLASDJLKJAS");

export default function Home() {
  return (
    <header className="max-w-[1380px] m-auto my-5">
      <Card className="flex flex-row items-center justify-between py-5 px-7 bg-violet-100">
        <div>
          <NeonotesLogo />
        </div>
        <div>
          <ul className="flex gap-10">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Explore</li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/auth/login" className="cursor-pointer">
            Log in
          </Link>
          <Button className="cursor-pointer">Get Started</Button>
        </div>
      </Card>
    </header>
  );
}
