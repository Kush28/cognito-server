import jwt from 'jsonwebtoken';

require('dotenv').config();

const generateAccessToken = (payload) => ({
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 24 * 60 * 60 * 60,
    }),
});

const verifyAccessToken = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) reject(err);
            resolve(payload);
        });
    });

module.exports = {
    generateAccessToken,
    verifyAccessToken,
};
