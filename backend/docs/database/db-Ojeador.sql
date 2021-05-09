drop database if exists ojeador;
create database if not exists ojeador;
use ojeador;

CREATE TABLE IF NOT EXISTS users (
	userId INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL,
    userEmail VARCHAR(320) UNIQUE NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    userRol ENUM('Player', 'Scout'),
    userVerificationCode VARCHAR(64) NULL,
    userPosition ENUM('Portero', 'Defensa', 'Mediocentro', 'Delantero'),
    userLocation VARCHAR(60) NULL,
    userTeam VARCHAR(100) NULL,
    userNumber TINYINT UNSIGNED NULL,
    userImage VARCHAR(255) NULL,
    userBirthday DATE NULL,
    userDescription VARCHAR(500) NULL, 
    userCreatedAt DATETIME NOT NULL DEFAULT NOW(),
    userUpdatedAt DATETIME NULL,
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
    positionSkillPositionId INT NOT NULL,
    positionSkillSkillId INT NOT NULL,
    PRIMARY KEY (positionSkillId),
    FOREIGN KEY (`positionSkillSkillid`) REFERENCES `skills` (`skillId`),
    FOREIGN KEY (`positionSkillPositionid`) REFERENCES `positions` (`positionId`) 
);
INSERT INTO positionsSkills (positionSkillId, positionSkillPositionId, positionSkillSkillId) VALUES
(1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),
(6,2,2),(7,2,3),(8,2,4),(9,2,5),(10,2,7),
(11,3,2),(12,3,3),(13,3,4),(14,3,6),(15,3,7),
(16,4,3),(17,4,4),(18,4,5),(19,4,6),(20,4,7);

CREATE TABLE IF NOT EXISTS ratings (
	ratingId INT NOT NULL AUTO_INCREMENT,
    ratingIdUser INT NOT NULL,
    ratingIdVoteUser INT NULL,
    ratingValue TINYINT UNSIGNED,
    ratingPositionSkillId INT NOT NULL,
	ratingCreatedAt DATETIME NOT NULL,
    ratingUpdatedAt DATETIME NULL,
    PRIMARY KEY (ratingId),
    FOREIGN KEY (`ratingIdUser`) REFERENCES `users` (`userId`),
    FOREIGN KEY (`ratingIdVoteuser`) REFERENCES `users` (`userId`),
    FOREIGN KEY (`ratingPositionSkillId`) REFERENCES `positionsSkills` (`positionSkillId`)
);    

CREATE TABLE IF NOT EXISTS videos (
	videoId INT NOT NULL AUTO_INCREMENT,
    videoIduser INT NOT NULL,
    videoUrl VARCHAR(255) NOT NULL,
	videoCreatedAt DATETIME NOT NULL DEFAULT NOW(),
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
contactDescription VARCHAR(255) NOT NULL,
contactStatus BOOLEAN,
contactCreatedAt DATETIME NOT NULL DEFAULT NOW(),
PRIMARY KEY (contactId),
FOREIGN KEY(`contactPlayerId`) REFERENCES `users` (`userId`),
FOREIGN KEY(`contactScoutId`) REFERENCES `users` (`userId`)
);
    
    


