# **Baby Bento AEO Delta Dashboard**

The **AEO Delta Dashboard** transforms raw Google Search Console (GSC) data into a real‑time semantic intelligence layer.  
It quantifies entity formation, category ownership, and ranking momentum using a mathematical scoring model built on top of live query‑level performance.

This project powers Baby Bento’s internal AEO research and provides a foundation for future semantic‑search tooling.

---

## **🚀 Features**

### **Semantic Intelligence Engine**
- Maps GSC queries to entity nodes  
- Computes semantic density, ownership, and formation scores  
- Tracks ranking momentum over time  
- Generates automated strategic insights

### **Visual Analytics**
- **Delta Radar** — multi‑axis entity formation model  
- **Category Ownership Bar Chart** — branded vs non‑branded share  
- **Formation Leaderboard** — entity health ranking  
- **Classic SEO View** — traditional ranking + CTR metrics  
- **AEO View** — semantic‑first visibility model

### **State Architecture**
- Unified Zustand store (`useStore.ts`)  
- Strict TypeScript typing  
- Shared state for mergedData, selectedNode, ownership metrics, and radar inputs

### **Stability Enhancements**
- Layout locks to prevent Recharts width/height collapse  
- Hydration guards to ensure charts render only after layout is ready  
- Case‑sensitivity fix preventing “split‑brain” state issues  
- Refactored CategoryOwnership into a standalone, stable component

---

## **📐 Mathematical Model**

The dashboard computes several derived metrics from GSC data:

### **Non‑Branded Share**
```
nonBrandedClicks / totalClicks
```

### **Semantic Density**
```
queryCount × 15  (capped at 100)
```

### **Ownership Score**
```
nonBrandedShare × semanticDensity
```

### **Ranking Momentum**
```
previousPosition - currentPosition
```

### **Formation Score**
Weighted blend of retrieval lift + ranking strength.

These metrics power the radar chart, ownership bar chart, and insights engine.

---

## **📦 Tech Stack**

- **Next.js (App Router)**
- **TypeScript**
- **Zustand** (global state)
- **Recharts** (visualizations)
- **Tailwind CSS**
- **Google Search Console API**
- **Vercel** (deployment)

---

## **📁 Project Structure**

```
/app
  ├── AEOView.tsx
  ├── ClassicSEOView.tsx
  ├── DeltaRadar.tsx
  ├── CategoryOwnership.tsx
  ├── ChartContainer.tsx
  ├── api/gsc/performance/route.ts
  ├── velocity-dec-25.ts
  ├── baseline-dec-25.ts
  └── useStore.ts

/public
  └── assets, logos, icons

/globals.css
/next.config.ts
/package.json
```

---

## **⚙️ Setup & Installation**

### **1. Clone the repo**
```bash
git clone https://github.com/vinsnt76/baby-bento-aeo-dashboard
cd baby-bento-aeo-dashboard
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Add environment variables**
Create `.env.local`:

```
GSC_CLIENT_EMAIL=...
GSC_PRIVATE_KEY=...
GSC_PROPERTY_URL=...
```

### **4. Run the dev server**
```bash
npm run dev
```

---

## **📌 Known Issues & Fixes**

### **Case‑Sensitivity Store Conflict**
Previously, `useStore.ts` and `usestore.ts` caused a split‑brain state.  
This has been resolved — only the CamelCase file remains.

### **Recharts Layout Collapse**
Fixed via:
- `min-h-[350px]` and `min-w-0` layout locks  
- Hydration guards  
- ChartContainer wrapper  

### **React Hook Ordering**
Resolved in `ClassicSEOView.tsx` and `DeltaRadar.tsx`.

---

## **🧭 Roadmap**

- Add unit tests for scoring model  
- Add documentation for entity mapping  
- Add export/reporting features  
- Add multi‑property GSC support  
- Add AI‑Overview visibility modeling  

---

## **📄 License**

MIT License — free to use, modify, and extend.

---