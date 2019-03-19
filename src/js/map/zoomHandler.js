import { defer } from 'lodash';
import { Util } from 'leaflet/dist/leaflet-src.esm';

let zooming = false;

export const addZoomHandler = (map) => {
    map.on('zoomstart', () => { zooming = true; });
    map.on('zoomend', () => { zooming = false; });
};

export const whenNotZooming = (method) => {
    if (zooming) {
        defer(() => whenNotZooming(method));
    } else {
        Util.requestAnimFrame(method);
    }
};
