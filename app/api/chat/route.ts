import { NextRequest, NextResponse } from "next/server";
import businesses, { buildPrompt } from "@/config/businesses";

export async function POST(req: NextRequest) {
  const { message, bizId, context } = await req.json();

  // Use bizId if provided, else fall back to raw context
  let systemPrompt = context;
  if (bizId) {
    const biz = businesses.find(b => b.id === bizId);
    if (biz) systemPrompt = buildPrompt(biz);
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: "API key not configured. Add GROQ_API_KEY to your .env.local file." });
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Let me connect you with our team!";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Let me connect you with our team!" });
  }
}
