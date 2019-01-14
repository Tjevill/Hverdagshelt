


INSERT INTO `Cases` ( `description`, `longitude`, `latitude`, `status_id`, `user_id`, `category_id`, `zipcode`, `timestamp`, `headline`, `picture`, `employee_id`, `org_id`) VALUES
('test One', '10.38769950', '63.42830650', 1, 31, 1, '7012', '2019-01-09 08:09:06', 'aliens are invading send help', 'url', 1, 1),
( 'tætt vannhøll', '112.92326821', '43.29427921', 2, 31, 1, '7021', '2019-01-09 08:09:06', 'tætt vannhøl, fix pls', NULL, NULL, NULL),
( 'test sak', '1.00000000', '2.00000000', 1, 1, 1, '7012', '2019-01-09 12:26:48', 'test headline', 'url', 1, 1),
( 'test sak', '1.00000000', '2.00000000', 1, 1, 1, '7012', '2019-01-09 12:30:52', 'test headline', 'url', 1, 1),
( 'test sak', '1.00000000', '2.00000000', 1, 1, 1, '7012', '2019-01-09 13:13:37', 'test headline', 'url', 1, 1),
( 'test sak', '1.00000000', '2.00000000', 1, 1, 2, '7012', '2019-01-09 13:14:17', 'test headline', 'url', 1, 1),
( 'test description', '1.00000000', '2.00000000', 1, 34, 1, '7012', '2019-01-09 14:58:25', 'test headline', 'url', 1, 1),
( 'test description, denne saken registrerer mindre felter', '1.00000000', '2.00000000', 1, 34, 1, '7012', '2019-01-10 08:21:20', 'test headline', 'url', NULL, NULL),
( 'test description, denne saken registrerer mindre felter', '1.00000000', '2.00000000', 1, 34, 1, '7012', '2019-01-10 08:24:03', 'test headline', 'url', NULL, NULL),
( 'test description, denne saken registrerer mindre felter', '1.00000000', '2.00000000', 1, 34, 1, '7012', '2019-01-10 08:27:43', 'test headline', 'url', NULL, NULL),
( 'test asdasda, denne saken registrerer mindre felter', '1.00000000', '2.00000000', 1, 34, 1, '7012', '2019-01-10 08:36:00', 'test headline', 'url', NULL, NULL);


INSERT INTO Employee (`name`, `tel`, `email`, `password`, `secret`, `province`, `district`) VALUES
 ('Odd Ronny Grustak', 24681012, 'oddronny@gmail.com', '66a6530c6943ff75238f0bef371af70929c899b12d08ffefeefa33fb1cc328c36925b5918520b20d82a2745845f650f633ec6120e3ca1a1bce4aed0e08c39118', '65aaacb1161c919729fdf2fecedbae72', 74, 5),
 ('Bentoooo', 4123444, 'test@test.no', 'e92185b11bf459e1d89fcfb4c7f82eea5d4bd848c0ffb2973466cc4382f77018255e323b118183385fcc21f55c9ef5653ba5f05fca1c61661d79383aa90f964a', '0e5811db7f2e8bdf1f90353c1d8e856c', 1, 22);

INSERT INTO Events (name, date, description, zipcode) VALUES 
    ('Test Event 1', "2019-12-03", 'description 1', 7001),
    ('Test Event 2', "2019-12-03", 'description 2', 7002),
    ('Test Event 3', "2019-12-03", 'description 3', 7003);

INSERT INTO StatusTable (description) VALUES
      ("Ubehandlet"), 
      ("Under behandlet"), 
      ("Behandlet"), 
      ("Under arbeid"), 
      ("Fullført"), 
      ("Avvist") ;

INSERT INTO Category (description) VALUES
      ('Elektrisitet'),
      ('Hullfylling');

INSERT INTO User (name, address, zipcode, tel, email, password, secret, subscription) VALUES
      ('Mari', 'Testgate 10', 7710, 98765456, 'mari@mail.com', '895ae3365df8cf877b3604275efb1972cd821903fa0788235660db95b5fbf651a5bb19b3ed8a74aa3eb04d1a213304f59431a60da00508ec05b7af76a5d7631a','4ec151157aab83c9faee825e80a767de', 1);
      

INSERT INTO Organization (organizationnumber, name, email, password, secret) VALUES 
      (12345678, 'BENisasjon', 'mail', 'pass', 'sec'),
     (23456789, 'SIMisasjon', 'mail', 'pass', 'sec');

