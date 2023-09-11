"use client"
// import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { UserAuth } from '../../app/authContext';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../utils/auth/authOptions';

// const { user, id } = UserAuth();

export async function requireUserLoggedIn() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/sign-in')
    }
}

export async function requireAdminRole() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/sign-in')
    }

    if (session.user.role != "ADMIN") {
        redirect('/sign-in?user_role_not_admin='+ session.user.role)
    }
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