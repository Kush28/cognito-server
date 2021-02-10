import { Message, MessageTC } from '../models/message.model';

const MessageQuery = {
    MessageById: MessageTC.getResolver('findById'),
    MessageByIds: MessageTC.getResolver('findByIds'),
    MessageOne: MessageTC.getResolver('findOne'),
    MessageMany: MessageTC.getResolver('findMany'),
    MessageCount: MessageTC.getResolver('count'),
    MessageConnection: MessageTC.getResolver('connection'),
    MessagePagination: MessageTC.getResolver('pagination'),
};

const MessageMutation = {
    MessageCreateOne: MessageTC.getResolver('createOne'),
    MessageCreateMany: MessageTC.getResolver('createMany'),
    MessageUpdateById: MessageTC.getResolver('updateById'),
    MessageUpdateOne: MessageTC.getResolver('updateOne'),
    MessageUpdateMany: MessageTC.getResolver('updateMany'),
    MessageRemoveById: MessageTC.getResolver('removeById'),
    MessageRemoveOne: MessageTC.getResolver('removeOne'),
    MessageRemoveMany: MessageTC.getResolver('removeMany'),
};

export { MessageQuery, MessageMutation };
