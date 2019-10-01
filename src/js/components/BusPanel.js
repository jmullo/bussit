import { get } from 'lodash';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { DataContext } from 'components/DataContext';
import { isEarly, isLate, asMinutes } from 'utils/time';

class BusPanel extends React.Component {

    render() {
        if (!this.context.selectedBus) {
            return null;
        }

        const { selectedBus, lines, buses } = this.context;
        const { vehicleRef, journeyPatternRef } = selectedBus;
        const lineDescription = lines[journeyPatternRef].description;
        const delay = get(buses[vehicleRef], 'delay', 0);

        let details = 'Aikataulussa';
        let detailsClassName = 'details';

        if (isEarly(delay)) {
            details = `Aikataulua edellä: ${asMinutes(delay)} min`;
            detailsClassName += ' early';
        } else if (isLate(delay)) {
            details = `Aikataulusta jäljessä: ${asMinutes(delay)} min`;
            detailsClassName += ' late';
        }

        return (
            <div className="busPanel">
                <Paper className="paper" elevation={4}>
                    <Typography className="busLine" variant="body2">
                        Linja {journeyPatternRef}: {lineDescription}
                    </Typography>
                    <Paper className={detailsClassName} elevation={0}>
                        <Typography variant="body2">
                            {details}
                        </Typography>
                    </Paper>
                </Paper>
            </div>
        );
    }
}

BusPanel.contextType = DataContext;

export default BusPanel;
