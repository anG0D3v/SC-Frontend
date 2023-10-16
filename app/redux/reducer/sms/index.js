import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    items: [],
    responseMsg: '',
};

const smsSlice = createSlice({
    name: 'sms',
    initialState,
    reducers: {
        smsPending: (state, act) => ({
            ...state,
            loading: false,
        }),
        smsFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: act.payload,
        }),
        smsRejected: (state, act) => ({
            ...state,
            loading: false,
            responseMsg: act.payload,
        }),
    },
});

export const { smsPending, smsFulfilled, smsRejected } = smsSlice.actions;
export default smsSlice;
