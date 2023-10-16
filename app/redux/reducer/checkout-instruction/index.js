import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    items: null,
    responseMsg: '',
};

const checkoutInstructionSlice = createSlice({
    name: 'checkoutInstruction',
    initialState,
    reducers: {
        checkoutInstructionPending: (state, act) => ({
            ...state,
            loading: true,
        }),
        checkoutInstructionFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: act.payload,
        }),
        checkoutInstructionRejected: (state, act) => ({
            ...state,
            loading: false,
            responseMsg: act.payload,
        }),
        addcheckoutInstructionFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: [act.payload, ...state.items?.data],
            },
        }),
        updatecheckoutInstructionFulfilled: (state, act) => ({
            ...state,
            loading: false,
            items: {
                ...state.items,
                data: state.items?.data?.map((item) => (item?.id === act.payload?.id ? act.payload : item)),
            },
        }),
    },
});

export const { checkoutInstructionPending, checkoutInstructionFulfilled, checkoutInstructionRejected, addcheckoutInstructionFulfilled, updatecheckoutInstructionFulfilled } = checkoutInstructionSlice.actions;
export default checkoutInstructionSlice;
