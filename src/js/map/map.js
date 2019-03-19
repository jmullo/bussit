import { Map, TileLayer } from 'leaflet/dist/leaflet-src.esm';

import {
    MAP_OPTIONS, TILE_LAYER_URL_TEMPLATE, TILE_LAYER_OPTIONS
} from 'constants/constants';

import { addViewHandler } from 'map/viewHandler';
import { addZoomHandler } from 'map/zoomHandler';
import { addBusHandler } from 'map/busHandler';
import { getStops, getLines } from 'api/data';
import { createStopLayer } from 'map/stopLayer';
import { createBusLayer } from 'map/busLayer';

let map;

export const initMap = async (element) => {
    map = new Map(element, MAP_OPTIONS).on('contextmenu', () => {});

    addViewHandler(map);
    addZoomHandler(map);

    new TileLayer(TILE_LAYER_URL_TEMPLATE, TILE_LAYER_OPTIONS).addTo(map);

    const stops = await getStops();

    createStopLayer(map, stops).addTo(map);
    createBusLayer().addTo(map);
    addBusHandler(map);
};
