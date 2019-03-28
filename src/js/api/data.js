import { pick, isEmpty } from 'lodash';
import axios from 'axios';

import { PROXY_URL, API_URL, EXCLUDED_BUS_FIELDS } from 'constants/config';

let requestNumber = 0;

export const getStops = async () => get('/stop-points', handleStops);
export const getLines = async () => get('/lines', handleLines);

export const getBuses = async (selectedLines) => {
    const parameters = {
        'directionRef': (requestNumber++ % 2) + 1,
        'exclude-fields': EXCLUDED_BUS_FIELDS,
        ...!isEmpty(selectedLines) && { lineRef: selectedLines.join(',') }
    };

    return get('/vehicle-activity', handleBuses, parameters);
};

const get = (endpoint, handler, parameters = {}) => {
    return axios.get(`${PROXY_URL}${API_URL}${endpoint}`, parameters)
                .catch((error) => handleError(endpoint, error))
                .then(handler)
                .catch((error) => handleError(endpoint, error));
};

const handleError = (endpoint, error) => console.log(`Error fetching ${endpoint}`, error);

const handleStops = (response) => response.data.body.reduce((result, value) => {
    result[value.shortName] = {
        name: value.name,
        latLng: value.location.split(',').map((string) => Number(string))
    };

    return result;
}, {});

const handleLines = (response) => response.data.body.reduce((result, value) => {
    result[value.name] = pick(value, ['name', 'description']);

    return result;
}, {})

const handleBuses = (response) => response.data.body.reduce((result, { monitoredVehicleJourney }) => {
    result[monitoredVehicleJourney.vehicleRef] = {
        ...pick(monitoredVehicleJourney, ['delay', 'lineRef', 'journeyPatternRef', 'vehicleRef']),
        bearing: Number(monitoredVehicleJourney.bearing),
        speed: Number(monitoredVehicleJourney.speed),
        latLng: [
            Number(monitoredVehicleJourney.vehicleLocation.latitude),
            Number(monitoredVehicleJourney.vehicleLocation.longitude),
        ]
    };

    return result;
}, {})
