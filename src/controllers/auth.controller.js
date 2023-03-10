const authService = require('../services/auth.service');
const HttpError = require('../utils/errors/httpError');

const catchBlockHandler = (error, response) => {
    if (error instanceof HttpError) {
        response.status(error.code).json({ message: error.message });
    } else {
        response.status(500).json({ message: 'Internal Server Error' });
    }
};

const createUser = async (request, response) => {
    try {
        const { useremail, password } = request.body;
        const user = await authService.createUser(useremail, password);
        response.status(201).json({ message: 'Success', data: { user } });
    } catch (error) {
        console.log(error);
        catchBlockHandler(error, response);
    }
};

const login = async (request, response) => {
    try {
        const { useremail, password } = request.body;
        const token = await authService.login(useremail, password);
        response.status(200).json({ message: 'Success', data: { token } });
    } catch (error) {
        console.log(error);
        catchBlockHandler(error, response);
    }
};

const validateToken = async (request, response) => {
    try {
        const { token } = request.query;
        const decoded = await authService.validateToken(token);
        response.status(200).json({ message: 'Token is valid', data: decoded });
    } catch (error) {
        catchBlockHandler(error, response);
    }
};

module.exports = { createUser, login, validateToken };
