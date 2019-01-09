const Dao = require("./dao.js");

module.exports = class CasesDao extends Dao {

    getAll(callback){
        super.query(
            "SELECT * FROM Cases ORDER BY timestamp", [], callback
        ):
    }

    getOne(caseid, callback){
        super.query("SELECT * FROM Cases WHERE case_id = ?", [caseid], callback);
    }

}