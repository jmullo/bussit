import { forOwn, includes } from 'lodash';
import { LayerGroup } from 'leaflet/dist/leaflet-src.esm';

import { BUS_DEAD_THRESHOLD } from 'constants/constants';
import { createMarker, updateMarker } from 'map/busMarker';
import { onNextAnimFrame } from 'map/animFrame';

const layerGroup = new LayerGroup();

let busMarkers = {};

export const createBusLayer = () => (layerGroup);

export const updateBuses = (buses) => {
    forOwn(buses, (bus, vehicleRef) => {
        if (busMarkers[vehicleRef]) {
            onNextAnimFrame(() => updateMarker(busMarkers[vehicleRef], bus));
        } else {
            onNextAnimFrame(() => busMarkers[vehicleRef] = createMarker(bus, layerGroup));
        }
    });

    onNextAnimFrame(removeDeadBuses);
};

export const removeBuses = (selectedLines) => {
    onNextAnimFrame(() => {
        forOwn(busMarkers, (marker, vehicleRef) => {
            if (!includes(selectedLines, marker.lineRef)) {
                marker.remove();
                delete busMarkers[vehicleRef];
            }
        });
    });
};

const removeDeadBuses = () => {
    const timestamp = new Date().getTime();

    forOwn(busMarkers, (marker, vehicleRef) => {
        if ((timestamp - marker.timestamp) / 1000 > BUS_DEAD_THRESHOLD) {
            marker.remove();
            delete busMarkers[vehicleRef];
        }
    });
};
