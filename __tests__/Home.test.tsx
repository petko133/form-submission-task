import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers
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
        render(<Home />); // ARRANGE

        const myElem = screen.getByText(
            'Click on the button below to start the registration process.'
        ); // ACT
        expect(myElem).toBeInTheDocument(); // ASSERT
        const button = screen.getByRole('button', {
            name: /Sign up/i,
        });
        expect(button).toBeInTheDocument(); // ASSERT
        expect(button).toHaveTextContent('Sign up'); // ASSERT
    });
});
