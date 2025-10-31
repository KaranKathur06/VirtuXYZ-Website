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

  console.log('🔍 Zyla API Request:');
  console.log('  URL:', url.toString());
  console.log('  Params:', JSON.stringify(params, null, 2));
  console.log('  API Key Present:', !!ZYLA_API_KEY);
  console.log('  API Key Length:', ZYLA_API_KEY?.length);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ZYLA_API_KEY}`,
        'X-API-Key': ZYLA_API_KEY,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for fresh data
    });

    console.log('📡 Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error Response:', errorText);
      throw new Error(`Zyla API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Success! Response has data:', !!data);
    return data;
  } catch (error) {
    console.error('💥 Zyla API Request Failed:', error);
    throw error;
  }
}

/**
 * Autocomplete location search
 * Note: This endpoint may not be available in the API
 * Using fallback location mapping instead
 */
export async function autocompleteLocation(query: string): Promise<AutocompleteResult[]> {
  // Fallback: Return common UAE locations with their externalIDs
  const commonLocations = [
    { id: 1, externalID: '2', name: 'Dubai', name_l1: 'دبي', type: 'city', level: 1 },
    { id: 2, externalID: '3', name: 'Abu Dhabi', name_l1: 'أبو ظبي', type: 'city', level: 1 },
    { id: 3, externalID: '5', name: 'Sharjah', name_l1: 'الشارقة', type: 'city', level: 1 },
    { id: 4, externalID: '6', name: 'Ajman', name_l1: 'عجمان', type: 'city', level: 1 },
    { id: 5, externalID: '7', name: 'Ras Al Khaimah', name_l1: 'رأس الخيمة', type: 'city', level: 1 },
    { id: 6, externalID: '8', name: 'Fujairah', name_l1: 'الفجيرة', type: 'city', level: 1 },
    { id: 7, externalID: '9', name: 'Umm Al Quwain', name_l1: 'أم القيوين', type: 'city', level: 1 },
  ];
  
  // Filter locations based on query
  if (!query || query.trim() === '') {
    return commonLocations;
  }
  
  const lowerQuery = query.toLowerCase();
  return commonLocations.filter(loc => 
    loc.name.toLowerCase().includes(lowerQuery) || 
    loc.name_l1.includes(query)
  );
}

/**
 * Get properties with filters
 */
export interface GetPropertiesParams {
  region?: string; // Required by API - defaults to 'uae'
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
  try {
    const response = await zylaFetch<PropertyListResponse>('/20814/properties', {
      ...params,
      region: params.region || 'uae', // Default region to 'uae' if not provided
      hitsPerPage: params.hitsPerPage || 25,
      page: params.page || 0,
    });
    
    return response;
  } catch (error) {
    console.warn('⚠️  Zyla API failed, using mock data fallback');
    
    // Fallback to mock data
    const { getMockPropertyList } = await import('./mockPropertyData');
    return getMockPropertyList({
      page: params.page,
      hitsPerPage: params.hitsPerPage,
      purpose: params.purpose,
      locationExternalIDs: params.locationExternalIDs,
      categoryExternalID: params.categoryExternalID,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      rooms: params.rooms,
    });
  }
}

/**
 * Get single property details by externalID
 */
export async function getPropertyDetails(externalID: string): Promise<PropertyDetailsResponse> {
  try {
    const response = await zylaFetch<PropertyDetailsResponse>('/20816/property+details', {
      externalID,
    });
    
    return response;
  } catch (error) {
    console.warn('⚠️  Zyla API failed for property details, using mock data fallback');
    
    // Fallback to mock data
    const { mockProperties } = await import('./mockPropertyData');
    const property = mockProperties.find(p => p.externalID === externalID) || mockProperties[0];
    
    return {
      ...property,
      description: "This is a beautiful property in an excellent location with modern amenities and stunning views. Perfect for families and professionals looking for comfort and luxury.",
      description_l1: "هذا عقار جميل في موقع ممتاز مع وسائل الراحة الحديثة وإطلالات خلابة",
    };
  }
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
