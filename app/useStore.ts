'use client';

import { create } from 'zustand';

// It is best practice to define a more specific type for your data structures.
// This placeholder is based on the project context.
export interface NodeData {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  // Optional derived metrics
  nonBrandedShare?: number;
  queryCount?: number;
  semanticDensity?: number;
  ownershipScore?: number;
  rankingMomentum?: number;
  formationScore?: number;
}

interface DashboardState {
  mergedData: NodeData[];
  selectedNode: string | null;
  // Aggregate metrics for the selected node or overall view
  brandedClicks: number;
  nonBrandedClicks: number;
  // Individual metric scores for the selected node
  ownershipScore: number;
  semanticDensity: number;
  formationScore: number;
  rankingMomentum: number;
  setMergedData: (data: NodeData[]) => void;
  setSelectedNode: (node: string | null) => void;
  // This action is now aligned with the mathematical model from your instructions
  updateSemanticMetrics: (metrics: {
    branded: number;
    nonBranded: number;
    queryCount: number;
    currentPosition: number;
    previousPosition: number;
    retrievalLift: number; // Assuming this value is available when called
  }) => void;
}

// Ensure "export const useStore" is explicitly named
export const useStore = create<DashboardState>((set) => ({
  mergedData: [],
  selectedNode: null,
  brandedClicks: 0,
  nonBrandedClicks: 0,
  ownershipScore: 0,
  semanticDensity: 0,
  formationScore: 0,
  rankingMomentum: 0,
  setMergedData: (data: NodeData[]) => set({ mergedData: data }),
  setSelectedNode: (node: string | null) => set({ selectedNode: node }),
  updateSemanticMetrics: (metrics) => {
    const { branded, nonBranded, queryCount, currentPosition, previousPosition, retrievalLift } = metrics;
    const totalClicks = branded + nonBranded;
    const nonBrandedShare = totalClicks > 0 ? nonBranded / totalClicks : 0;
    const semanticDensity = Math.min(100, queryCount * 15);
    const ownershipScore = nonBrandedShare * semanticDensity;
    const rankingMomentum = previousPosition - currentPosition;
    const formationScore = Math.min(100, 0.4 * retrievalLift + 0.6 * (100 - currentPosition));

    set({ brandedClicks: branded, nonBrandedClicks: nonBranded, ownershipScore, semanticDensity, rankingMomentum, formationScore });
  },
}));