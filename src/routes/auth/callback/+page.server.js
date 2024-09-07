import { redirect, error } from '@sveltejs/kit';
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
            secure: HTTP_SECURE,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });

    } catch (e) {
        console.error('JWT verification failed:', error.message, e);

        let errorMessage = 'Invalid token';
        if (e.name === 'TokenExpiredError') {
            errorMessage = 'Token has expired';
        } else if (e.name === 'JsonWebTokenError') {
            errorMessage = 'Token is invalid';
        } else if (e.name === 'NotBeforeError') {
            errorMessage = 'Token is not valid yet';
        }

        error(401, {
            message: errorMessage
        });
    }
    console.log('SUCCESS')
    return redirect(302, '/');
}

// generate sessionID
function generateSessionId(decodedJwt) {
    return `session_${decodedJwt.username}_${Date.now()}`;
}
