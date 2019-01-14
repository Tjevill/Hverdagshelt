DROP TABLE IF EXISTS Cases;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Events;

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


  CREATE TABLE `Employee` (
  `employee_id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `tel` int(8) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `secret` varchar(32) NOT NULL,
  `province` int(3) NOT NULL,
  `district` int(3) NOT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE Events (
    event_id int(8) NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    date varchar(100) NOT NULL, -- Will be changed to DATETIME or DATE
    description text NOT NULL,
    zipcode int(4) NOT NULL,
    PRIMARY KEY (event_id) 
)
