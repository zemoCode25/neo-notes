import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt) {
    return new Response("Prompt is required", { status: 400 });
  }

  try {
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return new NextResponse(JSON.stringify({ result: response }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return new NextResponse("Failed to generate content", { status: 500 });
  }
}
