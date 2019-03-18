import _ from 'lodash';
import React from 'react';

import { initMap } from 'map/map';
import InfoButton from 'components/InfoButton';

export default class AppLayout extends React.Component {

    mapDiv = React.createRef();

    componentDidMount() {
        initMap(this.mapDiv.current);
    }

    render() {
        return (
            <React.Fragment>
                <div className="map" ref={this.mapDiv} />
                <InfoButton />
            </React.Fragment>
        );
    }
}
