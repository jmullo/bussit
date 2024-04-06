import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import DataContextProvider from 'components/DataContext';
import AppLayout from 'components/AppLayout';

const theme = createTheme({
    palette: {
        primary: blue
    },
    typography: {
        useNextVariants: true
    }
});

export default class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <DataContextProvider>
                    <AppLayout />
                </DataContextProvider>
            </MuiThemeProvider>
        );
    }
}
