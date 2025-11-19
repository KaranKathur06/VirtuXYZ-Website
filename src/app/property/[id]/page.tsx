import Link from 'next/link';

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
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center text-xs sm:text-sm text-secondary gap-1 sm:gap-2"
        >
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/properties" className="hover:text-primary">
            Properties
          </Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page" className="text-primary font-medium truncate max-w-[160px]">
            {property?.title ?? 'Property'}
          </span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Property Details
        </h1>
        <p className="text-secondary mb-6">
          Showing data for property ID:&nbsp;
          <span className="font-semibold">{params.id}</span>
      </p>

      {property ? (
          <section
            aria-label="Property summary"
            className="card-cyber p-6 space-y-4 max-w-3xl"
          >
            <h2 className="text-2xl font-semibold text-primary">
              {property.title ?? 'Untitled Listing'}
            </h2>
            <p className="text-secondary">
              {property.description ?? 'No description provided.'}
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-tertiary text-sm mb-1">Price</dt>
                <dd className="text-primary font-semibold">
                  {property.price ?? 'N/A'} {property.currency ?? ''}
                </dd>
              </div>
              <div>
                <dt className="text-tertiary text-sm mb-1">Location</dt>
                <dd className="text-primary font-semibold">
                  {property.city ?? property.region ?? 'Unknown'}
                </dd>
              </div>
          </dl>
        </section>
      ) : (
          <p className="text-secondary">
          Property not found. The property with ID "{params.id}" could not be retrieved.
        </p>
      )}
      </div>
    </main>
  );
}
