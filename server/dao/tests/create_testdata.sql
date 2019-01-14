

INSERT INTO `Cases` (`case_id`, `description`, `longitude`, `latitude`, `status_id`, `user_id`, `category_id`, `zipcode`, `timestamp`, `headline`, `picture`, `employee_id`, `org_id`) VALUES
(1, 'test One', '10.38769950', '63.42830650', 1, 31, 1, '7012', '2019-01-09 08:09:06', 'aliens are invading send help', 'url', 1, 1),
(2, 'tætt vannhøll', '112.92326821', '43.29427921', 2, 31, 1, '7021', '2019-01-09 08:09:06', 'tætt vannhøl, fix pls', NULL, NULL, NULL),
(3, 'test sak', '1.00000000', '2.00000000', 1, 1, 1, '7012', '2019-01-09 12:26:48', 'test headline', 'url', 1, 1),
(4, 'test sak', '1.00000000', '2.00000000', 1, 1, 1, '7012', '2019-01-09 12:30:52', 'test headline', 'url', 1, 1),
(5, 'test sak', '1.00000000', '2.00000000', 1, 1, 1, '7012', '2019-01-09 13:13:37', 'test headline', 'url', 1, 1),
(6, 'test sak', '1.00000000', '2.00000000', 1, 1, 2, '7012', '2019-01-09 13:14:17', 'test headline', 'url', 1, 1),
(7, 'test description', '1.00000000', '2.00000000', 1, 34, 1, '7012', '2019-01-09 14:58:25', 'test headline', 'url', 1, 1),
(8, 'test description, denne saken registrerer mindre felter', '1.00000000', '2.00000000', 1, 34, 1, '7012', '2019-01-10 08:21:20', 'test headline', 'url', NULL, NULL),
(9, 'test description, denne saken registrerer mindre felter', '1.00000000', '2.00000000', 1, 34, 1, '7012', '2019-01-10 08:24:03', 'test headline', 'url', NULL, NULL),
(10, 'test description, denne saken registrerer mindre felter', '1.00000000', '2.00000000', 1, 34, 1, '7012', '2019-01-10 08:27:43', 'test headline', 'url', NULL, NULL),
(11, 'test description, denne saken registrerer mindre felter', '1.00000000', '2.00000000', 1, 34, 1, '7012', '2019-01-10 08:36:00', 'test headline', 'url', NULL, NULL);


INSERT INTO Category ( description) VALUES ( 'Elektrisitet'), ( 'Hullfylling');