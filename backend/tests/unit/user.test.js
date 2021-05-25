const userController = require('../../src/controller/user');
const authService = require('../../src/service/auth');
const userService = require('../../src/service/user');
const userModel = require('../../src/models/User');
const httpMocks = require('node-mocks-http');
const newUser = require('../mock/newUser.json');
const insertedUser = require('../mock/insertedUser.json');

// jest.mock('../../src/models/User');     // mock mongoose functions
// jest.mock('../../src/service/auth');
jest.mock('../../src/service/auth.js');
jest.mock('../../src/models/User.js');

const saveMock = jest.fn();
userModel.prototype.save = saveMock;
userModel.findOne = jest.fn();
// authService.generateToken = jest.fn();
// userService.create = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('userController.register', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    
    it('should have a register function', () => {
        expect(typeof userController.register).toBe('function');
    });

    it('should return HTTP 400 if user already exists', async () => {
        userModel.findOne.mockReturnValue(newUser);
        
        await userController.register(req, res, next);

        expect(res.statusCode).toBe(400);
    });

    it('should call userModel.save', async () => {
		req.body = newUser;
        authService.generateToken.mockReturnValue({ status: 200, payload: {}});
        await userController.register(req, res, next);
		
        expect(saveMock).toHaveBeenCalled();
    });
});