import React from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DirectionsBus from '@material-ui/icons/DirectionsBus';

import { dataContext, DataContext } from 'components/DataContext';
import { emit } from 'utils/events';

class LinesButton extends React.Component {

    state = {
        dialogOpen: false
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleClick = value => {
        dataContext.selectedLines = ["3"];
        this.setState({ dialogOpen: true });
    };

    render() {

        return (
            <div className="button">
                {
                    this.state.dialogOpen &&
                    <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
                        <div className="infoDialog">
                            {
                                
                            }
                        </div>
                    </Dialog>
                }
                <Fab size="small" color="primary" onClick={this.handleClick}>
                    <DirectionsBus viewBox="2 2 20 20" />
                </Fab>
            </div>
        );
    }
}

LinesButton.contextType = DataContext;

export default LinesButton;
