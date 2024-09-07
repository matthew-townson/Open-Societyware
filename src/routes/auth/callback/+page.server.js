import { redirect, error } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, HTTP_SECURE } from '$env/static/private';
import { checkUser, newUser } from '$lib/db';

export async function load({ url, cookies }) {
    const token = url.searchParams.get('jwt');

    console.log('Received token:', token);

    if (!token) {
        console.error('No token provided');
        throw error(400, 'Token is missing');
    }

    let verifiedJWT;

    try {
        // verify JWT
        verifiedJWT = jwt.verify(token, JWT_SECRET);
        console.log('JWT verified successfully:', verifiedJWT);

        // set cookies
        cookies.set('session', generateSessionId(verifiedJWT), {
            httpOnly: true,
            secure: HTTP_SECURE,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });

    } catch (e) {
        console.error('JWT verification failed:', e.message, e);

        let errorMessage = 'Invalid token';
        if (e.name === 'TokenExpiredError') {
            errorMessage = 'Token has expired';
        } else if (e.name === 'JsonWebTokenError') {
            errorMessage = 'Token is invalid';
        } else if (e.name === 'NotBeforeError') {
            errorMessage = 'Token is not valid yet';
        }

        throw error(401, errorMessage);
    }

    //console.log('SUCCESS,', verifiedJWT.username, 'logged in');

    const userID = await checkUser(verifiedJWT.username);

    if (userID) {
        console.log(`${verifiedJWT.username} exists`);
    } else {
        await newUser(verifiedJWT.username, verifiedJWT.displayName, verifiedJWT.mail);  // Added 'await'
        console.log(`User ${verifiedJWT.username} created`);
    }

    return redirect(302, '/');
}

// generate sessionID
function generateSessionId(decodedJwt) {
    return `session_${decodedJwt.username}_${Date.now()}`;
}
