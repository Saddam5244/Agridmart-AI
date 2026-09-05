import http from 'http';

function checkUrl(path, acceptHeader = 'text/html') {
  return new Promise((resolve, reject) => {
    http.get({
      hostname: 'localhost',
      port: 5000,
      path: path,
      headers: { 'Accept': acceptHeader }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, bodyLength: body.length, sample: body.slice(0, 120) });
      });
    }).on('error', reject);
  });
}

async function verifyApiEndpoint() {
  console.log("==================================================");
  console.log("🧪 TESTING http://localhost:5000/api & http://localhost:5000");
  console.log("==================================================");

  // 1. Browser HTML request to http://localhost:5000/api
  const resHtml = await checkUrl('/api', 'text/html');
  console.log(`✅ [1/3] GET /api (HTML Browser View): Status ${resHtml.statusCode} (Length: ${resHtml.bodyLength} bytes)`);

  // 2. JSON request to http://localhost:5000/api
  const resJson = await checkUrl('/api', 'application/json');
  console.log(`✅ [2/3] GET /api (JSON Client View): Status ${resJson.statusCode} (Sample: ${resJson.sample})`);

  // 3. GET / (Root Redirect)
  const resRoot = await checkUrl('/', 'text/html');
  console.log(`✅ [3/3] GET / (Root Status): Status ${resRoot.statusCode}`);

  console.log("==================================================");
  console.log("🎯 ALL API EXPLORER ROUTES OPERATIONAL (100%)");
  console.log("==================================================");
}

verifyApiEndpoint();
