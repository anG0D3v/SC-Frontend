import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    items: null,
    responseMsg: '',
};

const announcementSlice = createSlice({
    name: 'announcements',
    initialState,
    reducers: {
        announcementsPending: (state, act) => ({
            ...state,
            loading: true,
        }),
        announcementsFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: act.payload,
        }),
        announcementsRejected: (state, act) => ({
            ...state,
            loading: false,
            responseMsg: act.payload,
        }),
        addAnnouncementsFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: [act.payload, ...state.items?.data],
            },
        }),
        updateAnnouncementsFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: state.items?.data?.map((item) => (item?.id === act.payload?.id ? act.payload : item)),
            },
        }),
    },
});

export const { announcementsPending, announcementsFulfilled, announcementsRejected, addAnnouncementsFulfilled, updateAnnouncementsFulfilled } = announcementSlice.actions;
export default announcementSlice;
