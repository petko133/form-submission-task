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
    const [userInfo, setUserInfo] = useState<{
        name: string;
        hobbies: { label: string; value: string }[];
    }>();
    const [avatar, setAvatar] = useState<string | null>(null);

    const renderSteps = () => {
        switch (step) {
            case 'home':
                return <HomePage setStep={setStep} />;
            case 'registerStepOne':
                return (
                    <RegisterStepOne
                        setStep={setStep}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                    />
                );
            case 'registerStepTwo':
                return (
                    <RegisterStepTwo setStep={setStep} setAvatar={setAvatar} />
                );
            case 'review':
                return <Review avatar={avatar} userInfo={userInfo} />;
            default:
                return <HomePage setStep={setStep} />;
        }
    };

    return (
        <>
            <header></header>
            <section>
                <div className='w-full h-screen flex flex-col items-center justify-center'>
                    <div className='mb-8!'>
                        <h1 className='text-3xl! font-bold! text-center mb-4!'>
                            Welcome to the Registration Page
                        </h1>
                        <p className='text-center text-gray-600'>
                            Please follow the steps below to complete your
                            registration.
                        </p>
                    </div>
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
            </section>
        </>
    );
}
