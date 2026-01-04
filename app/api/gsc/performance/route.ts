import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const revalidate = 86400; 

export async function GET() {
  const clientEmail = process.env.GSC_CLIENT_EMAIL;
  const siteUrl = process.env.GSC_SITE_URL;
  const rawKey = process.env.GSC_PRIVATE_KEY;

  if (!clientEmail || !rawKey || !siteUrl) {
    return NextResponse.json({ error: "Configuration Missing" }, { status: 500 });
  }

  console.log("KEY START:", rawKey.substring(0, 30));
  console.log("KEY END:", rawKey.substring(rawKey.length - 30));
  console.log("HAS_LITERAL_N:", rawKey.includes("\\n"));
  console.log("HAS_REAL_NEWLINES:", rawKey.includes("\n"));
  console.log("KEY_LENGTH:", rawKey.length);

try {
    // 3. Apply the "Final Boss Sanitizer"
    const formattedKey = rawKey
      .replace(/\\n/g, '\n')
      .replace(/"/g, '')
      .trim();

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedKey,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const response = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 50,
      },
    });

    console.log(`✅ [GSC API] SUCCESS!`);
    return NextResponse.json(response.data.rows || []);

  } catch (error: any) {
    console.error("❌ [GSC API] Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}