import L from 'leaflet';

import { STOP_RADIUS } from 'constants/constants';

const layerGroup = L.layerGroup();

export const createBusLayer = (map, buses) => {
    
    _.forOwn(buses, (bus) => {
        L.marker(bus.latLng, { icon: createIcon(bus) }).addTo(layerGroup);
    });

    return layerGroup;
};

const createIcon = ({ lineRef, bearing, speed }) => {

    const className = (speed > 0) ? 'moving bus' : 'bus';

    const html = `<div class="shadow"></div>` +
                 `<div class="arrow" style="transform: rotate(${bearing + 45}deg)"></div>` +
                 `<div class="number">${lineRef}</div>`;

    return L.divIcon({
        className: className,
        iconSize: [28, 28],
        html: html
    });
};
