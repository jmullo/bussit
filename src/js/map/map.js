import { Map, TileLayer } from 'leaflet/dist/leaflet-src.esm';

import {
    MAP_OPTIONS, TILE_LAYER_URL_TEMPLATE, TILE_LAYER_OPTIONS
} from 'constants/config';

import { addViewHandler } from 'map/viewHandler';
import { addZoomHandler } from 'map/zoomHandler';
import { addLocationHandler } from 'map/locationHandler';
import { addStopLayer } from 'map/stopLayer';
import { addBusLayer } from 'map/busLayer';
import { addLineHandler } from 'map/lineHandler';
import { addStopHandler } from 'map/stopHandler';
import { addBusHandler } from 'map/busHandler';

let map;

export const initMap = async (element) => {
    map = new Map(element, MAP_OPTIONS).on('contextmenu', () => {});

    addViewHandler(map);
    addZoomHandler(map);
    addLocationHandler(map);

    new TileLayer(TILE_LAYER_URL_TEMPLATE, TILE_LAYER_OPTIONS).addTo(map);

    addStopLayer(map)
    addBusLayer(map)

    addLineHandler();
    addStopHandler();
    addBusHandler();
};
