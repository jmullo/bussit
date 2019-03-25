import React from 'react';

import { initMap } from 'map/map';
import BusPanel from 'components/BusPanel';
import Buttons from 'components/Buttons';

export default class AppLayout extends React.Component {

    mapDiv = React.createRef();

    componentDidMount() {
        initMap(this.mapDiv.current);
    }

    render() {
        return (
            <React.Fragment>
                <div className="map" ref={this.mapDiv} />
                <BusPanel />
                <Buttons />
            </React.Fragment>
        );
    }
}
