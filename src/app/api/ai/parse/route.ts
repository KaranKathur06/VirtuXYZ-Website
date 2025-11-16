/**
 * AI Query Parser API
 * Parses natural language queries about properties and extracts filters
 */

import { NextRequest, NextResponse } from 'next/server';

interface ParsedFilters {
  location?: string;
  propertyType?: string;
  bedrooms?: number;
  purpose?: 'for-sale' | 'for-rent';
  minPrice?: number;
  maxPrice?: number;
  categoryExternalID?: string;
  searchUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      );
    }

    const lowerQuery = query.toLowerCase();
    const parsedFilters: ParsedFilters = {};

    // City/Location extraction
    const cities = [
      { name: 'Dubai', aliases: ['dubai'] },
      { name: 'Abu Dhabi', aliases: ['abu dhabi', 'abudhabi', 'abu-dhabi'] },
      { name: 'Sharjah', aliases: ['sharjah'] },
      { name: 'Ajman', aliases: ['ajman'] },
      { name: 'Ras Al Khaimah', aliases: ['ras al khaimah', 'rak'] },
      { name: 'Fujairah', aliases: ['fujairah'] },
      { name: 'Umm Al Quwain', aliases: ['umm al quwain'] },
    ];

    for (const city of cities) {
      if (city.aliases.some(alias => lowerQuery.includes(alias))) {
        parsedFilters.location = city.name;
        break;
      }
    }

    // Area extraction (within cities)
    const areas = [
      { name: 'Dubai Marina', aliases: ['dubai marina', 'marina'], city: 'Dubai' },
      { name: 'Palm Jumeirah', aliases: ['palm jumeirah', 'palm'], city: 'Dubai' },
      { name: 'Downtown Dubai', aliases: ['downtown dubai', 'downtown'], city: 'Dubai' },
      { name: 'Business Bay', aliases: ['business bay', 'business'], city: 'Dubai' },
      { name: 'JBR', aliases: ['jbr', 'jumeirah beach residence'], city: 'Dubai' },
      { name: 'Al Reem Island', aliases: ['al reem island', 'reem island', 'reem'], city: 'Abu Dhabi' },
    ];

    for (const area of areas) {
      if (area.aliases.some(alias => lowerQuery.includes(alias))) {
        parsedFilters.location = area.name;
        break;
      }
    }

    // Property type extraction
    const propertyTypes = [
      { name: 'Apartment', aliases: ['apartment', 'apartments', 'apt', 'apts', 'flat', 'flats'], categoryId: '4' },
      { name: 'Villa', aliases: ['villa', 'villas'], categoryId: '3' },
      { name: 'Penthouse', aliases: ['penthouse', 'penthouses', 'ph'], categoryId: '14' },
      { name: 'Townhouse', aliases: ['townhouse', 'townhouses', 'town home'], categoryId: '16' },
      { name: 'Office', aliases: ['office', 'offices'], categoryId: '6' },
      { name: 'Shop', aliases: ['shop', 'shops', 'retail'], categoryId: '5' },
    ];

    for (const type of propertyTypes) {
      if (type.aliases.some(alias => lowerQuery.includes(alias))) {
        parsedFilters.propertyType = type.name;
        parsedFilters.categoryExternalID = type.categoryId;
        break;
      }
    }

    // Bedrooms extraction
    const bedroomPatterns = [
      /(\d+)\s*(?:bed|bedroom|br|bhk)/i,
      /(\d+)\s*(?:room|rooms)/i,
    ];

    for (const pattern of bedroomPatterns) {
      const match = lowerQuery.match(pattern);
      if (match) {
        parsedFilters.bedrooms = parseInt(match[1]);
        break;
      }
    }

    // Purpose extraction (rent/sale)
    if (lowerQuery.includes('rent') || lowerQuery.includes('rental') || lowerQuery.includes('lease') || lowerQuery.includes('leasing')) {
      parsedFilters.purpose = 'for-rent';
    } else if (lowerQuery.includes('buy') || lowerQuery.includes('sale') || lowerQuery.includes('purchase') || lowerQuery.includes('sell')) {
      parsedFilters.purpose = 'for-sale';
    }

    // Price extraction
    const pricePatterns = [
      /(\d+(?:\.\d+)?)\s*(m|million)\s*(?:aed|dhs)?/i,
      /(\d+(?:\.\d+)?)\s*(k|thousand)\s*(?:aed|dhs)?/i,
      /under\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand)/i,
      /below\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand)/i,
      /upto\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand)/i,
      /up\s*to\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand)/i,
      /(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand)/i,
      /(\d+(?:\.\d+)?)\s*to\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand)/i,
    ];

    for (const pattern of pricePatterns) {
      const match = lowerQuery.match(pattern);
      if (match) {
        const unit = (match[match.length - 1] || '').toLowerCase();
        const multiplier = unit === 'm' || unit === 'million' ? 1000000 : 1000;

        if (pattern.source.includes('-') || pattern.source.includes('to')) {
          // Range
          const min = parseFloat(match[1]) * multiplier;
          const max = parseFloat(match[2]) * multiplier;
          parsedFilters.minPrice = min;
          parsedFilters.maxPrice = max;
        } else if (pattern.source.includes('under') || pattern.source.includes('below') || pattern.source.includes('upto')) {
          // Max price
          parsedFilters.maxPrice = parseFloat(match[1]) * multiplier;
        } else {
          // Single price (treat as max)
          parsedFilters.maxPrice = parseFloat(match[1]) * multiplier;
        }
        break;
      }
    }

    // Build search URL for redirect
    const searchParams = new URLSearchParams();
    if (parsedFilters.location) {
      searchParams.append('location', parsedFilters.location);
    }
    if (parsedFilters.purpose) {
      searchParams.append('purpose', parsedFilters.purpose);
    }
    if (parsedFilters.categoryExternalID) {
      searchParams.append('category', parsedFilters.categoryExternalID);
    }
    if (parsedFilters.bedrooms) {
      searchParams.append('rooms', parsedFilters.bedrooms.toString());
    }
    if (parsedFilters.minPrice) {
      searchParams.append('minPrice', parsedFilters.minPrice.toString());
    }
    if (parsedFilters.maxPrice) {
      searchParams.append('maxPrice', parsedFilters.maxPrice.toString());
    }

    parsedFilters.searchUrl = `/explore?${searchParams.toString()}`;

    return NextResponse.json({
      success: true,
      filters: parsedFilters,
      query,
    });
  } catch (error) {
    console.error('AI Parse Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to parse query',
      },
      { status: 500 }
    );
  }
}

