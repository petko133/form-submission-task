import React from 'react';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import NextImage from 'next/image';

interface Props {
    avatar: string | null;
    userInfo:
        | {
              name: string;
              hobbies: { label: string; value: string }[];
          }
        | undefined;
    setUserInfo: (userInfo: {
        name: string;
        hobbies: { label: string; value: string }[];
        password: string;
        confirmPassword: string;
    }) => void;
    setStep: (step: string) => void;
}

const Review = (props: Props) => {
    const { avatar, userInfo, setStep, setUserInfo } = props;

    const handleReset = () => {
        setUserInfo({
            name: '',
            hobbies: [],
            password: '',
            confirmPassword: '',
        });
        setStep('registerStepOne');
    };

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                width='100%'
                height='100%'
            >
                {avatar ? (
                    <Image alt='avatar' asChild>
                        <NextImage
                            alt='avatar'
                            src={avatar}
                            width={150}
                            height={150}
                            className='rounded-full aspect-square'
                        />
                    </Image>
                ) : (
                    'No avatar selected'
                )}
            </Box>
            <Box mt={4} textAlign='center'>
                <Heading className='text-2xl font-bold'>
                    {userInfo?.name}
                </Heading>
                <Text className='text-gray-600'>
                    Interests:{' '}
                    {userInfo?.hobbies
                        ? userInfo.hobbies
                              .map((hobby) => hobby.label)
                              .join(', ')
                        : 'No interests selected'}
                </Text>
            </Box>
            <Button
                mt='4'
                type='submit'
                colorPalette='teal'
                variant='subtle'
                size='lg'
                width='full'
                onClick={handleReset}
                border={'1px solid'}
                borderColor={'whiteAlpha.500'}
            >
                Reset
            </Button>
        </Box>
    );
};

export default Review;
