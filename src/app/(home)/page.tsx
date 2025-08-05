"use client";

// import NeonotesLogo from "@/components/utils/neonotes-logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";
import { features } from "@/lib/features";
import FeaturesCard from "@/components/utils/FeaturesCard";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { TFAQ } from "@/lib/faqs";
import { faqs } from "@/lib/faqs";
import FaqsItem from "@/components/utils/FaqsItem";
import { Accordion } from "@/components/ui/accordion";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="w-full m-auto mt-5 flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-[1380px] flex flex-col items-center justify-center">
        <section className="flex flex-col items-center justify-center h-[46rem] text-center">
          <AuroraText
            className="text-5xl font-bold sm:text-7xl"
            colors={["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]}
          >
            Smarter Notes. <br />
            Less Chaos.
          </AuroraText>
          <p className="mb-4 text-xl ">
            Let AI organize your thoughts to help you focus on what really
            matters.
          </p>
          <Link href="/dashboard">
            <Button className="font-medium text-lg cursor-pointer px-8 py-5">
              Start taking notes
            </Button>
          </Link>
        </section>
        <section className="w-full mx-auto flex flex-col items-center justify-center mb-30 text-center">
          <h2 className="text-5xl font-bold text-violet-900">
            Write Less, <br /> Create More
          </h2>
          <p className="text-lg w-[90%] max-w-[40rem] text-center mt-4 mb-8">
            Neonotes is your smart workspace for capturing thoughts and letting
            creativity flow. With powerful AI features built in, you can write
            faster, clearer, and do more with every note.
          </p>

          <div className="flex flex-wrap justify-center gap-3 w-[90%] max-w-[1280px]">
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
        {/* AI FEATURES */}
        <section className="w-full mx-auto flex flex-col items-center justify-center max-w-[1280px] mb-10">
          <div className="flex items-center flex-col">
            <h4 className="text-4xl sm:text-5xl font-bold text-violet-900">
              Smarter Notes,
              <br /> Powered by AI
            </h4>
            <p className="text-lg w-[90%] max-w-[40rem] text-center mt-4 mb-8">
              Neonotes goes beyond basic note-taking with built-in AI tools that
              help you think, write, and organize faster. Whether you need a
              quick summary, a clear outline, or fresh content—AI is here to
              help.
            </p>
          </div>
          <Card className="bg-blue-200 p-4 w-[90%] flex flex-col lg:flex-row justify-between items-center gap-4 px-5 md:px-30 mb-10">
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-4xl font-bold text-center lg:text-left">
                AI Summarize
              </h4>
              <p className="text-xl mt-2 w-full max-w-[500px] text-center lg:text-left">
                Turn long notes into clear, bite-sized summaries. Perfect for
                reviewing key points without rereading everything.
              </p>
            </div>
            <span className="w-[50%] max-w-[30rem] min-w-[20rem] h-[300px] relative">
              <Image
                src="/images/AI_1.png"
                fill={true}
                alt="Description"
                className="object-contain"
              />
            </span>
          </Card>
          <Card className="bg-cyan-200 p-4 w-[90%] flex flex-col lg:flex-row justify-between items-center gap-4 px-5 md:px-30 mb-10">
            <span className="w-[90%] min-w-[20rem] h-[300px] relative">
              <Image
                src="/images/AI_2.png"
                fill={true}
                alt="Description"
                className="object-contain"
              />
            </span>
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-4xl font-bold text-center lg:text-left">
                AI Outline
              </h4>
              <p className="text-xl mt-2 w-full max-w-[500px] text-center lg:text-left">
                Structure your thoughts in seconds. Get an organized overview of
                your content to improve flow and focus.
              </p>
            </div>
          </Card>
          <Card className="bg-yellow-200 p-4 w-[90%] flex flex-col lg:flex-row justify-between items-center gap-4 px-5 md:px-30 mb-10">
            <div className="flex items-center flex-col">
              <h4 className="text-4xl font-bold text-center lg:text-left">
                AI Generate
              </h4>
              <p className="text-xl mt-2 w-full max-w-[500px] text-center lg:text-left">
                Spark new ideas or expand on existing ones with AI-powered
                content generation—just type a prompt and let it write.
              </p>
            </div>
            <span className="w-[90%] min-w-[20rem] h-[300px] relative">
              <Image
                src="/images/AI_3.png"
                fill={true}
                alt="Description"
                className="object-contain"
              />
            </span>
          </Card>
        </section>
        {/* FAQS */}
        <section className="mx-auto flex flex-col items-center justify-center w-[90%] md:w-full max-w-[1280px] my-15">
          <h2 className="text-5xl font-bold text-violet-900">FAQS</h2>
          <Accordion type="single" collapsible className="w-full max-w-[850px]">
            {faqs.map((faq: TFAQ, index: number) => (
              <FaqsItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </Accordion>
        </section>
      </div>
      <section className="w-full mx-auto flex flex-col items-center justify-center mt-10 bg-yellow-200 py-40">
        <h4 className="text-5xl font-bold text-center w-[90%]">
          Are you ready to take a note?
        </h4>
        <Link href="/dashboard">
          <Button className="font-medium text-xl cursor-pointer mt-2 px-8 py-5">
            Get started
          </Button>
        </Link>
      </section>
      <footer className="w-full mt-10 bg-violet-900 rounded-tr-lg rounded-tl-lg border-4 border-black border-b-transparent max-w-[1380px]">
        <div className="flex flex-col md:flex-row items-center justify-center p-10">
          <article className="w-full max-w-[600px] p-5 text-gray-200">
            <h5 className="text-xl font-bold">About Neonotes</h5>
            <p>
              Neonotes is built for thinkers, creators, and doers who want
              smarter, faster ways to capture and organize their ideas. With
              intuitive tools and AI-powered features, we aim to simplify the
              way you write and work.
            </p>
          </article>
          <article className="w-full flex flex-col md:items-center justify-center max-w-[600px] p-5 text-gray-200">
            <div>
              <h5 className="text-xl font-bold">Links</h5>
              <ul className="list-none space-y-1">
                <li>
                  <Link href="/dashboard" className="text-gray-200 underline">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-200 underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-200 underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </article>
          <article className="w-full max-w-[600px] p-5 text-gray-200">
            <h5 className="text-xl font-bold">Socials</h5>
            <Link href="https://github.com/zemoCode25" target="_blank">
              <FaGithub size={24} />
            </Link>
          </article>
        </div>
        <p className="text-gray-200 text-center">
          &copy; 2025 Neonotes. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
