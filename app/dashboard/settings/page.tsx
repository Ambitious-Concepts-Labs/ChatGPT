"use client"

// import { authOptions } from '@/auth/options';
import Form from './(components)/components';
import { UserAuth } from '../../authContext';

export default function Page() {
  // const { user } = await getServerSession(authOptions);
  const { user } = UserAuth();

  return (
    <div>
      <p className='pb-6 text-lg font-medium'>General</p>
      <Form currentName={user.name} email={user.email} />
    </div>
  );
}
