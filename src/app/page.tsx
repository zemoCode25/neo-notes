import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <header className="max-w-[1380px] m-auto my-5">
      <Card className="flex flex-row items-center justify-between py-5 px-7 bg-violet-100">
        <div>
          <span className="border-2 border-black p-2 font-semibold bg-violet-400">
            NeoNotes
          </span>
        </div>
        <div>
          <ul className="flex gap-10">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Explore</li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <button className="cursor-pointer">Log in</button>
          <Button className="cursor-pointer">Get Started</Button>
        </div>
      </Card>
    </header>
  );
}
