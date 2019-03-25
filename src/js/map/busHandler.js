import { UPDATE_INTERVAL_MS } from 'constants/config';
import { getBuses } from 'api/data';
import { dataContext } from 'components/DataContext';
import { on } from 'utils/events';
import { pageVisible } from 'utils/visibility';
import { updateBuses, removeUnselectedBuses } from 'map/busLayer';

export const addBusHandler = (map) => {
    updateTimer();

    on('selectedLines', removeUnselectedBuses);
    on('markerClick', (bus) => dataContext.selectedBus = bus);

    map.on('click', () => dataContext.selectedBus = null);
};

const updateTimer = () => {
    setTimeout(async () => {
        if (pageVisible) {
            const buses = await getBuses(dataContext.selectedLines);

            dataContext.buses = { ...dataContext.buses, ...buses };

            updateBuses(buses);
        }

        updateTimer();
    }, UPDATE_INTERVAL_MS);
};
