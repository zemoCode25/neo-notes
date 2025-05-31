import { Card } from "@/components/ui/card";
export default function Home() {
  return (
    <header className="max-w-[1380px] m-auto my-5">
      <Card className="flex flex-row items-center justify-between py-5 px-7">
        <div>
          <span className="border-2 border-black p-1 font-semibold bg-violet-400">
            NeoNotes
          </span>
        </div>
        <div>
          <ul className="flex gap-10">
            <li>Home</li>
            <li>About Us</li>
            <li>Explore</li>
          </ul>
        </div>
        <div></div>
      </Card>
    </header>
  );
}
