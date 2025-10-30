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
    baseUrl: process.env.ZYLA_API_BASE_URL || 'Not set',
  });
}
