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
  setSelectedNode: (node: string | null) => void;
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
    });
  },
}));