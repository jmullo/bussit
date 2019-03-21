import React from 'react';

import InfoButton from 'components/InfoButton';
import LinesButton from 'components/LinesButton';

export default class Buttons extends React.Component {

    render() {
        return (
            <div className="buttons">
                <LinesButton />
                <InfoButton />
            </div>
        );
    }
}
