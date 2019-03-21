import { defer } from 'lodash';

import { UPDATE_INTERVAL_MS, REMOVE_INTERVAL_MS } from 'constants/constants';

import { getBuses } from 'api/data';
import { dataContext } from 'components/DataContext';
import { on } from 'utils/events';
import { updateBuses, removeBuses, removeDeadBuses } from 'map/busLayer';

export const addBusHandler = () => {
    updateTimer();
    removeTimer();

    on('selectedLines', (selectedLines) => removeBuses(selectedLines));
};

const updateTimer = () => {
    setTimeout(async () => {
        const { selectedLines } = dataContext;
        const buses = await getBuses(selectedLines);

        defer(() => updateBuses(buses));
        updateTimer();
    }, UPDATE_INTERVAL_MS);
};

const removeTimer = () => {
    setTimeout(() => {
        removeDeadBuses();
        removeTimer();
    }, REMOVE_INTERVAL_MS);
};
