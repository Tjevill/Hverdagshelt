const Dao = require("./dao.js");

module.exports = class CasesDao extends Dao {

    getAll(callback){
        super.query(
            "SELECT * FROM Cases ORDER BY timestamp", [], callback
        );
    }

    getOne(caseid, callback){
        super.query("SELECT * FROM Cases WHERE case_id = ?", [caseid], callback);
    }

    create(json, callback:any) {
        var val = [
            json.description,
            json.longitude,
            json.latitude,
            json.status_id,
            json.user_id,
            json.category_id,
            json.zipcode,
            json.headline,
            json.picture,
            json.employee_id,
            json.org_id
        ];
        super.query(
            "INSERT INTO Cases " +
            "(description, longitude, latitude, status_id, user_id, category_id,"+
            "zipcode, headline, picture, employee_id, org_id) values (?,?,?,?,?,?,?,?,?,?,?)",
            val,
            callback
        );
    }
}