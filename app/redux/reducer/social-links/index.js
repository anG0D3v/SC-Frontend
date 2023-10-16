import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    items: null,
    responseMsg: '',
};

const socialLinkSlice = createSlice({
    name: 'socialLinks',
    initialState,
    reducers: {
        linksPending: (state, act) => ({
            ...state,
            loading: true,
        }),
        linksFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: act.payload,
        }),
        linksRejected: (state, act) => ({
            ...state,
            loading: false,
            responseMsg: act.payload,
        }),
        addLinksFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: [act.payload, ...state.items?.data],
            },
        }),
        updateLinksFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: state.items?.data?.map((item) => (item?.id === act.payload?.id ? act.payload : item)),
            },
        }),
    },
});

export const { linksPending, linksFulfilled, linksRejected, addLinksFulfilled, updateLinksFulfilled } = socialLinkSlice.actions;
export default socialLinkSlice;
