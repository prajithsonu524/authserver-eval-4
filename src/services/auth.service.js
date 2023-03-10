const passUtil = require('../utils/passwordUtil');
const jwtUtil = require('../utils/jwtUtil');
const db = require('../database/models/index');
const HttpError = require('../utils/errors/httpError');
const { UniqueConstraintError } = require('sequelize');
const redisUtil = require('../utils/redisUtil');
const createUser = async (useremail, password) => {
    try {
        console.log(useremail, password);
        const hashedPassword = await passUtil.generateHashPassword(password);
        const user = await db.user.create({
            useremail: useremail,
            password: hashedPassword
        });
        delete user.dataValues.password;
        return user;
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            throw new HttpError(400, 'Username already exists');
        }
        throw new HttpError(500, error.message);
    }
};

const login = async (useremail, password) => {
    const user = await db.user.findOne({
        where: {
            useremail
        }
    });
    if (!user) { throw new HttpError(401, 'Invalid Username'); }
    const userData = user.dataValues;
    const userIsValid = await passUtil.verifyPassword(password, userData.password);
    if (!userIsValid) { throw new HttpError(401, 'Wrong Password'); }
    const token = jwtUtil.generateJWTToken(userData);
    await redisUtil.saveTokenInRedis(token);
    return token;
};

const validateToken = async (token) => {
    try {
        token = token.replace('Bearer ', '');
        await redisUtil.verifyToken(token);
        const validToken = await jwtUtil.verifyToken(token);
        return validToken;
    } catch (error) {
        throw new HttpError(498, 'Invalid Token');
    }
};

module.exports = { createUser, login, validateToken };

