import React, { useEffect, useState } from 'react';
import Map from './components/Map';
import CountryModal from './components/CountryModal';

export default function App() {
	const [geo, setGeo] = useState(null);
	const [hovered, setHovered] = useState(null);
	const [selected, setSelected] = useState(null);

			useEffect(() => {
				let mounted = true;
				import('./data/world-simplified.geo.json')
					.then((m) => { if (mounted) setGeo(m.default || m); })
					.catch((e) => console.error('geo load error', e));
				return () => { mounted = false; };
			}, []);

	return (
		<div style={{ padding: 12 }}>
			<h1>Mapa-Mundi (skeleton)</h1>
			<Map
				geoJson={geo}
				width={960}
				height={600}
				onHover={(f) => setHovered(f ? (f.properties.iso_a3 || f.properties.iso_a2) : null)}
				onSelect={(f) => setSelected(f ? (f.properties.iso_a3 || f.properties.iso_a2) : null)}
				hoveredId={hovered}
				selectedId={selected}
			/>
			<CountryModal iso={selected ? selected.slice(0,2) : null} onClose={() => setSelected(null)} />
		</div>
	);
}

