'use client';
import { Button, Image, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BackIcon from '../../public/back-icon.svg';
import NextImage from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
    const { setStep, setUserInfo, userInfo } = props;
    const [hobbies, setHobbies] = useState<{ label: string; value: string }[]>(
        []
    );
    const [selectedOptions, setSelectedOptions] = useState<
        { label: string; value: string }[]
    >([]);

    const {
        control,
        register,
        handleSubmit,
        setError,
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
        if (data.password.length < 4) {
            setError('password', {
                message: 'Password must be at least 4 characters long',
            });
            return;
        }

        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                message: 'Passwords do not match',
            });
            return;
        }

        setUserInfo({
            name: data.name,
            hobbies: data.hobbies,
            password: data.password,
            confirmPassword: data.confirmPassword,
        });

        setStep('registerStepTwo');
    };

    useEffect(() => {
        try {
            const getHobbies = async () => {
                const response = await fetch('/api/hobbies');
                const data = await response.json();
                setHobbies(data.body);
            };
            getHobbies();
        } catch (error) {
            console.error('Error fetching hobbies:', error);
            const hobbies = [
                { label: 'Fishing', value: 'fishing' },
                { label: 'Cycling', value: 'cycling' },
                { label: 'Swimming', value: 'swimming' },
                { label: 'Dancing', value: 'dancing' },
            ];
            setHobbies(hobbies);
        }
    }, []);

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
                    <Input
                        mb='2'
                        {...register('name')}
                        type='text'
                        placeholder='Name'
                        defaultValue={userInfo?.name}
                    />
                    {errors.name && (
                        <span className='text-red-500 text-sm! absolute -bottom-3 left-3'>
                            {errors.name.message}
                        </span>
                    )}
                </div>
                <div className='relative flex flex-col'>
                    <Input
                        mb='2'
                        mt='4'
                        {...register('password')}
                        type='password'
                        placeholder='Password'
                        defaultValue={userInfo?.password}
                    />
                    {errors.password && (
                        <span className='text-red-500 text-sm! absolute -bottom-3 left-3'>
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className='relative flex flex-col'>
                    <Input
                        mt='4'
                        mb='2'
                        {...register('confirmPassword')}
                        type='password'
                        placeholder='Confirm Password'
                        defaultValue={userInfo?.confirmPassword}
                    />
                    {errors.confirmPassword && (
                        <span className='text-red-500 text-sm! absolute -bottom-3 left-3'>
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <Controller
                    name='hobbies'
                    control={control}
                    render={({ field, fieldState: { invalid } }) => (
                        <div className='relative flex flex-col'>
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
                                className='basic-multi-select mt-4!'
                                classNamePrefix='select'
                            />
                            {invalid && (
                                <span className='text-red-500 text-sm! absolute -bottom-5 left-3'>
                                    Please select at least one interest
                                </span>
                            )}
                        </div>
                    )}
                />
                <Button
                    mt='8'
                    type='submit'
                    colorPalette='teal'
                    variant='subtle'
                    size='lg'
                    width='full'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Loading...' : 'Next'}
                </Button>
                {errors.root && (
                    <span className='text-red-500 text-sm! absolute -bottom-3 left-3'>
                        {errors.root.message}
                    </span>
                )}
            </form>
        </>
    );
};

export default RegisterStepOne;
