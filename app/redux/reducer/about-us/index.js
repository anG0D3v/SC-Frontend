import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    items: null,
    responseMsg: '',
};

const aboutUsSlice = createSlice({
    name: 'about-us',
    initialState,
    reducers: {
        aboutUsPending: (state, act) => ({
            ...state,
            loading: true,
        }),
        aboutUsFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: act.payload,
        }),
        aboutUsRejected: (state, act) => ({
            ...state,
            loading: false,
            responseMsg: act.payload,
        }),
        addAboutUsFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: [act.payload, ...state.items?.data],
            },
        }),
        updateAboutUsFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: state.items?.data?.map((item) => (item?.id === act.payload?.id ? act.payload : item)),
            },
        }),
    },
});

export const { aboutUsPending, aboutUsFulfilled, aboutUsRejected, addAboutUsFulfilled, updateAboutUsFulfilled } = aboutUsSlice.actions;
export default aboutUsSlice;
