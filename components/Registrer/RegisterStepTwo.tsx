'use client';
import { Button, Image, Text } from '@chakra-ui/react';
import React from 'react';
import BackIcon from '../../public/back-icon.svg';
import NextImage from 'next/image';

interface Props {
    setStep: (step: string) => void;
}

const RegisterStepTwo = (props: Props) => {
    const { setStep } = props;
    return (
        <div>
            <Text
                fontSize='xl'
                flex='1'
                mb='4'
                display='flex'
                alignItems='center'
            >
                <Button
                    size={'xs'}
                    height='auto'
                    onClick={() => setStep('registerStepOne')}
                    background={'transparent'}
                    padding={0}
                    display={'flex'}
                    alignItems={'start'}
                    justifyContent={'start'}
                >
                    <Image alt='back' asChild>
                        <NextImage
                            alt='back'
                            src={BackIcon}
                            width={20}
                            height={20}
                        />
                    </Image>
                </Button>
                Register
            </Text>
            <Button
                colorPalette='teal'
                variant='subtle'
                size='lg'
                width='full'
                onClick={() => setStep('review')}
            >
                Submit
            </Button>
        </div>
    );
};

export default RegisterStepTwo;
