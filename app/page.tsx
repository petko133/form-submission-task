'use client';
import React, { useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import HomePage from '@/components/Home/HomePage';
import RegisterStepOne from '@/components/Registrer/RegisterStepOne';
import RegisterStepTwo from '@/components/Registrer/RegisterStepTwo';
import { Provider } from '@/components/ui/provider';
import Review from '@/components/Review/Review';

export default function Home() {
    const [step, setStep] = useState('home');
    const [userInfo, setUserInfo] = useState<{
        name: string;
        password: string;
        confirmPassword: string;
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
                    <RegisterStepTwo
                        setStep={setStep}
                        setAvatar={setAvatar}
                        avatar={avatar}
                        userInfo={userInfo}
                    />
                );
            case 'review':
                return (
                    <Review
                        avatar={avatar}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        setStep={setStep}
                    />
                );
            default:
                return <HomePage setStep={setStep} />;
        }
    };

    return (
        <>
            <header></header>
            <section>
                <div className='w-full h-screen relative flex flex-col items-center justify-center px-8! overflow-hidden'>
                    <div className='background aspect-square -z-50!'></div>
                    <Provider>
                        <div className='mb-8!'>
                            <Heading
                                color={'whiteAlpha.900'}
                                fontSize={{ base: '2xl', md: '3xl' }}
                                fontWeight={'bold'}
                                textAlign={'center'}
                                textTransform={'uppercase'}
                                textShadow={'0 0 10px rgba(0, 0, 0, 0.5)'}
                                mb={4}
                            >
                                Welcome to the Registration Page
                            </Heading>
                            <Text
                                color={'whiteAlpha.800'}
                                fontSize={{ base: 'md', md: 'lg' }}
                                textAlign={'center'}
                                textShadow={'0 0 10px rgba(0, 0, 0, 0.5)'}
                                mb={4}
                            >
                                Please follow the steps below to complete your
                                registration.
                            </Text>
                        </div>
                        <Box
                            maxW='sm'
                            w='100%'
                            borderWidth='1px'
                            p='4'
                            borderRadius={8}
                            borderColor={'whiteAlpha.500'}
                        >
                            {renderSteps()}
                        </Box>
                    </Provider>
                </div>
            </section>
        </>
    );
}
