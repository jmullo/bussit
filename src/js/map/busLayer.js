import { map, includes, filter, isEmpty, cloneDeep } from 'lodash';
import { LayerGroup } from 'leaflet/dist/leaflet-src.esm';

import { BUS_UPDATE_BATCH_SIZE } from 'constants/config';
import { dataContext } from 'components/DataContext';
import { createMarker, updateMarker } from 'map/busMarker';
import { onNextAnimFrame } from 'map/animFrame';

const layerGroup = new LayerGroup();

let busMarkers = {};
let updateQueue = [];

export const addBusLayer = (mapRef) => layerGroup.addTo(mapRef);

export const updateBuses = (buses) => {
    const markersToRemove = filter(busMarkers, ({ vehicleRef }) => !buses[vehicleRef]);

    remove(markersToRemove);

    updateQueue = map(buses, (bus) => cloneDeep(bus));

    update();
};

const remove = (markers) => {
    if (!isEmpty(markers)) {
        onNextAnimFrame(() => {
            markers.forEach((marker) => {
                marker.remove();
                delete busMarkers[marker.vehicleRef];
            });
        });
    }
};

const update = () => {
    const buses = updateQueue.splice(0, BUS_UPDATE_BATCH_SIZE);

    onNextAnimFrame(() => {
        buses.forEach((bus) => {
            if (busMarkers[bus.vehicleRef]) {
                updateMarker(busMarkers[bus.vehicleRef], bus);
            } else {
                busMarkers[bus.vehicleRef] = createMarker(bus, layerGroup);
            }
        });
    });

    if (updateQueue.length > 0) {
        update();
    }
};

const isLineSelected = (lineRef) => {
    const { selectedLines } = dataContext;
    return isEmpty(selectedLines) || includes(selectedLines, lineRef);
};
