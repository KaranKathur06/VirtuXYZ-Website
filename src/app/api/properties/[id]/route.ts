/**
 * API Route: /api/properties/[id]
 * Get single property details by externalID
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPropertyDetails } from '@/lib/api/zylaClient';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    // Fetch property details from Zyla API
    const property = await getPropertyDetails(id);

    // Transform response for frontend
    const transformedProperty = {
      id: property.id,
      externalID: property.externalID,
      title: property.title,
      description: property.description,
      price: property.price,
      currency: 'AED',
      location: {
        city: property.location[0]?.name || 'UAE',
        area: property.location[property.location.length - 1]?.name || '',
        fullLocation: property.location.map(l => l.name).join(', '),
        coordinates: property.geography,
      },
      propertyType: property.category[0]?.name || property.type,
      category: property.category.map(c => c.name),
      bedrooms: property.rooms,
      bathrooms: property.baths,
      area: property.area,
      areaUnit: 'sqft',
      images: property.photos.map(photo => ({
        id: photo.id,
        url: photo.url,
        title: photo.title,
      })),
      coverImage: property.coverPhoto?.url || property.photos[0]?.url || '',
      floorPlans: property.floorPlans,
      videos: property.videos,
      panoramas: property.panoramas,
      amenities: property.amenities.map(a => ({
        text: a.text,
        value: a.value,
        slug: a.slug,
      })),
      furnished: property.furnishingStatus || 'unfurnished',
      listingType: property.purpose,
      rentFrequency: property.rentFrequency,
      agency: {
        id: property.agency.id,
        name: property.agency.name,
        logo: property.agency.logo.url,
        tier: property.agency.tier,
        externalID: property.agency.externalID,
      },
      agent: {
        id: property.agent.id,
        name: property.agent.name,
        logo: property.agent.logo.url,
        externalID: property.agent.externalID,
      },
      isVerified: property.isVerified,
      verification: property.verification,
      datePosted: property.createdAt,
      dateUpdated: property.updatedAt,
      referenceNumber: property.referenceNumber,
      permitNumber: property.permitNumber,
      completionStatus: property.completionStatus,
    };

    return NextResponse.json({
      success: true,
      data: transformedProperty,
    });
  } catch (error) {
    console.error('Property Details API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch property details',
      },
      { status: 500 }
    );
  }
}
