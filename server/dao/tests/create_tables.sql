DROP TABLE IF EXISTS nyhetsartikkel;

CREATE TABLE nyhetsartikkel (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  tittel varchar(250) COLLATE latin1_danish_ci DEFAULT NULL,
  ingress varchar(250) COLLATE latin1_danish_ci DEFAULT NULL,
  innhold text COLLATE latin1_danish_ci,
  opprettet timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  bilde varchar(200) COLLATE latin1_danish_ci DEFAULT NULL,
  kategori varchar(100) COLLATE latin1_danish_ci DEFAULT NULL,
  viktighet int(1) DEFAULT NULL,
  vote int(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);
