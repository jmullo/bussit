import { save, load } from 'api/storage';

export const addViewHandler = (map) => {

    const saveView = () => {
        var latLng = map.getCenter();
        var zoom = map.getZoom();

        save('view', { latLng, zoom });
    };

    const savedView = load('view');

    if (savedView) {
        map.setView(savedView.latLng, savedView.zoom);
    }

    map.on('moveend', saveView);
    map.on('zoomend', saveView);
};
