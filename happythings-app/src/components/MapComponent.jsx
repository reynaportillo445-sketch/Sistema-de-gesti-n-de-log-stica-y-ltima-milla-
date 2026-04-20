import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapComponent({ origin, destination, onRouteUpdate }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Inicializar mapa
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([13.4833, -88.1833], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    const searchAddress = async (address) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();
        if (data.length > 0) {
          return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
      } catch (error) {
        console.error('Error buscando dirección:', error);
      }
      return null;
    };

    const searchAndRoute = async (orig, dest) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Limpiar capas anteriores
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    const originCoords = await searchAddress(orig);
    const destCoords = await searchAddress(dest);

    if (!originCoords || !destCoords) {
      console.error('No se pudieron encontrar las direcciones');
      return;
    }

    // Marcadores
    const originMarker = L.marker([originCoords.lat, originCoords.lng], {
      title: 'Origen (Repartidor)',
    }).addTo(map).bindPopup('🚚 Repartidor');

    const destMarker = L.marker([destCoords.lat, destCoords.lng], {
      title: 'Destino (Cliente)',
    }).addTo(map).bindPopup('📦 Cliente');

    // Obtener ruta
    try {
      const routeResponse = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson`
      );
      const routeData = await routeResponse.json();

      if (routeData.routes.length > 0) {
        const coords = routeData.routes[0].geometry.coordinates;
        const puntos = coords.map((c) => [c[1], c[0]]);

        // Dibujar ruta
        L.polyline(puntos, {
          color: '#00d9ff',
          weight: 4,
          opacity: 0.8,
        }).addTo(map);

        // Ajustar vista
        const group = new L.featureGroup([originMarker, destMarker]);
        map.fitBounds(group.getBounds().pad(0.1));

        // Calcular distancia y tiempo
        const distance = (routeData.routes[0].distance / 1000).toFixed(2);
        const duration = Math.round(routeData.routes[0].duration / 60);

        if (onRouteUpdate) {
          onRouteUpdate({ distance, duration, route: puntos });
        }
      }
    } catch (error) {
      console.error('Error obteniendo ruta:', error);
    }
  };

    // Buscar direcciones si hay origen y destino
    if (origin && destination) {
      searchAndRoute(origin, destination);
    }
  }, [origin, destination]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100vh' }}
    />
  );
}