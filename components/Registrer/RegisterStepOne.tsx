'use client';
import {
    Box,
    Button,
    defineStyle,
    Field,
    Image,
    Input,
    Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import BackIcon from '../../public/back-icon.svg';
import NextImage from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const floatingStyles = defineStyle({
    pos: 'absolute',
    top: '-3',
    insetStart: '2',
    fontWeight: 'normal',
    pointerEvents: 'none',
    transition: 'position',
    color: 'fg',
    bg: 'fg.muted',
    rounded: 'md',
    px: '2',
    _peerPlaceholderShown: {
        color: 'fg.muted',
        bg: 'transparent',
        top: '2.5',
        insetStart: '3',
    },
    _peerFocusVisible: {
        color: 'fg',
        top: '-3',
        insetStart: '2',
        bg: 'fg.muted',
        rounded: 'md',
        px: '2',
        fontWeight: 'normal',
    },
});

interface Props {
    setStep: (step: string) => void;
    userInfo:
        | {
              name: string;
              hobbies: { label: string; value: string }[];
              password: string;
              confirmPassword: string;
          }
        | undefined;
    setUserInfo: (userInfo: {
        name: string;
        hobbies: { label: string; value: string }[];
        password: string;
        confirmPassword: string;
    }) => void;
    hobbies: { label: string; value: string }[];
}

const FormFieldsSchema = z
    .object({
        name: z.string().min(1, 'Please enter a Name'),
        password: z
            .string()
            .min(4, 'Password must be at least 4 characters long'),
        confirmPassword: z.string().min(4, 'Please confirm your password'),
        hobbies: z
            .array(z.object({ label: z.string(), value: z.string() }))
            .nonempty('Please select at least one interest'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type FormFields = z.infer<typeof FormFieldsSchema>;

const RegisterStepOne = (props: Props) => {
    const { setStep, setUserInfo, userInfo, hobbies } = props;
    const [selectedOptions, setSelectedOptions] = useState<
        { label: string; value: string }[]
    >([]);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            name: userInfo?.name || '',
            password: userInfo?.password || '',
            confirmPassword: userInfo?.confirmPassword || '',
            hobbies: userInfo?.hobbies || [],
        },
        resolver: zodResolver(FormFieldsSchema),
    });

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log('Form data:', data);

        setUserInfo({
            name: data.name,
            hobbies: data.hobbies,
            password: data.password,
            confirmPassword: data.confirmPassword,
        });

        setStep('registerStepTwo');
    };

    return (
        <>
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
                    onClick={() => setStep('home')}
                    background={'transparent'}
                    padding={0}
                    display={'flex'}
                    alignItems={'start'}
                    justifyContent={'start'}
                >
                    <Image alt='back' asChild marginRight={2}>
                        <NextImage
                            alt='back'
                            src={BackIcon}
                            width={20}
                            height={20}
                        />
                    </Image>
                </Button>
                Step One User Info
            </Text>

            <form className='tutorial gap-2' onSubmit={handleSubmit(onSubmit)}>
                <div className='relative flex flex-col'>
                    <Field.Root>
                        <Box pos='relative' w='full' mb='2'>
                            <Input
                                borderColor={'whiteAlpha.500'}
                                {...register('name')}
                                type='text'
                                className='peer'
                                placeholder=''
                                defaultValue={userInfo?.name}
                            />
                            <Field.Label css={floatingStyles}>Name</Field.Label>
                        </Box>
                    </Field.Root>
                    {errors.name && (
                        <span className='text-red-500 text-sm! absolute -bottom-4 left-2'>
                            {errors.name.message}
                        </span>
                    )}
                </div>
                <div className='relative flex flex-col'>
                    <Field.Root>
                        <Box pos='relative' w='full' mb='2' mt='6'>
                            <Input
                                borderColor={'whiteAlpha.500'}
                                {...register('password')}
                                type='password'
                                placeholder=''
                                defaultValue={userInfo?.password}
                                className='peer'
                            />
                            <Field.Label css={floatingStyles}>
                                Password
                            </Field.Label>
                        </Box>
                    </Field.Root>
                    {errors.password && (
                        <span className='text-red-500 text-sm! absolute -bottom-4 left-2'>
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className='relative flex flex-col'>
                    <Field.Root>
                        <Box pos='relative' w='full' mb='2' mt='6'>
                            <Input
                                borderColor={'whiteAlpha.500'}
                                {...register('confirmPassword')}
                                type='password'
                                placeholder=''
                                defaultValue={userInfo?.confirmPassword}
                                className='peer'
                            />
                            <Field.Label css={floatingStyles}>
                                Confirm Password
                            </Field.Label>
                        </Box>
                    </Field.Root>
                    {errors.confirmPassword && (
                        <span className='text-red-500 text-sm! absolute -bottom-4 left-2'>
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <Field.Root w='full'>
                    <Controller
                        name='hobbies'
                        control={control}
                        render={({ field, fieldState: { invalid } }) => (
                            <div className='relative flex flex-col w-full!'>
                                <Select
                                    {...field}
                                    {...register('hobbies', {
                                        required:
                                            'Please select at least one interest',
                                    })}
                                    isMulti
                                    value={userInfo?.hobbies || selectedOptions}
                                    variant={'outline'}
                                    onChange={(selected) => {
                                        setSelectedOptions(
                                            selected as {
                                                label: string;
                                                value: string;
                                            }[]
                                        );
                                        setUserInfo({
                                            name: userInfo?.name || '',
                                            password: userInfo?.password || '',
                                            confirmPassword:
                                                userInfo?.confirmPassword || '',
                                            hobbies: selected as {
                                                label: string;
                                                value: string;
                                            }[],
                                        });
                                        if (selected.length <= 2) {
                                            field.onChange(selected);
                                        }
                                    }}
                                    options={hobbies}
                                    closeMenuOnSelect={false}
                                    placeholder='Select your “Interests”'
                                    isOptionDisabled={() =>
                                        selectedOptions.length >= 2
                                    }
                                    className='basic-multi-select mt-6! border-white!'
                                    classNamePrefix='select'
                                />
                                {invalid && (
                                    <span className='text-red-500 text-sm! absolute -bottom-6 left-2'>
                                        Please select at least one interest
                                    </span>
                                )}
                            </div>
                        )}
                    />
                    <Field.Label hidden>Interests</Field.Label>
                </Field.Root>
                <Button
                    mt='8'
                    type='submit'
                    colorPalette='teal'
                    variant='subtle'
                    size='lg'
                    width='full'
                    disabled={isSubmitting}
                    border={'1px solid'}
                    borderColor={'whiteAlpha.500'}
                >
                    {isSubmitting ? 'Loading...' : 'Next'}
                </Button>
                {errors.root && (
                    <span className='text-red-500 text-sm! absolute -bottom-4 left-2'>
                        {errors.root.message}
                    </span>
                )}
            </form>
        </>
    );
};

export default RegisterStepOne;
