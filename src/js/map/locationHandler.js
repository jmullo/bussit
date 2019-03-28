import { LatLng } from 'leaflet/dist/leaflet-src.esm';

import { GEOLOCATION_OPTIONS, GEOLOCATION_MAX_ZOOM, PAN_OPTIONS } from 'constants/config';
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
            positionNumber = 0;
        }
    });
};

const handleSuccess = ({ coords }) => {
    const { accuracy, latitude, longitude } = coords;
    const latLng = new LatLng(latitude, longitude);
    const { maxBounds } = dataContext;

    if (maxBounds && maxBounds.contains(latLng)) {
        const bounds = latLng.toBounds(accuracy);

        if (!positionNumber++) {
            console.log('eka');
            map.fitBounds(bounds, {
                ...PAN_OPTIONS,
                maxZoom: GEOLOCATION_MAX_ZOOM
            });
        } else {
            console.log('muu');
            map.panTo(latLng, PAN_OPTIONS);
        }
    }
};

const handleError = ({ message }) => console.log(message);
