"use client";

// import NeonotesLogo from "@/components/utils/neonotes-logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";
import { features } from "@/lib/features";
import FeaturesCard from "@/components/utils/FeaturesCard";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-[1380px] m-auto my-5 flex flex-col items-center justify-center h-full">
      <section className="flex flex-col items-center justify-center h-[46rem]">
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
      </section>
      <section className="w-full mx-auto flex flex-col items-center justify-center mb-30">
        <h2 className="text-5xl font-bold text-violet-900">
          Write Less, Create More
        </h2>
        <p className="text-lg w-[60%] text-center mt-4 mb-8">
          Neonotes is your smart workspace for capturing thoughts, organizing
          ideas, and letting creativity flow. With powerful AI features built
          in, you can write faster, think clearer, and do more with every note.
        </p>
        <div className="flex flex-wrap justify-between gap-3 w-full">
          {features.map((feature, index) => (
            <FeaturesCard
              key={index}
              title={feature.title}
              description={feature.description}
              color={feature.color as "blue" | "yellow" | "red"}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>
      <section className="w-full mx-auto flex flex-col items-center justify-center">
        <div className="flex items-center flex-col">
          <h4 className="text-5xl font-bold text-violet-900">
            Smarter Notes, Powered by AI
          </h4>
          <p className="text-lg w-[60%] text-center mt-4 mb-8">
            Neonotes goes beyond basic note-taking with built-in AI tools that
            help you think, write, and organize faster. Whether you need a quick
            summary, a clear outline, or fresh content—AI is just a click away.
          </p>
        </div>
        <Card className="bg-yellow-200 p-4 w-full flex flex-row justify-between items-center gap-4 px-30 my-10">
          <div>
            <h4 className="text-4xl font-bold">AI Summarize</h4>
            <p className="text-xl mt-2 max-w-[550px]">
              Turn long notes into clear, bite-sized summaries. Perfect for
              reviewing key points without rereading everything.
            </p>
          </div>
          <span>
            <Image
              src="/images/AI_1.png"
              width={400}
              height={300}
              alt="Description"
            />
          </span>
        </Card>
        <Card className="bg-cyan-200 p-4 w-full flex flex-row justify-between items-center gap-4 px-30 my-10">
          <span>
            <Image
              src="/images/AI_2.png"
              width={400}
              height={300}
              alt="Description"
            />
          </span>
          <div className="flex justify-end flex-col items-end">
            <h4 className="text-4xl font-bold">AI Outline</h4>
            <p className="text-xl mt-2 max-w-[550px] text-right">
              Structure your thoughts in seconds. Get an organized overview of
              your content to improve flow and focus.
            </p>
          </div>
        </Card>
        <Card className="bg-red-200 p-4 w-full flex flex-row justify-between items-center gap-4 px-30 my-10">
          <div>
            <h4 className="text-4xl font-bold">AI Generate</h4>
            <p className="text-xl mt-2 max-w-[550px]">
              Spark new ideas or expand on existing ones with AI-powered content
              generation—just type a prompt and let it write.
            </p>
          </div>
          <span>
            <Image
              src="/images/AI_3.png"
              width={400}
              height={300}
              alt="Description"
            />
          </span>
        </Card>
      </section>
    </div>
  );
}
