const clientController = require('../../src/controller/client');
const clientModel = require('../../src/models/Client');
const newClient = require('../mocks/new/client.json');
const insertedClient = require('../mocks/inserted/client.json');
const insertedUser = require('../mocks/inserted/user.json');
const httpMocks = require('node-mocks-http');

const saveMock = jest.fn();
clientModel.prototype.save = saveMock;
clientModel.findOne = jest.fn();
clientModel.findOneAndUpdate = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('clientController.save', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    
    it('should have a save function', () => {
        expect(typeof clientController.save).toBe('function');
    });

    it('should update client if it already exists', async () => {
        req.user = {};
        req.user.id = insertedUser._id;
        req.body = newClient;
        clientModel.findOne.mockReturnValue(insertedClient);
        clientModel.findOneAndUpdate.mockReturnValue(insertedClient);

        await clientController.save(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedClient._doc);
        expect(clientModel.findOneAndUpdate).toHaveBeenCalled();
    });

    it('should create client if it doenst exists', async () => {
        req.user = {};
        req.user.id = insertedUser._id;
        req.body = newClient;
        clientModel.findOne.mockReturnValue(undefined);
        saveMock.mockReturnValue(insertedClient);
        
        await clientController.save(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedClient._doc);
        expect(saveMock).toHaveBeenCalled();
    });

    it('should handle error upon occurring', async () => {
        await clientController.save(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});