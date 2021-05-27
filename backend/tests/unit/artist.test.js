const artistController = require('../../src/controller/artist');
const artistModel = require('../../src/models/Artist');
const newArtist = require('../mocks/newArtist.json');
const insertedArtist = require('../mocks/insertedArtist.json');
const httpMocks = require('node-mocks-http');

artistModel.findOne = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('artistController.save', () => {
    it('should coutain a save function', () => {
        expect(typeof artistController.save).toBe('function');
    });

    it('should should update artist if it already exists', async () => {
        artistModel.findOne.mockReturnValue(insertedArtist);

        await artistController.save(req, res, next);

        expect(res.statusCode).toBe(200);
    });

    it('should create artist if it doenst exists', async () => {
        artistModel.findOne.mockReturnValue(undefined);
        
        await artistController.save(req, res, next);

        expect(res.statusCode).toBe(201);
    });

    it('should handle error upon occurring', async () => {
        await artistController.save(req, res, next);

    });
});