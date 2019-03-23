export let zooming = false;

const MARKER_PANE_CLASS = '.leaflet-marker-pane';
const SMOOTH_TRANSITION_ON = 'leaflet-pane leaflet-marker-pane smoothTransition';
const SMOOTH_TRANSITION_OFF = 'leaflet-pane leaflet-marker-pane';

export const addZoomHandler = (map) => {
    document.querySelector(MARKER_PANE_CLASS)
            .className = SMOOTH_TRANSITION_ON;

    map.on('zoomstart', () => {
        zooming = true;

        document.querySelector(MARKER_PANE_CLASS)
                .className = SMOOTH_TRANSITION_OFF;
    });

    map.on('zoomend', () => {
        zooming = false;

        document.querySelector(MARKER_PANE_CLASS)
                .className = SMOOTH_TRANSITION_ON;
    });
};
