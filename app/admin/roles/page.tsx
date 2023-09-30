"use client"

import { UserAuth } from '../../authContext';
import { RoleForm } from './(components)/components';

export default function Page() {
  const { users } = UserAuth();

  return <RoleForm users={users} />;
}
