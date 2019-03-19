import { forOwn } from 'lodash';
import { LayerGroup, LatLngBounds, Circle } from 'leaflet/dist/leaflet-src.esm';

import { STOP_OPTIONS } from 'constants/constants';

const layerGroup = new LayerGroup();
const maxBounds = new LatLngBounds();

export const createStopLayer = (map, stops) => {

    forOwn(stops, ({ latLng }) => {
        maxBounds.extend(latLng);
        new Circle(latLng, STOP_OPTIONS).addTo(layerGroup);
    });

    layerGroup.on('add', () => map.setMaxBounds(maxBounds.pad(0.1)));

    return layerGroup;
};
