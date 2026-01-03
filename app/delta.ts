import { VELOCITY_DEC_25 } from './velocity-dec-25';

export type DeltaResult = {
  node: string;
  url: string;
  status: string;
  livePosition: number;
  liveClicks: number;
  gapScore: number; // 0-100 (Higher = Higher Priority)
  recommendation: string;
};

export function calculateDelta(liveGscData: any[]): any[] {
  // If the API failed or is empty, return an empty array to prevent UI crashes
  if (!Array.isArray(liveGscData)) return [];

  return VELOCITY_DEC_25.map((node) => {
    // 🔍 THE FUZZY HANDSHAKE
    // This finds a match even if the query is slightly different (e.g. "lunchbox" vs "lunch box")
    const liveMatch = liveGscData.find((row: any) => {
      if (!row.keys || !row.keys[0]) return false;

      const gscQuery = row.keys[0].toLowerCase().trim();
      const baselineQuery = node.topQuery.toLowerCase().trim();
      
      return gscQuery.includes(baselineQuery) || baselineQuery.includes(gscQuery);
    });

    const livePos = liveMatch ? liveMatch.position : 0;
    const liveClicks = liveMatch ? liveMatch.clicks : 0;

    // 🚩 GAP CALCULATION
    // High Gap Score = High Google Rank (Top 15) but Missing AEO status
    let gapScore = 0;
    if (livePos > 0 && livePos <= 15) {
      if (node.status === 'Missing') gapScore = 95;
      else if (node.status === 'Establishing') gapScore = 65;
    } else if (livePos > 15 && livePos <= 30) {
      if (node.status === 'Missing') gapScore = 40;
    }

    return {
      ...node, // Pass through original baseline data
      livePosition: Number(livePos.toFixed(1)),
      liveClicks: liveClicks,
      gapScore: gapScore,
      recommendation: gapScore > 70 ? "URGENT: Deploy Semantic Schema" : "Monitor"
    };
  });
}