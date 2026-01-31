# Baby Bento AEO Dashboard

An AI-driven dashboard for analyzing Answer Engine Optimization (AEO) performance, powered by Google Gemini.

## 🧠 Semantic Intelligence Layer

The dashboard uses a dedicated "Semantic Intelligence Layer" to translate raw search metrics into strategic insights.

### 1. Insight Generation Workflow

1.  **Data Collection**: `useStore.ts` aggregates raw GSC data and calculates math models (Ownership, Efficiency).
2.  **Sanitization**: `sanitizeMetrics.ts` acts as a firewall, stripping PII/raw queries and calculating high-level signals (Momentum, Density).
3.  **API Request**: The client posts the sanitized payload to `/api/insights`.
4.  **AI Analysis**: `gemini-1.5-flash` reasons over the metrics using the "AEO Strategist" system prompt.
5.  **Rendering**: The UI displays the returned insights, confidence score, and next best actions.

### 2. API Route: `/api/insights`

**Endpoint**: `POST /api/insights`

**Required Environment Variables**:
- `GEMINI_API_KEY`: Your Google Gemini API key.

**Request Payload (Sanitized)**:
```json
{
  "semantic_density": "45.2%",
  "ranking_momentum": "High Velocity",
  "ownership_score": "68.50",
  "retrieval_lift": "12.5%",
  "branded_share": "40.0%",
  "top_opportunities": "Sushi Maker (+15%), Lunchbox (+8%)",
  "selected_node_context": "Global View"
}
```

**Response Shape**:
```json
{
  "insights": [
    "Ownership is strong (68%) but branded share is low, indicating organic entity growth.",
    "High velocity in 'Sushi Maker' suggests recent schema injections are working."
  ],
  "nextBestActions": [
    "Low Hanging Fruit: Add FAQ schema to the 'Lunchbox' node.",
    "Moonshot: Target the 'Bento Accessories' Knowledge Panel."
  ],
  "confidence": 0.95
}
```

### 3. Sanitization Pipeline (`/lib/sanitizeMetrics.ts`)

This utility ensures data privacy and token efficiency.

-   **Input**: Full Zustand store state (Raw GSC rows, user queries).
-   **Output**: 6 key semantic signals.
-   **Security**: No user queries or raw performance rows are ever sent to the AI.

### 4. Scoring Logic

-   **Ranking Momentum**: Calculated based on the average `retrievalLift` of all active nodes.
    -   `> 10%`: High Velocity
    -   `> 0%`: Positive
    -   `< 0%`: Regressing
-   **Ownership Score**: A weighted composite of Merchant Position and Snippet Reach.
-   **Selection Efficiency**: The ratio of clicks to rich impressions (Semantic CTR).

### 5. System Prompt Versioning

- **v1.0 (Current)**:
    - Logic: Ownership < 40% = Risk, Lift > 10% = Success.
    - Constraints: Next Best Actions < 40 chars.
    - Model: `gemini-1.5-flash`.

---