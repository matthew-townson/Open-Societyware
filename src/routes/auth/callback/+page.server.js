import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, HTTPS } from '$env/static/private';

export async function load({ url, cookies }) {
    const token = url.searchParams.get('jwt');

    console.log('Received token:', token);

    if (!token) {
        console.error('No token provided');
        return {
            status: 400,
            body: { error: 'Token is missing' }
        };
    }

    try {
        // verify JWT
        const verified = jwt.verify(token, JWT_SECRET);
        console.log('JWT verified successfully:', verified);

        // set cookies
        cookies.set('session', generateSessionId(verified), {
            httpOnly: true,
            secure: HTTPS,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });

    } catch (error) {
        console.error('JWT verification failed:', error.message, error);

        let errorMessage = 'Invalid token';
        if (error.name === 'TokenExpiredError') {
            errorMessage = 'Token has expired';
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = 'Token is invalid';
        } else if (error.name === 'NotBeforeError') {
            errorMessage = 'Token is not valid yet';
        }

        return {
            status: 401,
            body: { error: errorMessage }
        };
    }
    console.log('SUCCESS')
    return redirect(302, '/');
}

// generate sessionID
function generateSessionId(decodedJwt) {
    return `session_${decodedJwt.username}_${Date.now()}`;
}
