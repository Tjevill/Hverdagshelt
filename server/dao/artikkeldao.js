const Dao = require("./dao.js");

module.exports = class ArtikkelDao extends Dao {
  
  getForside(callback) {
    super.query(
      "select * from nyhetsartikkel where viktighet = 1",
      [],
      callback
    );
  }

  getKategori(kategori, callback) {
    super.query(
      "select * from nyhetsartikkel where kategori = ?",
      [kategori],
      callback
    );
  }

  getAlleartikler(callback) {
    super.query("select * from nyhetsartikkel", [], callback);
  }

  getArtikkel(id, callback) {
    super.query("select * from nyhetsartikkel where id=?", [id], callback);
  }

  delArtikkel(id, callback) {
    super.query("delete FROM nyhetsartikkel where id = ?", [id], callback);
  }

  vote(json, callback) {
    var val = [json.score, json.id];
    console.log("val: " + val);
    super.query(
      "update nyhetsartikkel set vote = vote + ? where id = ?",
      val,
      callback
    );
  }

  addComment(json, callback) {
    var val = [json.artikkel, json.user, json.email, json.comment];
    console.log("val: " + val);
    super.query(
      "insert into comments " +
        "(artikkel, user, email, comment) " +
        "values (?,?,?,?)",
      val,
      callback
    );
  }

  getComments(kategori, callback) {
    super.query(
      "select * from comments where artikkel = ? order by lagtinn",
      [kategori],
      callback
    );
  }

  addArtikkel(json, callback) {
    var val = [
      json.tittel,
      json.ingress,
      json.innhold,
      json.bilde,
      json.kategori,
      json.viktighet
    ];
    console.log("val: " + val);
    super.query(
      "insert into nyhetsartikkel " +
        "(tittel, ingress, innhold, bilde, kategori, viktighet) " +
        "values (?,?,?,?,?,?)",
      val,
      callback
    );
  }

  editArtikkel(json, callback) {
    var val = [
      json.tittel,
      json.ingress,
      json.innhold,
      json.bilde,
      json.kategori,
      json.viktighet,
      json.id
    ];
    console.log("val: " + val);
    super.query(
      "update nyhetsartikkel SET tittel = ?, ingress = ?, innhold = ?, bilde = ?, kategori = ?, viktighet = ? WHERE id = ?",
      val,
      callback
    );
  }

  createOne(json, callback) {
    var val = [json.navn, json.adresse, json.alder];
    super.query(
      "insert into person (navn,adresse,alder) values (?,?,?)",
      val,
      callback
    );
  }
};
