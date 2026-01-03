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

export function calculateDelta(liveGscData: any[]): DeltaResult[] {
  return VELOCITY_DEC_25.map((node) => {
    // Find matching live data based on the Top Query
    const liveMatch = liveGscData.find(
      (row) => row.keys[0].toLowerCase() === node.topQuery.toLowerCase()
    );

    const livePos = liveMatch ? liveMatch.position : 0;
    const liveClicks = liveMatch ? liveMatch.clicks : 0;

    // Logic: If ranking high in search but status is "Missing" in AEO, Gap is High.
    let gapScore = 0;
    if (livePos > 0 && livePos < 10) {
      if (node.status === 'Missing') gapScore = 90;
      else if (node.status === 'Establishing') gapScore = 40;
    }

    let recommendation = "Maintain current structure.";
    if (gapScore > 50) recommendation = "Urgent: Add Product Schema / Merchant Feeds.";
    if (livePos > 20 && node.status === 'Buoyant') recommendation = "Improve content depth to match snippet authority.";

    return {
      node: node.node,
      url: node.url,
      status: node.status,
      livePosition: Number(livePos.toFixed(1)),
      liveClicks: liveClicks,
      gapScore,
      recommendation
    };
  });
}