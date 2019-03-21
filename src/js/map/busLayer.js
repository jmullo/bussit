import { forOwn, includes } from 'lodash';
import { LayerGroup, Util } from 'leaflet/dist/leaflet-src.esm';

import { BUS_DEAD_THRESHOLD } from 'constants/constants';
import { createMarker, updateMarker } from 'map/busMarker';
import { whenNotZooming } from 'map/zoomHandler';

const layerGroup = new LayerGroup();

let busMarkers = {};

export const createBusLayer = () => (layerGroup);

export const updateBuses = (buses) => {
    forOwn(buses, (bus, vehicleRef) => {
        if (busMarkers[vehicleRef]) {
            whenNotZooming(() => updateMarker(busMarkers[vehicleRef], bus));
        } else {
            whenNotZooming(() => busMarkers[vehicleRef] = createMarker(bus, layerGroup));
        }
    });
};

export const removeBuses = (selectedLines) => {
    Util.requestAnimFrame(() => {
        forOwn(busMarkers, (marker, vehicleRef) => {
            if (!includes(selectedLines, marker.lineRef)) {
                marker.remove();
                delete busMarkers[vehicleRef];
            }
        });
    });
};

export const removeDeadBuses = () => {
    Util.requestAnimFrame(() => {
        const timestamp = new Date().getTime();

        forOwn(busMarkers, (marker, vehicleRef) => {
            const deadSeconds = (timestamp - marker.timestamp) / 1000;
    
            if (deadSeconds > BUS_DEAD_THRESHOLD) {
                marker.remove();
                delete busMarkers[vehicleRef];
            }
        });
    });
};
