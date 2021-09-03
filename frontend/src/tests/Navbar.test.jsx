import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import '@testing-library/jest-dom';

import App from '../App';

describe('navbar links', () => {
    test('landing page', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <App />
            </Router>
        );

        expect(screen.getByText(/find your next tattoo artist/i)).toBeInTheDocument();
    });

    test('clicking on studios link', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <App />
            </Router>
        );
        
        userEvent.click(screen.getByText(/studios/i).closest('a'));
        expect(screen.getByText(/>find tattoo studios near you/i)).toBeInTheDocument();
    });

    test('clicking on artists link', () => {
        userEvent.click(screen.getByRole('link', { name: /artists/i }));
        expect(screen.getByText(/find your next tattoo artist/i)).toBeInTheDocument();
    });
});