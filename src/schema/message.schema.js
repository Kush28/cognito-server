import { MessageTC } from '../models/message.model';
import MessageController from '../controllers/message.controller';
import UserController from '../controllers/user.controller';
import { AuthenticationError, UserInputError } from 'apollo-server';

const MessageQuery = {
    GetMessage: {
        type: [MessageTC],
        resolve: async () => await MessageController.findAll(),
    },
};

const MessageMutation = {
    sendMessage: {
        type: MessageTC,
        args: {
            content: 'String!',
        },
        resolve: async (_, { content }, { user, pubsub }) => {
            try {
                if (content === '')
                    throw new UserInputError('Message body empty');
                const { externalId, externalProvider } = user;
                const dbUser = await UserController.findByExternal(
                    externalId,
                    externalProvider
                );
                if (!dbUser) throw new AuthenticationError('Unauthenticated');
                const createdMsg = await MessageController.create({
                    senderId: dbUser.id,
                    content,
                });
                pubsub.publish('NEW_MESSAGE', { newMessage: createdMsg });
                return createdMsg;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    },
};

const MessageSubscription = {
    newMessage: {
        type: MessageTC,
        resolve: (payload) => payload.newMessage,
        subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_MESSAGE'),
    },
};

export { MessageQuery, MessageMutation, MessageSubscription };
