import React, { useEffect, useState } from 'react';
import { getCountryData } from '../services/countryService';

export default function CountryModal({ iso, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!iso) return;
    setLoading(true);
    getCountryData(iso)
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [iso]);

  if (!iso) return null;

  return (
    <div role="dialog" aria-modal="true" style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Fechar">X</button>
        {loading && <div>Carregando...</div>}
        {data && (
          <div>
            <h2>{data.name.common} ({data.cca2})</h2>
            <img src={data.flags?.png || data.flags?.svg} alt={`${data.name.common} flag`} width={120} />
            <p>Capital: {data.capital?.[0] || '—'}</p>
            <p>População: {data.population?.toLocaleString() || '—'}</p>
            <p>Área: {data.area?.toLocaleString()} km²</p>
            <p>Região: {data.region} / {data.subregion}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
};
const modalStyle = { background: 'white', padding: 20, borderRadius: 6, maxWidth: 600, width: '90%' };
