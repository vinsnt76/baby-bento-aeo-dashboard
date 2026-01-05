'use client';

import { create } from 'zustand';

interface DashboardState {
  mergedData: any[];
  selectedNode: string | null;
  brandedClicks: number;
  nonBrandedClicks: number;
  ownershipScore: number;
  setMergedData: (data: any[]) => void;
  setSelectedNode: (node: string | null) => void;
  updateOwnershipMetrics: (branded: number, nonBranded: number) => void;
}

// Ensure "export const useStore" is explicitly named
export const useStore = create<DashboardState>((set) => ({
  mergedData: [],
  selectedNode: null,
  brandedClicks: 0,
  nonBrandedClicks: 0,
  ownershipScore: 0,
  setMergedData: (data: any[]) => set({ mergedData: data }),
  setSelectedNode: (node: string | null) => set({ selectedNode: node }),
  updateOwnershipMetrics: (branded: number, nonBranded: number) => {
    const total = branded + nonBranded || 1;
    const score = (nonBranded / total) * 100;
    set({ brandedClicks: branded, nonBrandedClicks: nonBranded, ownershipScore: score });
  },
}));