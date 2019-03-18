import { forOwn, startsWith } from 'lodash';
import L from 'leaflet';
import Duration from 'luxon/src/duration';

import {
    BUS_EARLY_THRESHOLD, BUS_LATE_THRESHOLD, BUS_DEAD_THRESHOLD
} from 'constants/constants';

import { whenNotZooming } from 'map/zoomHandler';

const layerGroup = L.layerGroup();

let busMarkers = {};

export const createBusLayer = () => (layerGroup);

export const updateBuses = (buses) => {
    forOwn(buses, (bus, vehicleRef) => {
        if (busMarkers[vehicleRef]) {
            whenNotZooming(() => updateMarker(busMarkers[vehicleRef], bus));
        } else {
            whenNotZooming(() => busMarkers[vehicleRef] = createMarker(bus));
        }
    });
};

export const removeDeadBuses = () => {
    L.Util.requestAnimFrame(() => {
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

const updateMarker = (marker, bus) => {
    marker.setLatLng(bus.latLng)
          .setIcon(createIcon(bus));

    marker.timestamp = new Date().getTime();
};

const createMarker = (bus) => {
    const marker = L.marker(bus.latLng, { icon: createIcon(bus) }).addTo(layerGroup);
            
    marker.timestamp = new Date().getTime();

    return marker;
};

const createIcon = ({ lineRef, bearing, speed, delay }) => {
    const classNames = (speed > 0) ? ['moving','bus'] : ['bus'];

    const negative = startsWith(delay, '-');
    const delaySeconds = negative ? Duration.fromISO(delay.slice(1)).negate().as('seconds')
                                  : Duration.fromISO(delay).as('seconds');

    if (delaySeconds < BUS_EARLY_THRESHOLD) {
        classNames.push('early');
    } else if (delaySeconds > BUS_LATE_THRESHOLD) {
        classNames.push('late');
    }

    const html = `<div class="shadow"></div>` +
                 `<div class="arrow" style="transform: rotate(${bearing + 45}deg)"></div>` +
                 `<div class="number">${lineRef}</div>`;

    return L.divIcon({
        className: classNames.join(' '),
        iconSize: [28, 28],
        html: html
    });
};
