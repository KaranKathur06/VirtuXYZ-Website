/**
 * API Route: /api/properties/search
 * Search UAE properties with filters using Zyla Labs API
 */

import { NextRequest, NextResponse } from 'next/server';
import { getProperties, autocompleteLocation, GetPropertiesParams } from '@/lib/api/zylaClient';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extract and validate parameters
    const location = searchParams.get('location');
    const purpose = searchParams.get('purpose') as 'for-sale' | 'for-rent' | null;
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const rooms = searchParams.get('rooms');
    const baths = searchParams.get('baths');
    const sort = searchParams.get('sort');
    const page = searchParams.get('page');

    // Step 1: If location is provided, get its externalID
    let locationExternalID: string | undefined;
    
    if (location && location.trim()) {
      try {
        const locationResults = await autocompleteLocation(location);
        
        if (locationResults.length > 0) {
          // Use the first matching location
          locationExternalID = locationResults[0].externalID;
        }
      } catch (error) {
        console.error('Location autocomplete error:', error);
        // Continue without location filter if autocomplete fails
      }
    }

    // Step 2: Build query parameters
    const queryParams: GetPropertiesParams = {
      page: page ? parseInt(page) : 0,
      hitsPerPage: 25,
    };

    if (locationExternalID) {
      queryParams.locationExternalIDs = locationExternalID;
    }

    if (purpose) {
      queryParams.purpose = purpose;
    }

    if (category) {
      queryParams.categoryExternalID = category;
    }

    if (minPrice) {
      queryParams.minPrice = parseInt(minPrice);
    }

    if (maxPrice) {
      queryParams.maxPrice = parseInt(maxPrice);
    }

    if (rooms) {
      queryParams.rooms = parseInt(rooms);
    }

    if (baths) {
      queryParams.baths = parseInt(baths);
    }

    if (sort) {
      queryParams.sort = sort as any;
    }

    // Step 3: Fetch properties
    const response = await getProperties(queryParams);

    console.log('API Response:', JSON.stringify(response, null, 2));

    // Step 4: Check if response has expected structure
    if (!response || !response.hits || !Array.isArray(response.hits)) {
      console.error('Unexpected API response structure:', response);
      return NextResponse.json({
        success: true,
        data: {
          properties: [],
          total: 0,
          page: 0,
          totalPages: 0,
          hasMore: false,
        },
      });
    }

    // Step 5: Transform response for frontend
    const transformedProperties = response.hits.map(property => ({
      id: property.id,
      externalID: property.externalID,
      title: property.title,
      price: property.price,
      currency: 'AED',
      location: {
        city: property.location?.[0]?.name || 'UAE',
        area: property.location?.[property.location.length - 1]?.name || '',
        coordinates: property.geography,
      },
      propertyType: property.category?.[0]?.name || property.type,
      bedrooms: property.rooms,
      bathrooms: property.baths,
      area: property.area,
      areaUnit: 'sqft',
      images: Array.isArray(property.photos) ? property.photos.map(photo => photo.url) : [],
      coverImage: property.coverPhoto?.url || property.photos?.[0]?.url || '',
      amenities: Array.isArray(property.amenities) ? property.amenities.map(a => a.text) : [],
      furnished: property.furnishingStatus || 'unfurnished',
      listingType: property.purpose,
      rentFrequency: property.rentFrequency,
      agency: {
        name: property.agency?.name || 'Unknown Agency',
        logo: property.agency?.logo?.url || '',
      },
      agent: {
        name: property.agent?.name || 'Unknown Agent',
      },
      isVerified: property.isVerified,
      datePosted: property.createdAt,
      referenceNumber: property.referenceNumber,
    }));

    return NextResponse.json({
      success: true,
      data: {
        properties: transformedProperties,
        total: response.nbHits,
        page: response.page,
        totalPages: response.nbPages,
        hasMore: response.page < response.nbPages - 1,
      },
    });
  } catch (error) {
    console.error('Properties Search API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch properties',
      },
      { status: 500 }
    );
  }
}
