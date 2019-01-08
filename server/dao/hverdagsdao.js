const Dao = require("./dao.js");

module.exports = class ArtikkelDao extends Dao {
  getAllCases(callback) {
    super.query(
      "select * from Cases",
      [],
      callback
    );
  }
};
