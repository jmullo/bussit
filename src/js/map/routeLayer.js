import { LayerGroup, Polyline } from 'leaflet/dist/leaflet-src.esm';

import { ROUTE_OPTIONS } from 'constants/config';

const layerGroup = new LayerGroup();

let map;

export const addRouteLayer = (mapRef) => {
    map = mapRef;

    map.addLayer(layerGroup);
};

export const updateRoute = (points) => {
    layerGroup.clearLayers();
    new Polyline(points, ROUTE_OPTIONS).addTo(layerGroup);
};

export const removeRoute = () => {
    layerGroup.clearLayers();
};
