import { verifyAccessToken } from '../scripts/jwt';

export default async (req, res, next) => {
    const authHeader = req.headers && req.headers.authorization;
    if (!authHeader) {
        res.sendStatus(401);
        return;
    }
    const accessToken =
        authHeader.startsWith('Bearer') && authHeader.split(' ')[1];
    if (!accessToken) {
        res.sendStatus(403);
        return;
    }
    try {
        const payload = await verifyAccessToken(accessToken);
        req.user = payload;
        next();
    } catch (error) {
        res.sendStatus(403);
    }
};
