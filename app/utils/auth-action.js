'use server';
import { cookies } from 'next/headers';

export async function clearCookies() {
    cookies().set({
        name: 'authorized',
        value: false,
        expires: new Date(),
        maxAge: 0,
    });
    cookies().set({
        name: 'token',
        expires: new Date(),
        maxAge: 0,
    });
}

export async function getAuthorizationToken() {
    return cookies().get('token')?.value;
}

export async function initializedCookie(data) {
    if (data) {
        if ('authorization' in data) {
            cookies().set({
                name: 'authorized',
                value: true,
                path: '/',
                maxAge: data?.authorization?.expiration * 60,
            });
            cookies().set({
                name: 'token',
                value: data?.authorization?.token,
                path: '/',
                maxAge: data?.authorization?.expiration * 60,
            });
        }
    }
}
