"use client";

// import NeonotesLogo from "@/components/utils/neonotes-logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";
import { features } from "@/lib/features";
import FeaturesCard from "@/components/utils/FeaturesCard";

export default function Home() {
  return (
    <div className="max-w-[1380px] m-auto my-5 flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center h-[50rem]">
        <AuroraText
          className="text-7xl font-bold"
          colors={["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]}
        >
          Smarter Notes. Less Chaos.
        </AuroraText>
        <p className="mb-8 text-xl">
          Let AI organize your thoughts to help you focus on what really
          matters.
        </p>
        <Link href="/dashboard">
          <Button className="font-medium text-lg cursor-pointer">
            Start taking notes
          </Button>
        </Link>
      </div>
      <div className="w-full mx-auto flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-violet-900">
          Write Less, Create More
        </h2>
        <p className="text-lg w-[60%] text-center mt-4 mb-8">
          Neonotes is your smart workspace for capturing thoughts, organizing
          ideas, and letting creativity flow. With powerful AI features built
          in, you can write faster, think clearer, and do more with every note.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <FeaturesCard
              key={index}
              title={feature.title}
              description={feature.description}
              color={feature.color as "blue" | "yellow" | "red"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
