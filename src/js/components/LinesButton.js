import { includes, without } from 'lodash';

import React from 'react';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import DirectionsBus from '@material-ui/icons/DirectionsBus';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { dataContext, DataContext } from 'components/DataContext';

class LinesButton extends React.Component {

    state = {
        selectorVisible: false
    };

    handleClickAway = (event) => {
        this.setState({ selectorVisible: false });
    };

    handleClick = () => {
        this.setState({ selectorVisible: !this.state.selectorVisible });
    };

    handleSelect = (lineRef) => {
        const { selectedLines } = this.context;

        if (includes(selectedLines, lineRef)) {
            dataContext.selectedLines = without(selectedLines, lineRef);
        } else {
            dataContext.selectedLines = [...selectedLines, lineRef];
        }
    };

    render() {
        const { lineRefs, selectedLines } = this.context;

        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div className="button">
                    {
                        this.state.selectorVisible &&
                        <div className="lineSelector">
                            {
                                lineRefs.map((lineRef) => (
                                    <div key={lineRef} className="lineToggle">
                                        <Button variant="contained"
                                                size="small"
                                                color={includes(selectedLines, lineRef) ? "secondary" : "primary"}
                                                onClick={() => this.handleSelect(lineRef)}>
                                            {lineRef}
                                        </Button>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    <Fab size="small" color="primary" onClick={this.handleClick}>
                        <DirectionsBus viewBox="2 2 20 20" />
                    </Fab>
                </div>
            </ClickAwayListener>
        );
    }
}

LinesButton.contextType = DataContext;

export default LinesButton;
