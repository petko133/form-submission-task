'use client';
import {
    Button,
    FileUpload,
    Float,
    Image,
    Text,
    useFileUploadContext,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import BackIcon from '../../public/back-icon.svg';
import NextImage from 'next/image';
import { LuFileImage, LuX } from 'react-icons/lu';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
    setStep: (step: string) => void;
    setAvatar: (avatar: string) => void;
}

const FormFieldsSchema = z.object({
    avatar: z.string(),
});
type FormFields = z.infer<typeof FormFieldsSchema>;

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
    const { setStep, setAvatar } = props;
    const [file, setFile] = useState<File>();

    const { control, handleSubmit } = useForm<FormFields>({
        resolver: zodResolver(FormFieldsSchema),
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
            setStep('review');
        }
    };

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

            <form action='' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='avatar'
                    control={control}
                    render={({ field }) => (
                        <>
                            <FileUpload.Root
                                {...field}
                                mb='4'
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
                                    <Button variant='outline' size='sm' w='2/3'>
                                        <LuFileImage /> Upload Images
                                    </Button>
                                </FileUpload.Trigger>
                                <FileUploadList />
                            </FileUpload.Root>
                            <Button
                                type='submit'
                                colorPalette='teal'
                                variant='subtle'
                                size='lg'
                                width='full'
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
