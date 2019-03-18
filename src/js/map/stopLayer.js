import { forOwn } from 'lodash';
import L from 'leaflet';

import { STOP_OPTIONS } from 'constants/constants';

const layerGroup = L.layerGroup();
const maxBounds = L.latLngBounds();

export const createStopLayer = (map, stops) => {
    
    forOwn(stops, ({ latLng }) => {
        maxBounds.extend(latLng);
        L.circle(latLng, STOP_OPTIONS).addTo(layerGroup);
    });

    layerGroup.on('add', () => map.setMaxBounds(maxBounds.pad(0.1)));

    return layerGroup;
};
