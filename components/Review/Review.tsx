import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import NextImage from 'next/image';

interface Props {
    avatar: string | null;
    userInfo:
        | {
              name: string;
              hobbies: { label: string; value: string }[];
          }
        | undefined;
}

const Review = (props: Props) => {
    const { avatar, userInfo } = props;

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            width='100%'
            height='100%'
        >
            {avatar ? (
                <Image alt='avatar' asChild>
                    <NextImage
                        alt='avatar'
                        src={avatar ? avatar : '/default-avatar.png'}
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </Image>
            ) : null}
            <Box mt={4} textAlign='center'>
                <h2 className='text-2xl font-bold'>{userInfo?.name}</h2>
                <p className='text-gray-600'>
                    Interests:{' '}
                    {userInfo?.hobbies
                        ? userInfo.hobbies
                              .map((hobby) => hobby.label)
                              .join(', ')
                        : 'No interests selected'}
                </p>
            </Box>
        </Box>
    );
};

export default Review;
