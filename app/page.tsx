import React from 'react';

// This is your current AEO snapshot based on the DEC 25 CSV data
const aeoData = [
  { 
    url: "/australia-insulated-lunch-bags-top-brands-2026", 
    schema: "FAQ, Article, Product", 
    lift: "+229%", 
    status: "Buoyant", 
    impressions: "2,130",
    color: "text-green-600 bg-green-50"
  },
  { 
    url: "/lunchbox-solutions-for-busy-parents", 
    schema: "HowTo, FAQ, Article", 
    lift: "New", 
    status: "Establishing", 
    impressions: "433",
    color: "text-blue-600 bg-blue-50"
  },
  { 
    url: "/blogs/recipes/easy-sushi-maker-kids-bento", 
    schema: "HowTo, FAQ", 
    lift: "0%", 
    status: "❌ Missing", 
    impressions: "21",
    color: "text-red-600 bg-red-50"
  }
];

export default function AEOReport() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans text-gray-900">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Baby Bento AEO Command</h1>
          <p className="text-gray-500 mt-1">Buoyancy & Lift Tracker • December 2025 Audit</p>
        </div>
        <div className="flex gap-3">
          <span className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium shadow-sm">
            Merchant Pos: <span className="text-purple-600 font-bold">2.85</span>
          </span>
          <span className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium shadow-sm">
            Live on Vercel
          </span>
        </div>
      </header>

      {/* Metric Cards Row */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Top Page Lift</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-bold text-gray-900">+229%</span>
            <span className="text-green-500 font-medium text-sm">↑ 1,483 impr</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Rich Snippet Volume</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-bold text-gray-900">1,581</span>
            <span className="text-blue-500 font-medium text-sm">Product Snippets</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Conversion Intent</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-bold text-gray-900">10.7%</span>
            <span className="text-purple-500 font-medium text-sm">Avg CTR</span>
          </div>
        </div>
      </div>

      {/* Buoyancy Table */}
      <section className="max-w-7xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Optimization Buoyancy Tracker</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Page Path</th>
                <th className="px-6 py-4 font-semibold">Schema Implemented</th>
                <th className="px-6 py-4 font-semibold">Lift</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {aeoData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800 truncate max-w-xs">{item.url}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm italic">{item.schema}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{item.lift}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.color}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Query Intent Pivot Section */}
      <section className="max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Top Performing Queries */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>🎯</span> High-Intent Query Pivot
            </h2>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-gray-100">
              <li className="p-4 flex justify-between items-center hover:bg-blue-50/30 transition">
                <div>
                  <p className="text-sm font-bold text-gray-900">best insulated lunch bag australia</p>
                  <p className="text-xs text-gray-500">AEO Conversion Winner</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">10.7% CTR</p>
                  <p className="text-xs text-gray-400">Pos: 2.44</p>
                </div>
              </li>
              <li className="p-4 flex justify-between items-center hover:bg-blue-50/30 transition">
                <div>
                  <p className="text-sm font-bold text-gray-900">training chopsticks for adults</p>
                  <p className="text-xs text-gray-500">Niche Authority</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">1.8% CTR</p>
                  <p className="text-xs text-gray-400">Impr: 274</p>
                </div>
              </li>
              <li className="p-4 flex justify-between items-center hover:bg-blue-50/30 transition">
                <div>
                  <p className="text-sm font-bold text-gray-900">best insulated lunch bag</p>
                  <p className="text-xs text-gray-500">Broad Intent Lift</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">↑ 30.6 to 6.7</p>
                  <p className="text-xs text-gray-400">Massive Pos. Jump</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Device Buoyancy (Mobile vs Desktop) */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📱</span> Device Buoyancy
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-600">Mobile (Primary AEO Source)</span>
                <span className="font-bold text-gray-900">31,404 Impr.</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-600">Desktop</span>
                <span className="font-bold text-gray-900">16,319 Impr.</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-gray-400 h-3 rounded-full" style={{ width: '34%' }}></div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>Insight:</strong> Mobile traffic is driving 2x the impressions of Desktop. Ensure FAQ accordions and How-To steps are optimized for vertical scrolling to maintain the 1.32% Mobile CTR.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* Markdown Comparison: SEO vs. AEO */}
      <section className="max-w-7xl mx-auto mt-16 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">The Paradigm Shift</h2>
          <p className="text-gray-500 italic">Moving from "Ranking" to "Retrieval"</p>
        </div>
        
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-900 text-white font-bold uppercase tracking-widest text-xs">
            <div className="p-4 border-b md:border-b-0 md:border-r border-gray-700">Dimension</div>
            <div className="p-4 border-b md:border-b-0 md:border-r border-gray-700 bg-gray-800">Traditional SEO</div>
            <div className="p-4 text-blue-400">Modern AEO Paradigm</div>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 hover:bg-gray-50 transition">
              <div className="p-6 bg-gray-50/50 font-bold text-gray-700 border-r border-gray-100">Primary "Reader"</div>
              <div className="p-6 text-gray-500 italic border-r border-gray-100">Web Crawlers & Humans</div>
              <div className="p-6 text-blue-900 font-semibold">LLM Agents & Retrieval Models</div>
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 hover:bg-gray-50 transition">
              <div className="p-6 bg-gray-50/50 font-bold text-gray-700 border-r border-gray-100">Unit of Optimization</div>
              <div className="p-6 text-gray-500 italic border-r border-gray-100">Monolithic Pages (URLs)</div>
              <div className="p-6 text-blue-900 font-semibold">Atomic Chunks & Knowledge Nodes</div>
            </div>
            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 hover:bg-gray-50 transition">
              <div className="p-6 bg-gray-50/50 font-bold text-gray-700 border-r border-gray-100">Primary Metric</div>
              <div className="p-6 text-gray-500 italic border-r border-gray-100">Click-Through Rate (CTR)</div>
              <div className="p-6 text-blue-900 font-semibold">Share of Model (SoM) & Citations</div>
            </div>
            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 hover:bg-gray-50 transition">
              <div className="p-6 bg-gray-50/50 font-bold text-gray-700 border-r border-gray-100">Technical Pivot</div>
              <div className="p-6 text-gray-500 italic border-r border-gray-100">Sitemaps & Title Tags</div>
              <div className="p-6 text-blue-900 font-semibold">Schema Markup & Monosemanticity</div>
            </div>
             {/* Row 5 */}
             <div className="grid grid-cols-1 md:grid-cols-3 hover:bg-gray-50 transition">
              <div className="p-6 bg-gray-50/50 font-bold text-gray-700 border-r border-gray-100">Success Goal</div>
              <div className="p-6 text-gray-500 italic border-r border-gray-100">Winning the Click</div>
              <div className="p-6 text-green-600 font-bold italic underline decoration-green-200">Winning Selection & Attribution</div>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Specialist Finding Box */}
      <footer className="max-w-7xl mx-auto mt-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
        <div className="flex gap-3">
          <span className="text-2xl">🔍</span>
          <div>
            <h4 className="font-bold text-blue-900">AEO Strategic Finding</h4>
            <p className="text-blue-800 mt-1 opacity-80">
              High-intent queries like <code className="bg-blue-100 px-1 rounded">best insulated lunch bag australia</code> are showing immediate "Lift" within 30 days of FAQ/Product schema injection. Critical priority: Re-validate schema on "Missing" pages to recapture SERP real estate.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
