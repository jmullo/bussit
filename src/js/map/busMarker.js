import { Marker, DivIcon } from 'leaflet/dist/leaflet-src.esm';

import { emit } from 'utils/events';
import { isEarly, isLate } from 'utils/time';

export const updateMarker = (marker, bus) => {
    if (marker) {
        marker.setLatLng(bus.latLng).setIcon(createIcon(bus));
        updateMarkerProperties(marker, bus);
    }
};

export const createMarker = (bus, layerGroup) => {
    const marker = new Marker(bus.latLng, { icon: createIcon(bus) }).addTo(layerGroup);

    updateMarkerProperties(marker, bus);

    marker.on('click', () => emit('markerClick', {
        vehicleRef: marker.vehicleRef,
        journeyPatternRef: marker.journeyPatternRef
    }));

    return marker;
};

const createIcon = ({ journeyPatternRef, bearing, speed, delay }) => {
    const classNames = (speed > 0) ? ['moving','bus'] : ['bus'];

    if (isEarly(delay)) {
        classNames.push('early');
    } else if (isLate(delay)) {
        classNames.push('late');
    }

    if (journeyPatternRef.length > 2) {
        classNames.push('long');
    }

    const html = `<div class="shadow"></div>` +
                 `<div class="arrow" style="transform: rotate(${bearing + 45}deg)"></div>` +
                 `<div class="number">${journeyPatternRef}</div>`;

    return new DivIcon({
        className: classNames.join(' '),
        iconSize: [28, 28],
        html: html
    });
};

const updateMarkerProperties = (marker, bus) => {
    marker.journeyPatternRef = bus.journeyPatternRef;
    marker.vehicleRef = bus.vehicleRef;
    marker.timestamp = new Date().getTime();
};
