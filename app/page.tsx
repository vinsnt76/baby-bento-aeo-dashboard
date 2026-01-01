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
