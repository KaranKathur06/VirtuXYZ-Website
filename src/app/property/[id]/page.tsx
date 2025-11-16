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

async function fetchProperties(): Promise<RawProperty[]> {
  const response = await fetch(API_ENDPOINT, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch properties: ${response.status}`);
  }

  const data = await response.json();

  if (Array.isArray(data?.properties)) return data.properties as RawProperty[];
  if (Array.isArray(data?.hits)) return data.hits as RawProperty[];
  return [];
}

export async function generateStaticParams() {
  const properties = await fetchProperties();

  return properties
    .filter((property) => property?.listing_id !== undefined && property?.listing_id !== null)
    .map((property) => ({
      id: String(property.listing_id),
    }));
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const properties = await fetchProperties();
  const property = properties.find((item) => String(item?.listing_id) === params.id);

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
          This property was not included in the static export. Double-check the source data or fetch parameters.
        </p>
      )}
    </main>
  );
}
