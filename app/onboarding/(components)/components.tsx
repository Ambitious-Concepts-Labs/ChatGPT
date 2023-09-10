'use client';

import Button from '../../../components/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateName } from '../(actions)/actions';
import { GrFormNextLink } from 'react-icons/gr'

export default function Form() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function validateAndUpdate() {
    if (isValidString(name)) {
      await updateName(name);
      router.push('/dashboard');
    } else {
      setError(
        'Your name must only contain letters and numbers, and be at most 32 characters with no spaces.'
      );
    }
  }

  function isValidString(input: any) {
    const regex = /^[a-zA-Z0-9]{1,32}$/;
    return regex.test(input);
  }

  return (
    <>
      <div className='flex flex-col'>
        <p className='text-accent-foreground pb-2 text-sm'>Name</p>
        <div className='flex flex-col'>
          <input
            value={name}
            className='max-w-xs'
            onChange={(e: any) => setName(e.target.value)}
            placeholder='Roman'
          />
          {error.length > 0 && (
            <p className='mt-1 text-sm text-rose-500'>{error}</p>
          )}
        </div>
      </div>
      <div className='flex justify-between'>

        <Button 
        variant={"black"}
        text={"Continue"}
        icon={<GrFormNextLink color='white'/>}
        onClick={validateAndUpdate()} size={'sm'}
          Continue
        />
      </div>
    </>
  );
}
