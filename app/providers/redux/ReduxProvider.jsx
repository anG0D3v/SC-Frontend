'use client'
import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, cStore } from '../../redux/store/store';

export default function ReduxProvider({children}) {
    if(typeof window !== 'undefined' && window.Cypress) {
        window.store = cStore;
    }
    return <Provider store={cStore}>
        <PersistGate persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
}