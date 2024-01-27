'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from '@/firebase/auth';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import Button from '@/components/button';
import InputField from '@/components/input';

interface FormData {
  email: string;
  password: string;
}

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data: FormData) => {
    setApiLoading(true);
    setApiError("");

    const { email, password } = data;
    const { result, error } = await signIn(email, password);

    if (error) {
      setApiError("Sign in failed. Try changing credentials.");
      setApiLoading(false);
    } else {
      window.location.href = '/dashboard'
    }
  };

  return (
    <div className="flex flex-col px-6">
      <div className="container mx-auto flex flex-col items-center py-12">
        <div className="flex flex-col w-full max-w-md border rounded-lg p-6 gap-6">
          <h1 className="text-xl">Sign In with your credentials</h1>
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
              name={'password'} 
              label={'Password'} 
              register={register('password', { required: 'Password is required' })} 
              type={'password'} 
              error={errors.password?.message}
              placeholder={'Your secret password'} 
            />
            <Button type="submit" loading={apiLoading} text={"Sign In"} />
            {
              apiError && (
                <p className='text-red-500 text-sm'>{apiError}</p>
              )
            }

            <div className="flex justify-start items-center gap-2">
              First time using?
              <Link href="/signup" className="text-blue-500">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
