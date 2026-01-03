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