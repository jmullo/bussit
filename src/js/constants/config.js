// http://data.itsfactory.fi/journeys/api/1

export const PROXY_URL = 'https://kiksu.net/bussit/proxy/';
export const API_URL = 'journeys/api/1';

export const UPDATE_INTERVAL_MS = 1500;

export const EXCLUDED_BUS_FIELDS = [
    'recordedAtTime',
    'validUntilTime',
    'monitoredVehicleJourney.directionRef',
    'monitoredVehicleJourney.onwardCalls',
    'monitoredVehicleJourney.operatorRef',
    'monitoredVehicleJourney.originAimedDepartureTime'
].join(',');

export const MAP_OPTIONS = {
    preferCanvas: true,
    attributionControl: false,
    zoomControl: false,
    bounceAtZoomLimits: false,
    maxBoundsViscosity: 1.0,
    center: [61.498167, 23.760833],
    zoom: 13,
    minZoom: 10,
    maxZoom: 18,
    wheelPxPerZoomLevel: 120,
    wheelDebounceTime: 20
};

export const TILE_LAYER_ACCESS_TOKEN = 'xxx'

export const TILE_LAYER_URL = `https://api.mapbox.com/styles/v1/jmullo/clv1egb50009b01pk4b4xa78r/tiles/512/{z}/{x}/{y}@2x` +
                              `?access_token=${TILE_LAYER_ACCESS_TOKEN}`;

export const TILE_LAYER_OPTIONS = {
    subdomains: '1234',
    tileSize: 512,
    zoomOffset: -1,
    minZoom: MAP_OPTIONS.minZoom,
    maxZoom: MAP_OPTIONS.maxZoom,
    keepBuffer: 4
};

export const GEOLOCATION_MAX_ZOOM = 14;

export const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
};

export const PAN_OPTIONS = {
    animate: true,
    duration: 0.5
};

export const STOP_OPTIONS = {
    radius: 5,
    weight: 1,
    opacity: 0.9,
    fillOpacity: 0.7,
    color: 'rgba(255, 255, 255)',
    fillColor: 'rgba(0, 112, 186)'
};

export const ROUTE_OPTIONS = {
    color: 'rgba(0, 112, 186)',
    opacity: 0.8,
    weight: 2,
    smoothFactor: 0.5
}

export const STOP_MIN_ZOOM_LEVEL = 15;

export const BUS_UPDATE_BATCH_SIZE = 10;

export const BUS_EARLY_THRESHOLD = -60;
export const BUS_LATE_THRESHOLD = 120;
export const BUS_DEAD_THRESHOLD = 120;
