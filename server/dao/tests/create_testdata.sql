INSERT INTO Cases ( description, longitude, latitude, status_id, user_id, category_id, zipcode, timestamp, headline, picture, employee_id, org_id) VALUES
('test One', '10.38769950', '63.42830650', 6, 31, 1, '7012', '2019-01-09 08:09:06', 'aliens are invading send help', 'url', 1, 1),
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

INSERT INTO Status (description) VALUES
    ('Status1'), ('Status2'), ('Status3'), ('Status4'), ('Status5');


INSERT INTO `Events` (`event_id`, `name`, `date`, `description`, `zipcode`, `address`, `venue`) VALUES
(1, 'Madrugada', '2019-09-18 08:20:14', 'Madrugada er tilbake i Trondheim. Konserten holdes på spektakulære Sverresborg under stjernehimmelen. Ikke gå glipp av årets konsert!', '8015', 'Sverresborg', 'Sverresborg'),
(2, 'Kiss – The Exisbitchin', '2019-09-16 14:00:00', 'Svenske Alexander Johansson har samlet på Kiss-effekter helt siden han 7 år gammel fikk se coveret til Kiss-albumet Destroyer. I dag har 41 år gamle Johansson av Nordens største Kiss-samlinger. Dette blir første gang han tar med seg vandreutstillingen Kiss – The Exhibition til Norge.', '7010', 'Brattørkaia 14', 'Rockheim'),
(3, 'Sjakk for kongerab', '2019-09-02 09:00:00', 'Arrangement for unger interessert i sjakk. Her kan ungene lære sjakk, spille sjakk og se på partier. Åpent for alle barn.', '7037', 'Sorgenfriveien 9', 'Toppen Kantine'),
(6, 'Svingkurs - Nybegynner', '2019-09-03 13:00:00', 'Vil du også lære å danse swing?\r\n\r\nÅ danse swing er sosialt, moro og god trening. Ta med familie, venner, arbeidskollegaer og bli med på kurs.', '7047', 'Ingvald Ystgaards veg 7B ', 'Dans Trondheim IL'),
(7, 'Humle, Humle og atter Humle', '2019-09-02 16:00:00', 'Bruk av humle strekker seg langt tilbake til før 1000-tallet, og de startet med bruk av humle i øl for og konservere ølet. Dette gjorde at man kunne brygge lavere alkoholprosent og det ble mer profitt på øl. Humle brukes i øl før å tilføre bitterhet og aroma og konservere ølet. IPA er et øl som inneholder mye, og ofte flere typer humle.\r\nVi inviterer til en intim middag (18 plasser) der det først blir en historifortelling og forklaring om de ulike typer IPA øl som finnes og fakta om ulike humletyper. Etterpå blir det servert en 4-retters meny der vi har laget maten etter ølet, og med 9 forskjellige humleøl.', '7067', 'Strandveien 71', 'E.C.Dahls Pup og Kjøkken'),
(8, 'aaVinter kajakk-tur i Afrikaa', '2019-09-18 17:00:00', 'Ikke gå glipp av å oppleve Trondheims vinterstemning fra en kajakk. Våre eksklusive vinterturer går langs Nidelven, og er tilpasset også de som ikke har padlet kajakk tidligere. Turen ledes av våre profesjonelle instruktører. aa', '7031', 'Bostadvegen 11', 'Tempe Idrettsanlegg'),
(9, 'Bokåret 2018', '2019-09-22 15:00:00', 'Gikk du glipp av høydepunktene fra bokåret 2018? Trondheim folkebibliotek har invitert et variert panel med forfattere, kritikere og bokelskere til å presentere kjente og ukjente bokperler. Kom til en litterær helaften og bli servert årets kjente og ukjente bokperler! Arrangementet avsluttes med panelets personlige favoritter!', '7011', 'Kongens gate 1', 'Kulturtorget, Trondheim folkebibliotek'),
(10, 'Magevals nybegynnerkurs', '2019-09-10 14:00:00', 'Velkommen til 10-ukers nybegynnerkurs i magedans/orientalsk dans.', '7042', 'Båtmannsgata 4', 'Dora'),
(29, 'Ben spiller blokkfløyte... igjen og igjen test', '2019-09-26 17:00:00', 'Ben dræg opp blokkfløyta for en siste heilblåsanes riff', '7021', 'NTNU - Kalvskinnet', '403'),
(32, 'Ben spiller blokkfløyte... enda en gang', '2019-09-27 00:00:00', 'Ben er ikke særlig god', '7020', 'Fløyteveien 2', 'I kjellern');



