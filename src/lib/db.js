import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.resolve('db/db.sqlite3');

const db = new Database(dbPath);

// get userID
export const getUserID = (username) => {
    const query = db.prepare('SELECT userID FROM Users WHERE username = ?');
    return query.get(username);
}

// add a new user to the db
export const newUser = (username, displayName, personalEmail) => {
    const query = db.prepare('INSERT INTO Users (username, displayName, personalEmail) VALUES (?, ?, ?)');
    query.run(username, displayName, personalEmail);
    const userID = getUserID(username);
    console.log(userID.userID);
    specUserType(userID.userID, 6);
}

// give a user a type
export const specUserType = (userID, userType) => {
    const query = db.prepare('INSERT INTO userTypes VALUES (?, ?)');
    return query.run(userID, userType);
}