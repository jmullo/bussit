import { forOwn } from 'lodash';
import { LayerGroup, LatLngBounds, Circle } from 'leaflet/dist/leaflet-src.esm';

import { STOP_OPTIONS } from 'constants/constants';

const layerGroup = new LayerGroup();
const maxBounds = new LatLngBounds();

let map;

export const createStopLayer = (mapRef) => {
    map = mapRef;

    return layerGroup;
};

export const updateStops = (stops) => {

    forOwn(stops, ({ latLng }) => {
        maxBounds.extend(latLng);
        new Circle(latLng, STOP_OPTIONS).addTo(layerGroup);
    });

    map.setMaxBounds(maxBounds.pad(0.1));

    return layerGroup;
};
