const dashboard = (page) => '/dashboard' + page;
const auth = (page) => '/auth/' + page;

export const Routes = {
    // Dashboard
    Dashboard: dashboard(''),
    Announcements: dashboard('/announcements'),
    GuestServices: dashboard('/guest-services'),
    NeighborhoodGuide: dashboard('/neighborhood-guide'),
    Shuttle: dashboard('/shuttle'),
    CommunityConfiguration: dashboard('/community-configuration'),
    AboutUs: dashboard('/about-us'),
    NewsfeedSettings: dashboard('/newsfeed-settings'),
    MessageSettings: dashboard('/message-settings'),
    Resources: dashboard('/resources'),
    HouseMap: dashboard('/house-map'),
    BookABed: dashboard('/book-a-bed'),
    Users: dashboard('/users'),
    RolesAndPermissions: dashboard('/roles-and-permissions'),
    Flag: dashboard('/flag'),
    FindOutsideHelp: dashboard('/find-outside-help'),
    CheckOutInstructions: dashboard('/checkout-instructions'),
    Profile: dashboard('/profile'),
    GiveBack: dashboard('/give-back'),
    Story: dashboard('/story'),
    SocialMediaLinks: dashboard('/social-media-links'),
    ProgramDescription: dashboard('/program-description'),
    OurFacilities: dashboard('/our-facilities'),
    RequestAccommodation: dashboard('/request-accommodation'),

    // AUTH
    Login: auth('login'),
    RequestInvitation: auth('signup'),
    ChooseASpace: auth('choose-a-space'),
};
