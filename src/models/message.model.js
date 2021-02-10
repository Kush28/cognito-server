import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const MessageSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'message',
    }
);

MessageSchema.plugin(timestamps);

MessageSchema.index({ createdAt: 1, updatedAt: 1 });

export const Message = mongoose.model('Message', MessageSchema);
export const MessageTC = composeWithMongoose(Message);
