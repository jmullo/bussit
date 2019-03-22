import { UPDATE_INTERVAL_MS } from 'constants/constants';

import { getBuses } from 'api/data';
import { dataContext } from 'components/DataContext';
import { on } from 'utils/events';
import { updateBuses, removeBuses } from 'map/busLayer';

export const addBusHandler = () => {
    updateTimer();

    on('selectedLines', (selectedLines) => removeBuses(selectedLines));
};

const updateTimer = () => {
    setTimeout(async () => {
        const { selectedLines } = dataContext;
        const buses = await getBuses(selectedLines);

        setTimeout(() => updateBuses(buses), 1);
        updateTimer();
    }, UPDATE_INTERVAL_MS);
};
