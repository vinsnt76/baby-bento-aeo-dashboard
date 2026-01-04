// /data/types.ts

export type SearchAppearanceMetrics = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type SearchAppearanceRecord = {
  appearance: string;
  current: SearchAppearanceMetrics;
  previous: SearchAppearanceMetrics;
};

export type AEOBaseline = {
  snapshotMonth: string;
  data: SearchAppearanceRecord[];
};

export interface VelocityRecord {
  node: string;
  topQuery: string;
  url: string;
  status: 'Missing' | 'Establishing' | 'Optimizing' | 'Optimal';
  retrievalLift: number; // Changed from string to number
  volume: string;
}