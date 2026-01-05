import { create } from 'zustand';

interface DashboardState {
  // Data State
  mergedData: any[];
  selectedNode: string | null;
  
  // Analytics State
  brandedClicks: number;
  nonBrandedClicks: number;
  ownershipScore: number;
  
  // Actions
  setMergedData: (data: any[]) => void;
  setSelectedNode: (node: string | null) => void;
  updateOwnershipMetrics: (branded: number, nonBranded: number) => void;
}

export const useStore = create<DashboardState>((set: any) => ({
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