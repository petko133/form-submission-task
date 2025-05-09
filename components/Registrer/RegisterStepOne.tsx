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

const FormFieldsSchema = z.object({
    name: z.string().min(1, 'Please enter a Name'),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
    confirmPassword: z.string().min(4, 'Please confirm your password'),
    hobbies: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .nonempty('Please select at least one interest'),
});

type FormFields = z.infer<typeof FormFieldsSchema>;

const RegisterStepOne = (props: Props) => {
    const { setStep, setUserInfo, userInfo } = props;
    const [hobbies, setHobbies] = useState<{ label: string; value: string }[]>(
        []
    );

    console.log('userInfo', userInfo);

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
                { label: 'React.js', value: 'react' },
                { label: 'Vue.js', value: 'vue' },
                { label: 'Angular', value: 'angular' },
                { label: 'Svelte', value: 'svelte' },
            ];
            setHobbies(hobbies);
        }
    }, []);

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
                Register
            </Text>

            <form className='tutorial gap-2' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    mb='2'
                    {...register('name', {
                        required: 'Please enter a Name',
                    })}
                    type='text'
                    placeholder='Name'
                    defaultValue={userInfo?.name}
                />
                {errors.name && (
                    <div className='text-red-500 text-base!'>
                        {errors.name.message}
                    </div>
                )}
                <Input
                    mb='2'
                    mt='4'
                    {...register('password', {
                        required: 'Please enter a password',
                    })}
                    type='password'
                    placeholder='Password'
                    defaultValue={userInfo?.password}
                />
                {errors.password && (
                    <div className='text-red-500 text-base!'>
                        {errors.password.message}
                    </div>
                )}
                <Input
                    mt='4'
                    mb='2'
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                    })}
                    type='password'
                    placeholder='Confirm Password'
                    defaultValue={userInfo?.confirmPassword}
                />
                {errors.confirmPassword && (
                    <div className='text-red-500 text-base!'>
                        {errors.confirmPassword.message}
                    </div>
                )}
                <Controller
                    name='hobbies'
                    control={control}
                    render={({ field, fieldState: { invalid } }) => (
                        <>
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
                                // only allow user to choose up to 2 options
                                isOptionDisabled={() =>
                                    selectedOptions.length >= 2
                                }
                                className='basic-multi-select mt-4!'
                                classNamePrefix='select'
                            />
                            {invalid && (
                                <div className='text-red-500 text-base!'>
                                    Please select at least one interest
                                </div>
                            )}
                        </>
                    )}
                />

                <Button
                    my='4'
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
                    <div className='text-red-500 text-base!'>
                        {errors.root.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default RegisterStepOne;
