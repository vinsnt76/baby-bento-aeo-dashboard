import { google } from 'googleapis';
import { NextResponse, NextRequest } from 'next/server';

export const revalidate = 86400; // 24-hour cache

export async function GET(request: NextRequest) {
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

    // 📅 Date Logic
    const { searchParams } = new URL(request.url);
    const startParam = searchParams.get('start');
    const endParam = searchParams.get('end');

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    
    let currentStartDate, currentEndDate, previousStartDate, previousEndDate;

    if (startParam && endParam) {
      // Use provided dates
      currentStartDate = startParam;
      currentEndDate = endParam;
      
      // Calculate previous period (same duration, ending 1 day before start)
      const start = new Date(startParam);
      const end = new Date(endParam);
      const durationTime = end.getTime() - start.getTime();
      
      const prevEnd = new Date(start.getTime() - 86400000); // 1 day before start
      const prevStart = new Date(prevEnd.getTime() - durationTime);
      
      previousEndDate = formatDate(prevEnd);
      previousStartDate = formatDate(prevStart);
    } else {
      // Default: Last 30 days vs previous 30 days
      const now = new Date();
      const thirtyDaysAgo = new Date(new Date().setDate(now.getDate() - 30));
      const sixtyDaysAgo = new Date(new Date().setDate(now.getDate() - 60));

      currentStartDate = formatDate(thirtyDaysAgo);
      currentEndDate = formatDate(now);
      previousStartDate = formatDate(sixtyDaysAgo);
      previousEndDate = formatDate(thirtyDaysAgo);
    }

    // Fetch Current Period (Last 30 Days)
    const currentRes = await gsc.searchanalytics.query({
      siteUrl: process.env.GSC_SITE_URL,
      requestBody: {
        startDate: currentStartDate,
        endDate: currentEndDate,
        dimensions: ['query'],
        rowLimit: 500,
      },
    });

    // Fetch Previous Period (31-60 Days ago)
    const previousRes = await gsc.searchanalytics.query({
      siteUrl: process.env.GSC_SITE_URL,
      requestBody: {
        startDate: previousStartDate,
        endDate: previousEndDate,
        dimensions: ['query'],
        rowLimit: 500,
      },
    });

    return NextResponse.json({
      current: {
        rows: currentRes.data.rows || [],
        startDate: currentStartDate,
        endDate: currentEndDate,
      },
      previous: {
        rows: previousRes.data.rows || [],
        startDate: previousStartDate,
        endDate: previousEndDate,
      },
      updatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('GSC API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}