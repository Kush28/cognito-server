import models from '../models';

exports.create = ({ externalId, externalProvider, name, avatar }) => {
    const user = new models.User({
        externalId,
        externalProvider,
        name,
        avatar,
    });
    return user.save();
};

exports.findAll = () => models.User.find();

exports.findByExternal = async (extID, provider) => {
    const user = await models.User.findOne({
        externalId: extID,
        externalProvider: provider,
    });
    if (!user) return null;
    const { id, externalId, externalProvider, name, avatar, notes } = user;
    return { id, externalId, externalProvider, name, avatar, notes };
};

exports.findById = (id) => models.User.findById(id);

exports.delete = () => {};
