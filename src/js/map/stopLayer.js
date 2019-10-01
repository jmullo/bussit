import { forOwn } from 'lodash';
import { LayerGroup, LatLngBounds, Circle } from 'leaflet/dist/leaflet-src.esm';

import { STOP_OPTIONS, STOP_MIN_ZOOM_LEVEL } from 'constants/config';

const layerGroup = new LayerGroup();
const maxBounds = new LatLngBounds();

let map;

export const addStopLayer = (mapRef) => {
    map = mapRef;

    if (map.getZoom() >= STOP_MIN_ZOOM_LEVEL) {
        map.addLayer(layerGroup);
    }

    map.on('zoomend', () => {
        if (map.getZoom() >= STOP_MIN_ZOOM_LEVEL && !map.hasLayer(layerGroup)) {
            map.addLayer(layerGroup);
        } else if (map.getZoom() < STOP_MIN_ZOOM_LEVEL && map.hasLayer(layerGroup)) {
            map.removeLayer(layerGroup);
        }
    });
};

export const updateStops = (stops) => {
    forOwn(stops, ({ latLng }) => {
        maxBounds.extend(latLng);
        new Circle(latLng, STOP_OPTIONS).addTo(layerGroup);
    });

    map.setMaxBounds(maxBounds.pad(0.1));

    return maxBounds;
};
