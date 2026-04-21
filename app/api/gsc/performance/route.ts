import { google } from 'googleapis';
import { NextResponse, NextRequest } from 'next/server';

export const revalidate = 86400; // 24-hour cache

// Helper to ensure we have a valid YYYY-MM-DD string
const toISODate = (input: string | null): string | null => {
  if (!input) return null;
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
};

// Best practice: Validate environment variables early
const GSC_CONFIG = {
  clientEmail: process.env.GSC_CLIENT_EMAIL,
  privateKey: process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  siteUrl: process.env.GSC_SITE_URL,
};

interface GSCRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

export async function GET(request: NextRequest) {
  try {
    if (!GSC_CONFIG.clientEmail || !GSC_CONFIG.privateKey || !GSC_CONFIG.siteUrl) {
      throw new Error('Missing GSC configuration environment variables');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GSC_CONFIG.clientEmail,
        private_key: GSC_CONFIG.privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    // Using searchconsole v1 as it is the modern replacement for webmasters v3
    const gsc = google.searchconsole({ version: 'v1', auth });

    // 📅 Date Logic
    const { searchParams } = new URL(request.url);
    
    // 1. Sanitize the inputs immediately
    const sanitizedStart = toISODate(searchParams.get('start'));
    const sanitizedEnd = toISODate(searchParams.get('end'));

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    
    let currentStartDate, currentEndDate, previousStartDate, previousEndDate;

    // 2. Only use params if BOTH are valid ISO-style strings
    if (sanitizedStart && sanitizedEnd) {
      // Use provided dates
      currentStartDate = sanitizedStart;
      currentEndDate = sanitizedEnd;
      
      // Calculate previous period (same duration, ending 1 day before start)
      const start = new Date(currentStartDate);
      const end = new Date(currentEndDate);
      const durationTime = end.getTime() - start.getTime();
      
      const prevEnd = new Date(start.getTime() - 86400000); // 1 day before start
      const prevStart = new Date(prevEnd.getTime() - durationTime);
      
      previousEndDate = formatDate(prevEnd);
      previousStartDate = formatDate(prevStart);
    } else {
      // Default: Last 30 days vs previous 30 days
      // Use UTC to ensure consistency across environments
      const now = new Date(); 
      now.setUTCHours(0, 0, 0, 0);
      const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      const sixtyDaysAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000));

      currentStartDate = formatDate(thirtyDaysAgo);
      currentEndDate = formatDate(now);
      previousStartDate = formatDate(sixtyDaysAgo);
      previousEndDate = formatDate(thirtyDaysAgo);
    }

    // Fetch Current Period (Last 30 Days)
    const currentRes = await gsc.searchanalytics.query({
      siteUrl: GSC_CONFIG.siteUrl,
      requestBody: {
        startDate: currentStartDate,
        endDate: currentEndDate,
        dimensions: ['query'],
        rowLimit: 500,
      },
    });

    // Fetch Previous Period (31-60 Days ago)
    const previousRes = await gsc.searchanalytics.query({
      siteUrl: GSC_CONFIG.siteUrl,
      requestBody: {
        startDate: previousStartDate,
        endDate: previousEndDate,
        dimensions: ['query'],
        rowLimit: 500,
      },
    });

    return NextResponse.json({
      current: {
        rows: (currentRes.data.rows as GSCRow[]) || [],
        startDate: currentStartDate,
        endDate: currentEndDate,
      },
      previous: {
        rows: (previousRes.data.rows as GSCRow[]) || [],
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