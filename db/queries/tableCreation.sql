-- SQLite
create table
  `Users` (
    `userID` integer not null primary key autoincrement,
    `username` varchar(64) not null,
    `displayName` varchar(64) not null,
    `personalEmail` varchar(255) not null,
    `webEmail` varchar(255) null,
    `membershipEnd` datetime null,
    unique (`UserID`)
  );

create table
  `UserTypes` (
    `userID` integer not null,
    `userType` TINYINT not null,
    primary key (`userID`, `userType`),
    foreign key (`userID`) references Users (`userID`)
  );