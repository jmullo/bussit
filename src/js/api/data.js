import { pick, isEmpty } from 'lodash';
import axios from 'axios';

import { API_URL, EXCLUDED_BUS_FIELDS } from 'constants/config';

let requestNumber = 0;

export const getStops = async () => {
    return axios.get(`${API_URL}/stop-points`)
                .then((response) => response.data.body.reduce((result, value) => {
                    result[value.shortName] = {
                        name: value.name,
                        latLng: value.location.split(',').map((string) => Number(string))
                    };
                    
                    return result;
                }, {}));
};

export const getLines = async () => {
    return axios.get(`${API_URL}/lines`)
                .then((response) => response.data.body.reduce((result, value) => {
                    result[value.name] = pick(value, ['name', 'description']);
                    
                    return result;
                }, {}));
};

export const getBuses = async (selectedLines) => {
    const params = {
        'directionRef': (requestNumber++ % 2) + 1,
        'exclude-fields': EXCLUDED_BUS_FIELDS,
        ...!isEmpty(selectedLines) && { lineRef: selectedLines.join(',') }
    };

    return axios.get(`${API_URL}/vehicle-activity`, { params })
                .then((response) => response.data.body.reduce((result, { monitoredVehicleJourney }) => {
                    result[monitoredVehicleJourney.vehicleRef] = {
                        ...pick(monitoredVehicleJourney, ['delay', 'lineRef']),
                        bearing: Number(monitoredVehicleJourney.bearing),
                        speed: Number(monitoredVehicleJourney.speed),
                        latLng: [
                            Number(monitoredVehicleJourney.vehicleLocation.latitude),
                            Number(monitoredVehicleJourney.vehicleLocation.longitude),
                        ]
                    };
                    
                    return result;
                }, {}));
};

export const getRoutes = async () => {
    return axios.get(`${API_URL}/routes`)
                .then((response) => (response.data.body));
};

export const getJourneyPatterns = async () => {
    return axios.get(`${API_URL}/journey-patterns`)
                .then((response) => (response.data.body));
};

