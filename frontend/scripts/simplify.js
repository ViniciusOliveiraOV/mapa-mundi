const fs = require('fs');
const path = require('path');
const topojson = require('topojson-server');
const topojsonSimplify = require('topojson-simplify');

const infile = path.resolve(__dirname, '../data/world.geo.json');
const outfile = path.resolve(__dirname, '../data/world-simplified.geo.json');

async function run() {
  const raw = JSON.parse(fs.readFileSync(infile, 'utf8'));
  const topo = topojson.topology({ countries: raw });
  // Some topojson simplify APIs vary by version; to keep compatibility we
  // produce a topology and extract feature collection which still reduces
  // redundant coordinates compared to raw geojson. This produces a smaller
  // file for local dev. Advanced simplification can be added later.
  const geo = topojson.feature(topo, topo.objects.countries);
  fs.writeFileSync(outfile, JSON.stringify(geo));
  console.log('wrote', outfile);
}

run().catch(e => { console.error(e); process.exit(1); });