INSERT INTO `Employee` (`employee_id`, `name`, `tel`, `email`, `password`, `secret`, `commune`, `county`, `superuser`, `resetPasswordToken`, `expirePasswordToken`) VALUES
(1, 'Øyvind Valstadsve', 98815562, 'oyvinval@stud.ntnu.no', 'ed380054c5e100366d8ad107358e2738e102d7c1fad6f2b614f090f59c0db2422a99cdac8cf1acbaa4fd4b351a02069fa81a1d2df709803783cff992ec8e3014', 'a382b017fef364c2e4b5a523efa0d867', 1, 1, 0, NULL, NULL),
(3, 'Ben-endret', 12345678, 'test@endret.no', 'e92185b11bf459e1d89fcfb4c7f82eea5d4bd848c0ffb2973466cc4382f77018255e323b118183385fcc21f55c9ef5653ba5f05fca1c61661d79383aa90f964a', '0e5811db7f2e8bdf1f90353c1d8e856c', 1, 23, 0, NULL, NULL),
(4, 'Odd Ronny Grustaket', 3342434, 'oddronny@gmail.com', '0dddf2ff98189adfaf0d5fe0f8249ebe887292ad9e345bc066ab13864288bc95e0a0545ad517707c76c396caaefa972e3d4c3a04e1bc553c52f04cccdd8858b3', '42cc7e1ba4bc257260b1cad8eba0cf4f', 315, 16, 1, NULL, NULL),
(5, 'Ben Oscar Strømstrømstrøm', 12345678, 'benstrom@strom.ben', '6162a3d05e4f543c2fc22b695f42565c0af0ce089f323708fddc5d30ad5d267ee85d240188211ccb604e2e4af3c9a28ad42454ec9260ef072dbb8f2ceef03e22', '25a532363c2056c0d10b8004eed58d7b', 1, 1, 1, NULL, NULL),
(7, 'Slett meg ', 12345654, 'praxiz@praxiz.net', 'bddd6dce9c963d9620695c7dc3d280ce9fe51b979799b0f0af675a3c2906ec935cfc73fcb627bc60f265304704ca7770de3a23bc44c856c21eed99cb2322377b', '19d95b8709f530185253b74916c23b91', 229, 12, 0, NULL, NULL),
(8, 'Torstein', 3424243, 'TorsteinFikser@gmail.com', '92676977dd43948c35843a7604dce881e3ab2a47b3183a356da5ca0ff0afc79ffff3457eab0d469cd9758a4debb9c0031ff0deaab8dc9446d4d56ab21cdc475a', '98bd355587bef6cd5245bb8c24bc3578', 296, 16, 0, NULL, NULL),
(10, 'Erling troll 2e', 12345678, 'erling@ansatt.no', 'cc5dfb9a74f1ce49dd779c4b15f670d95dc735389fa6c22ecad05edf36b797dda041ba51286ddbc2a93b1826172ecfb8b19270f13c51afa1cb10f5f73066e797', '5ffc96989d86d92a90e42bf1c2d7a0dc', 315, 16, 0, NULL, NULL),
(18, 'Benkom', 999999993, 'benos@stud.ntnu.no', 'b2780b82c0364fc792a421441f11a88be3ce64d40d24b0a0769ebcbc030c6fe2a7218463499572bef58ecdff160509297cadf66254fc04f35131e67ded82b603', '9d0e021022fbf54b0f0875020931eaa2', 315, 16, 0, '62160308bec58e8cf10a763a6d4838f85a908ac6', '1548272371463'),
(20, 'kari traa', 3424234, '342@gmail.com', '05e0258951320e13d1357305b8482749e89b98477c38e0d0c4b6c14d3931a27c8a69954173085e40c103cf63a80464568c87221250c7b7750ca8a44ca95148d9', 'a3161a354ac8ed1f874e1f2a5d993cd7', 106, 6, 0, NULL, NULL),
(21, 'Aria Bui', 45181447, 'thuybrooks98@gmail.com', '752310c5e37f25df4a06d45581b2b98ad00d776120035e8d7ce5d70456d33fca047b59cab7c7740ca5fc6ceef2ae1c2299695e5c4c145e5a24bf4d4ace1196b0', 'a60001b5b2ff017efc8da10cd4801cc3', 315, 16, 0, NULL, NULL);

