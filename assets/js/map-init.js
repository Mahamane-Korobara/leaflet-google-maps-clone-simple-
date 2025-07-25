// Initialisation de la carte et des couches de base
import { osmLayer, satelliteLayer, labelsLayer } from './tile-layers.js';

export const map = L.map("map").setView([0, 0], 2);
osmLayer.addTo(map);

export { osmLayer, satelliteLayer, labelsLayer };
