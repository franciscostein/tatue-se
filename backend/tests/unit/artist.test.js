const artistController = require('../../src/controller/artist');
const artistModel = require('../../src/models/Artist');
const newArtist = require('../mocks/new/artist.json');
const insertedArtist = require('../mocks/inserted/artist.json');
const insertedUser = require('../mocks/inserted/user.json');
const httpMocks = require('node-mocks-http');

const saveMock = jest.fn();
artistModel.prototype.save = saveMock;
artistModel.find = jest.fn();
artistModel.findOne = jest.fn();
artistModel.findOneAndUpdate = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('artistController.save', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    
    it('should coutain a save function', () => {
        expect(typeof artistController.save).toBe('function');
    });

    it('should update artist if it already exists', async () => {
        req.user = {};
        req.user.id = insertedUser._id;
        req.body = newArtist;
        artistModel.findOne.mockReturnValue(insertedArtist);
        artistModel.findOneAndUpdate.mockReturnValue(insertedArtist);

        await artistController.save(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedArtist._doc);
        expect(artistModel.findOneAndUpdate).toHaveBeenCalled();
    });

    it('should create artist if it doenst exists', async () => {
        req.user = {};
        req.user.id = insertedUser._id;
        req.body = newArtist;
        artistModel.findOne.mockReturnValue(undefined);
        saveMock.mockReturnValue(insertedArtist);
        
        await artistController.save(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedArtist._doc);
        expect(saveMock).toHaveBeenCalled();
    });

    it('should handle error upon occurring', async () => {
        await artistController.save(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});

describe('artistController.getAll', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should coutain a getAll function', () => {
        expect(typeof artistController.getAll).toBe('function');
    });

    it('should retrieve all artists if there is any', async () => {
        artistModel.find.mockReturnValue(insertedArtist._doc);

        await artistController.getAll(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedArtist._doc);
    });

    it('should not retrieve artists if there isnt', async () => {
        await artistController.getAll(req, res, next);

        expect(res.statusCode).toBe(204);
        expect(res._isEndCalled()).toBeTruthy();
    });
});