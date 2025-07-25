// Recherche de lieux par nom
import { map } from './map-init.js';
import { icons } from './icons.js';
import { showUserLocation } from './geolocation.js';

let marker = null;

export async function searchLocation(query) {
    // Limiter la recherche à la zone visible
    const bounds = map.getBounds();
    const viewbox = [
        bounds.getWest(), bounds.getSouth(),
        bounds.getEast(), bounds.getNorth()
    ].join(',');
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&viewbox=${viewbox}&bounded=1`;
    let response = await fetch(url);
    let data = await response.json();
    // Fallback global si aucun résultat
    if (!data || data.length === 0) {
        url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
        response = await fetch(url);
        data = await response.json();
    }
    return data;
}

export function setupSearchForm() {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const errorMessage = document.getElementById("error-message");
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        errorMessage.textContent = "";
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) {
            showUserLocation();
            return;
        }
        try {
            const results = await searchLocation(searchTerm);
            if (results.length === 0) {
                errorMessage.textContent = "Aucun résultat trouvé pour cette recherche";
                return;
            }
            const location = results[0];
            const lat = parseFloat(location.lat);
            const lon = parseFloat(location.lon);
            if (marker) map.removeLayer(marker);
            marker = L.marker([lat, lon], { icon: icons.search })
                .addTo(map)
                .bindPopup(`<div style='text-align:center;'><b>${location.display_name}</b></div>`)
                .openPopup();
            map.setView([lat, lon], 13);
        } catch {
            errorMessage.textContent = "Erreur lors de la recherche du lieu";
        }
    });
}
