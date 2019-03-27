import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';

import 'fonts.css';
import 'leaflet/dist/leaflet.css';
import 'bussit.css';

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('serviceWorker.js');
}

export default ReactDOM.render(<App />, document.getElementById('main'));
