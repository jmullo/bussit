import React from 'react';

import { emit } from 'utils/events';

export const DataContext = React.createContext();
export let dataContext;

export default class DataContextProvider extends React.Component {

    constructor() {
        super();

        const component = this;

        dataContext = new Proxy({}, {
            set(object, key, value) {
                object[key] = value;

                emit(key, value);
                component.setState(dataContext);

                return true;
            }
        });
    }

    render() {
        return (
            <DataContext.Provider value={this.state || {}}>
                {this.props.children}
            </DataContext.Provider>
        );
    }
}
