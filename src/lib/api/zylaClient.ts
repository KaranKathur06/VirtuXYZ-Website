/**
 * Zyla Labs UAE Real Estate Data API Client (API ID: 11013)
 * Handles all API communication with proper error handling and type safety
 */

const ZYLA_API_KEY = process.env.ZYLA_API_KEY || '';
const ZYLA_BASE_URL = 'https://zylalabs.com/api/11013/uae+real+estate+data++api';

// API Response Types
export interface AutocompleteResult {
  id: number;
  externalID: string;
  name: string;
  name_l1: string;
  type: string;
  level: number;
}

export interface PropertyImage {
  id: number;
  externalID: string;
  title: string | null;
  url: string;
}

export interface Agency {
  id: number;
  name: string;
  name_l1: string;
  externalID: string;
  product: string;
  productScore: number;
  licenses: Array<{ number: string; authority: string }>;
  logo: { id: number; url: string };
  slug: string;
  tier: number;
}

export interface Property {
  id: number;
  ownerID: number;
  userExternalID: string;
  sourceID: number;
  state: string;
  geography: {
    lat: number;
    lng: number;
  };
  purpose: string;
  price: number;
  product: string;
  productLabel: string;
  productScore: number;
  rentFrequency: string | null;
  referenceNumber: string;
  permitNumber: string;
  projectNumber: string | null;
  title: string;
  title_l1: string;
  externalID: string;
  slug: string;
  slug_l1: string;
  location: Array<{
    id: number;
    level: number;
    externalID: string;
    name: string;
    name_l1: string;
    slug: string;
    slug_l1: string;
  }>;
  category: Array<{
    id: number;
    level: number;
    externalID: string;
    name: string;
    name_l1: string;
    slug: string;
    slug_l1: string;
  }>;
  createdAt: string;
  approvedAt: string;
  updatedAt: string;
  touchedAt: string;
  reactivatedAt: string;
  rooms: number;
  baths: number;
  area: number;
  score: number;
  score_l1: number;
  coverPhoto: PropertyImage;
  photoIDs: number[];
  photos: PropertyImage[];
  floorPlanID: number | null;
  floorPlans: any[];
  videos: any[];
  panoramas: any[];
  amenities: Array<{
    externalID: string;
    text: string;
    value: string;
    format: string;
    slug: string;
  }>;
  amenities_l1: any[];
  agent: {
    id: number;
    name: string;
    name_l1: string;
    externalID: string;
    product: string;
    productScore: number;
    licenses: any[];
    logo: { id: number; url: string };
    slug: string;
    tier: number;
  };
  agency: Agency;
  hash: string;
  keywords: string[];
  isVerified: boolean;
  verification: {
    eligible: boolean;
    status: string;
    type: string;
    comment: string | null;
  };
  completionStatus: string;
  randBoostScore: number;
  randBoostScore_l1: number;
  furnishingStatus: string | null;
  type: string;
  purpose_l1: string;
  title_l2: string;
  description_l2: string;
}

export interface PropertyListResponse {
  hits: Property[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
}

export interface PropertyDetailsResponse extends Property {
  description: string;
  description_l1: string;
}

/**
 * Make authenticated API request to Zyla Labs
 */
async function zylaFetch<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
  if (!ZYLA_API_KEY) {
    throw new Error('ZYLA_API_KEY is not configured');
  }

  const url = new URL(`${ZYLA_BASE_URL}${endpoint}`);
  
  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ZYLA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for fresh data
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Zyla API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Zyla API Request Failed:', error);
    throw error;
  }
}

/**
 * Autocomplete location search
 * Returns location suggestions with externalIDs
 * Endpoint: /20812/autocomplete
 */
export async function autocompleteLocation(query: string): Promise<AutocompleteResult[]> {
  try {
    const response = await zylaFetch<{ hits: AutocompleteResult[] }>('/20812/autocomplete', {
      query,
      hitsPerPage: 10,
    });
    
    return response.hits || [];
  } catch (error) {
    console.error('Autocomplete error:', error);
    return [];
  }
}

/**
 * Get properties with filters
 */
export interface GetPropertiesParams {
  locationExternalIDs?: string;
  purpose?: 'for-sale' | 'for-rent';
  categoryExternalID?: string;
  rentFrequency?: 'monthly' | 'yearly' | 'weekly' | 'daily';
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
  baths?: number;
  minArea?: number;
  maxArea?: number;
  sort?: 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc' | 'verified-score';
  page?: number;
  hitsPerPage?: number;
}

export async function getProperties(params: GetPropertiesParams): Promise<PropertyListResponse> {
  const response = await zylaFetch<PropertyListResponse>('/20814/properties', {
    ...params,
    hitsPerPage: params.hitsPerPage || 25,
    page: params.page || 0,
  });
  
  return response;
}

/**
 * Get single property details by externalID
 */
export async function getPropertyDetails(externalID: string): Promise<PropertyDetailsResponse> {
  const response = await zylaFetch<PropertyDetailsResponse>('/20816/property+details', {
    externalID,
  });
  
  return response;
}

/**
 * Get property categories
 */
export async function getPropertyCategories(): Promise<AutocompleteResult[]> {
  // Common UAE property categories
  return [
    { id: 1, externalID: '4', name: 'Apartment', name_l1: 'شقة', type: 'category', level: 1 },
    { id: 2, externalID: '3', name: 'Villa', name_l1: 'فيلا', type: 'category', level: 1 },
    { id: 3, externalID: '16', name: 'Townhouse', name_l1: 'تاون هاوس', type: 'category', level: 1 },
    { id: 4, externalID: '14', name: 'Penthouse', name_l1: 'بنتهاوس', type: 'category', level: 1 },
    { id: 5, externalID: '18', name: 'Compound', name_l1: 'مجمع سكني', type: 'category', level: 1 },
    { id: 6, externalID: '6', name: 'Office', name_l1: 'مكتب', type: 'category', level: 1 },
    { id: 7, externalID: '5', name: 'Shop', name_l1: 'محل', type: 'category', level: 1 },
    { id: 8, externalID: '9', name: 'Warehouse', name_l1: 'مستودع', type: 'category', level: 1 },
  ];
}

export default {
  autocompleteLocation,
  getProperties,
  getPropertyDetails,
  getPropertyCategories,
};
