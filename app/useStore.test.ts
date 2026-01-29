import { act, renderHook } from '@testing-library/react';
import { useStore } from './useStore';

// Capture the initial state before any tests run
const initialState = useStore.getState();

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

  it('should correctly update all semantic metrics based on the mathematical model', () => {
    const { result } = renderHook(() => useStore());

    // Test data based on the provided math model
    const testMetrics = {
      branded: 50,
      nonBranded: 150,
      queryCount: 5,
      currentPosition: 10,
      previousPosition: 15,
      retrievalLift: 80, // Assuming a value for this metric
    };

    act(() => {
      result.current.updateSemanticMetrics(testMetrics);
    });

    // Expected calculations
    const expectedNonBrandedShare = 150 / (50 + 150); // 0.75
    const expectedSemanticDensity = Math.min(100, 5 * 15); // 75
    const expectedOwnershipScore = expectedNonBrandedShare * expectedSemanticDensity; // 0.75 * 75 = 56.25
    const expectedRankingMomentum = 15 - 10; // 5
    const expectedFormationScore = Math.min(100, 0.4 * 80 + 0.6 * (100 - 10)); // 0.4*80 + 0.6*90 = 32 + 54 = 86

    expect(result.current.brandedClicks).toBe(50);
    expect(result.current.nonBrandedClicks).toBe(150);
    expect(result.current.semanticDensity).toBe(expectedSemanticDensity);
    expect(result.current.ownershipScore).toBeCloseTo(expectedOwnershipScore);
    expect(result.current.rankingMomentum).toBe(expectedRankingMomentum);
    expect(result.current.formationScore).toBe(expectedFormationScore);
  });

  describe('updateSemanticMetrics edge cases', () => {
    it('should handle zero total clicks to avoid division by zero', () => {
      const { result } = renderHook(() => useStore());
      const metrics = {
        branded: 0,
        nonBranded: 0,
        queryCount: 5,
        currentPosition: 10,
        previousPosition: 15,
        retrievalLift: 80,
      };

      act(() => {
        result.current.updateSemanticMetrics(metrics);
      });

      // nonBrandedShare should be 0, making ownershipScore 0
      expect(result.current.ownershipScore).toBe(0);
    });

    it('should cap semanticDensity at 100', () => {
      const { result } = renderHook(() => useStore());
      const metrics = {
        branded: 50,
        nonBranded: 150,
        queryCount: 10, // 10 * 15 = 150, which should be capped at 100
        currentPosition: 10,
        previousPosition: 15,
        retrievalLift: 80,
      };

      act(() => {
        result.current.updateSemanticMetrics(metrics);
      });

      expect(result.current.semanticDensity).toBe(100);
      const expectedNonBrandedShare = 150 / 200; // 0.75
      expect(result.current.ownershipScore).toBe(expectedNonBrandedShare * 100); // 75
    });

    it('should cap formationScore at 100', () => {
      const { result } = renderHook(() => useStore());
      const metrics = {
        branded: 50,
        nonBranded: 150,
        queryCount: 5,
        currentPosition: 1,
        previousPosition: 2,
        retrievalLift: 300, // This will make the score > 100 before capping
      };

      act(() => {
        result.current.updateSemanticMetrics(metrics);
      });

      // 0.4 * 300 + 0.6 * (100 - 1) = 120 + 59.4 = 179.4 -> capped at 100
      expect(result.current.formationScore).toBe(100);
    });

    it('should handle negative ranking momentum', () => {
      const { result } = renderHook(() => useStore());
      const metrics = {
        branded: 50,
        nonBranded: 150,
        queryCount: 5,
        currentPosition: 20,
        previousPosition: 15, // Position got worse
        retrievalLift: 80,
      };

      act(() => {
        result.current.updateSemanticMetrics(metrics);
      });

      expect(result.current.rankingMomentum).toBe(15 - 20); // -5
    });
  });
});