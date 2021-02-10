import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import createError from 'http-errors';

import userRouter from './user.route';
import authRouter from './auth.route';
import { APP_NAME } from '../config/constants';

const router = express.Router();

router.use(cors());
router.use(helmet());

router.use(passport.initialize());
router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.get('/ping', (req, res) => {
    res.render('ping', { title: APP_NAME });
});

router.use('/user', userRouter);
router.use('/auth', authRouter);

router.use((req, res, next) => {
    next(createError(404));
});

router.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});
module.exports = router;
