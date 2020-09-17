import { LayerGroup, Marker, DivIcon } from 'leaflet/dist/leaflet-src.esm';

const layerGroup = new LayerGroup();

let map;
let icon;
let marker;

export const addLocationLayer = (mapRef) => {
    map = mapRef;
    icon = new DivIcon({ className: 'locationMarker' });

    map.addLayer(layerGroup);
};

export const updateMarker = (latLng) => {
    if (marker) {
        marker.setLatLng(latLng);
    } else {
        marker = new Marker(latLng, { icon }).addTo(layerGroup);
    }
};

export const removeMarker = () => {
    if (marker) {
        marker.remove();
        marker = null;
    }
};
