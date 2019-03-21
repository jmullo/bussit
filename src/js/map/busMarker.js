import { startsWith } from 'lodash';
import { Marker, DivIcon } from 'leaflet/dist/leaflet-src.esm';
import Duration from 'luxon/src/duration';

import { BUS_EARLY_THRESHOLD, BUS_LATE_THRESHOLD } from 'constants/constants';

export const updateMarker = (marker, bus) => {
    if (marker) {
        marker.setLatLng(bus.latLng)
              .setIcon(createIcon(bus));

        marker.timestamp = new Date().getTime();
    }
};

export const createMarker = (bus, layerGroup) => {
    const marker = new Marker(bus.latLng, { icon: createIcon(bus) }).addTo(layerGroup);
            
    marker.lineRef = bus.lineRef;
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

    return new DivIcon({
        className: classNames.join(' '),
        iconSize: [28, 28],
        html: html
    });
};
