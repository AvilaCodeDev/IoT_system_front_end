import React from 'react';
import { Provider } from 'react-redux';
import { DevicesScreen } from './components/devices/DevicesScreen';

import { Filters } from './components/ui/Filters';
import { NavBar } from './components/ui/NavBar';


import { store } from './store/store';


export  const App = () => {
    return (
        <Provider store={store}>
            <NavBar />
            <Filters />
            <DevicesScreen />
        </Provider>
    )
}
