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

describe('userController.save', () => {
    it('should have a save function', () => {
        expect(typeof userController.save).toBe('function');
    });

    it('should 400 if user already exists', () => {
        userModel.findOne.mockReturnValue(newUser);

        expect(res.statusCode).toBe(400);
    });

    it('should call userModel.save', async () => {
        await userController.save(req, res, next);

        expect(userModel.save).toBeCalledWith(newUser);
    });
});