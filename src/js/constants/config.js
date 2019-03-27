export const PROXY_URL = 'https://yacdn.org/proxy/';
export const API_URL = 'http://data.itsfactory.fi/journeys/api/1';

export const EXCLUDED_BUS_FIELDS = [
    'recordedAtTime',
    'validUntilTime',
    'monitoredVehicleJourney.directionRef',
    'monitoredVehicleJourney.framedVehicleJourneyRef',
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

export const TILE_LAYER_URL_TEMPLATE = 'https://{s}.traffic.maps.cit.api.here.com/maptile/2.1/' +
                                       'traffictile/newest/normal.day.grey/{z}/{x}/{y}/256/png8' +
                                       '?min_traffic_congestion=heavy' +
                                       '&app_id=PSK0FXmSMedrhq0pnjeh&app_code=NrsNjPndpr8j9Ab-WrN7hg';

export const TILE_LAYER_OPTIONS = {
    subdomains: '1234',
    minZoom: MAP_OPTIONS.minZoom,
    maxZoom: MAP_OPTIONS.maxZoom,
    keepBuffer: 4
};

export const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
};

export const STOP_OPTIONS = {
    radius: 4,
    weight: 1,
    opacity: 0.9,
    fillOpacity: 0.7,
    color: 'rgba(255, 255, 255)',
    fillColor: 'rgba(0, 112, 186)'
};

export const STOP_MIN_ZOOM_LEVEL = 15;

export const UPDATE_INTERVAL_MS = 500;

export const BUS_EARLY_THRESHOLD = -60;
export const BUS_LATE_THRESHOLD = 120;
export const BUS_DEAD_THRESHOLD = 120;
