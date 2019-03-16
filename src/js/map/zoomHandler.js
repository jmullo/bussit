import L from 'leaflet';

let zooming = false;

export const addZoomHandler = (map) => {
    map.on('zoomstart', () => { zooming = true; });
    map.on('zoomend', () => { zooming = false; });
};

export const whenNotZooming = (method) => {
    if (zooming) {
        _.defer(() => whenNotZooming(method));
    } else {
        L.Util.requestAnimFrame(method);
    }
};
