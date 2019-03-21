import React from 'react';

export const DataContext = React.createContext();

export let dataContext;

export default class DataContextProvider extends React.Component {

    constructor() {
        super();

        const component = this;

        dataContext = new Proxy({}, {
            set(object, key, value) {
                object[key] = value;
    
                component.setState(object);
    
                return true;
            }
        });
    }

    render() {
        return (
            <DataContext.Provider value={dataContext}>
                {this.props.children}
            </DataContext.Provider>
        );
    }
}
