const API_ENDPOINT =
  'https://zylalabs.com/api/11013/uae+real+estate+data++api/20814/properties?region=uae&page=0&hitsPerPage=10';

type RawProperty = {
  listing_id?: string | number;
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  city?: string;
  region?: string;
  [key: string]: unknown;
};

type PropertyPageProps = {
  params: { id: string };
};

// Force dynamic rendering - no static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchProperty(id: string): Promise<RawProperty | null> {
  try {
    // Use the Zyla client to fetch property details
    const { getPropertyDetails } = await import('@/lib/api/zylaClient');
    const property = await getPropertyDetails(id);
    
    // Transform to RawProperty format
    return {
      listing_id: property.externalID || id,
      title: property.title,
      description: property.description,
      price: property.price,
      currency: 'AED',
      city: property.location[0]?.name,
      region: property.location[property.location.length - 1]?.name,
    } as RawProperty;
  } catch (error) {
    console.error('Error fetching property:', error);
    
    // Fallback to direct API call
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.status}`);
      }

      const data = await response.json();
      const properties: RawProperty[] = Array.isArray(data?.properties) 
        ? data.properties 
        : Array.isArray(data?.hits) 
          ? data.hits 
          : [];
      
      return properties.find((item) => String(item?.listing_id) === id) || null;
    } catch (fallbackError) {
      console.error('Fallback fetch also failed:', fallbackError);
      return null;
    }
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await fetchProperty(params.id);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Property Details</h1>
      <p>
        Showing data for property ID: <strong>{params.id}</strong>
      </p>

      {property ? (
        <section>
          <h2>{property.title ?? 'Untitled Listing'}</h2>
          <p>{property.description ?? 'No description provided.'}</p>
          <dl>
            <dt>Price</dt>
            <dd>{property.price ?? 'N/A'} {property.currency ?? ''}</dd>
            <dt>Location</dt>
            <dd>{property.city ?? property.region ?? 'Unknown'}</dd>
          </dl>
        </section>
      ) : (
        <p>
          Property not found. The property with ID "{params.id}" could not be retrieved.
        </p>
      )}
    </main>
  );
}
