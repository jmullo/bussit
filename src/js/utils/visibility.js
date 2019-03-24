import { find } from 'lodash';

export let pageVisible = true;

const properties = [
    { name: 'hidden', event: 'visibilitychange' },
    { name: 'msHidden', event: 'msvisibilitychange' },
    { name: 'webkitHidden', event: 'webkitvisibilitychange' }
];

const property = find(properties, (property) => document[property.name] !== undefined);

if (property) {
    document.addEventListener(property.event, () => pageVisible = !document[property.name]);
}
