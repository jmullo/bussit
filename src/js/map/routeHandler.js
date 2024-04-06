import { get } from 'lodash';

import { getRoute } from 'api/data';
import { dataContext } from 'components/DataContext';
import { updateRoute, removeRoute } from 'map/routeLayer';
import { on } from 'utils/events';

export const addRouteHandler = () => {
    on('selectedBus', async (bus) => {
        if (bus && get(dataContext, 'selectedRoute.journeyRef') !== bus.journeyRef) {
            const points = await getRoute(bus.journeyRef);

            if (points) {
                updateRoute(points);

                dataContext.selectedRoute = {
                    points: points,
                    journeyRef: bus.journeyRef
                };
            }
        } else {
            removeRoute();

            dataContext.selectedRoute = null;
        }
    });
};
