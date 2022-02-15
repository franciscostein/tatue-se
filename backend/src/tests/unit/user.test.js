const userController = require('../../controller/user');
const authUtils = require('../../utils/auth');
const userModel = require('../../models/User');
const httpMocks = require('node-mocks-http');
const newUser = require('../mocks/new/user.json');

jest.mock('../../utils/auth.js');

const saveMock = jest.fn();
userModel.prototype.save = saveMock;
userModel.findOne = jest.fn();

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
    
    it('should countain a register function', () => {
        expect(typeof userController.register).toBe('function');
    });

    it('should return HTTP 400 if user already exists', async () => {
        userModel.findOne.mockReturnValue(newUser);
        
        await userController.register(req, res, next);

        expect(res.statusCode).toBe(400);
    });

    it('should call userModel.save, return HTTP 201 and token', async () => {
        authUtils.generateToken.mockResolvedValue({ error: null, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' });
        
        await userController.register(req, res, next);
		
        expect(saveMock).toHaveBeenCalled();
        expect(res.statusCode).toBe(201);
		expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' });
    });

    it('should return server error if token isnt generated', async () => {
        authUtils.generateToken.mockResolvedValue({ error: 'Server error', token: null });
        
        await userController.register(req, res, next);
		
        expect(next).toHaveBeenCalled();
    });
});