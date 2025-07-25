// Rotation de la carte avec Ctrl + glisser
import { map } from './map-init.js';

let isRotating = false;
let startAngle = 0;
let startX = 0;

map.on('mousedown', function(e) {
    if (e.originalEvent.ctrlKey) {
        isRotating = true;
        startX = e.originalEvent.clientX;
        startAngle = map.rotationAngle || 0;
        map.dragging.disable();
    }
});

map.on('mousemove', function(e) {
    if (isRotating) {
        const dx = e.originalEvent.clientX - startX;
        const angle = startAngle + dx;
        if (map.setRotationAngle) {
            map.setRotationAngle(angle);
        }
    }
});

map.on('mouseup', function(e) {
    if (isRotating) {
        isRotating = false;
        map.dragging.enable();
    }
});
