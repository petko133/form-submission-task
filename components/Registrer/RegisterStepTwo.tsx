'use client';
import {
    Button,
    FileUpload,
    Float,
    Image,
    Text,
    useFileUploadContext,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BackIcon from '../../public/back-icon.svg';
import NextImage from 'next/image';
import { LuFileImage, LuX } from 'react-icons/lu';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
    setStep: (step: string) => void;
    setAvatar: (avatar: string) => void;
    userInfo:
        | {
              name: string;
              hobbies: { label: string; value: string }[];
              password: string;
              confirmPassword: string;
          }
        | undefined;
    avatar: string | null;
}

const FileUploadSchema = z.object({
    avatar: z.any().refine((file) => file.length > 0, {
        message: 'Please upload an image',
    }),
});

type FileUploadSchemaType = z.infer<typeof FileUploadSchema>;

const FileUploadList = () => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    if (files.length === 0) return null;
    return (
        <FileUpload.ItemGroup w='1/3' display='flex' alignItems={'center'}>
            {files.map((file) => (
                <FileUpload.Item
                    w='auto'
                    boxSize='20'
                    p='2'
                    file={file}
                    key={file.name}
                >
                    <FileUpload.ItemPreviewImage />
                    <Float placement='top-end'>
                        <FileUpload.ItemDeleteTrigger
                            boxSize='4'
                            layerStyle='fill.solid'
                        >
                            <LuX />
                        </FileUpload.ItemDeleteTrigger>
                    </Float>
                </FileUpload.Item>
            ))}
        </FileUpload.ItemGroup>
    );
};

const RegisterStepTwo = (props: Props) => {
    const { setStep, avatar, setAvatar, userInfo } = props;
    const [file, setFile] = useState<File>();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FileUploadSchemaType>({
        resolver: zodResolver(FileUploadSchema),
    });

    const convert2base64 = (file: File) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setAvatar(reader.result?.toString() as string);
        };
        reader.readAsDataURL(file);
    };

    const onChange = (e: File) => {
        setFile(e);
    };

    const onSubmit = () => {
        if (file) {
            convert2base64(file);
        }
    };

    useEffect(() => {
        if (!avatar || !userInfo) return;
        // Mock API call
        try {
            const sendData = async () => {
                const response = await fetch('/api/form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: userInfo?.name,
                        hobbies: userInfo?.hobbies,
                        avatar: avatar,
                    }),
                });
                const data = await response.json();
                console.log(data);
            };
            sendData();
            setStep('review');
        } catch (error) {
            console.error('Error:', error);
        }
    }, [file, avatar, userInfo, setStep]);

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
                Step Two Upload an Avatar
            </Text>

            <form action='' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='avatar'
                    control={control}
                    render={({ field }) => (
                        <>
                            <FileUpload.Root
                                {...field}
                                {...register('avatar')}
                                mb='2'
                                accept='image/*'
                                display={'flex'}
                                w='full'
                                flexDirection={'row'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                onFileChange={(files) => {
                                    onChange(files.acceptedFiles[0]);
                                }}
                            >
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        w='2/3'
                                        border={'1px solid'}
                                        borderColor={'whiteAlpha.500'}
                                        _hover={{
                                            background: 'whiteAlpha.200',
                                        }}
                                    >
                                        <LuFileImage /> Upload Images
                                    </Button>
                                </FileUpload.Trigger>
                                <FileUploadList />
                            </FileUpload.Root>
                            {errors.avatar && (
                                <span className='text-red-500 text-base! mb-2! text-center'>
                                    {typeof errors.avatar?.message ===
                                        'string' && errors.avatar.message}
                                </span>
                            )}
                            <Button
                                type='submit'
                                colorPalette='teal'
                                variant='subtle'
                                size='lg'
                                width='full'
                                mt='2'
                                border={'1px solid'}
                                borderColor={'whiteAlpha.500'}
                            >
                                Submit
                            </Button>
                        </>
                    )}
                />
            </form>
        </div>
    );
};

export default RegisterStepTwo;
