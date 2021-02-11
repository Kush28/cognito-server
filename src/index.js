import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import './utils/db';
import schema from './schema';
import indexRouter from './routes';
import { authGQLMiddleware } from './middlewares/auth.middleware';

dotenv.config();
const API_VERSION = process.env.API_VERSION;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(`/${API_VERSION}`, indexRouter);

const server = new ApolloServer({
    schema,
    context: authGQLMiddleware,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    subscriptions: { path: '/graphql' },
});

server.applyMiddleware({
    app,
    cors: true,
    onHealthCheck: () =>
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0) {
                resolve();
            } else {
                reject();
            }
        }),
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
    console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});
