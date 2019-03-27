import React from 'react';
import Fab from '@material-ui/core/Fab';
import GpsFixedOutlined from '@material-ui/icons/GpsFixedOutlined';
import GpsOffOutlined from '@material-ui/icons/GpsOffOutlined';

import { dataContext, DataContext } from 'components/DataContext';

class LocateButton extends React.Component {

    handleClick = () => {
        dataContext.locateEnabled = !dataContext.locateEnabled;
    };

    render() {
        const { geolocation } = navigator;
        const { locateEnabled } = this.context;

        if (geolocation && (location.protocol === 'https:' ||
                            process.env.NODE_ENV === 'development')) {
            return (
                <div className="button">
                    <Fab size="small" color="primary" onClick={this.handleClick}>
                        {
                            locateEnabled && <GpsOffOutlined viewBox="2 2 20 20" />
                        }
                        {
                            !locateEnabled && <GpsFixedOutlined viewBox="2 2 20 20" />
                        }
                    </Fab>
                </div>
            );
        }

        return null;
    }
}

LocateButton.contextType = DataContext;

export default LocateButton;