INSERT INTO Category (description) VALUES
      ('Elektrisitet'),
      ('Hullfylling');

INSERT INTO `User` (`user_id`, `name`, `address`, `tel`, `email`, `password`, `secret`, `subscription`, `zipcode`, `resetPasswordToken`, `resetPasswordExpire`) VALUES
(37, 'Endaentestington', 'Testgate 11', 12345678, 'test@test.com', '99ea88ea2d90a73137aa4a69a0ed939938531c2d964c2533fa9552a2ea30f1dd1c71043333bc0964815b36986af6e33efb72fe8a13966a7a3b3a12c922c3a40f', '1acd63e7f3f0ff6cad13a8aef3104f2d', 0, '0001', NULL, NULL),
(38, 'Marij', 'hhhhh', 91111222, 'mari@stud.ntnu.no', 'd179c779db60e201bb5c41fd2ed7c7d1d688959a1bdda6b18cd6b17f031d3515dca9b4e63c9c2c3580ddaa6d8e3424048b7ce21e44d5b8d59ead9e2f13c168d6', '742f987cd4e10055c9156ea61e47da0a', 0, '1455', NULL, NULL),
(39, 'Øyvind Valstadsve', 'Prinsensgt 61, leil. 616', 98121234, 'praxiz@gmail.com', '391ecb1641a5e78a0727178f010551d8ae0a0e0e4213ae34ba5f731cab2518ca9130d2b554d86a02b9cb4f9e4c4dfa2358f9e6d7b1212f845b96f5ec06134205', 'fbbeb7f77b28fd99183f4ac88f0c65b8', 1, '3123', NULL, NULL),
(40, 'Øyvind Valstadsve', 'Prinsensgt 61, leil. 616', 42342342, 'a@a.mo', 'ccf5c1689a4738878e69aea7aab6187313332559161e807dec6456155b3161de23c28582c8917553054862a1a2c7b891fc7ef28564148b90de5de4c438166542', '449b8093d1e539fab635c3db631e1ea1', 1, '7011', NULL, NULL),
(42, 'Simon Lilleeng', 'Bergittavegen 24', 12345678, 'simon@gmail.com', '4184fc42a2f4e6e0ae15b044d930da11f3b3dc023a8e9cdce00a56e4ae196da0e7c4613a1f35a1d295f01e4b2f757a3f1924eb03407d40b53220feb45cbfaf6b', 'f8ec8565bccce5c3c3ac2a7e2add8b1c', 1, '7021', NULL, NULL),
(43, 'Mathias Braathen', 'Moholt Allmenning 11', 94291456, 'hpmathias@gmail.com', 'b2847ca7cdc92c06ab39bfa68753c4ef7e372b023d1e8beeab92c33715689e6b6d4b3a157118d9c5a62f320e432fc03c51c1018806e5325923ea36375f8257ea', '90f03eb08dd0917dd5719c0b872d997a', 1, '7050', NULL, NULL),
(61, 'testchrome', 'testtest', 99999999, 'ben2@ben.com', 'c811cd86775e8ccea4e4bfbe812a0e40f433e7f3c0d6a935aa091bc3a07a241a66fded0a755e36d41dcddf2cda3c08764306979fa9f596ce65488ead871b73a7', 'e95bf558f44925b27852bafd7684b046', 1, '7000', NULL, NULL),
(63, 'per fekt', 'taskeladden 2', 12312312, 'per@fekt.no', '004b18ec74f7795fa6e6d57005f1e56ce3401d2daca728024270e2ddc7cc96d4a6138464070b46796a9e18fa82aa8925e9016826acbdf683c5b4c104e0b07d67', '0b0e42a4a558f41511010daf429b1334', 0, '7020', NULL, NULL),
(65, 'Simon L', 'abc 12', 12345678, 'simon2@gmail.com', '5fdc031a3da8d384216db17e2d14176a15e3b4e01c78df78fa76549ae2968cd5aaba47e25ab77f36219afe5aad775b75e152e3cfb6dbc4347b075b7f1b0efd7b', '4bce928c57a19c463307fa63eaf6c48b', 0, '7020', NULL, NULL),
(66, 'simon', 'berggata 24', 12345678, 'simonl@gmail.com', 'e7b18214940c1d19abd1dab2dc5a5195f16165a10d7f169161cb2dd9c5ec879c71377d4b731f09a8ca90678535eb706429b6edee1e891d2e921e16905b00d9e9', '3a92d36a1455f4580c21abdddec174ee', 0, '7021', NULL, NULL),
(67, 'Erling Troll', 'VeldigStorVei 38', 47452234, 'erling@gmail.com', 'bd0d8e70e99675a8363426a65410b70ad98d7d220d37fba8112ec9856c99b35a75ab9eeb476fb71740e71cdaab858cab92aa185836e43d35ac8df3f75f469172', 'fdd222a43642be9c4a9eba002e9ed2b9', 0, '1342', NULL, NULL),
(68, 'mari', 'hallåå 45', 12345678, 'mari@not.no', '39cd88683a4b560c2db11aaf7aca7250822693a570fb6cc7a86f253e197703a339ce6e5008cc87b4250c67efe36b5f0f147afcf334b73fad23b02eb13ae0dd1c', '03fba5b143abd929ccd7d45f38f68943', 0, '7081', NULL, NULL),
(69, 'login', 'login', 12312312, 'login@test.no', '2f4c2b8a1f3652d5e12ca02fc5afb7efebfc550759eb7808c152f3b8a1c4548457aa3b889ac5f90fc5f0893a506844b94a1d275f0a521c03694303b3d4257621', '9f9b12a29e1821e583d04e34255f1683', 1, '1231', NULL, NULL),
(80, 'Karl Ost', 'teamab', 978872212, 'karl@gmail.com', 'c1e9f9fdb19a36ee446efc0baa5a0ae6fd6329d109302e2829746c1b9fe3b8ac451f3ffa0c46d0c48889840a2d3b8876923d2b86f997e76ee1675b6e6ed91567', '253c7a03bd8bb32e8f35388fe2484d93', 1, '7037', NULL, NULL),
(81, 'Erling Roll', 'None of your business', 12341234, 'erling@roll.no', '3ebe3009770feb835222a8f3811da2dc3b4fe4a5017ae462c6c6eaf093ea8aa2a48d012d2581fc69c2f0997fa2544c13d0fac03b7f3082d8a4b092e9e79495bd', '33bbac89d666775c2c06a985c4bc0c0a', 1, '7030', NULL, NULL),
(82, 'Aria', 'Koieflata 22', 45181447, 'thuybrooks98@gmail.com', '92bab42f958afea273e7fe9489e10e834e57de5cbc008aed38afd37e738120b9cddd4f1ad14ec9c6d895cd49056023c81affd8945b3f482fd8e2101b34665ea0', 'd2f53862cb85e662d7420f7d2e58178e', 0, '7092', NULL, NULL),
(84, 'Sigurd', 'Oslogate1', 12345678, 'sigurd@ntnu.com', 'a0c02283f8410e692cacdbdda23a603962fe2c37193034e7dcedc4180390694a6284d00558ddccb4a54209cb10923208152fcee3bbed4c8ee6c946fc59fd806e', 'ae8619d4243ebe82c47a69df3c141f3b', 1, '0356', NULL, NULL),
(85, 'Vebjørn', 'KristiansandGate1', 12345678, 'vebjørn@ntnu.com', 'db614912376e015017f5dd295bd1badd2c6f1ddabe87ec1f832eab5b2c7cf9ae923a57c2122e1643a5c4a8843aa4a1bee72c94b9e2710f5a49343b05af65faf6', '3c5bcef077036f06744d8007b835a4cf', 1, '4630', NULL, NULL),
(86, 'Dodo', 'KristiansandGate2', 12345678, 'dodo@ntnu.com', '6e26145e466c6ae70a0e7c71ab66e4aa11a7b0a86572fb1cdecd280a84601fab8e8d7bdb4a01e66452fb028b9da8b321ec28f7d45f61d23deada28983375fee5', '21efbe0bf2a8affecce5a53a1fbd77c3', 1, '4615', NULL, NULL),
(87, 'Ingelin ', 'StavangerGate1', 12345678, 'ingelin@ntnu.com', 'b2fae47b5310c20804fe9a8a33f20baddea2694a31208fd618a072569ea713f7cd601211de16dde9ee8aa9890affbe9adc093d68935f9b72cf4fe9ed42d2dbdc', '5c019c9d61de41bb751c22c28602cb2f', 0, '4013', NULL, NULL),
(88, 'Øyvind', 'StavangerGate2', 12345678, 'øyvind@ntnu.com', '3354ae3b4a44cdcc97813cfa25496598ddaeaf3cda33d5c83123aafe12c9f6dc67961d447d2d05f04e1fbbc282068c2724f3e4e1f020f97faa55cfecd175cd66', '91f5fc9b372fc48b1a5bb4f9fb133351', 1, '4024', NULL, NULL),
(89, 'Bjørnar', 'BergenGate1', 12345678, 'bjørnar@ntnu.com', '1eaf48d78c7fcea754788dad05343a2cdd779e03d44294280497bbb8f1fbb9bac12a19124d259de718de9cda5e4c2793427a39140c87ede9fba4b8c51bea0fd7', '894a8cef3be7116162829e96dbfaf2ed', 1, '5007', NULL, NULL),
(90, 'Marius', 'BergenGate2', 12345678, 'marius@ntnu.com', '88bba7e5f8706a79cce0b9849754380fdc7b107ae907f4bf068eda081ecc63de977e75a6d125e85864482dd24d1f4114f78ce67059184cac1bed85abb770098b', 'b92e506ab063607507f94b9767211d34', 1, '5003', NULL, NULL),
(91, 'Fredrik ', 'ÅlesundGate1', 12345678, 'fredrik@ntnu.com', 'd1b5d693ee187f764918eb1762e8765c7e29a30d6286498377693b0885dfc3dd1f0e800f7b684e287297947bc280da4a346b7576d95761f2955be60545572274', '95204960aa4c35c0b1e2fabc79775434', 1, '6003', NULL, NULL),
(92, 'Sindre', 'ÅlesundGate2', 12345678, 'sindre@ntnu.com', 'd84217139560a97e122bb06d2aaf682b679b7270fae6cbb809f3ef56971dad7982bc3ae2dc6b0b3b5a1baa4bdaf430da7f5fd9ca47ec590cd25149e62d0bfa06', '7cf675155537761a6c3fe8f89be4c4fe', 0, '6008', NULL, NULL),
(93, 'Anders', 'GjøvikGate1', 12345678, 'anders@ntnu.com', '68039682bd008187a29350bc1054bcb3a34b9f144181fd41408fb5832232fe2457939376f01c674edc5c070ad2b4caa57ce0a2278d3c04df5ec4a44268f75d0e', '415c780a448364adc744986d947d1920', 1, '2815', NULL, NULL),
(94, 'Trond', 'GjøvikGate2', 12345678, 'trond@ntnu.com', '69bbd06d8d0c67e0035a849a1698d5049fa23201676e2de88a062de78005c455ce3b2229d2a5a6a74302092ac772cfc3efcf7a74f7b13088cb175b0c253415c4', '9a4a537c40505da86c2db62afb817587', 1, '2821', NULL, NULL),
(95, 'Erlend', 'LillehammerGate', 12345678, 'erlend@ntnu.no', 'b69bad0657e846760b27c50a6fd15e3d73ca206c7f86493647e430b48aeb351d73b64e0e5227bad1994e902a4cfa7c8f49e113bb5fc0609dc822e18c0d3157e7', 'b0dad21f530fa5edc704e17b81a06440', 1, '2609', NULL, NULL),
(96, 'Ruben=', 'Donbås', 12345678, 'ruben@ntnu.com', '64224923c47892ae2cf7edba853f12136648b4d90a5f5fbe1036c19a670842515ade77eb6de847ff7c2651f063e907fc0d5c89c5c14348c836c307f4e1444c68', 'bff56ba29a75f149c21cc52d7bc6d101', 1, '2660', NULL, NULL),
(97, 'Oscar', 'Trondheimgate1', 12345678, 'oscar@ntnu.no', '800c2d35a7b26debff02ebe1d2b12d5ce7d56524dc1a4291672f6f8f7e0e3549c14f28add13cb2f1149977576d5dd3a48c36a3e07211d9e42ccccef8127e4b20', 'e1c79f105ede10cc2c834870abc9cb19', 1, '7037', NULL, NULL),
(98, 'Michael', 'Trondheimgate2', 12345678, 'michael@ntnu.no', 'eecbad649945f27bc549dcd6fa696a30f42aab6272819d6300db52f8200540f4700ec65ad3f23ddeea750702b338c4f5f03999f7dd001579764c78a413e1a04e', 'fe159bc84fc0e2341f5daef93f40de0e', 1, '7054', NULL, NULL),
(101, 'REgmegR', 'regmegvegen 12', 12345678, 'regmeg@reg.no', '27bbdc2692d4e9db8f452b794d58e7d7a376b85d16a1de8c87e06937cd7e7f422c30d7de8be228aaaeb0c1e9b838ebf086f544257c79e43d02d8d7bead4a6811', '69c743b17abb541f1f238f6cc6104d7d', 0, '7020', NULL, NULL),
(108, 'ben', 'benbenben', 99999999, 'benos@stud.ntnu.no', '681907da36f945a18f92ac9f62a30d6f05219c30dfb44ba8624c9fcda4b96fe90671705d5dcf78d493684e20c3ce75e94bbdd5f2e2e3a1de389b4d77ce909e9b', '551ad87210355279879038e4bdffa78c', 1, '1234', NULL, NULL);
      
