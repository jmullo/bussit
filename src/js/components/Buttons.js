import React from 'react';

import LocateButton from 'components/LocateButton';
import InfoButton from 'components/InfoButton';
import LinesButton from 'components/LinesButton';

export default class Buttons extends React.Component {

    render() {
        return (
            <div className="buttons">
                <LocateButton />
                <LinesButton />
                <InfoButton />
            </div>
        );
    }
}
