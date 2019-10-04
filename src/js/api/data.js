import { pick, isEmpty, last } from 'lodash';
import axios from 'axios';

import { PROXY_URL, API_URL, EXCLUDED_BUS_FIELDS } from 'constants/config';

let requestNumber = 0;

export const getStops = async () => get('/stop-points', handleStops);
export const getLines = async () => get('/lines', handleLines);

export const getBuses = async (selectedLines) => {
    const parameters = {
        'directionRef': (requestNumber++ % 2) + 1,
        'exclude-fields': EXCLUDED_BUS_FIELDS,
        ...!isEmpty(selectedLines) && { lineRef: selectedLines.join('*,') + '*' }
    };

    return get('/vehicle-activity', handleBuses, parameters);
};

export const getRoute = async (journeyRef) => {
    const parameters = {
        'exclude-fields': 'calls'
    };

    return get(`/journeys/${journeyRef}`, handleJourney, parameters);
};

const get = (endpoint, handler, params = {}) => {
    return axios.get(`${PROXY_URL}${API_URL}${endpoint}`, { params })
                .catch((error) => handleError(endpoint, error))
                .then(handler)
                .catch((error) => handleError(endpoint, error));
};

const handleError = (endpoint, error) => console.log(`Error fetching ${endpoint}`, error);

const handleJourney = async (response) => {
    const routeRef = response.data.body[0].routeUrl.split('1/routes/')[1];

    const parameters = {
        'exclude-fields': 'journeys,journeyPatterns'
    };

    return get(`/routes/${routeRef}`, handleRoute, parameters);
};

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
}, {});

const handleBuses = (response) => {
    const timestamp = new Date().getTime();

    return response.data.body.reduce((result, { monitoredVehicleJourney }) => {
        result[monitoredVehicleJourney.vehicleRef] = {
            journeyRef: monitoredVehicleJourney.framedVehicleJourneyRef.datedVehicleJourneyRef.split('1/journeys/')[1],
            lineRef: monitoredVehicleJourney.lineRef.replace(/[A-Z]/g, ''),
            ...pick(monitoredVehicleJourney, [
                'delay',
                'journeyPatternRef',
                'vehicleRef',
                'bearing',
                'speed'
            ]),
            timestamp: timestamp,
            latLng: [
                Number(monitoredVehicleJourney.vehicleLocation.latitude),
                Number(monitoredVehicleJourney.vehicleLocation.longitude),
            ]
        };

        return result;
    }, {});
};

const handleRoute = (response) => {
    const projection = response.data.body[0].geographicCoordinateProjection;
    const points = projection.split(':');

    return points.reduce((result, point) => {
        const latLng = point.split(',');

        if (!result) {
            return [[
                latLng[0] / 100000,
                latLng[1] / 100000
            ]];
        }

        result.push([
            last(result)[0] - (latLng[0] / 100000),
            last(result)[1] - (latLng[1] / 100000),
        ]);

        return result;
    }, null);
};
