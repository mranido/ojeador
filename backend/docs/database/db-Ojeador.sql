create database if not exists ojeador;
use ojeador;

CREATE TABLE IF NOT EXISTS users (
	userId INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL,
    userEmail VARCHAR(320) UNIQUE NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    userRol ENUM('Player', 'Scout'),
    userVerificationCode VARCHAR(64) NULL,
    userLocation VARCHAR(60) NULL,
    userTeam VARCHAR(100) NULL,
    userNumber TINYINT UNSIGNED NULL,
    userImage VARCHAR(255) NULL,
    userBirthday DATE NULL,
    userDescription VARCHAR(500) NULL DEFAULT NOW(), 
    userCreatedAt DATETIME NOT NULL,
    userUpdatedAt DATETIME NULL,
    userDeletedAt DATETIME NULL,
    userVerifiedAt DATETIME NULL,
    PRIMARY KEY (userId)
);

CREATE TABLE IF NOT EXISTS positions (
	positionId INT NOT NULL AUTO_INCREMENT,
    positionName ENUM('Portero', 'Defensa', 'Mediocentro', 'Delantero'),
    PRIMARY KEY (positionId)
);
INSERT INTO positions (positionId, positionName) VALUES (1,'Portero'),(2,'Defensa'),(3,'Mediocentro'),(4,'Delantero');


CREATE TABLE IF NOT EXISTS skills (
	skillId INT NOT NULL AUTO_INCREMENT,
    skillName ENUM('Paralotodo', 'Defensivo', 'Incansable', 'Velocidad', 'Salto', 'Regateador', 'Rematador'),
    PRIMARY KEY (skillId)
);
INSERT INTO skills (skillId, skillName) VALUES (1,'Paralotodo'),(2,'Defensivo'),(3,'Incansable'),(4,'Velocidad'),
(5,'Salto'),(6,'Regateador'),(7,'Rematador');


CREATE TABLE IF NOT EXISTS positionsSkills (
	positionSkillId INT NOT NULL AUTO_INCREMENT,
    positionSkillSkillId INT NOT NULL,
    positionSkillPositionId INT NOT NULL,
    PRIMARY KEY (positionSkillId),
    FOREIGN KEY (`positionSkillSkillid`) REFERENCES `skills` (`skillId`),
    FOREIGN KEY (`positionSkillPositionid`) REFERENCES `positions` (`positionId`) 
);

CREATE TABLE IF NOT EXISTS ratings (
	ratingId INT NOT NULL AUTO_INCREMENT,
    ratingIdUser INT NOT NULL,
    ratingIdVoteUser INT NULL,
    ratingValue TINYINT UNSIGNED,
    ratingPositionSkillId INT NOT NULL,
	ratingCreatedAt DATETIME NOT NULL,
    ratingUpdatedAt DATETIME NULL,
    ratingDeletedAt DATETIME NULL,
    PRIMARY KEY (ratingId),
    FOREIGN KEY (`ratingIdUser`) REFERENCES `users` (`userId`),
    FOREIGN KEY (`ratingIdVoteuser`) REFERENCES `users` (`userId`),
    FOREIGN KEY (`ratingPositionSkillId`) REFERENCES `positionsSkills` (`positionSkillId`)
);    

CREATE TABLE IF NOT EXISTS videos (
	videoId INT NOT NULL AUTO_INCREMENT,
    videoIduser INT NOT NULL,
    videoUrl VARCHAR(255) NOT NULL,
	videoCreatedAt DATETIME NOT NULL,
    videoDeletedAt DATETIME NULL,
    PRIMARY KEY (videoId),
    FOREIGN KEY (`videoIduser`) REFERENCES `users` (`userId`)
);    

CREATE TABLE IF NOT EXISTS videoLikes (
videoLikeId INT NOT NULL AUTO_INCREMENT,
videoLikevideoId INT NOT NULL,
videoLikeUserId INT NOT NULL,
PRIMARY KEY (videoLikeId),
FOREIGN KEY (`videoLikeVideoId`) REFERENCES `videos` (`videoId`),
FOREIGN KEY (`videoLikeUserId`) REFERENCES `users` (`userId`)
);

CREATE TABLE IF NOT EXISTS contacts (
contactId INT NOT NULL AUTO_INCREMENT,
contactPlayerId INT NOT NULL,
contactScoutId INT NOT NULL,
contactCreatedAt DATETIME NOT NULL,
contactDeletedAt DATETIME NULL,
PRIMARY KEY (contactId),
FOREIGN KEY(`contactPlayerId`) REFERENCES `users` (`userId`),
FOREIGN KEY(`contactScoutId`) REFERENCES `users` (`userId`)
);
    
    


