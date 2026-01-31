'use client';

import { create } from 'zustand';

// This type is based on velocity-dec-25.ts to ensure type safety.
export interface VelocityRecord {
  node: string;
  topQuery: string;
  url: string;
  status: string;
  retrievalLift: number;
  volume: string;
}

// It is best practice to define a more specific type for your data structures.
// This placeholder is based on the project context.
export interface NodeData {
  name: string;
  position: number;
  status: string;
  // Optional derived metrics
  semanticDensity: number;
  ownershipScore: number;
  rankingMomentum: number;
  formationScore: number;
  // Radar-specific keys
  Overlap: number;
  Momentum: number;
  'AEO Lift': number;
  Stability: number;
  // Data for tables and cards
  trend: string;
  branded: number;
  nonBranded: number;
  rawMomentum: number;
  previousPosition: number;
  impressions: number;
  ctr: number;
}

export interface AIInsights {
  strategicHealth: string;
  lowHangingFruit: string;
  moonshot: string;
  confidence: number;
}

interface GscDataPeriod {
  rows: any[];
  startDate: string;
  endDate: string;
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
  selectionEfficiency: number;
  modelAuthority: number;
  retrievalVolume: number;
  knowledgeNodes: number;
  prevSelectionEfficiency: number;
  prevModelAuthority: number;
  prevRetrievalVolume: number;
  prevKnowledgeNodes: number;
  reportStart: string;
  reportEnd: string;
  selectedStartDate: string;
  selectedEndDate: string;
  aiInsights: AIInsights | null;
  isAiLoading: boolean;
  aiError: string | null;
  setReportPeriod: (startDate: string, endDate: string) => void;
  setSelectedNode: (node: string | null) => void;
  setAiInsights: (insights: AIInsights | null) => void;
  setAiLoading: (loading: boolean) => void;
  setAiError: (error: string | null) => void;
  generateInsights: () => Promise<void>;
  processGscData: (currentData: GscDataPeriod, previousData: GscDataPeriod, nodes: VelocityRecord[]) => void;
}

