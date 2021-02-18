import { AuthenticationError, PubSub } from 'apollo-server';
import { verifyAccessToken } from '../scripts/jwt';

const pubsub = new PubSub();

async function extractAndVerifyToken(authHeader) {
    if (!authHeader)
        return {
            status: 401,
        };
    const accessToken =
        authHeader.startsWith('Bearer') && authHeader.split(' ')[1];
    if (!accessToken) {
        return {
            status: 403,
        };
    }
    try {
        const payload = await verifyAccessToken(accessToken);
        return {
            status: 200,
            user: payload,
        };
    } catch (error) {
        return {
            status: 403,
        };
    }
}

export const authRestMiddleware = async (req, res, next) => {
    const { status, user } = await extractAndVerifyToken(
        req.headers.authorization
    );
    if (status === 200) {
        req.user = user;
        next();
    } else {
        res.sendStatus(status);
    }
};

export const authGQLMiddleware = async (context) => {
    const { status, user } = context.req
        ? await extractAndVerifyToken(context.req.headers.authorization)
        : await extractAndVerifyToken(context.connection.context.Authorization);
    if (status === 200) {
        context.user = user;
    } else {
        const err = new AuthenticationError(`Unauthenticated Status:${status}`);
        console.error(err);
        throw err;
    }
    context.pubsub = pubsub;
    return context;
};
