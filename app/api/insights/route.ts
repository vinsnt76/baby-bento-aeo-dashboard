import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Ensure the key is trimmed to avoid whitespace issues from .env.local
const genAI = new GoogleGenerativeAI((process.env.GEMINI_API_KEY || "").trim());

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Support both the sanitized flat payload and the wrapped metrics object
    const m = body.metrics || body;
    
    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ CLOUD ERROR: GEMINI_API_KEY not found in process.env");
      return NextResponse.json({ error: "Configuration Missing" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Grounding the prompt in your specific math from image_11227d.png
    const prompt = `
      Analyze Baby Bento AEO Metrics:
      - Ownership Score: ${m.ownership_score || m.ownershipScore}% 
      - Semantic Density: ${m.semantic_density || m.semanticDensity}
      - Ranking Momentum: ${m.ranking_momentum || m.rankingMomentum}
      
      Return a JSON object with:
      "lowHangingFruit": "tactical fix",
      "moonshot": "strategic play"
    `;

    const result = await model.generateContent(prompt);
    return NextResponse.json({ insights: result.response.text() });
  } catch (error: any) {
    console.error("Detailed Gemini Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}