INSERT INTO `Organization` (`org_id`, `organizationnumber`, `name`, `tel`, `email`, `password`, `secret`, `resetPasswordToken`, `expirePasswordToken`) VALUES
(2, 713210329, 'Josteins Propan Og Badeballe', '24681012', 'jostein@propan.no', '3e6110ed79a8e9fae7d418078cc0a9750aa2b8cee550c9a06160de7fa8c793d3786f37dc9b89ea781ef58a02aca80f44c2711b5aebfcf9e3a8a464f6f75720d2', '5b9d6cdaaaf9aca2b62dc3a64c4aac0d', 'c1f5ee02e39739ad06e767075b49bb04a4646a49', '1548154740084'),
(15, 7133, 'Odd Ronny Grustak', '24681012', 'kaare@propan.no', '1f6d67d92dc420eff5ef8b4669abb393664e26521aaa7efe4958e50a34aba0e2571a9374027964ebf5cac065548102fd730992a8f02570f5c7e84b13bbafbb4e', '408180820c764683afbfd12ad1088a96', NULL, NULL),
(16, 23242, 'Kåres Kranservice', '28472403', 'heh@heh.no', '188a716070e7d91dae6c63a80914f0d9d2726363691c228936309c2a796a6cc38bae5396ee396cf86a1fc164f3cb4114b58041dac0afd53c848566188b69da5f', 'd9cf4ba91f363d3eace36deeddd0fb22', NULL, NULL),
(22, 7173777, 'Elektro', '12345678', 'Elektro@gmail.com', 'ba45aefdf394bc75505c4022559cec2d686a5a341c36e1f8f3753e5abff5b5ca9cf451b4c537cacbac3746a8326f396c092dcfbd9613f4a97fc0bca60b85a9ab', '0e91aa75989e880d8ce826bf0c66fe86', NULL, NULL);



INSERT INTO Place (zipcode, province) VALUES
("0001",'OSLO'),
(1001, 'OSLO'),
(2001, 'LILLESTRØM'),
(3001, 'DRAMMEN'),
(7001, 'TRONDHEIM');

INSERT INTO fylke (navn) VALUES
('OSLO'),
('TRØNDELAG');

INSERT INTO kommune (fylke_id, navn) VALUES
(1,'OSLO'),
(2,'TRONDHEIM');
