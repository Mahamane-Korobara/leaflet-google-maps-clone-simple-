// Gestion des POI (restaurants, bus, tram)
import { map } from './map-init.js';
import { icons } from './icons.js';
import { getDistance } from './utils.js';
import { getUserLatLng } from './geolocation.js';

const POI_RADIUS = 300;
let poiLayerGroup = L.layerGroup().addTo(map);
let radiusCircle = null;

function showRadiusCircle(center) {
    if (radiusCircle) map.removeLayer(radiusCircle);
    radiusCircle = L.circle(center, {
        color: '#888', fillColor: '#bbb', fillOpacity: 0.1, radius: POI_RADIUS
    }).addTo(map);
}

export async function loadPOI() {
    poiLayerGroup.clearLayers();
    const center = map.getCenter();
    showRadiusCircle(center);
    const lat = center.lat;
    const lon = center.lng;
    const query = `
        [out:json][timeout:25];
        (
          node["highway"="bus_stop"](around:${POI_RADIUS},${lat},${lon});
          node["railway"="tram_stop"](around:${POI_RADIUS},${lat},${lon});
          node["amenity"="restaurant"](around:${POI_RADIUS},${lat},${lon});
        );
        out body;
    `;
    try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: query
        });
        if (!response.ok) return;
        const data = await response.json();
        let userLatLng = getUserLatLng();
        let elements = data.elements;
        if (userLatLng) {
            elements = elements.map(el => {
                el._distance = getDistance(userLatLng.lat, userLatLng.lng, el.lat, el.lon);
                return el;
            }).sort((a, b) => a._distance - b._distance);
        }
        elements.forEach(el => {
            let type = null;
            if (el.tags && el.tags.highway === "bus_stop") type = "bus";
            else if (el.tags && el.tags.railway === "tram_stop") type = "tram";
            else if (el.tags && el.tags.amenity === "restaurant") type = "restaurant";
            if (type) {
                const name = el.tags.name || (type === 'restaurant' ? 'Restaurant' : type === 'bus' ? 'Arrêt de bus' : 'Arrêt de tram');
                const marker = L.marker([el.lat, el.lon], { icon: icons[type] })
                    .bindPopup(`<div style='text-align:center;'><b>${name}</b></div>`);
                poiLayerGroup.addLayer(marker);
            }
        });
    } catch {}
}
