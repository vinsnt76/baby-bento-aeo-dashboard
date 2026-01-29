'use client';

import { create } from 'zustand';

/**
 * Metric Parameters for Semantic Intelligence
 */
interface SemanticMetricsInput {
  branded: number;
  nonBranded: number;
  queryCount: number;
  currentPosition: number;
  previousPosition: number;
  retrievalLift: number;
}

interface DashboardState {
  // Data State
  mergedData: any[];
  selectedNode: string | null;

  // Semantic Intelligence Metrics
  brandedClicks: number;
  nonBrandedClicks: number;
  ownershipScore: number;
  semanticDensity: number;
  formationScore: number;
  rankingMomentum: number;

  // Actions
  setMergedData: (data: any[]) => void;
  setSelectedNode: (node: string | null) => void;
  
  /**
   * Updates all semantic intelligence metrics based on the 
   * Baby Bento AEO Delta mathematical model.
   */
  updateSemanticMetrics: (metrics: SemanticMetricsInput) => void;
  
  /** * Legacy support for simple ownership updates
   */
  updateOwnershipMetrics: (branded: number, nonBranded: number) => void;
}

export const useStore = create<DashboardState>((set) => ({
  // Initial State
  mergedData: [],
  selectedNode: null,
  brandedClicks: 0,
  nonBrandedClicks: 0,
  ownershipScore: 0,
  semanticDensity: 0,
  formationScore: 0,
  rankingMomentum: 0,

  // Setters
  setMergedData: (data) => set({ mergedData: data }),
  setSelectedNode: (node) => set({ selectedNode: node }),

  updateSemanticMetrics: (m) => {
    // 1. Ownership Model
    // formula: nonBrandedShare * semanticDensity
    const total = m.branded + m.nonBranded || 1;
    const nonBrandedShare = m.nonBranded / total;
    
    // 2. Semantic Density
    // formula: min(100, queryCount * 15)
    const density = Math.min(100, m.queryCount * 15);
    
    const ownership = nonBrandedShare * density;

    // 3. Ranking Momentum
    // formula: previousPosition - currentPosition
    const momentum = m.previousPosition - m.currentPosition;

    // 4. Formation Score
    // formula: min(100, 0.4 * retrievalLift + 0.6 * (100 - currentPosition))
    const rankingStrength = Math.max(0, 100 - m.currentPosition);
    const formation = Math.min(100, (0.4 * m.retrievalLift) + (0.6 * rankingStrength));

    set({
      brandedClicks: m.branded,
      nonBrandedClicks: m.nonBranded,
      semanticDensity: density,
      ownershipScore: ownership,
      rankingMomentum: momentum,
      formationScore: formation,
    });
  },

  updateOwnershipMetrics: (branded, nonBranded) => {
    const total = branded + nonBranded || 1;
    const score = (nonBranded / total) * 100;
    set({ 
      brandedClicks: branded, 
      nonBrandedClicks: nonBranded, 
      ownershipScore: score 
    });
  },
}));