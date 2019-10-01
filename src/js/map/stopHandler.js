import { getStops } from 'api/data';
import { dataContext } from '../components/DataContext';
import { updateStops } from 'map/stopLayer';

export const addStopHandler = async () => {
    const stops = await getStops();

    if (stops) {
        dataContext.maxBounds = updateStops(stops);
    }
};
