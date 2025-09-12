import React, { useMemo, useRef, useState } from 'react';
import * as d3 from 'd3-geo';

// Props: geoJson, width, height, onSelect(feature), onHover(feature)
export default function Map({ geoJson, width = 800, height = 500, onSelect, onHover, hoveredId, selectedId }) {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  const projection = useMemo(() => {
    const proj = d3.geoMercator();
    if (geoJson) {
      proj.fitSize([width, height], geoJson);
    } else {
      proj.translate([width / 2, height / 2]).scale(100);
    }
    return proj;
  }, [geoJson, width, height]);

  const pathGen = useMemo(() => d3.geoPath().projection(projection), [projection]);

  if (!geoJson) return <div>Carregando mapa...</div>;

  // utility to compute projected centroid
  const centroidOf = (feature) => {
    try {
      const c = pathGen.centroid(feature);
      return c;
    } catch (e) {
      return null;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {tooltip && (
        <div style={{ position: 'absolute', left: tooltip.x + 8, top: tooltip.y + 8, background: 'white', padding: 6, border: '1px solid #ccc', pointerEvents: 'none', zIndex: 100 }}>
          {tooltip.text}
        </div>
      )}
      <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g className="countries">
          {geoJson.features.map((f) => {
            const id = f.properties.iso_a3 || f.properties.iso_a2 || f.properties.name;
            const d = pathGen(f);
            const isHovered = hoveredId === id;
            const isSelected = selectedId === id;
            const fill = isSelected ? '#ffcc00' : isHovered ? '#88c0ff' : '#e0e0e0';
            // compute centroid and decide if polygon is tiny (hit target needed)
            const c = centroidOf(f);
            const tiny = (() => {
              if (!d) return false;
              // crude test: path length < threshold
              return d.length < 200;
            })();
            return (
              <g key={id}>
                <path
                  d={d}
                  fill={fill}
                  stroke="#666"
                  strokeWidth={0.5}
                  onMouseEnter={(e) => { onHover && onHover(f); setTooltip({ x: e.clientX, y: e.clientY, text: f.properties.name }); }}
                  onMouseMove={(e) => setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : t)}
                  onMouseLeave={() => { onHover && onHover(null); setTooltip(null); }}
                  onClick={() => onSelect && onSelect(f)}
                  style={{ cursor: 'pointer', transition: 'fill 120ms' }}
                  data-iso={f.properties.iso_a3 || f.properties.iso_a2}
                  aria-label={f.properties.name}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelect && onSelect(f);
                    }
                  }}
                />
                {tiny && c && (
                  <circle
                    cx={c[0]}
                    cy={c[1]}
                    r={6}
                    fill="#ff6666"
                    stroke="#800"
                    onMouseEnter={(e) => { onHover && onHover(f); setTooltip({ x: e.clientX, y: e.clientY, text: f.properties.name }); }}
                    onMouseMove={(e) => setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : t)}
                    onMouseLeave={() => { onHover && onHover(null); setTooltip(null); }}
                    onClick={() => onSelect && onSelect(f)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
