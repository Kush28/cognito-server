import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../controllers/user.controller';

require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const currentUser = await User.findById(id);
    done(null, currentUser.id);
});

passport.use(
    new GoogleStrategy(
        {
            callbackURL: `/${process.env.API_VERSION}/auth/google/redirect`,
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            const { provider, _json } = profile;
            const { sub, name, picture } = _json;
            const currentUser = await User.findByExternal(sub, provider);
            if (!currentUser) {
                const newUser = await User.create({
                    externalId: sub,
                    externalProvider: provider,
                    name,
                    avatar: picture,
                });
                done(null, newUser);
            } else {
                done(null, currentUser);
            }
        }
    )
);
