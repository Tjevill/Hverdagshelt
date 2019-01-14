DROP TABLE IF EXISTS Cases;

CREATE TABLE `Cases` (
  `case_id` int(8) NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `status_id` int(8) NOT NULL DEFAULT '1',
  `user_id` int(8) NOT NULL,
  `category_id` int(8) NOT NULL,
  `zipcode` varchar(4) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `headline` varchar(100) NOT NULL,
  `picture` text,
  `employee_id` int(11) DEFAULT NULL,
  `org_id` int(11) DEFAULT NULL,
  PRIMARY KEY (case_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS Category;

CREATE TABLE Category (
  category_id int(8) NOT NULL AUTO_INCREMENT,
  description VARCHAR(240) NOT NULL,
  PRIMARY KEY (category_id)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;


DROP TABLE IF EXISTS User;

CREATE TABLE User (
  user_id int(8) NOT NULL AUTO_INCREMENT,
  name varchar(200) NOT NULL,
  address varchar(200) NOT NULL,
  zipcode varchar(4) NOT NULL,
  tel INT(8) NOT NULL,
  email varchar(100) NOT NULL,
  password text NOT NULL,
  secret varchar(32) NOT NULL,
  subscription tinyint(1) NOT NULL,
  PRIMARY KEY (user_id)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;


DROP TABLE IF EXISTS Organization;

CREATE TABLE Organization (
  org_id int(8) NOT NULL AUTO_INCREMENT,
  organizationnumber int(12) NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(50) NOT NULL,
  password text NOT NULL,
  secret varchar(32) NOT NULL,
  PRIMARY KEY (org_id)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;


DROP TABLE IF EXISTS Events;

CREATE TABLE Events (
    event_id int(8) NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    date DATETIME NOT NULL,
    description text NOT NULL,
    zipcode int(4) NOT NULL,
    PRIMARY KEY (event_id) 
)