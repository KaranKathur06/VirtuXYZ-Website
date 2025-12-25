/**
 * Mock property data for development/fallback
 */

import { Property, PropertyListResponse } from './zylaClient';

export const mockProperties: Property[] = [
  {
    id: 1,
    ownerID: 1001,
    userExternalID: "user-001",
    sourceID: 1,
    state: "active",
    geography: { lat: 25.2048, lng: 55.2708 },
    purpose: "for-sale",
    price: 1500000,
    product: "premium",
    productLabel: "Premium",
    productScore: 95,
    rentFrequency: null,
    referenceNumber: "REF-001",
    permitNumber: "PER-001",
    projectNumber: "PROJ-001",
    title: "Luxury 3 Bedroom Apartment in Dubai Marina",
    title_l1: "شقة فاخرة 3 غرف نوم في دبي مارينا",
    externalID: "ext-001",
    slug: "luxury-3-bedroom-apartment-dubai-marina",
    slug_l1: "شقة-فاخرة-3-غرف-نوم-دبي-مارينا",
    location: [
      {
        id: 1,
        level: 1,
        externalID: "2", // Dubai external ID
        name: "Dubai",
        name_l1: "دبي",
        slug: "dubai",
        slug_l1: "دبي",
      },
      {
        id: 2,
        level: 2,
        externalID: "marina-01", // Area external ID
        name: "Dubai Marina",
        name_l1: "دبي مارينا",
        slug: "dubai-marina",
        slug_l1: "دبي-مارينا",
      },
    ],
    category: [
      {
        id: 1,
        level: 1,
        externalID: "4",
        name: "Apartment",
        name_l1: "شقة",
        slug: "apartment",
        slug_l1: "شقة",
      },
    ],
    createdAt: "2024-10-01T10:00:00Z",
    approvedAt: "2024-10-01T12:00:00Z",
    updatedAt: "2024-10-25T15:30:00Z",
    touchedAt: "2024-10-25T15:30:00Z",
    reactivatedAt: "2024-10-01T12:00:00Z",
    rooms: 3,
    baths: 3,
    area: 2000,
    score: 95,
    score_l1: 95,
    coverPhoto: {
      id: 1,
      externalID: "photo-001",
      title: "Living Room View",
      url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    },
    photoIDs: [1, 2, 3, 4],
    photos: [
      {
        id: 1,
        externalID: "photo-001",
        title: "Living Room",
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      },
      {
        id: 2,
        externalID: "photo-002",
        title: "Kitchen",
        url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
      },
      {
        id: 3,
        externalID: "photo-003",
        title: "Bedroom",
        url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      },
      {
        id: 4,
        externalID: "photo-004",
        title: "Balcony View",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      },
    ],
    floorPlanID: null,
    floorPlans: [],
    videos: [],
    panoramas: [],
    amenities: [
      { externalID: "gym", text: "Gym", value: "yes", format: "boolean", slug: "gym" },
      { externalID: "pool", text: "Swimming Pool", value: "yes", format: "boolean", slug: "pool" },
      { externalID: "parking", text: "Covered Parking", value: "2", format: "number", slug: "parking" },
      { externalID: "security", text: "Security", value: "yes", format: "boolean", slug: "security" },
    ],
    amenities_l1: [],
    agent: {
      id: 1,
      name: "John Smith",
      name_l1: "جون سميث",
      externalID: "agent-001",
      product: "premium",
      productScore: 90,
      licenses: [],
      logo: {
        id: 1,
        url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
      },
      slug: "john-smith",
      tier: 1,
    },
    agency: {
      id: 1,
      name: "Elite Properties Dubai",
      name_l1: "إيليت بروبرتيز دبي",
      externalID: "agency-001",
      product: "premium",
      productScore: 95,
      licenses: [
        { number: "LIC-001", authority: "DLD" },
      ],
      logo: {
        id: 1,
        url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80",
      },
      slug: "elite-properties-dubai",
      tier: 1,
    },
    hash: "hash-001",
    keywords: ["luxury", "dubai", "marina", "apartment", "3bedroom"],
    isVerified: false,
    verification: {
      eligible: false,
      status: "unknown",
      type: "property",
      comment: null,
    },
    completionStatus: "completed",
    randBoostScore: 100,
    randBoostScore_l1: 100,
    furnishingStatus: "furnished",
    type: "residential",
    purpose_l1: "للبيع",
    title_l2: "Luxury 3 Bedroom Apartment in Dubai Marina",
    description_l2: "Stunning luxury apartment with breathtaking views",
  },
  // Add more mock properties...
];

