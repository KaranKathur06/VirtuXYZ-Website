/**
 * Test endpoint to verify API key is loaded correctly
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.ZYLA_API_KEY;
  
  return NextResponse.json({
    hasApiKey: !!apiKey,
    keyLength: apiKey?.length || 0,
    keyPreview: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not set',
    baseUrl: 'https://zylalabs.com/api/11013/uae+real+estate+data++api',
    endpoints: {
      autocomplete: '/20812/autocomplete',
      properties: '/20814/properties',
      propertyDetails: '/20816/property+details',
    },
    message: apiKey ? '✅ API Key is configured!' : '❌ API Key is missing! Create .env.local file with ZYLA_API_KEY=your_key',
  });
}
