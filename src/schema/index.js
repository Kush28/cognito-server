import { SchemaComposer } from 'graphql-compose';

const schemaComposer = new SchemaComposer();

import {
    MessageQuery,
    MessageMutation,
    MessageSubscription,
} from './message.schema';
import { UserQuery } from './user.schema';

schemaComposer.Query.addFields({
    ...MessageQuery,
    ...UserQuery,
});

schemaComposer.Mutation.addFields({
    ...MessageMutation,
});

schemaComposer.Subscription.addFields({
    ...MessageSubscription,
});

export default schemaComposer.buildSchema();
