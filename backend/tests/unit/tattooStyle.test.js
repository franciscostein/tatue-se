const httpMocks = require('node-mocks-http');
const tattooStyleController = require('../../src/controller/tattooStyle');
const tattooStyleModel = require('../../src/models/TattooStyle');
const newTattooStyle = require('../mocks/new/tattooStyle.json');
const insertedTattooStyle = require('../mocks/inserted/tattooStyle.json');

const saveMock = jest.fn();
tattooStyleModel.prototype.save = saveMock;
tattooStyleModel.findOneAndUpdate = jest.fn();
tattooStyleModel.findById = jest.fn();

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