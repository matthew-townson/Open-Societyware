-- SQLite
create table
  `Users` (
    `UserID` integer not null primary key autoincrement,
    `username` varchar(64) not null,
    `displayName` varchar(64) not null,
    `personalEmail` varchar(255) not null,
    `webEmail` varchar(255) null,
    `userType` TINYINT not null default 6,
    `membershipEnd` datetime null,
    unique (`UserID`)
  )