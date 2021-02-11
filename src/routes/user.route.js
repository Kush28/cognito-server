import express from 'express';
import User from '../controllers/user.controller';
import { authRestMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authRestMiddleware);

router.get('/auth', async (req, res, next) => {
    try {
        const { externalId, externalProvider } = req.user;
        const { name, avatar } = await User.findByExternal(
            externalId,
            externalProvider
        );
        res.json({ name, avatar });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
