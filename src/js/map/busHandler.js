import { defer } from 'lodash';

import { UPDATE_INTERVAL_MS, REMOVE_INTERVAL_MS } from 'constants/constants';

import { getBuses } from 'api/data';
import { dataContext } from 'components/DataContext';
import { updateBuses, removeDeadBuses } from 'map/busLayer';

export const addBusHandler = () => {
    update();
    remove();
};

const update = () => {
    setTimeout(async () => {
        const { selectedLines } = dataContext;
        const buses = await getBuses(selectedLines);

        defer(() => updateBuses(buses));
        update();
    }, UPDATE_INTERVAL_MS);
};

const remove = () => {
    setTimeout(() => {
        removeDeadBuses();
        remove();
    }, REMOVE_INTERVAL_MS);
};
