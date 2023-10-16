import { AdminEndpoints, AuthEndpoints } from './endpoints';

// Will contain all the API's
const Api = {
    // AUTH
    AUTH: (base = '') => ({
        LOGIN: AuthEndpoints('login'),
        LOGOUT: AuthEndpoints('logout'),
        REFRESH_TOKEN: AuthEndpoints('refresh'),
    }),

    // ABOUT US
    ABOUT_US: (base = 'about-us/') => ({
        RESOURCE: AdminEndpoints(base),
    }),

    // CHECKOUT INSTRUCTION
    CHECKOUT_INSTRUCTION: (base = 'checkout-instructions/') => ({
        RESOURCE: AdminEndpoints(base),
    }),

    // SMS
    SMS: (base = 'sms/') => ({
        FETCH: AdminEndpoints(base),
    }),

    // STORIES
    STORIES: (base = 'stories/') => ({
        RESOURCE: AdminEndpoints(base),
    }),

    // LINKS
    LINKS: (base = 'social-links/') => ({
        RESOURCE: AdminEndpoints(base),
    }),

    // ANNOUNCEMENTS
    ANNOUNCEMENTS: (base = 'announcements/') => ({
        RESOURCE: AdminEndpoints(base),
    }),

    // PROGRAM-DESCRIPTION
    PROGRAMDESCRIPTION: (base = 'program-description/') => ({
        RESOURCE: AdminEndpoints(base),
    }),

    // REQUEST ACCOMODATION
    REQUEST_ACCOMMODATION: (base = 'request-accommodations/') => ({
        RESOURCE: AdminEndpoints(base),
    }),
};

export default Api;
