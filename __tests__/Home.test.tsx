import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('Home', () => {
    it('renders the home page', () => {
        render(<Home />);

        const myElem = screen.getByText(
            'Click on the button below to start the registration process.'
        );

        expect(myElem).toBeInTheDocument();
        const button = screen.getByRole('button', {
            name: /Sign up/i,
        });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Sign up');
    });
});
