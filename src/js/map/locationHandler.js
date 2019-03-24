import { LatLng } from 'leaflet/dist/leaflet-src.esm';

import { dataContext } from 'components/DataContext';
import { on } from 'utils/events';

let iframe;

export const addLocationHandler = (map) => {

    window.addEventListener('message', (message) => {
        const { type, accuracy, latitude, longitude, error } = message.data;

        if (type === 'locateSuccess') {
            const bounds = new LatLng(latitude, longitude).toBounds(accuracy);
            map.flyToBounds(bounds);
        } else if (type === 'locateError') {
            dataContext.locateEnabled = false;
        }
    });

    on('locateEnabled', (enabled) => {
        if (enabled) {
            iframe = createFrame();
            document.body.appendChild(iframe);
        } else {
            document.body.removeChild(iframe);
        }
    });
};

const createFrame = () => {
    const frame = document.createElement('iframe');

    frame.src = 'geolocation.html';
    frame.allow = 'geolocation';
    frame.className = 'iframe';

    return frame;
};
