// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mocks/server';

// establish API mocking before all tests
beforeAll(() => server.listen());

// reset any request handlers that may be added during tests, so they don't affect others
afterEach(() => server.resetHandlers());

// clean up after the tests are finished
afterAll(() => server.close());
