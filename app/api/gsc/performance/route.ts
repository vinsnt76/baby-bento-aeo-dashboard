import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export const revalidate = 86400; // 24-hour cache

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GSC_CLIENT_EMAIL,
        private_key: process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    // Using searchconsole v1 as it is the modern replacement for webmasters v3
    const gsc = google.searchconsole({ version: 'v1', auth });

    // 📅 Date Logic for Momentum
    const now = new Date();
    const thirtyDaysAgo = new Date(new Date().setDate(now.getDate() - 30));
    const sixtyDaysAgo = new Date(new Date().setDate(now.getDate() - 60));

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    // Fetch Current Period (Last 30 Days)
    const currentRes = await gsc.searchanalytics.query({
      siteUrl: process.env.GSC_SITE_URL,
      requestBody: {
        startDate: formatDate(thirtyDaysAgo),
        endDate: formatDate(now),
        dimensions: ['query'],
        rowLimit: 500,
      },
    });

    // Fetch Previous Period (31-60 Days ago)
    const previousRes = await gsc.searchanalytics.query({
      siteUrl: process.env.GSC_SITE_URL,
      requestBody: {
        startDate: formatDate(sixtyDaysAgo),
        endDate: formatDate(thirtyDaysAgo),
        dimensions: ['query'],
        rowLimit: 500,
      },
    });

    return NextResponse.json({
      current: currentRes.data.rows || [],
      previous: previousRes.data.rows || [],
      updatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('GSC API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}