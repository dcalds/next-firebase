'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signUp } from '@/firebase/auth';
import Link from 'next/link';
import Button from '@/components/button';
import InputField from '@/components/input';

interface FormData {
  email: string;
  confirmEmail: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('Email is required.').email('Invalid email.'),
  confirmEmail: yup
    .string()
    .required('Email confirmation is required.')
    .test('email-match', 'Emails must match.', function (value) {
      return value === this.parent.email;
    }),
  password: yup.string().required('Password is required.'),
});

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setApiLoading(true);
    setApiError("");

    const { email, password } = data;
    const { result, error } = await signUp(email, password);

    if (error) {
      setApiError("Sign Up failed. User already registered.");
      setApiLoading(false);
    } else {
      window.location.href = '/dashboard'
    }
  };

  return (
    <div className="flex flex-col px-6">
      <div className="container mx-auto flex flex-col items-center py-12">
        <div className="flex flex-col w-full max-w-md border rounded-lg p-6 gap-6">
          <h1 className="text-xl">Sign up to create a new account</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <InputField 
              name={'email'} 
              label={'Email'} 
              register={register('email', { required: 'Email is required' })} 
              type={'email'} 
              error={errors.email?.message}
              placeholder={'Ex: myname@email.com'} 
            />
            <InputField 
              name={'confirmEmail'} 
              label={'Repeat your email'} 
              register={register('confirmEmail', { required: 'Confirm email is required' })} 
              type={'email'} 
              error={errors.confirmEmail?.message}
              placeholder={'Ex: myname@email.com'} 
            />
            <InputField 
              name={'password'} 
              label={'Password'} 
              register={register('password', { required: 'Confirm email is required' })} 
              type={'text'} 
              error={errors.password?.message}
              placeholder={'Create a secret password'} 
            />
            <Button type="submit" loading={apiLoading} text={"Sign Up"} />
            {
              apiError && (
                <p className='text-red-500 text-sm'>{apiError}</p>
              )
            }

            <div className="flex justify-start items-center gap-2">
              Have an account?
              <Link href="/signin" className="text-blue-500">
                Enter with credentials
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
