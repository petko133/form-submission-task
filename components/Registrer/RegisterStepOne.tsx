'use client';
import { Button, Image, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import BackIcon from '../../public/back-icon.svg';
import NextImage from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select, { GroupBase } from 'react-select';

type FormFields = {
    name: string;
    password: string;
    confirmPassword: string;
    hobbies: { label: string; value: string }[];
};

interface Props {
    setStep: (step: string) => void;
}

const RegisterStepOne = (props: Props) => {
    const { setStep } = props;

    const [selectedOptions, setSelectedOptions] = useState<
        { label: string; value: string }[]
    >([]);

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

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
    };

    const hobbies: GroupBase<{ label: string; value: string }>[] = [
        {
            label: 'Hobbies',
            options: [
                { label: 'React.js', value: 'react' },
                { label: 'Vue.js', value: 'vue' },
                { label: 'Angular', value: 'angular' },
                { label: 'Svelte', value: 'svelte' },
            ],
        },
    ];

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
                        required: 'Please enter a username',
                    })}
                    type='text'
                    placeholder='Username'
                />
                {errors.name && (
                    <div className='text-red-500 text-base! mb-2!'>
                        {errors.name.message}
                    </div>
                )}
                <Input
                    mb='2'
                    {...register('password', {
                        required: 'Please enter a password',
                    })}
                    type='password'
                    placeholder='Password'
                />
                {errors.password && (
                    <div className='text-red-500 text-base! mb-2!'>
                        {errors.password.message}
                    </div>
                )}
                <Input
                    mb='2'
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                    })}
                    type='password'
                    placeholder='Confirm Password'
                />
                {errors.confirmPassword && (
                    <div className='text-red-500 text-base! mb-2!'>
                        {errors.confirmPassword.message}
                    </div>
                )}
                <Controller
                    name='hobbies'
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            isMulti
                            value={selectedOptions}
                            onChange={(selected) => {
                                setSelectedOptions(
                                    selected as {
                                        label: string;
                                        value: string;
                                    }[]
                                );
                                if (selected.length <= 2) {
                                    field.onChange(selected);
                                }
                            }}
                            options={hobbies}
                            closeMenuOnSelect={false}
                            // only allow user to choose up to 2 options
                            isOptionDisabled={() => selectedOptions.length >= 2}
                            className='basic-multi-select text-black mb-4!'
                            classNamePrefix='select'
                        />
                    )}
                />

                <Button
                    mb='2'
                    type='submit'
                    colorPalette='teal'
                    variant='subtle'
                    size='lg'
                    width='full'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Loading...' : 'Submit'}
                </Button>
                {errors.root && (
                    <div className='text-red-500 text-base! mb-2!'>
                        {errors.root.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default RegisterStepOne;
