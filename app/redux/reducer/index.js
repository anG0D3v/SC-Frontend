import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import aboutUsSlice from './about-us';
import announcementSlice from './announcements';
import checkoutInstructionSlice from './checkout-instruction';
import programdescriptionSlice from './program-description';
import requestAccomodationSlice from './request-accomodation';
import smsSlice from './sms';
import socialLinksSlice from './social-links';
import storiesSlice from './stories';
import userSlice from './user';

const blacklistFilter = createBlacklistFilter('user', ['authorization.type', 'authorization.expiration']);

const persistConfig = {
    key: 'app._persistor',
    storage,
    transforms: [blacklistFilter],
};

const reducers = combineReducers({
    [smsSlice.name]: smsSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [socialLinksSlice.name]: socialLinksSlice.reducer,
    [storiesSlice.name]: storiesSlice.reducer,
    [aboutUsSlice.name]: aboutUsSlice.reducer,
    [announcementSlice.name]: announcementSlice.reducer,
    [programdescriptionSlice.name]: programdescriptionSlice.reducer,
    [checkoutInstructionSlice.name]: checkoutInstructionSlice.reducer,
    [requestAccomodationSlice.name]: requestAccomodationSlice.reducer,
});

const rootReducer = (state, act) => {
    if (act.type === 'user/userLogout') {
        state = undefined;
    }
    return reducers(state, act);
};

export default persistReducer(persistConfig, rootReducer);
