// Gestion de la position utilisateur
import { map } from './map-init.js';
import { userIcon } from './icons.js';

let userMarker = null;

export function showUserLocation(centerMap = true) {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            if (userMarker) map.removeLayer(userMarker);
            userMarker = L.marker([lat, lon], { icon: userIcon, zIndexOffset: 1000 })
                .addTo(map)
                .bindPopup("<b>Votre position exacte</b>").openPopup();
            if (centerMap) map.setView([lat, lon], 18);
        }
    );
}

export function getUserLatLng() {
    return userMarker ? userMarker.getLatLng() : null;
}
