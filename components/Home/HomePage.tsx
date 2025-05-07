'use client';
import React from 'react';
import { Button, Text } from '@chakra-ui/react';

interface Props {
    setStep: (step: string) => void;
}

const HomePage = (props: Props) => {
    const { setStep } = props;

    return (
        <>
            <Text fontSize='xl' mb='4'>
                Hello, would you like to register ?
            </Text>
            <Button
                colorPalette='teal'
                variant='subtle'
                size='lg'
                width='full'
                onClick={() => setStep('registerStepOne')}
            >
                Sign up
            </Button>
        </>
    );
};

export default HomePage;
