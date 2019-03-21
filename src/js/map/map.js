import { Map, TileLayer } from 'leaflet/dist/leaflet-src.esm';

import {
    MAP_OPTIONS, TILE_LAYER_URL_TEMPLATE, TILE_LAYER_OPTIONS
} from 'constants/constants';

import { createStopLayer } from 'map/stopLayer';
import { createBusLayer } from 'map/busLayer';
import { addLineHandler } from 'map/lineHandler';
import { addViewHandler } from 'map/viewHandler';
import { addZoomHandler } from 'map/zoomHandler';
import { addBusHandler } from 'map/busHandler';
import { addStopHandler } from 'map/stopHandler';

let map;

export const initMap = async (element) => {
    map = new Map(element, MAP_OPTIONS).on('contextmenu', () => {});

    addViewHandler(map);
    addZoomHandler(map);

    new TileLayer(TILE_LAYER_URL_TEMPLATE, TILE_LAYER_OPTIONS).addTo(map);

    createStopLayer(map).addTo(map);
    createBusLayer(map).addTo(map);

    addLineHandler();
    addStopHandler();
    addBusHandler();
};
