const Dao = require("./dao.js");

module.exports = class hverdagsdao extends Dao {
  getAllCases(callback) {
    super.query(
      "select * from Cases",
      [],
      callback
    );
  }

  createCase(case: Object, callback: any) {

    let val = [case.description, case.longitude, case.latitude, case.status_id, case.user_id, case.category_id, case.zipcode]
    super.query(
      "INSERT INTO Cases (description, longitude, latitude, status_id, user_id, category_id, zipcode) values (?,?,?,?,?,?,?)",
      val,
      callback
    );
  }

};
