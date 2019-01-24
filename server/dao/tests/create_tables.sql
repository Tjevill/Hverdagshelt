DROP TABLE IF EXISTS Cases;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS StatusTable;
DROP TABLE IF EXISTS Organization;



CREATE TABLE Cases (
  case_id int(8) NOT NULL AUTO_INCREMENT,
  description text NOT NULL,
  longitude decimal(11,8) NOT NULL,
  latitude decimal(10,8) NOT NULL,
  status_id int(8) NOT NULL DEFAULT '1',
  user_id int(8) NOT NULL,
  category_id int(8) NOT NULL,
  zipcode varchar(4) NOT NULL,
  timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  headline varchar(100) NOT NULL,
  picture text,
  employee_id int(11) DEFAULT NULL,
  org_id int(11) DEFAULT NULL,
  PRIMARY KEY (case_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



  CREATE TABLE Employee (
  employee_id int(8) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  tel int(8) NOT NULL,
  email varchar(50) NOT NULL,
  password text NOT NULL,
  secret varchar(32) NOT NULL,
  province int(3) NOT NULL,
  district int(3) NOT NULL,
  PRIMARY KEY (employee_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

  
CREATE TABLE Events (
    event_id int(8) NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    date varchar(100) NOT NULL, -- Will be changed to DATETIME or DATE
    description text NOT NULL,
    zipcode int(4) NOT NULL,
    PRIMARY KEY (event_id)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;


CREATE TABLE Category (
 category_id int(8) NOT NULL AUTO_INCREMENT,
 description VARCHAR(240) NOT NULL,
 PRIMARY KEY (category_id)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;



CREATE TABLE `User` (
  `user_id` int(8) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `tel` int(8) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `secret` varchar(32) NOT NULL,
  `subscription` tinyint(1) NOT NULL,
  `zipcode` varchar(4) NOT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpire` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `User`
MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;
COMMIT;


CREATE TABLE StatusTable (
 status_id int(8) NOT NULL AUTO_INCREMENT,
 description varchar(100) NOT NULL,
 PRIMARY KEY (status_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `Organization` (
  `org_id` int(8) NOT NULL,
  `organizationnumber` int(12) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tel` varchar(8) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `secret` varchar(32) NOT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `expirePasswordToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Organization`
  ADD PRIMARY KEY (`org_id`),
  ADD UNIQUE KEY `organizationnumber` (`organizationnumber`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `Organization`
  MODIFY `org_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;


CREATE TABLE Place (
  zipcode varchar(4) NOT NULL,
  province varchar(100) NOT NULL,
  PRIMARY KEY (zipcode)


) ENGINE=InnoDB DEFAULT CHARSET=latin1;



COMMIT;