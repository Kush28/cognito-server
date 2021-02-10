import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const UserSchema = new Schema(
    {
        externalId: {
            type: String,
            required: true,
            unique: true,
        },
        externalProvider: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
    },
    {
        collection: 'users',
    }
);

UserSchema.plugin(timestamps);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model('User', UserSchema);
export const UserTC = composeWithMongoose(User);
