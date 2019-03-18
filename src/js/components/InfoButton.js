import _ from 'lodash';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Octicon, { MarkGithub, Mail } from '@githubprimer/octicons-react';

export default class InfoButton extends React.Component {

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
                            <Grid container spacing={8} direction="column" alignItems="flex-start">
                                <Grid item>
                                    <Typography variant="body1">
                                        Data:&nbsp;
                                        <Link className="link" href="http://wiki.itsfactory.fi/index.php/Journeys_API" color="secondary" variant="body1">
                                            Journeys API
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        Map: © 1987 - 2019 HERE |&nbsp;
                                        <Link className="link" href="https://legal.here.com/en/terms/serviceterms/us" color="secondary" variant="body1">
                                            Terms of use
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item />
                                <Grid item>
                                    <Link className="link" href="https://github.com/jmullo/bussit" color="secondary" variant="body1">
                                        <Octicon className="icon" icon={MarkGithub} size='medium' verticalAlign='middle'/>
                                        jmullo/bussit
                                    </Link>
                                    <Link href="mailto:jussi.mullo@iki.fi" color="secondary" variant="body1">
                                        <Octicon className="icon" icon={Mail} size='medium' verticalAlign='middle'/>
                                        jussi.mullo@iki.fi
                                    </Link>
                                </Grid>
                            </Grid>           
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
