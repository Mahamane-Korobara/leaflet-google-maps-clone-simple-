// Marqueur violet au clic sur la carte
import { map } from './map-init.js';
import { violetIcon } from './icons.js';

let clickMarker = null;

map.on('click', async function(e) {
    // Vérifier si le clic est sur un marqueur existant
    let isOnMarker = false;
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker && layer.getLatLng().equals(e.latlng)) {
            isOnMarker = true;
        }
    });
    if (!isOnMarker) {
        if (clickMarker) map.removeLayer(clickMarker);
        // Récupérer le nom du lieu via Nominatim reverse
        let placeName = '';
        try {
            const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
            const data = await resp.json();
            placeName = data.display_name || 'Lieu inconnu';
        } catch {
            placeName = 'Lieu inconnu';
        }
        clickMarker = L.marker(e.latlng, { icon: violetIcon })
            .addTo(map)
            .bindPopup(`<b>${placeName}</b>`)
            .openPopup();
    }
});
