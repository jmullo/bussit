export let zooming = false;

export const addZoomHandler = (map) => {
    map.on('zoomstart', () => { zooming = true; });
    map.on('zoomend', () => { zooming = false; });
};
