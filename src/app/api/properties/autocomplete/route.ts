/**
 * API Route: /api/properties/autocomplete
 * Autocomplete location search for UAE properties
 */

import { NextRequest, NextResponse } from 'next/server';
import { autocompleteLocation } from '@/lib/api/zylaClient';

// Force dynamic rendering - this route uses searchParams
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query parameter is required and must be at least 2 characters' },
        { status: 400 }
      );
    }

    const results = await autocompleteLocation(query);

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    console.error('Autocomplete API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch autocomplete results',
      },
      { status: 500 }
    );
  }
}
