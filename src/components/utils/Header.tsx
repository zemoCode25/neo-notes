import { Card } from "../ui/card";
import { Button } from "../ui/button";
import NeonotesLogo from "./neonotes-logo";

import Link from "next/link";

export default function Header() {
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
          <Button>
            <Link href="/auth/signup" className="cursor-pointer">
              Get Started
            </Link>
          </Button>
        </div>
      </Card>
    </header>
  );
}
