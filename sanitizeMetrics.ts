export interface AEOHealthMetrics {
  selectionEfficiency: number;
  ownershipScore: number;
  mergedData: { node: string; retrievalLift: number }[];
  brandedShare: number;
  selectedNode: string | null;
}

/**
 * SECURITY & PRIVACY GUARD
 * ------------------------
 * This utility functions as a data firewall. It ensures that NO raw GSC data,
 * user queries, or PII are ever sent to the AI model.
 * 
 * We only transmit:
 * 1. Aggregated percentages (Efficiency, Share)
 * 2. Calculated scores (Ownership, Momentum)
 * 3. Public entity names (Nodes)
 */
export function sanitizeMetrics(data: AEOHealthMetrics) {
  // Calculate Momentum (Avg Lift of active nodes)
  // Logic: We only consider nodes that have moved (non-zero lift) to avoid diluting the signal with stagnant data.
  const activeNodes = data.mergedData.filter(n => n.retrievalLift !== 0);
  const avgLift = activeNodes.length > 0 
    ? activeNodes.reduce((acc, n) => acc + n.retrievalLift, 0) / activeNodes.length 
    : 0;

  // Momentum Scoring Buckets
  let momentum = "Stagnant";
  if (avgLift > 10) momentum = "High Velocity";
  else if (avgLift > 0) momentum = "Positive";
  else if (avgLift < 0) momentum = "Regressing";

  // Extract top movers for context (Compact string for token efficiency)
  // We sort by absolute lift to capture both massive gains and massive drops.
  const topNodes = data.mergedData
    .filter(n => Math.abs(n.retrievalLift) > 0)
    .sort((a, b) => b.retrievalLift - a.retrievalLift)
    .slice(0, 3)
    .map(n => `${n.node} (${n.retrievalLift > 0 ? '+' : ''}${n.retrievalLift}%)`);

  return {
    semantic_density: `${(data.selectionEfficiency * 100).toFixed(1)}%`,
    ranking_momentum: momentum,
    ownership_score: data.ownershipScore.toFixed(2),
    retrieval_lift: `${avgLift.toFixed(1)}%`,
    branded_share: `${(data.brandedShare * 100).toFixed(1)}%`,
    top_opportunities: topNodes.join(", ") || "None",
    selected_node_context: data.selectedNode || "Global View"
  };
}