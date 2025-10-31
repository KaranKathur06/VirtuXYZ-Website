/**
 * Test endpoint to verify Zyla API connectivity
 */

import { NextResponse } from 'next/server';

const ZYLA_API_KEY = process.env.ZYLA_API_KEY || '';
const ZYLA_BASE_URL = 'https://zylalabs.com/api/11013/uae+real+estate+data++api';

export async function GET() {
  try {
    // Test 1: Check API Key
    if (!ZYLA_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'ZYLA_API_KEY not configured',
      }, { status: 500 });
    }

    console.log('🔑 API Key Info:');
    console.log('  - Present:', !!ZYLA_API_KEY);
    console.log('  - Length:', ZYLA_API_KEY.length);
    console.log('  - Starts with:', ZYLA_API_KEY.substring(0, 10) + '...');

    // Test different URL structures
    const testUrls = [
      // Original structure
      `${ZYLA_BASE_URL}/20814/properties?region=uae&page=0&hitsPerPage=1`,
      // Try with endpoint ID from API key
      `https://zylalabs.com/api/10967/uae+real+estate+data++api/20814/properties?region=uae&page=0&hitsPerPage=1`,
      // Try simpler structure
      `https://zylalabs.com/api/11013/20814/properties?region=uae&page=0&hitsPerPage=1`,
      // Try without the text part
      `https://zylalabs.com/api/11013/properties/list?region=uae&page=0&hitsPerPage=1`,
    ];

    const results = [];

    for (const testUrl of testUrls) {
      console.log('\n🧪 Testing URL:', testUrl);

      try {
        const response = await fetch(testUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${ZYLA_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('📡 Response:', response.status, response.statusText);

        const responseText = await response.text();
        console.log('📄 Response Body (first 200 chars):', responseText.substring(0, 200));

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          data = responseText;
        }

        results.push({
          url: testUrl,
          status: response.status,
          statusText: response.statusText,
          success: response.ok,
          dataPreview: typeof data === 'string' ? data.substring(0, 100) : data,
        });

        // If we get a successful response, break
        if (response.ok) {
          console.log('✅ SUCCESS! Found working endpoint!');
          break;
        }
      } catch (error) {
        console.error('❌ Error:', error);
        results.push({
          url: testUrl,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      message: 'Tested multiple endpoint structures',
      apiKeyInfo: {
        hasApiKey: !!ZYLA_API_KEY,
        apiKeyLength: ZYLA_API_KEY.length,
        apiKeyPrefix: ZYLA_API_KEY.substring(0, 10) + '...',
      },
      results: results,
    });

  } catch (error) {
    console.error('❌ Test Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

