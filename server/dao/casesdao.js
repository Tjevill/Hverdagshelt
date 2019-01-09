const Dao = require("./dao.js");

module.exports = class CasesDao extends Dao {

    getAllCases(callback){
        super.query(
            "SELECT * FROM Cases ORDER BY timestamp", 
            [],
            callback
        );
    }

    getOne(caseid, callback){
        super.query("SELECT * FROM Cases WHERE case_id = ?", [caseid], callback);
    }

    getOneZip(zipcode, callback){
        super.query("SELECT * FROM Cases WHERE zipcode = ?", [zipcode], callback);
    }

    getOneCategory(category_id, callback){
        super.query("SELECT * FROM Cases WHERE category_id = ?", [category_id], callback);
    }
    /*
    createCase(json, callback){
        let val = [];
        super.query(
            "INSERT into Cases () VALUES ()",
            val,
            callback
        );
    }
    */

}