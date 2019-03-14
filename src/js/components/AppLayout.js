import _ from 'lodash';
import React from 'react';

import { initMap } from 'map/map';

export default class AppLayout extends React.Component {

    mapDiv = React.createRef();

    componentDidMount() {
        initMap(this.mapDiv.current);
    }

    render() {
        return (
            <div className="map" ref={this.mapDiv} />
        );
    }
}
