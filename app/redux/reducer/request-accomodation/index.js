import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    items: [],
    responseMsg: '',
};

const requestAccomodationSlice = createSlice({
    name: 'requestAccomodation',
    initialState,
    reducers: {
        requestAccomodationPending: (state, act) => ({
            ...state,
            loading: true,
        }),
        requestAccomodationFulfilled: (state, act) => ({
            loading: false,
            items: act.payload,
        }),
        requestAccomodationRejected: (state, act) => ({
            loading: false,
            responseMsg: act.payload,
        }),
        addRequestAccomodationFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: [act.payload, ...state.items?.data],
            },
        }),
        updateRequestAccomodationFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: state.items?.data?.map((item) => (item?.id === act.payload?.id ? act.payload : item)),
            },
        }),
    },
});

export const {
    requestAccomodationPending,
    requestAccomodationFulfilled,
    requestAccomodationRejected,
    addRequestAccomodationFulfilled,
    updateRequestAccomodationFulfilled,
} = requestAccomodationSlice.actions;

export default requestAccomodationSlice;
