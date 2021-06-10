const httpMocks = require('node-mocks-http');
const tattooStyleController = require('../../src/controller/tattooStyle');
const tattooStyleModel = require('../../src/models/TattooStyle');
const newTattooStyle = require('../mocks/new/tattooStyle.json');
const insertedTattooStyle = require('../mocks/inserted/tattooStyle.json');
const insertedTattooStyles = require('../mocks/inserted/tattooStyles.json');

const saveMock = jest.fn();
tattooStyleModel.prototype.save = saveMock;
tattooStyleModel.find = jest.fn();
tattooStyleModel.findOneAndUpdate = jest.fn();
tattooStyleModel.findById = jest.fn();

const errorMessage = { message: 'Error, something went wrong!' }
const rejectedPromiseWithErrorMessage = Promise.reject(errorMessage);

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('tattooStylesController.save', () => {
    it('should contain a save function', () => {
        expect(typeof tattooStyleController.save).toBe('function');
    });

    it('should create a new tattoo style if it doesnt exist yet', async () => {
        req.body = newTattooStyle;
        tattooStyleModel.findById.mockReturnValue(undefined);
        saveMock.mockReturnValue(insertedTattooStyle);

        await tattooStyleController.save(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedTattooStyle._doc);
        expect(saveMock).toHaveBeenCalled();
    });

    it('should update the tattoo style if it already exists', async () => {
        req.body = insertedTattooStyle._doc;
        tattooStyleModel.findById.mockReturnValue(insertedTattooStyle);
        tattooStyleModel.findOneAndUpdate.mockReturnValue(insertedTattooStyle);

        await tattooStyleController.save(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedTattooStyle._doc);
        expect(tattooStyleModel.findOneAndUpdate).toHaveBeenCalled();
    });
});

describe('tattooStyleController.getAll', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should contain a getAll function', () => {
        expect(typeof tattooStyleController.getAll).toBe('function');
    });

    it('should retrieve all tattoo styles if there is any', async () => {
        tattooStyleModel.find.mockReturnValue(insertedTattooStyle._doc);

        await tattooStyleController.getAll(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedTattooStyle._doc);
    });

    it('should not retrieve tattoo styles if there isnt', async () => {
        await tattooStyleController.getAll(req, res, next);

        expect(res.statusCode).toBe(204);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should handle errors', async () => {
		tattooStyleModel.find.mockReturnValue(rejectedPromiseWithErrorMessage);

		await tattooStyleController.getAll(req, res, next);

		expect(next).toBeCalledWith(errorMessage);
	});
});

describe('tattooStyleController.getMany', () => {
    const tattooStyleIds = insertedTattooStyles.map(tattooStyle => tattooStyle._id);

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should contain a getMany function', () => {
        expect(typeof tattooStyleController.getMany).toBe('function');
    });

    it('should call find with requested ids', async () => {
        req.body._ids = tattooStyleIds;

        await tattooStyleController.getMany(req, res, next);

        expect(tattooStyleModel.find).toBeCalledWith({ '_id': tattooStyleIds });
    });

    it('should return requested tattoo styles if ids match', async () => {
        tattooStyleModel.find.mockReturnValue(insertedTattooStyles);

        await tattooStyleController.getMany(req, res, next);

        expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(insertedTattooStyles);
    });

    it('shouldnt return any tattoo styles if there isnt a match', async () => {
        req.body._ids = tattooStyleIds;

        await tattooStyleController.getMany(req, res, next);

        expect(res.statusCode).toBe(204);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({});
    });

    it('should handle errors', async () => {
		tattooStyleModel.find.mockReturnValue(rejectedPromiseWithErrorMessage);

		await tattooStyleController.getMany(req, res, next);

		expect(next).toHaveBeenCalledWith(errorMessage);
    });
});