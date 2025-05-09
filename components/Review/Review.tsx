import React from 'react';
import { Image } from '@chakra-ui/react';
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
        <div>
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
        </div>
    );
};

export default Review;
