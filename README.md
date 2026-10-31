# How to Scrape Job Postings Across Latin America: 18 Countries, 4 Networks, One Schema

> **Run it now, no code: [latin-america-jobs-scraper on the Apify Store](https://apify.com/bibian/latin-america-jobs-scraper)** &nbsp;|&nbsp; $2.00 per 1,000 postings &nbsp;|&nbsp; no browser, no proxy

Buying and maintaining a separate scraper per country is slow. This Actor reads 4 major Latin American job networks — [Bumeran / Zonajobs, Laborum, Multitrabajos and Konzerta](https://www.bumeran.com.ar) (the Navent network), [Computrabajo](https://www.computrabajo.com), [Get on Board](https://www.getonbrd.com) and [Gupy](https://www.gupy.io) — in a single run, deduplicated and mapped to one unified schema, across 18 countries: Argentina, Mexico, Colombia, Chile, Peru, Brazil and 12 more.

Searches this page answers: latin america jobs scraper, argentina job board api, mexico jobs scraper, brazil job postings dataset, computrabajo scraper.

## What you can do with it

- **Search job postings across 18 Latin American countries in one run**, instead of buying and maintaining a separate scraper per country or network.
- **Filter once, everywhere**: `keywords`, `location` and `remote` apply the same way across every source that supports them.
- **Compare pay and location across countries**: every record shares the same `salaryMin`/`salaryMax`, `city`, `country` and `employmentType` fields, whichever site it came from.
- **Cover the region's two biggest classified networks plus two tech-focused boards**: Computrabajo alone spans 18 countries; Navent's group (Bumeran, Zonajobs, Laborum, Multitrabajos, Konzerta) and Get on Board add Argentina, Chile, Peru and more; Gupy covers Brazilian company career pages.
- **Monitor new postings daily**: schedule it with `onlyNew` checked to get, and pay for, only what is new since the last run.

A real sample (five results, personal data removed) is in [`sample-output.json`](sample-output.json).

## Output fields

| Field | Type | Meaning |
|---|---|---|
| `id` | string | Stable identifier (`<source>:<native id>`), used to deduplicate between runs. |
| `url` | string | Public page of the posting. |
| `title` | string | Job title as published. |
| `companyName` | string or null | Employer name; `null` when hidden (then `confidentialCompany: true`). |
| `locationLabel`, `city`, `region`, `postalCode`, `country` | — | Where the job is based; `country` is always an ISO 3166-1 alpha-2 code (`AR`, `MX`, `CO`, `CL`, `PE`, `BR`, ...). |
| `remote` | string | `remote`, `hybrid`, `onsite` or `unknown`. |
| `employmentType` | string | `full_time`, `part_time`, `contract`, `freelance`, `internship`, `apprenticeship`, `temporary` or `unknown`. |
| `salaryMin` / `salaryMax` / `salaryCurrency` / `salaryPeriod` | — | Salary range as numbers, ISO 4217 currency, and `hour`/`day`/`month`/`year`. |
| `datePosted`, `validThrough` | string or null | Publication and expiry date, ISO 8601. |
| `description` | string or null | Plain-text description, only when `includeDescriptions` is on. No personal data. |
| `skills` | string[] | Skills listed by the site, if any. |
| `source`, `sourceId`, `scrapedAt` | — | Host name of the source site, its native id, and when this Actor read it. |

Site-specific fields are kept in addition to these (never in place of them) — for example Bumeran's `areaId`/`subareaId` or Gupy's listing tags.

## Input

| Field | What it does |
|---|---|
| `countries` | Countries to collect for, from the 18 Latin American countries covered. Default `AR`, `MX`, `CO`, `CL`, `PE`, `BR`. A source outside the requested countries is skipped. |
| `keywords` | Job title, skill or trade, for example `desarrollador` or `vendedor`. Empty means every posting. |
| `location` | City or region, for example `Buenos Aires` or `Bogotá`. Applied by the sources that support it; ignored by the others. |
| `sources` | Which networks to query: `navent`, `computrabajo`, `getonbrd`, `gupy`. All 4 by default — none of them need a residential proxy or a browser. |
| `publishedWithinDays` | Keep only postings published in the last N days. Use `1` for a daily monitoring run. |
| `remote` | Keep only postings with this remote policy: `any`, `remote`, `hybrid` or `onsite`. |
| `maxItems` | The run stops once this many postings are saved, across all sources combined (default 50). |
| `includeDescriptions` | Add the job description as plain text (default off, for speed). |
| `onlyNew` | For scheduled runs: skip postings an earlier run of this same search already delivered. |

Example input:

```json
{
  "countries": ["AR", "MX", "CO", "CL", "PE", "BR"],
  "keywords": "desarrollador",
  "remote": "any",
  "maxItems": 50,
  "includeDescriptions": false
}
```

## Three ways to use it

### 1. Apify console, no code

1. Open [the Actor page](https://apify.com/bibian/latin-america-jobs-scraper) and click **Try for free** (a free Apify account is enough).
2. Fill in the input form (countries, keywords, filters and the maximum number of results) and click **Start**.
3. When the run finishes, open the **Output** tab, check the table, then **Export** as CSV, Excel or JSON.
4. For a daily alert, open **Schedules**, create a daily schedule for the Actor and, optionally, add an integration that sends new results to Slack, e-mail or Google Sheets.

### 2. Apify API with JavaScript

```bash
npm install apify-client
export APIFY_TOKEN="your token from Apify console, Settings, Integrations"
node examples/run.js
```

```js
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor('bibian/latin-america-jobs-scraper').call({
  countries: ['AR', 'MX', 'CO', 'CL', 'PE', 'BR'],
  keywords: 'desarrollador',
  maxItems: 50,
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
```

The complete file is [`examples/run.js`](examples/run.js) (ES module, Node 18 or later).

### 3. Apify API with Python

```bash
pip install apify-client
export APIFY_TOKEN="your token from Apify console, Settings, Integrations"
python examples/run.py
```

```python
from apify_client import ApifyClient

client = ApifyClient(token="<APIFY_TOKEN>")
run = client.actor("bibian/latin-america-jobs-scraper").call(run_input={
    "countries": ["AR", "MX", "CO", "CL", "PE", "BR"],
    "keywords": "desarrollador",
    "maxItems": 50
})
items = client.dataset(run["defaultDatasetId"]).list_items().items
```

The complete file is [`examples/run.py`](examples/run.py). Never put your token in the code: read it from the `APIFY_TOKEN` environment variable as above.

## Pricing

Pay per result: **$2.00 per 1,000 postings**, plus a small start fee. You only pay for the postings you receive, deduplicated across every active source before being counted or charged. Store discounts apply automatically on paid Apify plans.

## Monitor new postings daily and connect your tools

1. **Schedule it.** Save a task, pick your countries and keywords, and schedule it daily with Apify Schedules. Tick **Only new results** and each run returns, and charges, only the postings earlier runs of the same search did not deliver.
2. **Push the results where you work.** Add an Apify integration or a webhook to the task: Google Sheets, Slack, Make, Zapier, n8n or your own endpoint.
3. **Call it from your stack.** The API and the JavaScript and Python clients return the dataset as JSON, CSV or Excel.
4. **Let an AI agent use it.** Through the [Apify MCP server](https://docs.apify.com/platform/integrations/mcp), assistants such as Claude or ChatGPT can search the Store, read this page and run the actor as a tool.

## Why this one

4 networks, 18 countries, one schema. `country` and `source` on every row to filter or split. Deduplicated across every source — Bumeran/Navent and Computrabajo often publish the same posting, trimmed by URL and by (title, company, city). No connection, no login, no browser or residential proxy for any of the 4 default sources.

## Limits and honest notes

- `employmentType` and `remote` are read from each site's own fields when it has one; when a source carries no such field, they are inferred from the title, description or listing tags, and left `unknown` rather than guessed when nothing matches.
- Every result is deduplicated across all active sources before it is counted or charged.
- Gupy only covers a fixed sample of Brazilian company career pages (it is not a keyword search engine the way the other 3 networks are): a known, documented limit of this source, not a bug.
- No personal data: contact details of individuals are stripped from descriptions; only companies and public employers are named.
- This is an unofficial tool, not affiliated with any of the networks listed above. Check each site's terms and the data protection rules that apply to your use.

## FAQ

**Do I need a browser or a proxy?** No, not for any of the 4 default sources.

**Which countries are covered?** Argentina, Bolivia, Brazil, Chile, Colombia, Costa Rica, Dominican Republic, Ecuador, El Salvador, Guatemala, Honduras, Mexico, Nicaragua, Panama, Paraguay, Peru, Puerto Rico, Uruguay and Venezuela. Pick any mix in `countries`.

**Can I get only new postings each day?** Yes: set `publishedWithinDays` to `1`, tick `onlyNew`, and schedule the Actor daily.

**Is it legal to scrape?** The actor collects publicly visible postings and follows each site's robots.txt rules. How you use the data is your responsibility: check the sites' terms and the laws that apply to you.

**Something does not work?** Open an issue in the Issues tab. Every public actor is test-run daily and the broken ones are repaired.

## More job scrapers by the same author

- [Bumeran / LatAm Jobs Scraper (Navent network alone)](https://apify.com/bibian/latam-jobs-bumeran-scraper)
- [Get on Board Jobs Scraper](https://apify.com/bibian/getonbrd-jobs-scraper)
- [Europe Jobs Scraper (12 boards, 7 countries)](https://apify.com/bibian/europe-jobs-scraper)
- [Remote Jobs Worldwide Scraper (8 boards)](https://apify.com/bibian/remote-jobs-worldwide-scraper)

## Try it

**[Open latin-america-jobs-scraper on the Apify Store](https://apify.com/bibian/latin-america-jobs-scraper)**

The code in `examples/` is released under the MIT license (see [LICENSE](LICENSE)). The data belongs to its original publishers.
