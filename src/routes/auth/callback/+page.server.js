import { redirect, error } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, HTTP_SECURE } from '$env/static/private';
import { getUserID, newUser } from '$lib/db';
import { getUserID } from '../../../lib/db.js';

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

    console.log('SUCCESS,', verifiedJWT.username, 'logged in');

    const userID = await getUserID(verifiedJWT.username);

    // do we need to create a new user in the db?
    if (userID) {
        console.log(`${verifiedJWT.username} exists`);
    } else {
        // add the user to the user table with the jwt token attributes, then get the ID of said user, and specify their type
        await newUser(verifiedJWT.username, verifiedJWT.displayName, verifiedJWT.mail);
        //const userIDnew = await getUserID(verifiedJWT.username);
        //console.log(`USERID: ${userIDnew}`);
        console.log(`User ${verifiedJWT.username} created`);
    }

    return redirect(302, '/');
}

// generate sessionID
function generateSessionId(decodedJwt) {
    return `session_${decodedJwt.username}_${Date.now()}`;
}
