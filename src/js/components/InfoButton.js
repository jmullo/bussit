import React from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

export default class InfoButton extends React.Component {

    state = {
        dialogOpen: false
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleClick = () => {
        this.setState({ dialogOpen: true });
    };

    render() {
        return (
            <div className="button">
                {
                    this.state.dialogOpen &&
                    <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
                        <div className="infoDialog">
                            <Grid container spacing={8} direction="column" alignItems="flex-start">
                                <Grid item>
                                    <Typography variant="body1">
                                        Data:&nbsp;
                                        <Link
                                            className="link"
                                            color="secondary"
                                            variant="body1"
                                            href="http://wiki.itsfactory.fi/index.php/Journeys_API">
                                            Journeys API
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        Map: © 1987 - 2019 HERE |&nbsp;
                                        <Link
                                            className="link"
                                            color="secondary"
                                            variant="body1"
                                            href="https://legal.here.com/en/terms/serviceterms/us">
                                            Terms of use
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    &nbsp;
                                </Grid>
                                <Grid item>
                                    Code:&nbsp;
                                    <Link
                                        color="secondary"
                                        variant="body1"
                                        href="https://github.com/jmullo/bussit">
                                        github.com/jmullo/bussit
                                    </Link>
                                </Grid>
                                <Grid item>
                                    Contact:&nbsp;
                                    <Link
                                        color="secondary"
                                        variant="body1"
                                        href="mailto:jussi.mullo@iki.fi">
                                        
                                        jussi.mullo@iki.fi
                                    </Link>
                                </Grid>
                            </Grid>           
                        </div>
                    </Dialog>
                }
                <Fab size="small" color="primary" onClick={this.handleClick}>
                    <InfoOutlined viewBox="2 2 20 20" />
                </Fab>
            </div>
        );
    }
}
