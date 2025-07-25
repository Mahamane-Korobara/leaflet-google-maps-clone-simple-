# Carte interactive Leaflet.js

Ce projet est une application web cartographique interactive réalisée avec Leaflet.js, permettant la recherche de lieux, l’affichage de points d’intérêt (POI), la localisation utilisateur, la rotation de la carte, et bien plus.

## Fonctionnalités principales

- **Recherche par nom de lieu** (Nominatim)
- **Affichage de POI** (restaurants, arrêts de bus, tramways) autour du centre de la carte (Overpass API)
- **Vue satellite** (Esri World Imagery) et vue carte classique, avec superposition des labels
- **Rotation de la carte** (Ctrl + glisser)
- **Localisation automatique de l’utilisateur** et bouton "Ma position"
- **Ajout de marqueur personnalisé** (clic sur la carte, avec nom du lieu)
- **Légende des couleurs** pour chaque type de marqueur
- **Interface moderne et responsive**
- **Code modulaire** (modules ES6)

## Légende des marqueurs

- ![Restaurant](assets/img/marker-icon-red.png) **Restaurant** (rouge)
- ![Bus](assets/img/marker-icon-blue.png) **Arrêt de bus** (bleu)
- ![Tram](assets/img/marker-icon-green.png) **Tram** (vert)
- ![Recherche](assets/img/marker-icon-brown.png) **Résultat de recherche** (marron)
- ![Utilisateur](assets/img/marker-icon-gold.png) **Ma position** (doré)
- ![Clic personnalisé](assets/img/marker-icon-violet.png) **Marqueur personnalisé** (violet)

## Structure du projet

```
index.htm
assets/
  css/
    style.css
  js/
    main.js
    map-init.js
    tile-layers.js
    icons.js
    utils.js
    controls.js
    geolocation.js
    poi.js
    search.js
    click-marker.js
    rotation.js
  img/
    marker-icon-red.png
    marker-icon-blue.png
    marker-icon-green.png
    marker-icon-brown.png
    marker-icon-gold.png
    marker-icon-violet.png
```

## Installation et lancement

1. Clonez le dépôt ou copiez les fichiers dans un dossier local.
2. Ouvrez `index.htm` dans votre navigateur (un serveur local est recommandé pour éviter les problèmes CORS).

## Dépendances externes
- [Leaflet.js](https://leafletjs.com/)
- [leaflet-rotatedmarker](https://github.com/bbecquet/Leaflet.RotatedMarker)
- [leaflet-map-rotation](https://github.com/ptv-logistics/Leaflet.MapRotation)
- [Nominatim](https://nominatim.openstreetmap.org/)
- [Overpass API](https://overpass-api.de/)
- [Esri World Imagery](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9)

## Auteur
Mahamane

