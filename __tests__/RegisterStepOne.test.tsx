import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers
import RegisterStepOne from '@/components/Registrer/RegisterStepOne';
import { act } from 'react';
import { Provider } from '@/components/ui/provider';

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
    it('renders the RegisterStepOne component', () => {
        const setStep = jest.fn();
        const userInfo = {
            name: '',
            password: '',
            confirmPassword: '',
            hobbies: [],
        };
        const setUserInfo = jest.fn();

        const { getByLabelText } = render(
            <Provider>
                <RegisterStepOne
                    setStep={setStep}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    hobbies={[
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
                    ]}
                />
            </Provider>
        ); // ARRANGE

        expect(getByLabelText('Name')).toBeInTheDocument(); // ASSERT
        expect(getByLabelText('Password')).toBeInTheDocument(); // ASSERT
        expect(getByLabelText('Confirm Password')).toBeInTheDocument(); // ASSERT
        expect(getByLabelText('Interests')).toBeInTheDocument(); // ASSERT
    });

    it('Valid input', async () => {
        const setStep = jest.fn();
        const userInfo = {
            name: '',
            password: '',
            confirmPassword: '',
            hobbies: [],
        };
        const setUserInfo = jest.fn();

        const { getByLabelText, getByRole } = render(
            <Provider>
                <RegisterStepOne
                    setStep={setStep}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    hobbies={[
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
                    ]}
                />
            </Provider>
        ); // ARRANGE

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

        expect(getByLabelText('Name')).toHaveValue('John Doe'); // ASSERT
        expect(getByLabelText('Password')).toHaveValue('1234'); // ASSERT
        expect(getByLabelText('Confirm Password')).toHaveValue('1234'); // ASSERT
        expect(getByLabelText('Interests')).toHaveValue('Reading'); // ASSERT
    });

    it('Invalid input', async () => {
        const setStep = jest.fn();
        const userInfo = {
            name: '',
            password: '',
            confirmPassword: '',
            hobbies: [],
        };
        const setUserInfo = jest.fn();

        const { getByLabelText, getByRole, container } = render(
            <Provider>
                <RegisterStepOne
                    setStep={setStep}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    hobbies={[
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
                    ]}
                />
            </Provider>
        ); // ARRANGE

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
        const setStep = jest.fn();
        const userInfo = {
            name: '',
            password: '',
            confirmPassword: '',
            hobbies: [],
        };
        const setUserInfo = jest.fn();

        const { getByLabelText, getByRole, container } = render(
            <Provider>
                <RegisterStepOne
                    setStep={setStep}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    hobbies={[
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
                    ]}
                />
            </Provider>
        ); // ARRANGE

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
