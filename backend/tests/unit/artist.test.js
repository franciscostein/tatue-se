const artistController = require('../../src/controller/artist');
const artistModel = require('../../src/models/Artist');
const newArtist = require('../mocks/new/artist.json');
const insertedArtist = require('../mocks/inserted/artist.json');
const insertedUser = require('../mocks/inserted/user.json');
const httpMocks = require('node-mocks-http');

const saveMock = jest.fn();
artistModel.prototype.save = saveMock;
artistModel.find = jest.fn();
artistModel.findById = jest.fn();
artistModel.findOne = jest.fn();
artistModel.findOneAndUpdate = jest.fn();

const errorMessage = { message: 'Error, something went wrong!' }
const rejectedPromiseWithErrorMessage = Promise.reject(errorMessage);

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('artistController.save', () => {
    beforeEach(() => {
        req.user = {};
        req.user.id = insertedUser._id;
        jest.resetAllMocks();
    });
    
    it('should contain a save function', () => {
        expect(typeof artistController.save).toBe('function');
    });

    it('should update artist if it already exists', async () => {
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

    it('should contain a getAll function', () => {
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
		expect(res._getJSONData()).toStrictEqual({});
    });

    it('should handle errors', async () => {
		artistModel.find.mockReturnValue(rejectedPromiseWithErrorMessage);

		await artistController.getAll(req, res, next);

		expect(next).toBeCalledWith(errorMessage);
	});
});

describe('artistController.getOne', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should contain a getOne function', () => {
        expect(typeof artistController.getOne).toBe('function');
    });

    it('should call findById with requested id', async () => {
        const artistId = insertedArtist._doc._id;
        req.params.id = artistId;

        await artistController.getOne(req, res, next);

        expect(artistModel.findById).toBeCalledWith(artistId);
    });

    it('should return requested artist if id matches', async () => {
        artistModel.findById.mockReturnValue(insertedArtist);

        await artistController.getOne(req, res, next);

        expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(insertedArtist._doc);
    });

    it('shouldnt return any artist if there isnt a match', async () => {
        await artistController.getOne(req, res, next);

        expect(res.statusCode).toBe(204);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({});
    });

    it('should handle errors', async () => {
		artistModel.findById.mockReturnValue(rejectedPromiseWithErrorMessage);

		await artistController.getOne(req, res, next);

		expect(next).toHaveBeenCalledWith(errorMessage);
    });
});