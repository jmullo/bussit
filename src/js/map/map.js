import { Map, TileLayer } from 'leaflet/dist/leaflet-src.esm';

import {
    MAP_OPTIONS, TILE_LAYER_URL_TEMPLATE, TILE_LAYER_OPTIONS
} from 'constants/config';

import { addViewHandler } from 'map/viewHandler';
import { addZoomHandler } from 'map/zoomHandler';
import { addLocationHandler } from 'map/locationHandler';
import { addStopLayer } from 'map/stopLayer';
import { addLocationLayer } from 'map/locationLayer';
import { addBusLayer } from 'map/busLayer';
import { addRouteLayer } from 'map/routeLayer';
import { addLineHandler } from 'map/lineHandler';
import { addStopHandler } from 'map/stopHandler';
import { addBusHandler } from 'map/busHandler';
import { addRouteHandler } from 'map/routeHandler';

let map;

export const initMap = async (element) => {
    map = new Map(element, MAP_OPTIONS).on('contextmenu', () => {});

    addViewHandler(map);
    addZoomHandler(map);
    addLocationHandler(map);

    new TileLayer(TILE_LAYER_URL_TEMPLATE, TILE_LAYER_OPTIONS).addTo(map);

    addStopLayer(map);
    addRouteLayer(map);
    addLocationLayer(map);
    addBusLayer(map);

    addLineHandler();
    addStopHandler();
    addRouteHandler();
    addBusHandler(map);
};
