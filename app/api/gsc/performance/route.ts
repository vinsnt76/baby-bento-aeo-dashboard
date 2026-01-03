import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// 1. Force 24-hour revalidation to save API quota
export const revalidate = 86400; 

export async function GET() {
  console.log("🚀 [GSC API] Initiating Performance Fetch...");

  // 2. Validate Env Variables
  const clientEmail = process.env.GSC_CLIENT_EMAIL;
  const privateKey = process.env.GSC_PRIVATE_KEY;
  const siteUrl = process.env.GSC_SITE_URL;

  if (!clientEmail || !privateKey || !siteUrl) {
    console.error("❌ [GSC API] Missing Environment Variables");
    return NextResponse.json({ error: "Configuration Missing" }, { status: 500 });
  }

  try {
    // 3. Setup Auth with RSA Key Fix
    const auth = new google.auth.JWT(
      clientEmail,
      undefined,
      privateKey.replace(/\\n/g, '\n'), // Fixes the Vercel newline issue
      ['https://www.googleapis.com/auth/webmasters.readonly']
    );

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // 4. Define Date Range (Last 30 days)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 2); // GSC data has a 2-day lag

    // 5. Query Search Console
    const response = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query', 'page'],
        rowLimit: 50,
      },
    });

    const rows = response.data.rows || [];
    console.log(`✅ [GSC API] Successfully retrieved ${rows.length} rows.`);

    return NextResponse.json(rows, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });

  } catch (error: any) {
    console.error("❌ [GSC API] Google SDK Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}