import { LatLng } from 'leaflet/dist/leaflet-src.esm';

import { GEOLOCATION_OPTIONS, GEOLOCATION_MAX_ZOOM } from 'constants/config';
import { dataContext } from 'components/DataContext';
import { on } from 'utils/events';

let map;
let watchId;
let positionNumber = 0;

export const addLocationHandler = (mapRef) => {
    const { geolocation } = navigator;

    map = mapRef;

    on('locateEnabled', (enabled) => {
        if (enabled) {
            watchId = geolocation.watchPosition(handleSuccess, handleError, GEOLOCATION_OPTIONS);
        } else {
            geolocation.clearWatch(watchId);
        }
    });
};

const handleSuccess = ({ coords }) => {
    const { accuracy, latitude, longitude } = coords;
    const latLng = new LatLng(latitude, longitude);
    const { maxBounds } = dataContext;

    if (maxBounds && maxBounds.contains(latLng)) {
        const bounds = latLng.toBounds(accuracy);

        if (++positionNumber > 1) {
            map.fitBounds(bounds, {
                animate: true,
                maxZoom: GEOLOCATION_MAX_ZOOM
            });
        } else {
            map.panTo(latLng, { animate: true });
        }
    }
};

const handleError = ({ message }) => {
    dataContext.locateEnabled = false;
    positionNumber = 0;

    console.log(message);
};
