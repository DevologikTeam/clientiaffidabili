#!/usr/bin/env node
const urls = [
  process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
  process.env.PLAYWRIGHT_API_URL ? `${process.env.PLAYWRIGHT_API_URL}/health` : 'http://localhost:3001/health',
];

async function main() {
  const failures = [];
  for (const url of urls) {
    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) failures.push(`${url} -> ${response.status}`);
      else console.log(`smoke ok: ${url}`);
    } catch (error) {
      failures.push(`${url} -> ${error.message}`);
    }
  }
  if (failures.length) {
    console.error('Launch smoke check failed:');
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
}

main();
