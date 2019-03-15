import _ from 'lodash';
import axios from 'axios';

import { API_URL, EXCLUDED_BUS_FIELDS } from 'constants/constants';

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
                    result[value.name] = _.pick(value, ['name', 'description']);
                    
                    return result;
                }, {}));
};

export const getBuses = async () => {
    return axios.get(`${API_URL}/vehicle-activity`, {
                    params: {
                        'exclude-fields': EXCLUDED_BUS_FIELDS
                    }
                })
                .then((response) => response.data.body.reduce((result, { monitoredVehicleJourney }) => {
                    result[monitoredVehicleJourney.vehicleRef] = {
                        ..._.pick(monitoredVehicleJourney, ['delay', 'lineRef']),
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

