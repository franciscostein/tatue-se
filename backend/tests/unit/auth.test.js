const insertedUser = require('../mocks/inserted/user.json');
const authController = require('../../src/controller/auth');
const authUtils = require('../../src/utils/auth');
const userModel = require('../../src/models/User');
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcryptjs');

jest.mock('../../src/utils/auth.js');

userModel.findOne = jest.fn();
bcrypt.compare = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('authController.authenticate', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should countain an authenticate function', () => {
        expect(typeof authController.authenticate).toBe('function');
    });

    it('should return HTTP 400 with error message if user not found by email', async () => {
        userModel.findOne.mockReturnValue(undefined);

        await authController.authenticate(req, res, next);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual({ errors: [{ msg: 'Invalid credentials' }]});
    });

    it('should return HTTP 400 with error message if user password doesnt match', async () => {
        userModel.findOne.mockReturnValue(insertedUser);
        bcrypt.compare.mockReturnValue(false);

        await authController.authenticate(req, res, next);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual({ errors: [{ msg: 'Invalid credentials' }]});
    });

    it('should return token if password matchs', async () => {
        userModel.findOne.mockReturnValue(insertedUser);
        bcrypt.compare.mockReturnValue(true);
        authUtils.generateToken.mockResolvedValue({ error: null, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' });

        await authController.authenticate(req, res, next);

        expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' });
    });

    it('should return error if token generation doesnt work', async () => {
        userModel.findOne.mockReturnValue(insertedUser);
        bcrypt.compare.mockReturnValue(true);
        authUtils.generateToken.mockResolvedValue({ error: 'Server error', token: null });

        await authController.authenticate(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});