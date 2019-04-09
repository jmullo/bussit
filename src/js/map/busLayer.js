import { forOwn, includes, isEmpty } from 'lodash';
import { LayerGroup } from 'leaflet/dist/leaflet-src.esm';

import { BUS_DEAD_THRESHOLD } from 'constants/config';
import { dataContext } from 'components/DataContext';
import { createMarker, updateMarker } from 'map/busMarker';
import { onNextAnimFrame } from 'map/animFrame';

const layerGroup = new LayerGroup();

let busMarkers = {};

export const addBusLayer = (mapRef) => layerGroup.addTo(mapRef);

export const updateBuses = () => {
    forOwn(dataContext.buses, (bus, vehicleRef) => {
        onNextAnimFrame(() => {
            if (isLineSelected(bus.lineRef)) {
                if (busMarkers[vehicleRef]) {
                    updateMarker(busMarkers[vehicleRef], bus);
                } else {
                    busMarkers[vehicleRef] = createMarker(bus, layerGroup);
                }
            }
        }, `updateBus-${vehicleRef}`);
    });

    onNextAnimFrame(removeBuses, 'removeBuses');
};

export const removeBuses = () => {
    const timestamp = new Date().getTime();

    forOwn(busMarkers, (marker, vehicleRef) => {
        if (!dataContext.buses[vehicleRef] ||
            (timestamp - marker.timestamp) / 1000 > BUS_DEAD_THRESHOLD) {

            marker.remove();
            delete busMarkers[vehicleRef];
        }
    });
};

const isLineSelected = (lineRef) => {
    const { selectedLines } = dataContext;
    return isEmpty(selectedLines) || includes(selectedLines, lineRef);
};
