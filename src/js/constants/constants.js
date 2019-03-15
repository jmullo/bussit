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
    maxBoundsViscosity: 1.0,
    bounceAtZoomLimits: false,
    center: [61.498167, 23.760833],
    zoom: 13,
    minZoom: 10,
    maxZoom: 18
};

export const TILE_LAYER_URL_TEMPLATE = 'http://{s}.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day.grey/{z}/{x}/{y}/256/png8?app_id=PSK0FXmSMedrhq0pnjeh&app_code=NrsNjPndpr8j9Ab-WrN7hg';
export const TILE_LAYER_OPTIONS = { subdomains: '1234' };

export const STOP_OPTIONS = {
    radius: 4,
    weight: 1,
    opacity: 0.9,
    fillOpacity: 0.7,
    color: 'rgba(255, 255, 255)',
    fillColor: 'rgba(0, 112, 186)'
};
