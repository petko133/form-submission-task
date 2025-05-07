'use client';
import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import HomePage from '@/components/Home/HomePage';
import RegisterStepOne from '@/components/Registrer/RegisterStepOne';
import RegisterStepTwo from '@/components/Registrer/RegisterStepTwo';
import { Provider } from '@/components/ui/provider';
import Review from '@/components/Review/Review';

export default function Home() {
    const [step, setStep] = useState('home');

    const renderSteps = () => {
        switch (step) {
            case 'home':
                return <HomePage setStep={setStep} />;
            case 'registerStepOne':
                return <RegisterStepOne setStep={setStep} />;
            case 'registerStepTwo':
                return <RegisterStepTwo setStep={setStep} />;
            case 'review':
                return <Review />;
            default:
                return <HomePage setStep={setStep} />;
        }
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Provider>
                <Box
                    maxW='sm'
                    minW='sm'
                    borderWidth='1px'
                    p='4'
                    borderRadius={8}
                >
                    {renderSteps()}
                </Box>
            </Provider>
        </div>
    );
}
