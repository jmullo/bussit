import _ from 'lodash';
import L from 'leaflet';

import {
    MAP_OPTIONS, TILE_LAYER_URL_TEMPLATE, TILE_LAYER_OPTIONS
} from 'constants/constants';

import { addViewHandler } from 'map/viewHandler';
import { getBuses, getStops, getLines } from 'api/data';
import { createStopLayer } from 'map/stopLayer';
import { createBusLayer } from 'map/busLayer';

let map;
let tileLayer;
let stopLayer;
let busLayer;

export const initMap = async (element) => {
    
    map = L.map(element, MAP_OPTIONS)
           .on('contextmenu', _.noop);

    addViewHandler(map);

    tileLayer = L.tileLayer(TILE_LAYER_URL_TEMPLATE, TILE_LAYER_OPTIONS).addTo(map);

    const stops = await getStops();
    stopLayer = createStopLayer(map, stops).addTo(map);

    const buses = await getBuses();
    busLayer = createBusLayer(map, buses).addTo(map);
};
