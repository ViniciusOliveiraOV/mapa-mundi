const cache = new Map();

export async function getCountryData(code) {
  if (!code) return null;
  const normalized = code.length === 2 ? code.toLowerCase() : code.toLowerCase();
  if (cache.has(normalized)) return cache.get(normalized);
  // use REST Countries API (v3)
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${normalized}`);
    if (!res.ok) throw new Error('fetch failed');
    const json = await res.json();
    const data = Array.isArray(json) ? json[0] : json;
    cache.set(normalized, data);
    return data;
  } catch (err) {
    console.error('getCountryData error', err);
    return null;
  }
}
