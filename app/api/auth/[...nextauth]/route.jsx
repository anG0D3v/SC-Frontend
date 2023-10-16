import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
    ],
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
    },
    debug: process.env.ENV != 'Production' ,
    callbacks: {
        async signIn({ account, profile }) {
            // you can know what social media provider user is using by accessing account.provider
            /*{
                iss: '',
                azp: '',
                aud: '',
                sub: '',
                hd: '',
                email: '',
                email_verified: '',
                at_hash: '',
                name: '',
                picture: '',
                given_name: '',
                family_name: '',
                locale: '',
                iat: '',
                exp: ''
            }*/
            return true;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
