const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function submitPrompt(prompt: string) {
  if (!prompt) {
    console.error("Prompt is required");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate content${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

export async function summarizePrompt(noteContent: string) {
  if (!noteContent) {
    console.error("Note content is required for summarization");
    return;
  }

  const prompt = `Summarize the following note content: ${noteContent}`;

  try {
    const response = await fetch(`${API_URL}/api/ai/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    if (!response.ok) {
      throw new Error(`Failed to summarize content${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error summarizing content:", error);
  }
}
