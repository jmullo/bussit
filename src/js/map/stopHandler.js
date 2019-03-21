import { getStops } from 'api/data';
import { updateStops } from 'map/stopLayer';

export const addStopHandler = async () => {
    const stops = await getStops();

    updateStops(stops);
};
