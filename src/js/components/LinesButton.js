import React from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Octicon, { MarkGithub, Mail } from '@githubprimer/octicons-react/dist/index.esm';

import { DataContext } from 'components/DataContext';

class LinesButton extends React.Component {

    state = {
        dialogOpen: false
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleClick = value => {
        this.setState({ dialogOpen: true });
    };

    render() {

        return (
            <div className="infoButton">
                {
                    this.state.dialogOpen &&
                    <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
                        <div className="infoDialog">
                            {
                                Line selector
                            }
                        </div>
                    </Dialog>
                }
                <Fab size="small" color="primary" onClick={this.handleClick}>
                    <InfoOutlined />
                </Fab>
            </div>
        );
    }
}

LinesButton.contextType = DataContext;

export default LinesButton;
