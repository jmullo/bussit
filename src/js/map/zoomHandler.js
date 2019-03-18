import { defer } from 'lodash';
import L from 'leaflet';

let zooming = false;

export const addZoomHandler = (map) => {
    map.on('zoomstart', () => { zooming = true; });
    map.on('zoomend', () => { zooming = false; });
};

export const whenNotZooming = (method) => {
    if (zooming) {
        defer(() => whenNotZooming(method));
    } else {
        L.Util.requestAnimFrame(method);
    }
};
