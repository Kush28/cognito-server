import { Message } from '../models';

exports.create = ({ senderId, content }) => {
    const user = new Message({
        senderId,
        content,
    });
    return user.save();
};

exports.findAll = () => Message.find();
