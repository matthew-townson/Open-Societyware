import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    const token = cookies.get('session');

    if (!token) {
        console.log('No session token, redirecting to login')
        throw redirect(302, '/login');
    }

    return {
        user: 'some user info from your token', // or whatever user info you want to pass
    };
}
