import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { DataContext } from 'components/DataContext';

class ErrorPanel extends React.Component {

    render() {
        if (!this.context.dataError_disabled) {
            return null;
        }

        return (
            <div className="errorPanel">
                <Paper className="paper" elevation={4}>
                    <Typography variant="body2">
                        Häiriöitä bussidatassa
                    </Typography>
                </Paper>
            </div>
        );
    }
}

ErrorPanel.contextType = DataContext;

export default ErrorPanel;
