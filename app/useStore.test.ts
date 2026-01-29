import { act, renderHook } from '@testing-library/react';
import { useStore, VelocityRecord } from './useStore';

// Capture the initial state before any tests run
const initialState = useStore.getState();

// Mock data that mirrors the structure of GSC and velocity files
const mockNodes: VelocityRecord[] = [
  {
    node: 'Insulated Lunch Boxes',
    topQuery: 'best insulated lunch box australia',
    url: '/collections/insulated-lunch-boxes',
    status: 'Optimizing',
    retrievalLift: 12,
    volume: 'High',
  },
  {
    node: 'Stainless Steel',
    topQuery: 'stainless steel bento box metal',
    url: '/collections/metal-bento-boxes',
    status: 'Establishing',
    retrievalLift: 8,
    volume: 'Medium',
  },
];

const mockCurrentData = [
  { keys: ['best insulated lunch box'], clicks: 100, position: 5 }, // non-branded for node 1
  { keys: ['baby bento insulated'], clicks: 20, position: 2 }, // branded for node 1
  { keys: ['stainless steel bento'], clicks: 50, position: 12 }, // non-branded for node 2
];

const mockPreviousData = [
  { keys: ['best insulated lunch box'], clicks: 80, position: 8 }, // previous for node 1
  { keys: ['stainless steel bento'], clicks: 40, position: 10 }, // previous for node 2
];

describe('Zustand Store: useStore', () => {
  // Reset store state before each test
  beforeEach(() => {
    act(() => {
      useStore.setState(initialState);
    });
  });

  it('should have the correct initial state', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.selectedNode).toBeNull();
    expect(result.current.mergedData).toEqual([]);
    expect(result.current.ownershipScore).toBe(0);
    expect(result.current.semanticDensity).toBe(0);
    expect(result.current.formationScore).toBe(0);
    expect(result.current.rankingMomentum).toBe(0);
  });

  describe('processGscData', () => {
    it('should correctly process raw GSC data and calculate all semantic metrics', () => {
      const { result } = renderHook(() => useStore());

      act(() => {
        result.current.processGscData(mockCurrentData, mockPreviousData, mockNodes);
      });

      const { mergedData, brandedClicks, nonBrandedClicks } = result.current;

      // --- Assertions for the entire dataset ---
      expect(mergedData).toHaveLength(2);
      expect(brandedClicks).toBe(20); // from 'baby bento insulated'
      expect(nonBrandedClicks).toBe(150); // 100 + 50

      // --- Assertions for Node 1: "Insulated Lunch Boxes" ---
      const node1 = mergedData.find(d => d.name === 'Insulated Lunch Boxes');
      expect(node1).toBeDefined();
      if (!node1) return;

      const node1QueryCount = 2;
      const node1TotalClicks = 120;
      const node1NonBrandedClicks = 100;
      const node1NonBrandedShare = node1NonBrandedClicks / node1TotalClicks;
      const expectedSemanticDensity1 = Math.min(100, node1QueryCount * 15); // 30
      const expectedOwnershipScore1 = node1NonBrandedShare * expectedSemanticDensity1;
      const expectedRankingMomentum1 = 8 - 5; // 3
      const expectedFormationScore1 = Math.round(Math.min(100, Math.max(0, 12 * 0.4 + (100 - 5) * 0.6))); // 4.8 + 57 = 61.8 -> 62

      expect(node1.branded).toBe(20);
      expect(node1.nonBranded).toBe(100);
      expect(node1.semanticDensity).toBe(expectedSemanticDensity1);
      expect(node1.ownershipScore).toBeCloseTo(expectedOwnershipScore1);
      expect(node1.rawMomentum).toBe(expectedRankingMomentum1);
      expect(node1.formationScore).toBe(expectedFormationScore1);
      expect(node1.position).toBe(5);

      // --- Assertions for Node 2: "Stainless Steel" ---
      const node2 = mergedData.find(d => d.name === 'Stainless Steel');
      expect(node2).toBeDefined();
      if (!node2) return;

      const node2QueryCount = 1;
      const node2TotalClicks = 50;
      const node2NonBrandedClicks = 50;
      const node2NonBrandedShare = node2NonBrandedClicks / node2TotalClicks; // 1
      const expectedSemanticDensity2 = Math.min(100, node2QueryCount * 15); // 15
      const expectedOwnershipScore2 = node2NonBrandedShare * expectedSemanticDensity2; // 15
      const expectedRankingMomentum2 = 10 - 12; // -2
      const expectedFormationScore2 = Math.round(Math.min(100, Math.max(0, 8 * 0.4 + (100 - 12) * 0.6))); // 3.2 + 52.8 = 56

      expect(node2.branded).toBe(0);
      expect(node2.nonBranded).toBe(50);
      expect(node2.semanticDensity).toBe(expectedSemanticDensity2);
      expect(node2.ownershipScore).toBeCloseTo(expectedOwnershipScore2);
      expect(node2.rawMomentum).toBe(expectedRankingMomentum2);
      expect(node2.formationScore).toBe(expectedFormationScore2);
      expect(node2.position).toBe(12);
    });
  });

  describe('setSelectedNode', () => {
    it('should update aggregate metrics when a node is selected', () => {
      const { result } = renderHook(() => useStore());

      // First, process data to populate the store
      act(() => {
        result.current.processGscData(mockCurrentData, mockPreviousData, mockNodes);
      });

      // Now, select a node
      act(() => {
        result.current.setSelectedNode('Insulated Lunch Boxes');
      });

      const node1 = result.current.mergedData.find(d => d.name === 'Insulated Lunch Boxes');
      expect(result.current.selectedNode).toBe('Insulated Lunch Boxes');
      expect(result.current.brandedClicks).toBe(node1?.branded);
      expect(result.current.nonBrandedClicks).toBe(node1?.nonBranded);
      expect(result.current.ownershipScore).toBe(node1?.ownershipScore);
      expect(result.current.semanticDensity).toBe(node1?.semanticDensity);
      expect(result.current.rankingMomentum).toBe(node1?.rawMomentum);
      expect(result.current.formationScore).toBe(node1?.formationScore);
    });

    it('should show total clicks and reset scores when a node is deselected', () => {
      const { result } = renderHook(() => useStore());

      // Process and select a node first
      act(() => {
        result.current.processGscData(mockCurrentData, mockPreviousData, mockNodes);
        result.current.setSelectedNode('Insulated Lunch Boxes');
      });

      // Now, deselect the node
      act(() => {
        result.current.setSelectedNode(null);
      });

      expect(result.current.selectedNode).toBeNull();
      expect(result.current.brandedClicks).toBe(20); // Total branded clicks
      expect(result.current.nonBrandedClicks).toBe(150); // Total non-branded clicks
      expect(result.current.ownershipScore).toBe(0);
      expect(result.current.semanticDensity).toBe(0);
      expect(result.current.rankingMomentum).toBe(0);
      expect(result.current.formationScore).toBe(0);
    });
  });
});