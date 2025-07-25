import './map-init.js';
import { setupControls } from './controls.js';
import { showUserLocation } from './geolocation.js';
import { loadPOI } from './poi.js';
import { setupSearchForm } from './search.js';
import './click-marker.js';
import './rotation.js';

window.addEventListener('DOMContentLoaded', () => {
    setupControls();
    showUserLocation();
    loadPOI();
    setupSearchForm();
    // Bouton "Ma position"
    const controlsDiv = document.getElementById('controls');
    const locateBtn = document.createElement('button');
    locateBtn.textContent = 'Ma position';
    locateBtn.style.marginLeft = '10px';
    locateBtn.onclick = (e) => {
        e.preventDefault();
        showUserLocation();
    };
    controlsDiv.appendChild(locateBtn);

    // Recharge les POI à chaque déplacement de la carte
    import('./map-init.js').then(({ map }) => {
        map.on('moveend', loadPOI);
    });
});
