import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    info: null,
    authorization: null,
    responseMsg: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userPending: (state, act) => ({
            ...state,
            loading: true,
        }),
        userFulfilled: (state, act) => ({
            ...state,
            loading: false,
            info: act.payload?.user,
            authorization: act.payload?.authorization,
        }),
        userRejected: (state, act) => ({
            ...state,
            loading: false,
            responseMsg: act.payload,
        }),
        userLogout: (state, act) => ({
            ...state,
            loading: false,
            responseMsg: act.payload,
        }),
    },
});

export const { userPending, userFulfilled, userRejected, userLogout } = userSlice.actions;
export default userSlice;
