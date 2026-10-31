// Minimal example: run the latin-america-jobs-scraper Actor and print the results.
// Usage: APIFY_TOKEN=... node run.js   (Node 18 or later, npm install apify-client)
import { ApifyClient } from 'apify-client';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}

const client = new ApifyClient({ token });

const input = {
    "countries": ["AR", "MX", "CO", "CL", "PE", "BR"],
    "keywords": "desarrollador",
    "remote": "any",
    "maxItems": 50,
    "includeDescriptions": false
};

const run = await client.actor('bibian/latin-america-jobs-scraper').call(input);
const { items } = await client.dataset(run.defaultDatasetId).listItems();

console.log(`${items.length} results`);
for (const item of items) {
    console.log(`${item.title} | ${item.companyName} | ${item.country} | ${item.source}`);
}
