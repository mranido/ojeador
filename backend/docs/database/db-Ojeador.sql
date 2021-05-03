create database if not exists ojeador;
use ojeador;

CREATE TABLE IF NOT EXISTS players (
	playerId INT NOT NULL AUTO_INCREMENT,
    playerName VARCHAR(255) NOT NULL,
    playerEmail VARCHAR(320) UNIQUE NOT NULL,
    playerPassword VARCHAR(255) NOT NULL,
    playerRol ENUM('Player', 'Scout') DEFAULT 'Player',
    playerVerificationCode VARCHAR(64) NULL,
    playerLocation VARCHAR(60) NULL,
    playerTeam VARCHAR(100) NULL,
    playerNumber TINYINT UNSIGNED NULL,
    playerImage VARCHAR(255) NULL,
    playerBirthday DATE NULL,
    playerDescription VARCHAR(500) NULL, 
    playerCreatedAt DATETIME NOT NULL,
    playerUpdatedAt DATETIME NULL,
    playerDeletedAt DATETIME NULL,
    playerVerifiedAt DATETIME NULL,
    PRIMARY KEY (playerId)
);

CREATE TABLE IF NOT EXISTS scouts (
	scoutId INT NOT NULL AUTO_INCREMENT,
    scoutName VARCHAR(255) NOT NULL,
    scoutEmail VARCHAR(320) UNIQUE NOT NULL,
    scoutPassword VARCHAR(255) NOT NULL,
    scoutRol ENUM('Player', 'Scout') DEFAULT 'Scout',
    scoutVerificationCode VARCHAR(64) NULL,
    scoutLocation VARCHAR(60) NULL,
    scoutTeam VARCHAR(100) NULL,
    scoutImage VARCHAR(255) NULL,
    scoutDescription VARCHAR(500) NULL, 
    scoutCreatedAt DATETIME NOT NULL,
    scoutUpdatedAt DATETIME NULL,
    scoutDeletedAt DATETIME NULL,
    scoutVerifiedAt DATETIME NULL,
    PRIMARY KEY (scoutId)
);

CREATE TABLE IF NOT EXISTS positions (
	positionId INT NOT NULL AUTO_INCREMENT,
    positionName ENUM('Portero', 'Defensa', 'Mediocentro', 'Delantero'),
    PRIMARY KEY (positionId)
);
INSERT INTO positions (positionId, positionName) VALUES (1,'Portero'),(2,'Defensa'),(3,'Mediocentro'),(4,'Delantero');

select * from positions;

CREATE TABLE IF NOT EXISTS skills (
	skillId INT NOT NULL AUTO_INCREMENT,
    skillName ENUM('Paralotodo', 'Defensivo', 'Incansable', 'Velocidad', 'Salto', 'Regateador', 'Rematador'),
    PRIMARY KEY (skillId)
);
INSERT INTO skills (skillId, skillName) VALUES (1,'Paralotodo'),(2,'Defensivo'),(3,'Incansable'),(4,'Velocidad'),
(5,'Salto'),(6,'Regateador'),(7,'Rematador');

select * from skills;

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
    ratingIdPlayer INT NOT NULL,
    ratingIdVotePlayer INT NULL,
    ratingIdVoteScout INT NULL,
    ratingValue TINYINT UNSIGNED,
    ratingPositionSkillId INT NOT NULL,
	ratingCreatedAt DATETIME NOT NULL,
    ratingUpdatedAt DATETIME NULL,
    ratingDeletedAt DATETIME NULL,
    PRIMARY KEY (ratingId),
    FOREIGN KEY (`ratingIdPlayer`) REFERENCES `players` (`playerId`),
    FOREIGN KEY (`ratingIdVotePlayer`) REFERENCES `players` (`playerId`),
    FOREIGN KEY (`ratingIdVoteScout`) REFERENCES `scouts` (`scoutId`),
    FOREIGN KEY (`ratingPositionSkillId`) REFERENCES `positionsSkills` (`positionSkillId`)
);    

CREATE TABLE IF NOT EXISTS videos (
	videoId INT NOT NULL AUTO_INCREMENT,
    videoIdPlayer INT NOT NULL,
    videoUrl VARCHAR(255) NOT NULL,
	videoCreatedAt DATETIME NOT NULL,
    videoDeletedAt DATETIME NULL,
    PRIMARY KEY (videoId),
    FOREIGN KEY (`videoIdPlayer`) REFERENCES `players` (`playerId`)
);    

CREATE TABLE IF NOT EXISTS videoLikes (
videoLikeId INT NOT NULL AUTO_INCREMENT,
videoLikevideoId INT NOT NULL,
videoLikePlayerId INT NOT NULL,
PRIMARY KEY (videoLikeId),
FOREIGN KEY (`videoLikeVideoId`) REFERENCES `videos` (`videoId`),
FOREIGN KEY (`videoLikePlayerId`) REFERENCES `players` (`playerId`)
);

CREATE TABLE IF NOT EXISTS contacts (
contactId INT NOT NULL AUTO_INCREMENT,
contactPlayerId INT NOT NULL,
contactScoutId INT NOT NULL,
contactCreatedAt DATETIME NOT NULL,
contactDeletedAt DATETIME NULL,
PRIMARY KEY (contactId),
FOREIGN KEY(`contactPlayerId`) REFERENCES `players` (`playerId`),
FOREIGN KEY(`contactScoutId`) REFERENCES `scouts` (`ScoutId`)
);
    
    


