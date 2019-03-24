import React from 'react';

import { emit } from 'utils/events';
import { createProxy } from 'utils/proxy';

const initialState = {
    lines: {},
    lineRefs: [],
    selectedLines: []
};

export const DataContext = React.createContext();

export let dataContext;

export default class DataContextProvider extends React.Component {

    constructor() {
        super();

        const component = this;

        dataContext = createProxy(initialState, {
            set(object, property, value) {
                object[property] = value;

                emit(property, value);
                component.setState(dataContext);

                return true;
            }
        });
    }

    render() {
        return (
            <DataContext.Provider value={this.state || initialState}>
                {this.props.children}
            </DataContext.Provider>
        );
    }
}
