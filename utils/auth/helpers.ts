"use client"
// import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { UserAuth } from '../../app/authContext';

// const { user, id } = UserAuth();

export async function requireUserLoggedIn() {
    // if (!user) {
    //     redirect('/sign-in')
    // }
}

export async function requireAdminRole() {
    // if (!user) {
    //     redirect('/sign-in')
    // }

    // if (user.role != "ADMIN") {
    //     redirect('/sign-in?user_role_not_admin='+user.role)
    // }
}

export async function validate(userId: string) {
    // const store = cookies();
    // const token = store.get('next-auth.session-token');

    // if (!token) {
    //     return false;
    // }

    // const db = await prisma.session.findFirst({ where: { sessionToken: String(token) } });

    // if (!user || !id) {
    //     return false;
    // }

    return true;
}