// Generate more mock properties
for (let i = 2; i <= 50; i++) {
  const locations = [
    { name: "Dubai", name_l1: "دبي", externalID: "2", area: "Dubai Marina", area_l1: "دبي مارينا", areaExternalID: "marina-01" },
    { name: "Dubai", name_l1: "دبي", externalID: "2", area: "Downtown Dubai", area_l1: "وسط مدينة دبي", areaExternalID: "downtown-01" },
    { name: "Dubai", name_l1: "دبي", externalID: "2", area: "Palm Jumeirah", area_l1: "نخلة جميرا", areaExternalID: "palm-01" },
    { name: "Abu Dhabi", name_l1: "أبو ظبي", externalID: "3", area: "Al Reem Island", area_l1: "جزيرة الريم", areaExternalID: "reem-01" },
    { name: "Dubai", name_l1: "دبي", externalID: "2", area: "Business Bay", area_l1: "الخليج التجاري", areaExternalID: "business-01" },
  ];
  
  const types = ["Apartment", "Villa", "Townhouse", "Penthouse"];
  const purposes: Array<"for-sale" | "for-rent"> = ["for-sale", "for-rent"];
  
  const location = locations[i % locations.length];
  const type = types[i % types.length];
  const purpose = purposes[i % purposes.length];
  const rooms = [1, 2, 3, 4, 5][i % 5];
  const price = purpose === "for-sale" ? 
    Math.floor(800000 + Math.random() * 4200000) : 
    Math.floor(50000 + Math.random() * 250000);
  
  mockProperties.push({
    ...mockProperties[0],
    id: i,
    externalID: `ext-${String(i).padStart(3, '0')}`,
    title: `${type} with ${rooms} Bedrooms in ${location.area}`,
    purpose,
    price,
    rooms,
    baths: Math.max(1, rooms - 1),
    area: 1000 + (rooms * 400),
    location: [
      {
        id: i * 10,
        level: 1,
        externalID: location.externalID,
        name: location.name,
        name_l1: location.name_l1,
        slug: location.name.toLowerCase().replace(/\s+/g, '-'),
        slug_l1: location.name_l1,
      },
      {
        id: i * 10 + 1,
        level: 2,
        externalID: location.areaExternalID,
        name: location.area,
        name_l1: location.area_l1,
        slug: location.area.toLowerCase().replace(/\s+/g, '-'),
        slug_l1: location.area_l1,
      },
    ],
    category: [
      {
        id: i,
        level: 1,
        externalID: type === "Apartment" ? "4" : type === "Villa" ? "3" : type === "Townhouse" ? "16" : "14",
        name: type,
        name_l1: type,
        slug: type.toLowerCase(),
        slug_l1: type,
      },
    ],
    rentFrequency: purpose === "for-rent" ? "yearly" : null,
    coverPhoto: {
      ...mockProperties[0].coverPhoto,
      id: i,
      url: `https://images.unsplash.com/photo-${1545324418 + i * 1000}?w=800&q=80`,
    },
    photos: mockProperties[0].photos.map((photo, idx) => ({
      ...photo,
      id: i * 10 + idx,
      url: `https://images.unsplash.com/photo-${1545324418 + i * 1000 + idx}?w=800&q=80`,
    })),
  });
}

export function getMockPropertyList(params: {
  page?: number;
  hitsPerPage?: number;
  purpose?: string;
  locationExternalIDs?: string;
  categoryExternalID?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
}): PropertyListResponse {
  let filtered = [...mockProperties];
  
  console.log('🔍 Mock Data Filter Params:', {
    purpose: params.purpose,
    locationExternalIDs: params.locationExternalIDs,
    categoryExternalID: params.categoryExternalID,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    rooms: params.rooms,
  });
  
  // Filter by purpose
  if (params.purpose) {
    filtered = filtered.filter(p => p.purpose === params.purpose);
    console.log(`  After purpose filter: ${filtered.length} properties`);
  }
  
  // Filter by location (checks all location hierarchy levels)
  if (params.locationExternalIDs) {
    filtered = filtered.filter(p => 
      p.location.some(loc => loc.externalID === params.locationExternalIDs)
    );
    console.log(`  After location filter: ${filtered.length} properties`);
  }
  
  // Filter by category
  if (params.categoryExternalID) {
    filtered = filtered.filter(p =>
      p.category.some(cat => cat.externalID === params.categoryExternalID)
    );
    console.log(`  After category filter: ${filtered.length} properties`);
  }
  
  // Filter by price
  if (params.minPrice) {
    filtered = filtered.filter(p => p.price >= params.minPrice!);
    console.log(`  After minPrice filter: ${filtered.length} properties`);
  }
  if (params.maxPrice) {
    filtered = filtered.filter(p => p.price <= params.maxPrice!);
    console.log(`  After maxPrice filter: ${filtered.length} properties`);
  }
  
  // Filter by rooms
  if (params.rooms) {
    filtered = filtered.filter(p => p.rooms === params.rooms);
    console.log(`  After rooms filter: ${filtered.length} properties`);
  }
  
  const page = params.page || 0;
  const hitsPerPage = params.hitsPerPage || 25;
  const start = page * hitsPerPage;
  const end = start + hitsPerPage;
  
  console.log(`✅ Final results: ${filtered.length} total, returning ${Math.min(hitsPerPage, filtered.length - start)} properties for page ${page}`);
  
  return {
    hits: filtered.slice(start, end),
    nbHits: filtered.length,
    page,
    nbPages: Math.ceil(filtered.length / hitsPerPage),
    hitsPerPage,
  };
}

