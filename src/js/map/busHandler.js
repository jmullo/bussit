import { isEmpty, pickBy, includes } from 'lodash';

import { UPDATE_INTERVAL_MS } from 'constants/config';
import { getBuses } from 'api/data';
import { dataContext } from 'components/DataContext';
import { on } from 'utils/events';
import { pageVisible } from 'utils/visibility';
import { updateBuses } from 'map/busLayer';

export const addBusHandler = (map) => {
    updateTimer();

    on('markerClick', (bus) => dataContext.selectedBus = bus);
    map.on('click', () => dataContext.selectedBus = null);
};

const updateTimer = () => {
    setTimeout(async () => {
        if (pageVisible) {
            const buses = await getBuses(dataContext.selectedLines);

            dataContext.buses = filterSelectedBuses(buses);

            updateBuses();
        }

        updateTimer();
    }, UPDATE_INTERVAL_MS);
};

const filterSelectedBuses = (buses) => {
    const { selectedLines } = dataContext;
    const newBuses = { ...dataContext.buses, ...buses };

    if (isEmpty(selectedLines)) {
        return newBuses;
    }

    const selectedBuses = pickBy(newBuses, (bus) => {
        return includes(selectedLines, bus.lineRef);
    });

    if (dataContext.selectedBus && !selectedBuses[dataContext.selectedBus.vehicleRef]) {
        dataContext.selectedBus = null
    }

    return selectedBuses;
};
