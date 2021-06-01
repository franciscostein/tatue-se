const httpMocks = require('node-mocks-http');
const tattooStyleController = require('../../src/controller/tattooStyle');
const tattooStyleModel = require('../../src/models/TattooStyle');
const insertedTattooStyle = require('../mocks/insertedTattooStyle.json');

const saveMock = jest.fn();
tattooStyleModel.prototype.save = saveMock;
tattooStyleModel.findOneAndUpdate = jest.fn();

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

    it('should create a new one if it doesnt exist yet', async () => {
        await tattooStyleController.save(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedTattooStyle);
        expect(tattooStyleModel.findOneAndUpdate).toHaveBeenCalled();
    });

    it('should update it if already exists', async () => {
        await tattooStyleController.save(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedTattooStyle);
        expect(saveMock).toHaveBeenCalled();
    });
});