// Ensure "export const useStore" is explicitly named
export const useStore = create<DashboardState>((set, get) => ({
  mergedData: [],
  selectedNode: null,
  brandedClicks: 0,
  nonBrandedClicks: 0,
  ownershipScore: 0,
  semanticDensity: 0,
  formationScore: 0,
  rankingMomentum: 0,
  selectionEfficiency: 0,
  modelAuthority: 0,
  retrievalVolume: 0,
  knowledgeNodes: 0,
  prevSelectionEfficiency: 0,
  prevModelAuthority: 0,
  prevRetrievalVolume: 0,
  prevKnowledgeNodes: 0,
  reportStart: '',
  reportEnd: '',
  selectedStartDate: '',
  selectedEndDate: '',
  aiInsights: null,
  isAiLoading: false,
  aiError: null,
  setReportPeriod: (startDate, endDate) => set({ selectedStartDate: startDate, selectedEndDate: endDate }),
  setAiInsights: (insights) => set({ aiInsights: insights }),
  setAiLoading: (loading) => set({ isAiLoading: loading }),
  setAiError: (error) => set({ aiError: error }),
  setSelectedNode: (node: string | null) => {
    set({ selectedNode: node });
    const { mergedData } = get();

    if (node) {
      const nodeData = mergedData.find(d => d.name === node);
      if (nodeData) {
        set({
          brandedClicks: nodeData.branded,
          nonBrandedClicks: nodeData.nonBranded,
          ownershipScore: nodeData.ownershipScore,
          semanticDensity: nodeData.semanticDensity,
          rankingMomentum: nodeData.rawMomentum,
          formationScore: nodeData.formationScore,
        });
      }
    } else {
      // When no node is selected, show overall click totals and reset scores
      const totalBranded = mergedData.reduce((acc, curr) => acc + curr.branded, 0);
      const totalNonBranded = mergedData.reduce((acc, curr) => acc + curr.nonBranded, 0);
      set({
        brandedClicks: totalBranded,
        nonBrandedClicks: totalNonBranded,
        ownershipScore: 0,
        semanticDensity: 0,
        rankingMomentum: 0,
        formationScore: 0,
      });
    }
  },
  generateInsights: async () => {
    const { 
        selectedNode, 
        mergedData, 
        ownershipScore, 
        semanticDensity, 
        rankingMomentum,
        brandedClicks,
        nonBrandedClicks
    } = get();

    if (mergedData.length === 0) return;

    set({ isAiLoading: true, aiError: null });

    try {
        const totalClicks = brandedClicks + nonBrandedClicks;
        // Calculate effective ownership score (Global Avg or Selected Node)
        const effectiveOwnership = selectedNode 
            ? ownershipScore 
            : (mergedData.reduce((acc, n) => acc + (n.ownershipScore || 0), 0) / (mergedData.length || 1));

        // Calculate retrieval lift for the selected node or global average
        const rawLift = selectedNode
            ? (mergedData.find(d => d.name === selectedNode)?.['AEO Lift'] || 0)
            : (mergedData.reduce((acc, n) => acc + (n['AEO Lift'] || 0), 0) / (mergedData.length || 1));
        const retrievalLift = Number(rawLift).toFixed(1);
        
        const payload = {
            selectedNode: selectedNode || "Global Portfolio",
            semantic_density: semanticDensity,
            ranking_momentum: rankingMomentum,
            ownership_score: effectiveOwnership,
            retrieval_lift: `${retrievalLift}%`
        };

        const res = await fetch('/api/insights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (res.ok) {
            const json = await res.json();
            if (json.error) throw new Error(json.error);
            set({ aiInsights: json });
        } else {
            throw new Error("Failed to generate insights");
        }
    } catch (e: any) {
        console.error("AI Insight Error:", e);
        set({ aiError: "AI Strategist is currently offline. Please try again later." });
    } finally {
        set({ isAiLoading: false });
    }
  },
  processGscData: (currentData, previousData, nodes) => {
    const brandTerms = ['baby bento', 'babybento', 'baby-bento', 'bb bento', 'bento baby', 'baby bento box'];

    const calculatedData = nodes.map(node => {
      const tokens = node.node.toLowerCase().split(' ');
      const nodeQueries = currentData.rows?.filter(r => tokens.some((t: string) => r.keys[0].toLowerCase().includes(t))) || [];

      const brandedQueries = nodeQueries.filter(r => brandTerms.some(bt => r.keys[0].toLowerCase().includes(bt)));
      const nonBrandedQueries = nodeQueries.filter(r => !brandTerms.some(bt => r.keys[0].toLowerCase().includes(bt)));

      const brandedClicks = brandedQueries.reduce((acc, curr) => acc + curr.clicks, 0);
      const nonBrandedClicks = nonBrandedQueries.reduce((acc, curr) => acc + curr.clicks, 0);
      const totalClicks = brandedClicks + nonBrandedClicks;
      const totalImpressions = nodeQueries.reduce((acc, curr) => acc + (curr.impressions || 0), 0);
      const ctr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;

      // --- Canonical Metric Calculations ---
      const nonBrandedShare = totalClicks > 0 ? nonBrandedClicks / totalClicks : 0;
      const semanticDensity = Math.min(100, nodeQueries.length * 15);
      const ownershipScore = nonBrandedShare * semanticDensity;

      const currentMatch = nodeQueries.sort((a, b) => b.clicks - a.clicks)[0];
      const previousMatch = previousData.rows?.find(row => {
        const query = row.keys[0].toLowerCase();
        const matches = tokens.filter((t: string) => query.includes(t)).length;
        return matches / tokens.length >= 0.5;
      });

      const currentPosition = currentMatch ? parseFloat(currentMatch.position) : 100;
      const previousPosition = previousMatch ? parseFloat(previousMatch.position) : 100;
      const rankingMomentum = previousPosition - currentPosition;
      const formationScore = Math.round(Math.min(100, Math.max(0, (node.retrievalLift * 0.4) + ((100 - currentPosition) * 0.6))));

      return {
        name: node.node,
        status: node.status,
        // Radar data keys
        "Overlap": nodeQueries.length > 0 ? 80 : 20,
        "Momentum": 50 + (rankingMomentum * 5),
        "Diversity": semanticDensity,
        "AEO Lift": node.retrievalLift,
        "Stability": previousMatch ? 90 : 30,
        // Raw metric values for other components
        formationScore,
        trend: rankingMomentum > 0 ? '▲' : rankingMomentum < 0 ? '▼' : '→',
        branded: brandedClicks,
        nonBranded: nonBrandedClicks,
        ownershipScore,
        rawMomentum: rankingMomentum,
        rankingMomentum: rankingMomentum, // Add missing property to satisfy NodeData type
        semanticDensity, // also store under the canonical name
        position: currentPosition,
        previousPosition: previousPosition,
        impressions: totalImpressions,
        ctr,
      };
    });

    // --- Global KPI Calculations ---
    const selectionEfficiency = calculatedData.length > 0 ? Math.max(...calculatedData.map(d => d.ctr)) : 0;
    const activeNodes = calculatedData.filter(d => d.semanticDensity > 0);
    const modelAuthority = activeNodes.length > 0 
      ? activeNodes.reduce((acc, curr) => acc + curr.position, 0) / activeNodes.length 
      : 0;
    const retrievalVolume = calculatedData.reduce((acc, curr) => acc + curr.impressions, 0);
    const knowledgeNodes = calculatedData.filter(d => d.semanticDensity > 20).length;

    // --- Previous Period KPI Calculations ---
    const prevCalculatedData = nodes.map(node => {
      const tokens = node.node.toLowerCase().split(' ');
      const nodeQueries = previousData.rows?.filter(r => tokens.some((t: string) => r.keys[0].toLowerCase().includes(t))) || [];

      const totalClicks = nodeQueries.reduce((acc, curr) => acc + curr.clicks, 0);
      const totalImpressions = nodeQueries.reduce((acc, curr) => acc + (curr.impressions || 0), 0);
      const ctr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
      const semanticDensity = Math.min(100, nodeQueries.length * 15);

      const currentMatch = nodeQueries.sort((a, b) => b.clicks - a.clicks)[0];
      const position = currentMatch ? parseFloat(currentMatch.position) : 100;

      return {
        ctr,
        semanticDensity,
        position,
        impressions: totalImpressions
      };
    });

    const prevSelectionEfficiency = prevCalculatedData.length > 0 ? Math.max(...prevCalculatedData.map(d => d.ctr)) : 0;
    const prevActiveNodes = prevCalculatedData.filter(d => d.semanticDensity > 0);
    const prevModelAuthority = prevActiveNodes.length > 0
      ? prevActiveNodes.reduce((acc, curr) => acc + curr.position, 0) / prevActiveNodes.length
      : 0;
    const prevRetrievalVolume = prevCalculatedData.reduce((acc, curr) => acc + curr.impressions, 0);
    const prevKnowledgeNodes = prevCalculatedData.filter(d => d.semanticDensity > 20).length;

    // After setting data, initialize the aggregate click counts
    const totalBranded = calculatedData.reduce((acc, curr) => acc + curr.branded, 0);
    const totalNonBranded = calculatedData.reduce((acc, curr) => acc + curr.nonBranded, 0);
    set({
      mergedData: calculatedData as NodeData[],
      selectionEfficiency, modelAuthority, retrievalVolume, knowledgeNodes,
      prevSelectionEfficiency, prevModelAuthority, prevRetrievalVolume, prevKnowledgeNodes,
      brandedClicks: totalBranded,
      nonBrandedClicks: totalNonBranded,
      reportStart: currentData.startDate,
      reportEnd: currentData.endDate,
      selectedStartDate: currentData.startDate,
      selectedEndDate: currentData.endDate,
    });
  },
}));