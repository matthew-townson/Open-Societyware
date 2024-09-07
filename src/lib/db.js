import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.resolve('db/db.sqlite3');

const db = new Database(dbPath);

// checks if a user exists
export const checkUser = (username) => {
    const query = db.prepare('SELECT userID FROM Users WHERE username = ?');
    return query.get(username);
}

// add a new user to the db
export const newUser = (username, displayName, personalEmail) => {
    console.log(username, displayName, personalEmail)
    const query = db.prepare('INSERT INTO Users (username, displayName, personalEmail) VALUES (?, ?, ?)');
    return query.run(username, displayName, personalEmail);
}