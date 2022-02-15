const studioController = require('../../controller/studio');
const studioModel = require('../../models/Studio');
const newStudio = require('../mocks/new/studio.json');
const insertedStudio = require('../mocks/inserted/studio.json');
const httpMocks = require('node-mocks-http');

const saveMock = jest.fn();
studioModel.prototype.save = saveMock;
studioModel.find = jest.fn();
studioModel.findById = jest.fn();
studioModel.findOne = jest.fn();
studioModel.findOneAndUpdate = jest.fn();
studioModel.deleteOne = jest.fn();

const userNotOwnerError = new Error('User must be an owner');
const userIdNotInOwners = '60bfc57ba18525abd95efd8a';
const errorMessage = { message: 'Error, something went wrong!' }
const rejectedPromiseWithErrorMessage = Promise.reject(errorMessage);

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('studioController.save', () => {
    beforeEach(() => {
        req.user = {};
        jest.resetAllMocks();
    });
    
    it('should have a save function', () => {
        expect(typeof studioController.save).toBe('function');
    });

    it('should reject if user is not one of the studio owners [database]', async () => {
        req.user.id = userIdNotInOwners;
        studioModel.findOne.mockReturnValue(insertedStudio._doc);

        await studioController.save(req, res, next);

        expect(next).toHaveBeenCalledWith(userNotOwnerError);
    });

    it('should reject if user is not one of the studio owners [request]', async () => {
        req.user.id = userIdNotInOwners;
        req.body = newStudio;

        await studioController.save(req, res, next);

        expect(next).toHaveBeenCalledWith(userNotOwnerError);
    });

    it('should reject if user is not one of the studio owners [request] && [database]', async () => {
        req.user.id = userIdNotInOwners;

        await studioController.save(req, res, next);

        expect(next).toHaveBeenCalledWith(userNotOwnerError);
    });

    it('should accept if user is one of the studio owners', async () => {
        req.user.id = newStudio.owners[0];
        req.body = newStudio;
        saveMock.mockReturnValue(insertedStudio);

        await studioController.save(req, res, next);

        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should update studio if it already exists', async () => {
        req.user.id = newStudio.owners[0];
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
        req.user.id = newStudio.owners[0];
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

describe('studioController.getAll', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should contain a getAll function', () => {
        expect(typeof studioController.getAll).toBe('function');
    });

    it('should retrieve all studios if there is any', async () => {
        studioModel.find.mockReturnValue(insertedStudio._doc);

        await studioController.getAll(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedStudio._doc);
    });

    it('should not retrieve studios if there isnt', async () => {
        await studioController.getAll(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should handle errors', async () => {
		const errorMessage = { message: 'Error, something went wrong!' }
		const rejectedPromise = Promise.reject(errorMessage);
		studioModel.find.mockReturnValue(rejectedPromise);

		await studioController.getAll(req, res, next);

		expect(next).toBeCalledWith(errorMessage);
	});
});

describe('studioController.getOne', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should contain a getOne function', () => {
        expect(typeof studioController.getOne).toBe('function');
    });

    it('should call findById with requested id', async () => {
        const studioId = insertedStudio._doc._id;
        req.params.id = studioId;

        await studioController.getOne(req, res, next);

        expect(studioModel.findById).toBeCalledWith(studioId);
    });

    it('should return requested studio if id matches', async () => {
        studioModel.findById.mockReturnValue(insertedStudio);

        await studioController.getOne(req, res, next);

        expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(insertedStudio._doc);
    });

    it('shouldnt return any studio if there isnt a match', async () => {
        await studioController.getOne(req, res, next);

        expect(res.statusCode).toBe(404);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({});
    });

    it('should handle errors', async () => {
		studioModel.findById.mockReturnValue(rejectedPromiseWithErrorMessage);

		await studioController.getOne(req, res, next);

		expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe('studioController.deleteOne', () => {
    const userId = insertedStudio._doc.owners[0];
    const studioId = insertedStudio._doc._id;

    beforeEach(() => {
        req.user = {};
        jest.resetAllMocks();
    });

    it('should contain a deleteOne function', () => {
        expect(typeof studioController.deleteOne).toBe('function');
    });

    it('should reject if user is not one of the studio owners', async () => {
        req.user.id = userIdNotInOwners;
        studioModel.findOne.mockReturnValue(insertedStudio._doc);

        await studioController.deleteOne(req, res, next);

        expect(next).toHaveBeenCalledWith(userNotOwnerError);
    });

    it('should accept if user is one of the studio owners', async () => {
        req.user.id = userId;
        studioModel.findOne.mockReturnValue(insertedStudio._doc);
        studioModel.deleteOne.mockReturnValue(1);

        await studioController.deleteOne(req, res, next);

        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should call deleteOne on studioModel with the studioId', async () => {
        req.params.id = studioId;
        req.user.id = userId;
        studioModel.findOne.mockReturnValue(insertedStudio._doc);

        await studioController.deleteOne(req, res, next);

        expect(studioModel.deleteOne).toBeCalledWith({ '_id': studioId });
    });

    it('should return HTTP 200 if it was deleted', async () => {
        req.params.id = studioId;
        req.user.id = userId;
        studioModel.findOne.mockReturnValue(insertedStudio._doc);
        studioModel.deleteOne.mockReturnValue({ deletedCount: 1 });

        await studioController.deleteOne(req, res, next);

        expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({});
    });

    it('should return HTTP 404 if it wasnt deleted', async () => {
        req.params.id = studioId;
        req.user.id = userId;
        studioModel.findOne.mockReturnValue(insertedStudio._doc);
        studioModel.deleteOne.mockReturnValue({ deletedCount: 0 });

        await studioController.deleteOne(req, res, next);

        expect(res.statusCode).toBe(404);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({});
    });

    it('should handle errors', async () => {
        req.params.id = studioId;
        req.user.id = userId;
        studioModel.findOne.mockReturnValue(insertedStudio._doc);
		studioModel.deleteOne.mockReturnValue(rejectedPromiseWithErrorMessage);

		await studioController.deleteOne(req, res, next);

		expect(next).toHaveBeenCalledWith(errorMessage);
    });
});