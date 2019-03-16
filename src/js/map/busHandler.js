import _ from 'lodash';

import { UPDATE_INTERVAL_MS, REMOVE_INTERVAL_MS } from 'constants/constants';

import { getBuses } from 'api/data';
import { updateBuses, removeDeadBuses } from 'map/busLayer';

export const addBusHandler = () => {
    update();
    remove();
};

const update = () => {
    setTimeout(async () => {
        const buses = await getBuses();

        _.defer(() => updateBuses(buses));
        update();
    }, UPDATE_INTERVAL_MS);
};

const remove = () => {
    setTimeout(() => {
        removeDeadBuses();
        remove();
    }, REMOVE_INTERVAL_MS);
};
