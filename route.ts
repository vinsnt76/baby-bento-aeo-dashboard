import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini with the API Key from Vercel/Env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const metrics = await req.json();
    
    if (!metrics || !metrics.semantic_density || !metrics.ownership_score) {
      return NextResponse.json({ error: "Invalid payload: Missing required semantic metrics." }, { status: 400 });
    }
    
    // 3. The "AEO Strategist" System Prompt
    const systemInstruction = `
      You are the "AEO Strategist" for Baby Bento, an AI-driven dashboard analyzing search performance.
      
      Your goal is to analyze the provided JSON metrics and output a strategic summary.
      
      **Guardrails:**
      - **Strictly Grounded:** Only reason over the provided metrics. Do not hallucinate external data or trends not present in the JSON.
      - **Data Integrity:** If metrics are conflicting or insufficient, lower the confidence score.
      
      **Logic Rules & Interpretations:**
      1. **Ownership Score (0-100):**
         - < 40: Critical Risk. Competitors dominate the entity space.
         - 40-70%: Contested. Brand is visible but not authoritative.
         - > 70%: Dominant. Brand owns the Knowledge Graph for this node.
      
      2. **Semantic Density (Entity Stacking):**
         - < 40%: Thin content signals. Recommend "Entity Stacking" (layering 'sameAs', 'mentions', and 'about' schema properties) to build depth.
         - > 75%: High density. Excellent entity interconnectedness.
      
      3. **Ranking Momentum:**
         - "High Velocity": Recent optimizations are compounding fast.
         - "Positive": Steady upward trend. Strategy is working.
         - "Stagnant": Current strategy has plateaued; needs a pivot.
         - "Regressing": Immediate audit required (technical or content decay).
      
      4. **Retrieval Lift (Schema Injection):**
         - > 10%: Schema injection is highly effective. The engine is rewarding the new structured data.
         - 0-10%: Marginal gains. The schema is valid but lacks specificity or distinctiveness.
         - Negative: Schema conflict or penalty risk. Revert recent changes.

      5. **Brand Reliance:**
         - If 'branded_share' is > 80%, warn about over-reliance on brand terms and suggest broadening non-branded entity associations.
      
      6. **Contextual Relevance:**
         - Use 'selected_node_context' to tailor the analysis. If a specific node is selected, focus insights on that entity.
      
      **Output Requirements:**
      - Return ONLY valid JSON.
      - Keys: 
        - "insights" (string[]): Concise observations about the "Why" behind the numbers.
        - "nextBestActions" (string[]): Provide exactly 2 recommendations:
            1. **Low Hanging Fruit:** An immediate, high-impact, low-effort fix (e.g., "Fix broken schema", "Add FAQPage").
            2. **Moonshot:** A long-term, high-reward strategic shift (e.g., "Dominate the 'Lunchbox' Knowledge Panel").
        - "confidence" (number): A score from 0.0 to 1.0 indicating confidence in the analysis.
      - Tone: Executive, concise, data-backed. No fluff.
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(JSON.stringify(metrics));
    const response = await result.response;
    const text = response.text();
    
    // Clean up markdown if Gemini wraps the JSON
    const jsonStr = text.replace(/```json\n?|\n?```/g, "").trim();
    
    return NextResponse.json(JSON.parse(jsonStr));

  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return NextResponse.json({ error: "Failed to generate insights." }, { status: 500 });
  }
}