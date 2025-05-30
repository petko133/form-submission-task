import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterStepOne from '@/components/Registrer/RegisterStepOne';
import { act } from 'react';
import { Provider } from '@/components/ui/provider';

const hobbies = [
    { label: 'Reading', value: 'reading' },
    { label: 'Traveling', value: 'traveling' },
    { label: 'Cooking', value: 'cooking' },
    { label: 'Gardening', value: 'gardening' },
    { label: 'Photography', value: 'photography' },
    { label: 'Painting', value: 'painting' },
    { label: 'Writing', value: 'writing' },
    { label: 'Hiking', value: 'hiking' },
    { label: 'Fishing', value: 'fishing' },
    { label: 'Cycling', value: 'cycling' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Dancing', value: 'dancing' },
    { label: 'Gaming', value: 'gaming' },
    { label: 'Knitting', value: 'knitting' },
    { label: 'Yoga', value: 'yoga' },
    { label: 'Running', value: 'running' },
    { label: 'Singing', value: 'singing' },
    { label: 'Drawing', value: 'drawing' },
    { label: 'Woodworking', value: 'woodworking' },
    { label: 'Birdwatching', value: 'birdwatching' },
];

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

describe('RegisterStepOne', () => {
    const setStep = jest.fn();
    const userInfo = {
        name: '',
        password: '',
        confirmPassword: '',
        hobbies: [],
    };
    const setUserInfo = jest.fn();

    it('renders the RegisterStepOne component', () => {
        const { getByLabelText } = render(
            <Provider>
                <RegisterStepOne
                    setStep={setStep}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    hobbies={hobbies}
                />
            </Provider>
        );

        expect(getByLabelText('Name')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
        expect(getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(getByLabelText('Interests')).toBeInTheDocument();
    });

    it('Valid input', async () => {
        const { getByLabelText, getByRole } = render(
            <Provider>
                <RegisterStepOne
                    setStep={setStep}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    hobbies={hobbies}
                />
            </Provider>
        );

        await act(async () => {
            fireEvent.change(getByLabelText('Name'), {
                target: { value: 'John Doe' },
            });
            fireEvent.change(getByLabelText('Password'), {
                target: { value: '1234' },
            });
            fireEvent.change(getByLabelText('Confirm Password'), {
                target: { value: '1234' },
            });
            fireEvent.change(getByLabelText('Interests'), {
                target: { value: 'Reading' },
            });
        });

        await act(async () => {
            fireEvent.click(
                getByRole('button', {
                    name: 'Next',
                })
            );
        });

        expect(getByLabelText('Name')).toHaveValue('John Doe');
        expect(getByLabelText('Password')).toHaveValue('1234');
        expect(getByLabelText('Confirm Password')).toHaveValue('1234');
        expect(getByLabelText('Interests')).toHaveValue('Reading');
    });

    it('Invalid input', async () => {
        const { getByLabelText, getByRole, container } = render(
            <Provider>
                <RegisterStepOne
                    setStep={setStep}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    hobbies={hobbies}
                />
            </Provider>
        );

        await act(async () => {
            fireEvent.change(getByLabelText('Name'), {
                target: { value: '' },
            });
            fireEvent.change(getByLabelText('Password'), {
                target: { value: '' },
            });
            fireEvent.change(getByLabelText('Confirm Password'), {
                target: { value: '' },
            });
            fireEvent.change(getByLabelText('Interests'), {
                target: { value: '' },
            });
        });

        await act(async () => {
            fireEvent.click(
                getByRole('button', {
                    name: 'Next',
                })
            );
        });

        expect(container.innerHTML).toMatch('Please enter a Name');
        expect(container.innerHTML).toMatch(
            'Password must be at least 4 characters long'
        );
        expect(container.innerHTML).toMatch('Please confirm your password');
        expect(container.innerHTML).toMatch(
            'Please select at least one interest'
        );
    });

    it('Invalid cofirm password', async () => {
        const { getByLabelText, getByRole, container } = render(
            <Provider>
                <RegisterStepOne
                    setStep={setStep}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    hobbies={hobbies}
                />
            </Provider>
        );

        await act(async () => {
            fireEvent.change(getByLabelText('Password'), {
                target: { value: '1234' },
            });
            fireEvent.change(getByLabelText('Confirm Password'), {
                target: { value: '1233' },
            });
        });

        await act(async () => {
            fireEvent.click(
                getByRole('button', {
                    name: 'Next',
                })
            );
        });
        expect(container.innerHTML).toMatch('Passwords do not match');
    });
});
