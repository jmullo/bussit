import { UPDATE_INTERVAL_MS } from 'constants/config';
import { getBuses } from 'api/data';
import { dataContext } from 'components/DataContext';
import { on } from 'utils/events';
import { pageVisible } from 'utils/visibility';
import { updateBuses, removeUnselectedBuses } from 'map/busLayer';

export const addBusHandler = () => {
    updateTimer();

    on('selectedLines', removeUnselectedBuses);
};

const updateTimer = () => {
    setTimeout(async () => {
        if (pageVisible) {
            const { selectedLines } = dataContext;
            const buses = await getBuses(selectedLines);

            updateBuses(buses);
        }

        updateTimer();
    }, UPDATE_INTERVAL_MS);
};
