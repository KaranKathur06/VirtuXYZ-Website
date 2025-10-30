/**
 * React Query hooks for UAE Property Finder API
 * Provides data fetching, caching, and state management
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// Types
export interface PropertySearchParams {
  location?: string;
  purpose?: 'for-sale' | 'for-rent';
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
  baths?: number;
  sort?: string;
  page?: number;
}

export interface Property {
  id: number;
  externalID: string;
  title: string;
  price: number;
  currency: string;
  location: {
    city: string;
    area: string;
    fullLocation?: string;
    coordinates?: { lat: number; lng: number };
  };
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  images: string[];
  coverImage: string;
  amenities: Array<{ text: string; value: string; slug: string }> | string[];
  furnished: string;
  listingType: string;
  rentFrequency?: string | null;
  agency: {
    id?: number;
    name: string;
    logo: string;
    tier?: number;
    externalID?: string;
  };
  agent: {
    id?: number;
    name: string;
    logo?: string;
    externalID?: string;
  };
  isVerified: boolean;
  datePosted: string;
  referenceNumber: string;
}

export interface PropertyDetails extends Property {
  description: string;
  category: string[];
  floorPlans: any[];
  videos: any[];
  panoramas: any[];
  verification: any;
  dateUpdated: string;
  permitNumber: string;
  completionStatus: string;
}

export interface AutocompleteResult {
  id: number;
  externalID: string;
  name: string;
  name_l1: string;
  type: string;
  level: number;
}

/**
 * Hook to search properties with filters
 */
export function useProperties(
  params: PropertySearchParams,
  options?: UseQueryOptions<{ properties: Property[]; total: number; page: number; totalPages: number; hasMore: boolean }>
) {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });

      const response = await fetch(`/api/properties/search?${searchParams.toString()}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch properties');
      }

      const result = await response.json();
      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    ...options,
  });
}

/**
 * Hook to get single property details
 */
export function usePropertyDetails(
  externalID: string | null,
  options?: UseQueryOptions<PropertyDetails>
) {
  return useQuery({
    queryKey: ['property', externalID],
    queryFn: async () => {
      if (!externalID) {
        throw new Error('Property ID is required');
      }

      const response = await fetch(`/api/properties/${externalID}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch property details');
      }

      const result = await response.json();
      return result.data;
    },
    enabled: !!externalID,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
}

/**
 * Hook to autocomplete location search
 */
export function useLocationAutocomplete(
  query: string,
  options?: UseQueryOptions<AutocompleteResult[]>
) {
  return useQuery({
    queryKey: ['autocomplete', query],
    queryFn: async () => {
      if (!query || query.length < 2) {
        return [];
      }

      const response = await fetch(`/api/properties/autocomplete?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch autocomplete results');
      }

      const result = await response.json();
      return result.data;
    },
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = 'AED', rentFrequency?: string | null): string {
  const formatted = new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  if (rentFrequency) {
    const frequency = rentFrequency === 'yearly' ? '/year' : rentFrequency === 'monthly' ? '/month' : `/${rentFrequency}`;
    return `${formatted}${frequency}`;
  }

  return formatted;
}

/**
 * Format area with unit
 */
export function formatArea(area: number, unit: string = 'sqft'): string {
  return `${area.toLocaleString()} ${unit}`;
}
