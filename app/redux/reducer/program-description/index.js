import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    items: null,
    responseMsg: '',
};

const programdescriptionSlice = createSlice({
    name: 'programdescription',
    initialState,
    reducers: {
        programdescriptionPending: (state, act) => ({
            ...state,
            loading: true,
        }),
        programdescriptionFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: act.payload,
        }),
        programdescriptionRejected: (state, act) => ({
            ...state,
            loading: false,
            responseMsg: act.payload,
        }),
        addProgramDescriptionFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: [act.payload, ...state.items?.data],
            },
        }),
        updateProgramDescriptionFulfilled: (state, act) => ({
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
    programdescriptionPending,
    programdescriptionFulfilled,
    programdescriptionRejected,
    addProgramDescriptionFulfilled,
    updateProgramDescriptionFulfilled,
} = programdescriptionSlice.actions;
export default programdescriptionSlice;
