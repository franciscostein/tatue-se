const userController = require('../../src/controller/user');
const userModel = require('../../src/models/User');
const httpMocks = require('node-mocks-http');
const newUser = require('../mock/newUser.json');

jest.mock('../../src/models/User');     // mock mongoose functions

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('userController.register', () => {
    it('should have a register function', () => {
        expect(typeof userController.register).toBe('function');
    });

    it('should return HTTP 400 if user already exists', async () => {
        userModel.findOne.mockReturnValue(newUser);
        await userController.register(req, res, next);

        expect(res.statusCode).toBe(400);
    });

    it('should call userModel.save', async () => {
        await userController.register(req, res, next);

        expect(userModel.save).toBeCalledWith(newUser);
    });
});