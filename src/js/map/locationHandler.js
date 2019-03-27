import { LatLng } from 'leaflet/dist/leaflet-src.esm';

import { GEOLOCATION_OPTIONS } from 'constants/config';
import { dataContext } from 'components/DataContext';
import { on } from 'utils/events';

let map;
let watchId;

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
        map.flyToBounds(bounds);
    }
};

const handleError = ({ message }) => {
    dataContext.locateEnabled = false;
    console.log(message);
};
