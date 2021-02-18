import express from 'express';
import passport from 'passport';
import { APP_NAME } from '../config/constants';
import { generateAccessToken } from '../scripts/jwt';
require('../utils/userAuth');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
    '/google/redirect',
    passport.authenticate('google'),
    (req, res, next) => {
        try {
            const { externalId, externalProvider } = req.user;
            const { accessToken } = generateAccessToken({
                externalId,
                externalProvider,
            });
            res.set('Content-Security-Policy', '');
            res.render('loggedin', { appName: APP_NAME, title: accessToken });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
