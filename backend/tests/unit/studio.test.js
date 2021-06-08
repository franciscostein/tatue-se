const studioController = require('../../src/controller/studio');
const studioModel = require('../../src/models/Studio');
const newStudio = require('../mocks/new/studio.json');
const insertedStudio = require('../mocks/inserted/studio.json');
const insertedUser = require('../mocks/inserted/user.json');
const httpMocks = require('node-mocks-http');

const saveMock = jest.fn();
studioModel.prototype.save = saveMock;
studioModel.findOne = jest.fn();
studioModel.findOneAndUpdate = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('studioController.save', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    
    it('should have a save function', () => {
        expect(typeof studioController.save).toBe('function');
    });

    it('should update studio if it already exists', async () => {
        req.user = {};
        req.user.id = insertedUser._id;
        req.body = newStudio;
        studioModel.findOne.mockReturnValue(insertedStudio);
        studioModel.findOneAndUpdate.mockReturnValue(insertedStudio);

        await studioController.save(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedStudio._doc);
        expect(studioModel.findOneAndUpdate).toHaveBeenCalled();
    });

    it('should create studio if it doenst exists', async () => {
        req.user = {};
        req.user.id = insertedUser._id;
        req.body = newStudio;
        studioModel.findOne.mockReturnValue(undefined);
        saveMock.mockReturnValue(insertedStudio);
        
        await studioController.save(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedStudio._doc);
        expect(saveMock).toHaveBeenCalled();
    });

    it('should handle error upon occurring', async () => {
        await studioController.save(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});