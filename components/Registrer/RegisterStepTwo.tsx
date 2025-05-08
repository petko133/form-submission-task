'use client';
import {
    Button,
    FileUpload,
    Float,
    Image,
    Text,
    useFileUploadContext,
} from '@chakra-ui/react';
import React from 'react';
import BackIcon from '../../public/back-icon.svg';
import NextImage from 'next/image';
import { LuFileImage, LuX } from 'react-icons/lu';
import { Controller, useForm } from 'react-hook-form';

interface Props {
    setStep: (step: string) => void;
}

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
    const { setStep } = props;

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const onSubmit = handleSubmit((data) => console.log('On Submit: ', data));

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
            <Text fontSize='md' mb='2'>
                Upload your profile picture
            </Text>
            <form action='' onSubmit={handleSubmit(onSubmit)}></form>
            <Controller
                name='profilePicture'
                control={control}
                render={({ field }) => (
                    <>
                        <FileUpload.Root
                            {...field}
                            key={field.name}
                            mb='4'
                            accept='image/*'
                            display={'flex'}
                            w='full'
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <FileUpload.HiddenInput />
                            <FileUpload.Trigger asChild>
                                <Button variant='outline' size='sm' w='2/3'>
                                    <LuFileImage /> Upload Images
                                </Button>
                            </FileUpload.Trigger>
                            <FileUploadList />
                        </FileUpload.Root>
                        <Button
                            colorPalette='teal'
                            variant='subtle'
                            size='lg'
                            width='full'
                            onClick={() => setStep('review')}
                        >
                            Submit
                        </Button>
                    </>
                )}
            />
        </div>
    );
};

export default RegisterStepTwo;
