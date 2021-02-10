import { SchemaComposer } from 'graphql-compose';

const schemaComposer = new SchemaComposer();

import { MessageQuery, MessageMutation } from './message.schema';

schemaComposer.Query.addFields({
    ...MessageQuery,
});

schemaComposer.Mutation.addFields({
    ...MessageMutation,
});

export default schemaComposer.buildSchema();
