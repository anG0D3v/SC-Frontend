import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import rootReducer from '../reducer';
import axiosInstance from '@/axios-utils/axios-instance';

export const cStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger),
});

cStore.subscribe(async () => {
    const state = cStore.getState();
    if (typeof window !== 'undefined') {
        axiosInstance.defaults.headers.common = {
            Authorization: `Bearer ${state?.user?.authorization?.token}`,
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        };
    }
});

export const persistor = persistStore(cStore);

export default { cStore, persistor };
