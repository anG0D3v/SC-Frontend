import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    items: null,
    responseMsg: '',
};

const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        storiesPending: (state, act) => ({
            ...state,
            loading: true,
        }),
        storiesFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: act.payload,
        }),
        storiesRejected: (state, act) => ({
            ...state,
            loading: false,
            responseMsg: act.payload,
        }),
        addStoryFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: [act.payload, ...state.items?.data],
            },
        }),
        updateStoryFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: state.items?.data?.map((item) => (item?.id === act.payload?.id ? act.payload : item)),
            },
        }),
    },
});

export const { storiesPending, storiesFulfilled, storiesRejected, addStoryFulfilled, updateStoryFulfilled } = storiesSlice.actions;
export default storiesSlice;
