import { isEmpty, pickBy, includes } from 'lodash';

import { UPDATE_INTERVAL_MS, BUS_DEAD_THRESHOLD } from 'constants/config';
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
            const filteredBuses = filterBuses(buses);

            updateBuses(filteredBuses);
            updateSelectedBus(filteredBuses);

            dataContext.buses = filteredBuses;
        }

        updateTimer();
    }, UPDATE_INTERVAL_MS);
};

const filterBuses = (buses) => {
    const timestamp = new Date().getTime();
    const { selectedLines } = dataContext;
    const linesSelected = !isEmpty(selectedLines);
    let filteredBuses = { ...dataContext.buses, ...buses };

    filteredBuses = pickBy(filteredBuses, (bus) => {
        return (!linesSelected || includes(selectedLines, bus.lineRef)) &&
               (timestamp - bus.timestamp) / 1000 < BUS_DEAD_THRESHOLD;
    });

    return filteredBuses;
};

const updateSelectedBus = (buses) => {
    if (dataContext.selectedBus) {
        const { vehicleRef, journeyRef, journeyPatternRef } = dataContext.selectedBus;
        const updatedBus = buses[vehicleRef];

        if (updatedBus) {
            if (journeyRef !== updatedBus.journeyRef ||
                journeyPatternRef !== updatedBus.journeyPatternRef) {

                dataContext.selectedBus = {
                    vehicleRef: updatedBus.vehicleRef,
                    journeyRef: updatedBus.journeyRef,
                    journeyPatternRef: updatedBus.journeyPatternRef
                };
            }
        } else {
            dataContext.selectedBus = null;
        }
    } else {
        dataContext.selectedBus = null;
    }
};
