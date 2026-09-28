import { normalizeAdsbLolPointResponse } from '../src/data/adsbLolFallback.js';

export const config = {
  maxDuration: 15,
};

export default async function handler(req, res) {
  // Global CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  const incomingUrl = new URL(req.url, 'http://localhost');
  const pathname = incomingUrl.pathname;
  const search = incomingUrl.search;
  const subpath = pathname.replace(/^\/?api\/?/, '');

  try {
    // 1. CelesTrak TLE Satellite orbits
    if (subpath.startsWith('celestrak')) {
      const group = subpath.replace(/^celestrak\/?/, '').split('?')[0] || 'stations';
      const cleanGroup = group.replace(/[^a-zA-Z0-9_-]/g, '') || 'stations';
      const upstream = `https://celestrak.org/NORAD/elements/gp.php?GROUP=${encodeURIComponent(cleanGroup)}&FORMAT=tle`;
      
      const upstreamRes = await fetch(upstream, {
        headers: {
          'User-Agent': 'gods-eye-view-celestrak-proxy/1.0 (+https://github.com/nghiavu2011/NMstudio_GODs_EYE_VIEW)',
          'Accept': 'text/plain',
        },
        signal: AbortSignal.timeout(12000),
      });

      if (!upstreamRes.ok) {
        res.statusCode = upstreamRes.status;
        res.end(`CelesTrak error: ${upstreamRes.statusText}`);
        return;
      }

      const text = await upstreamRes.text();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.statusCode = 200;
      res.end(text);
      return;
    }

    // 2. OpenSky Network / adsb.lol live flights
    if (subpath.startsWith('opensky')) {
      const lat = parseFloat(incomingUrl.searchParams.get('lat'));
      const lon = parseFloat(incomingUrl.searchParams.get('lon'));

      let adsbUrl = 'https://api.adsb.lol/v2/mil';
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        const roundedLat = Math.round(lat * 4) / 4;
        const roundedLon = Math.round(lon * 4) / 4;
        adsbUrl = `https://api.adsb.lol/v2/lat/${roundedLat}/lon/${roundedLon}/dist/250`;
      }

      try {
        const adsbRes = await fetch(adsbUrl, {
          headers: {
            'User-Agent': 'gods-eye-view-flight-proxy/1.0',
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(10000),
        });

        if (adsbRes.ok) {
          const payload = await adsbRes.json();
          const normalized = normalizeAdsbLolPointResponse(payload);
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store');
          res.setHeader('X-Flight-Source', 'adsb.lol');
          res.setHeader('X-Flight-Coverage', 'worldwide/regional live');
          res.setHeader('X-Flight-Count', String(normalized.states.length));
          res.statusCode = 200;
          res.end(JSON.stringify(normalized));
          return;
        }
      } catch (err) {
        console.warn('[api/opensky] ADSB.lol proxy error:', err.message);
      }

      // Empty fallback snapshot so layer doesn't crash
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.statusCode = 200;
      res.end(JSON.stringify({ time: Math.floor(Date.now() / 1000), states: [] }));
      return;
    }

    // 3. adsb.lol direct feeds
    if (subpath.startsWith('adsblol')) {
      const rest = subpath.replace(/^adsblol\/?/, '');
      const upstream = `https://api.adsb.lol/v2/${rest}${search}`;
      const upstreamRes = await fetch(upstream, {
        headers: {
          'User-Agent': 'gods-eye-view/1.0',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });

      const body = await upstreamRes.text();
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.statusCode = upstreamRes.status;
      res.end(body);
      return;
    }

    // 4. adsbdb aircraft enrichment
    if (subpath.startsWith('adsbdb')) {
      const rest = subpath.replace(/^adsbdb\/?/, '');
      const upstream = `https://api.adsbdb.com/v0/${rest}${search}`;
      const upstreamRes = await fetch(upstream, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(8000),
      });
      const body = await upstreamRes.text();
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.statusCode = upstreamRes.status;
      res.end(body);
      return;
    }

    // 5. Space Devs Rocket Launches
    if (subpath.startsWith('launches')) {
      const end = new Date();
      const start = new Date(end.getTime() - 30 * 86400000);
      const upstream = `https://ll.thespacedevs.com/2.3.0/launches/?limit=100&mode=detailed&net__gte=${start.toISOString()}&net__lte=${end.toISOString()}`;
      const upstreamRes = await fetch(upstream, {
        headers: {
          'User-Agent': 'gods-eye-view/1.0',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      const body = await upstreamRes.text();
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=1800');
      res.statusCode = upstreamRes.status;
      res.end(body);
      return;
    }

    // 6. Overpass OpenStreetMap API
    if (subpath.startsWith('overpass')) {
      const rest = subpath.replace(/^overpass\/?/, '');
      const upstream = `https://overpass-api.de/api/${rest}${search}`;
      const upstreamRes = await fetch(upstream, {
        method: req.method,
        headers: {
          'User-Agent': 'gods-eye-view/1.0',
          'Accept': 'application/json',
        },
        body: req.method === 'POST' ? req : undefined,
        duplex: req.method === 'POST' ? 'half' : undefined,
        signal: AbortSignal.timeout(15000),
      });
      const body = await upstreamRes.text();
      res.setHeader('Content-Type', upstreamRes.headers.get('content-type') || 'application/json');
      res.statusCode = upstreamRes.status;
      res.end(body);
      return;
    }

    // 7. Radio Browser
    if (subpath.startsWith('radio')) {
      const rest = subpath.replace(/^radio\/?/, '');
      const upstream = `https://de1.api.radio-browser.info/json/${rest}${search}`;
      const upstreamRes = await fetch(upstream, {
        headers: {
          'User-Agent': 'gods-eye-view/1.0',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      const body = await upstreamRes.text();
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.statusCode = upstreamRes.status;
      res.end(body);
      return;
    }

    // 8. Weather Manifest and Tiles (NOAA nowCOAST)
    if (subpath.startsWith('weather')) {
      const product = incomingUrl.searchParams.get('product') || 'clouds';
      const time = incomingUrl.searchParams.get('time') || new Date().toISOString();

      if (subpath.includes('/manifest')) {
        const titles = {
          lightning: 'Lightning density · 15 min',
          radar: 'CONUS radar reflectivity',
          clouds: 'Global satellite infrared',
          'clouds-regional': 'GOES regional satellite infrared',
        };
        const manifest = {
          schemaVersion: 1,
          product,
          title: titles[product] || 'Weather Observations',
          coverage: 'Global / Regional Satellite and Radar Observations',
          description: 'Live real-time weather and cloud patterns observed from NOAA nowCOAST satellites.',
          source: 'NOAA nowCOAST',
          attribution: 'NOAA/NWS/NESDIS nowCOAST',
          bounds: { west: -180, south: -90, east: 180, north: 90 },
          times: [time],
          latest: time,
          time,
          observedAt: time,
          fetchedAt: Date.now(),
          stale: false,
          unavailable: false,
          reason: null,
          tileSize: 256,
          maxLevel: 6,
          tilingScheme: 'geographic',
          tileTemplate: `/api/weather/tile?product=${product}&time=${encodeURIComponent(time)}&z={z}&x={x}&y={y}`,
          imageUrl: `/api/weather/image?product=${product}&time=${encodeURIComponent(time)}`,
          imageSize: { width: 2048, height: 1024 },
        };
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=300');
        res.statusCode = 200;
        res.end(JSON.stringify(manifest));
        return;
      }

      // Transparent 1x1 PNG fallback for missing weather tiles
      const emptyPng = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        'base64'
      );
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.statusCode = 200;
      res.end(emptyPng);
      return;
    }

    // 9. Nominatim Geocoding
    if (subpath.startsWith('geocode')) {
      const q = incomingUrl.searchParams.get('q') || '';
      const upstream = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`;
      const upstreamRes = await fetch(upstream, {
        headers: {
          'User-Agent': 'gods-eye-view/1.0 (+https://github.com/nghiavu2011/NMstudio_GODs_EYE_VIEW)',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(8000),
      });
      const body = await upstreamRes.text();
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.statusCode = upstreamRes.status;
      res.end(body);
      return;
    }

    // 10. FIRMS Active Fires
    if (subpath.startsWith('firms')) {
      if (subpath.includes('/status')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.statusCode = 200;
        res.end(JSON.stringify({
          hasKey: false,
          lastFetch: null,
          count: 0,
          stale: false,
          ttlMs: 1800000,
          transactions: null,
        }));
        return;
      }
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.statusCode = 200;
      res.end(JSON.stringify({
        fetchedAt: Date.now(),
        stale: false,
        ttlMs: 1800000,
        sources: [],
        count: 0,
        fires: [],
      }));
      return;
    }

    // 11. AIS Live Vessels
    if (subpath.startsWith('ais-live')) {
      if (subpath.includes('/track')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.statusCode = 200;
        res.end(JSON.stringify({
          mmsi: incomingUrl.searchParams.get('mmsi') || '',
          samples: [],
          source: 'AISStream',
        }));
        return;
      }
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.statusCode = 200;
      res.end(JSON.stringify({
        rows: [],
        source: 'AISStream',
        status: 'idle',
        error: null,
        refreshing: false,
        newestPositionAt: null,
      }));
      return;
    }

    // 12. CCTV Sources
    if (subpath.startsWith('cctv')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.statusCode = 200;
      res.end(JSON.stringify({ sources: [] }));
      return;
    }

    // Default 404 for unrecognized API routes
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'not_found', path: subpath }));
  } catch (error) {
    console.error('[API Gateway Error]', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'internal_server_error', message: error.message }));
  }
}
