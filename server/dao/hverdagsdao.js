const Dao = require("./dao.js");

module.exports = class hverdagsdao extends Dao {
  getAllCases(callback) {
    super.query(
      "select * from Cases",
      [],
      callback
    );
  }
}
