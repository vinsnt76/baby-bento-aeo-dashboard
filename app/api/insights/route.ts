import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

// 1. Initialize with a trimmed key to prevent hidden space errors
const genAI = new GoogleGenerativeAI((process.env.GEMINI_API_KEY || "").trim());

// Define the schema for consistent AI responses
const responseSchema: any = {
  type: SchemaType.OBJECT,
  properties: {
    strategicHealth: { type: SchemaType.STRING },
    lowHangingFruit: { type: SchemaType.STRING },
    moonshot: { type: SchemaType.STRING },
    confidence: { type: SchemaType.NUMBER },
  },
  required: ["strategicHealth", "lowHangingFruit", "moonshot", "confidence"],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Normalize inputs to handle both camelCase (frontend) and snake_case (legacy)
    const selectedNode = body.selectedNode || "Primary Category";
    const semanticDensity = body.semantic_density || body.semanticDensity || "N/A";
    const rankingMomentum = body.ranking_momentum || body.rankingMomentum || "N/A";
    const ownershipScore = body.ownership_score || body.ownershipScore || "0";
    const retrievalLift = body.retrieval_lift || body.retrievalLift || "0";
    
    // SERVER-SIDE LOG: This will appear in your VS Code / Terminal
    console.log("🚀 AI Strategist Received Payload:", body);

    // 2. Validate the API Key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ ERROR: GEMINI_API_KEY is not defined in .env.local");
      return NextResponse.json(
        { error: "AI Configuration Missing on Server" }, 
        { status: 500 }
      );
    }

    // Switching to Gemini 2.0 Flash
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    // 3. Map the incoming data to the System Prompt
    const prompt = `
      You are the Baby Bento AEO Strategic Engine. Analyze these metrics for "${selectedNode}":
      - Ownership: ${ownershipScore}%
      - Momentum: ${rankingMomentum}
      - Density: ${semanticDensity}
      - Retrieval Lift: ${retrievalLift}

      Provide a tactical fix (lowHangingFruit) and a high-level strategy (moonshot).
      Keep each recommendation under 15 words.
    `;

    const result = await model.generateContent(prompt);
    // With ResponseMimeType, text() returns a pure JSON string
    const responseText = result.response.text();

    // 4. Return the response to the frontend
    return NextResponse.json(JSON.parse(responseText));

  } catch (error: any) {
    // Detailed error logging for debugging the 500 status
    console.error("❌ Gemini 2.0 Error:", error.message);
    return NextResponse.json({ 
      lowHangingFruit: "Error connecting to AI engine", 
      moonshot: "Check API configuration" 
    }, { status: 500 });
  }
}