import { Button } from "@/components/ui/button";

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget;
  if (!form) {
    console.error("Form is not defined");
    return;
  }

  const formData = new FormData(form);
  const prompt = formData.get("prompt");
}

export default function AIGenerate() {
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          name="prompt"
          id="prompt"
          placeholder="Enter your prompt here..."
          required
        />
        <Button className="mt-2 bg-cyan-100 cursor-pointer">Generate</Button>
      </form>
    </div>
  );
}
