import { Button } from "@/components/ui/button";

export default function AISummarize() {
  return (
    <div>
      <form action="">
        <textarea
          className="w-full p-2 border rounded"
          name="prompt"
          id="prompt"
          placeholder="Enter your prompt here..."
        />
        <Button className="mt-2 bg-cyan-100">Summarize</Button>
      </form>
    </div>
  );
}
