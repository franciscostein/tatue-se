const studioController = require('../../src/controller/studio');

describe('studioController.save', () => {
    it('should have a save function', () => {
        expect(typeof studioController.save).toBe('function');
    });
});