// Gestion des boutons de vue et du bouton "Ma position"
import { map, osmLayer, satelliteLayer, labelsLayer } from './map-init.js';

export function setupControls() {
    const satelliteButton = document.getElementById("satelliteView");
    const mapButton = document.getElementById("mapView");
    satelliteButton.addEventListener("click", () => {
        map.removeLayer(osmLayer);
        satelliteLayer.addTo(map);
        labelsLayer.addTo(map);
        satelliteButton.style.backgroundColor = "#45a049";
        mapButton.style.backgroundColor = "#4CAF50";
    });
    mapButton.addEventListener("click", () => {
        map.removeLayer(satelliteLayer);
        map.removeLayer(labelsLayer);
        osmLayer.addTo(map);
        mapButton.style.backgroundColor = "#45a049";
        satelliteButton.style.backgroundColor = "#4CAF50";
    });
}
