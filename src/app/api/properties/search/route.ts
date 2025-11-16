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
      region: 'uae', // Required by API
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

    // Step 4: Check if response has expected structure (Zyla format)
    if (!response) {
      console.error('No response from getProperties');
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

    // Handle Zyla API format: { hits: [...], nbHits: ..., page: ..., nbPages: ... }
    let properties: any[] = [];
    let backendTotal = 0;
    let currentPage = 0;
    let backendTotalPages = 0;

    // Cast response to any to handle different response formats
    const responseData = response as any;

    if (responseData.hits && Array.isArray(responseData.hits)) {
      // Zyla format: { hits: [...], nbHits: ..., page: ..., nbPages: ... }
      properties = responseData.hits;
      backendTotal = responseData.nbHits || 0;
      currentPage = responseData.page || 0;
      backendTotalPages = responseData.nbPages || 0;
    } else if (responseData.success && responseData.data && Array.isArray(responseData.data)) {
      // API format with success flag: { success: true, data: [...], pagination: {...} }
      properties = responseData.data;
      backendTotal = responseData.pagination?.total || responseData.total || properties.length;
      currentPage = responseData.pagination?.page || responseData.page || (queryParams.page || 0);
      backendTotalPages = responseData.pagination?.pages || responseData.totalPages || Math.ceil(backendTotal / (queryParams.hitsPerPage || 25));
    } else if (responseData.data && Array.isArray(responseData.data)) {
      // Alternative format with data array (no success flag)
      properties = responseData.data;
      backendTotal = responseData.pagination?.total || responseData.total || properties.length;
      currentPage = responseData.pagination?.page || responseData.page || (queryParams.page || 0);
      backendTotalPages = responseData.pagination?.pages || responseData.totalPages || Math.ceil(backendTotal / (queryParams.hitsPerPage || 25));
    } else if (Array.isArray(responseData)) {
      // Direct array response
      properties = responseData;
      backendTotal = properties.length;
      currentPage = queryParams.page || 0;
      backendTotalPages = Math.ceil(properties.length / (queryParams.hitsPerPage || 25));
    } else {
      console.error('Unexpected API response structure:', responseData);
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

    // Store original counts before filtering
    const originalPageCount = properties.length;

    // Step 5: Transform response for frontend
    let transformedProperties = properties.map(property => {
      // Handle different property data structures
      const prop = property as any;
      
      // Check if it's already in the expected format (from alternative API)
      // This handles API responses with property_info, features, dates structure
      if (prop.title && prop.price && prop.location && (prop.property_info || prop.features)) {
        // Extract listing type from property_info.listing_type and normalize it
        const rawListingType = prop.property_info?.listing_type?.toLowerCase() || '';
        const normalizedListingType = rawListingType === 'sale' ? 'for-sale' : 
                                     rawListingType === 'rent' ? 'for-rent' :
                                     prop.purpose || prop.listingType || 'for-sale';
        
        // Already transformed or from different API format
        return {
          id: prop.id || prop.listing_id || prop.externalID || `prop-${Date.now()}-${Math.random()}`,
          externalID: prop.externalID || prop.listing_id || prop.id,
          title: prop.title,
          price: prop.price?.asking_price || prop.price?.asking_price_parsed || (typeof prop.price === 'number' ? prop.price : 0),
          currency: 'AED',
          location: {
            city: prop.location?.city || prop.location?.region || 'UAE',
            area: prop.location?.suburb || prop.location?.area || '',
            coordinates: prop.location?.coordinates || prop.geography,
          },
          propertyType: prop.property_info?.property_type || prop.propertyType || prop.category?.[0]?.name || 'Property',
          bedrooms: prop.features?.bedrooms || prop.rooms || prop.bedrooms || 0,
          bathrooms: prop.features?.bathrooms || prop.baths || prop.bathrooms || 0,
          area: prop.features?.floor_area || prop.area || 0,
          areaUnit: 'sqft',
          images: prop.images || prop.photos?.map((p: any) => p.url) || [],
          coverImage: prop.coverImage || prop.coverPhoto?.url || prop.photos?.[0]?.url || '',
          amenities: prop.amenities || (prop.features ? Object.keys(prop.features || {}).filter((k: string) => prop.features[k]) : []),
          furnished: prop.furnished || 'unfurnished',
          listingType: normalizedListingType,
          rentFrequency: prop.rentFrequency || null,
          agency: {
            name: prop.agent?.company || prop.agency?.name || 'Unknown Agency',
            logo: prop.agency?.logo?.url || '',
          },
          agent: {
            name: prop.agent?.name || 'Unknown Agent',
          },
          isVerified: prop.isVerified || false,
          datePosted: prop.dates?.listed || prop.createdAt || prop.datePosted,
          referenceNumber: prop.referenceNumber || prop.listing_id || '',
          // Keep raw data for filtering - store the original property object for deeper access
          _rawRooms: prop.features?.bedrooms || prop.rooms || prop.bedrooms || 0,
          _rawPrice: prop.price?.asking_price || prop.price?.asking_price_parsed || (typeof prop.price === 'number' ? prop.price : 0),
          _rawPurpose: normalizedListingType,
          _rawCategoryId: prop.category?.[0]?.externalID || prop.property_info?.category_id,
          _rawProperty: prop, // Store entire property object for deeper filtering checks
        };
      }
      
      // Zyla format (property object structure)
      return {
        id: prop.id,
        externalID: prop.externalID,
        title: prop.title,
        price: prop.price,
        currency: 'AED',
        location: {
          city: prop.location?.[0]?.name || 'UAE',
          area: prop.location?.[prop.location.length - 1]?.name || '',
          coordinates: prop.geography,
        },
        propertyType: prop.category?.[0]?.name || prop.type,
        bedrooms: prop.rooms,
        bathrooms: prop.baths,
        area: prop.area,
        areaUnit: 'sqft',
        images: Array.isArray(prop.photos) ? prop.photos.map((photo: any) => photo.url) : [],
        coverImage: prop.coverPhoto?.url || prop.photos?.[0]?.url || '',
        amenities: Array.isArray(prop.amenities) ? prop.amenities.map((a: any) => a.text) : [],
        furnished: prop.furnishingStatus || 'unfurnished',
        listingType: prop.purpose,
        rentFrequency: prop.rentFrequency,
        agency: {
          name: prop.agency?.name || 'Unknown Agency',
          logo: prop.agency?.logo?.url || '',
        },
        agent: {
          name: prop.agent?.name || 'Unknown Agent',
        },
        isVerified: prop.isVerified,
        datePosted: prop.createdAt,
        referenceNumber: prop.referenceNumber,
        // Keep raw data for filtering
        _rawRooms: prop.rooms,
        _rawPrice: prop.price,
        _rawPurpose: prop.purpose,
        _rawCategoryId: prop.category?.[0]?.externalID,
      };
    });

    // Step 6: Apply client-side filtering to ensure exact matches
    // This is a defensive measure to guarantee filter accuracy
    // Note: This filters only the current page. The backend should filter correctly,
    // but this ensures no mismatched properties slip through.
    const filteredProperties = transformedProperties.filter((prop: any) => {
      // Filter by bedrooms (>= match for "2+" semantics)
      if (rooms !== null) {
        const propRooms = prop._rawRooms ?? prop.bedrooms ?? 0;
        const requestedRooms = parseInt(rooms);
        // Support "2+" semantics: if user requests 2 bedrooms, show 2 or more
        if (propRooms < requestedRooms) {
          console.log(`Filtered out property: bedrooms too few (${propRooms} < ${requestedRooms})`);
          return false;
        }
      }

      // Filter by price range
      if (minPrice !== null) {
        const propPrice = prop._rawPrice ?? prop.price ?? 0;
        const min = parseInt(minPrice);
        if (propPrice < min) {
          console.log(`Filtered out property: price too low (${propPrice} < ${min})`);
          return false;
        }
      }
      if (maxPrice !== null) {
        const propPrice = prop._rawPrice ?? prop.price ?? 0;
        const max = parseInt(maxPrice);
        if (propPrice > max) {
          console.log(`Filtered out property: price too high (${propPrice} > ${max})`);
          return false;
        }
      }

      // Filter by purpose (for-sale/for-rent)
      if (purpose) {
        const propPurpose = prop._rawPurpose ?? prop.listingType;
        // Also check raw property object if available
        const rawProperty = (prop as any)._rawProperty;
        const rawListingType = rawProperty?.property_info?.listing_type?.toLowerCase();
        
        // Normalize both values for comparison (handle case sensitivity and format variations)
        const normalizedPropPurpose = propPurpose?.toLowerCase().replace('_', '-') || '';
        const normalizedRequestedPurpose = purpose.toLowerCase().replace('_', '-');
        
        // Determine if property is sale or rent
        const isSale = normalizedPropPurpose.includes('sale') || rawListingType === 'sale';
        const isRent = normalizedPropPurpose.includes('rent') || rawListingType === 'rent';
        
        // Check if it matches the requested purpose
        const matchesSale = normalizedRequestedPurpose === 'for-sale' && isSale;
        const matchesRent = normalizedRequestedPurpose === 'for-rent' && isRent;
        
        if (!matchesSale && !matchesRent) {
          console.log(`Filtered out property: purpose mismatch (${propPurpose || rawListingType || 'unknown'} !== ${purpose})`);
          return false;
        }
      }

      // Filter by category (property type)
      if (category) {
        const propCategoryId = prop._rawCategoryId;
        // Only filter if we have a category ID to compare
        if (propCategoryId && propCategoryId !== category) {
          console.log(`Filtered out property: category mismatch (${propCategoryId} !== ${category})`);
          return false;
        }
      }

      return true;
    });

    // Remove temporary filter fields before returning
    const cleanedProperties = filteredProperties.map((prop: any) => {
      const { _rawRooms, _rawPrice, _rawPurpose, _rawCategoryId, _rawProperty, ...cleanProp } = prop;
      return cleanProp;
    });

    // Log filtering results for debugging
    const filteredOutCount = transformedProperties.length - filteredProperties.length;
    if (filteredOutCount > 0) {
      console.log(`⚠️  Filtered ${filteredOutCount} properties that didn't match filters`);
    }

    // Calculate adjusted totals based on filtering ratio
    // Since we only have one page, we estimate the filtered total based on this page's filtering ratio
    let adjustedTotal = backendTotal;
    let adjustedTotalPages = backendTotalPages;

    // If we filtered properties on this page, adjust totals proportionally
    if (originalPageCount > 0 && filteredOutCount > 0) {
      const filteringRatio = filteredProperties.length / originalPageCount;
      adjustedTotal = Math.ceil(backendTotal * filteringRatio);
      adjustedTotalPages = Math.ceil(adjustedTotal / (queryParams.hitsPerPage || 25));
    }

    // Ensure we don't report more total pages than we have filtered properties
    if (adjustedTotalPages === 0 && cleanedProperties.length > 0) {
      adjustedTotalPages = 1;
      adjustedTotal = cleanedProperties.length;
    }

    return NextResponse.json({
      success: true,
      data: {
        properties: cleanedProperties,
        total: adjustedTotal,
        page: currentPage,
        totalPages: adjustedTotalPages,
        hasMore: cleanedProperties.length > 0 && currentPage < adjustedTotalPages - 1,
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
