import { User } from '../models';

exports.create = ({ externalId, externalProvider, name, avatar }) => {
    const user = new User({
        externalId,
        externalProvider,
        name,
        avatar,
    });
    return user.save();
};

exports.findAll = () => User.find();

exports.findByExternal = async (extID, provider) => {
    const user = await User.findOne({
        externalId: extID,
        externalProvider: provider,
    });
    if (!user) return null;
    const { id, externalId, externalProvider, name, avatar, notes } = user;
    return { id, externalId, externalProvider, name, avatar, notes };
};

exports.findById = (id) => User.findById(id);

exports.delete = () => {};
