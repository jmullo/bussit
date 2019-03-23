import { remove } from 'lodash';
import { Util } from 'leaflet/dist/leaflet-src.esm';

import { zooming } from 'map/zoomHandler';

const tasks = [];
let processing = false;

export const onNextAnimFrame = (task, name, priority) => {
    remove(tasks, (task) => task.name === name);

    if (priority) {
        tasks.unshift({ name, task });
    } else {
        tasks.push({ name, task });
    }

    if (!processing) {
        processing = true;
        setTimeout(processTasks, 1);
    }
};

const processTasks = () => {
    Util.requestAnimFrame(() => {
        if (zooming) {
            setTimeout(processTasks, 1);
        } else {
            tasks.shift().task.call();
    
            if (tasks.length === 0) {
                processing = false;
            } else {
                setTimeout(processTasks, 1);
            }
        }
    });
}
